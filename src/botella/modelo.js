import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// La botella como pieza: geometría, materiales, agua con física y pulpa. No
// tiene cámara ni lienzo; la usan el motor del sitio (una botella que sigue
// sus huecos) y los prototipos (el configurador, el refri con 14 botellas).
// Todo lo que se decidió con Zahir sobre la botella vive aquí (ver CLAUDE.md,
// "La botella 3D").
// ─────────────────────────────────────────────────────────────────────────────

export const ALTO_BOTELLA = 2.16   // de la base a la tapa, en unidades

// La forma de la botella. Boston round de 500 ml.
const FORMA = { R: 0.32, HOMBRO: 1.5, CUELLO: 0.142, DOMO: 0.4, NIVEL: 1.83 }

// La silueta MEDIDA (12-nov-2026) de la foto de referencia que mandó Zahir
// (botella de 500 ml en rojo sobre gris): ancho renglón por renglón, escalado
// a R = 0.32. [radio, alto] de la base al cuello. Base bien redondeada
// (~0.35 R), cuerpo recto, hombro de ~0.84 R que se abocina rápido al cuello.
// La "nueva" de ese mismo día (hombro de 0.6 R) se veía CHATA: no regresar.
const MEDIDA = [[0.0848, 0.002], [0.1324, 0.0075], [0.174, 0.0149], [0.212, 0.0224], [0.2399, 0.0298], [0.2623, 0.0373], [0.2772, 0.0448], [0.2884, 0.0522], [0.2965, 0.0597], [0.3027, 0.0671], [0.3089, 0.0746], [0.3127, 0.082], [0.3145, 0.0895], [0.3158, 0.097], [0.3182, 0.1044], [0.32, 0.1119], [0.32, 1.6037], [0.32, 1.6671], [0.32, 1.6783], [0.32, 1.6895], [0.3195, 1.7006], [0.3182, 1.7118], [0.3164, 1.723], [0.3139, 1.7342], [0.3108, 1.7454], [0.3071, 1.7566], [0.3033, 1.7678], [0.2984, 1.779], [0.294, 1.7901], [0.289, 1.8013], [0.2834, 1.8125], [0.2766, 1.8237], [0.2685, 1.8349], [0.2598, 1.8461], [0.2517, 1.8573], [0.2406, 1.8685], [0.23, 1.8797], [0.2176, 1.8908], [0.2033, 1.902], [0.1877, 1.9132], [0.1691, 1.9244], [0.1504, 1.9356]]


export function estudioDe(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer)
// ── Luz de estudio ───────────────────────────────────────────────────────
// Un cuarto oscuro con dos cajas de luz altas a los lados y una arriba: son
// las franjas verticales de brillo que hacen que una botella se lea como foto
// de producto y no como dibujo.
function estudio() {
  const cuarto = new THREE.Scene()
  cuarto.add(new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 16),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.32, 0.29, 0.28), side: THREE.BackSide }),
  ))
  const caja = (w, h, brillo, x, y, z, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(brillo, brillo, brillo * 0.96), side: THREE.DoubleSide }))
    m.position.set(x, y, z); m.lookAt(0, y, 0)
    cuarto.add(m)
  }
  caja(1.6, 12, 6, -6, 1, 3)
  caja(0.8, 12, 3, 6, 1, 2)
  caja(6, 3, 3, 0, 9, 0)
  caja(3, 8, 1.6, 0, 1, -7)
  return pmrem.fromScene(cuarto, 0.02).texture
}

  const env = estudio()
  pmrem.dispose()
  return env
}

// Las etiquetas se cargan una vez y las comparten todas las botellas.
export function crearTexturas(renderer) {
  const cargador = new THREE.TextureLoader()
  const texturas = {}
  return function texturaDe(etq) {
    if (!texturas[etq]) {
      texturas[etq] = cargador.loadAsync(`/etiquetas/${etq}.webp`).then((t) => {
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = renderer.capabilities.getMaxAnisotropy()
        // Las etiquetas de nov-2026 (3:1) vienen a sangre, sin filo negro:
        // apenas un recorte mínimo para que no asome la orilla del PNG.
        t.offset.set(0.004, 0.006)
        t.repeat.set(0.992, 0.988)
        return t
      })
    }
    return texturas[etq]
  }
}

const aSRGB = (hex, v) => v.set(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255)
const blancoTapa = 0xf3f1ed

// `botella` queda con la base en y = 0. Para colocarla, mételo a otro grupo.
// `ligera`: menos caras en la geometría, para celulares (en el refri, con 14
// botellas, un iPhone 16 Pro se trababa; ahora es una sola, pero se cuida).
// `foto`: calidad de estudio para fotos fijas (referencias/foto.html). El agua
// deja pasar la luz de verdad (transmisión + absorción): la jamaica se ve
// casi negra en el centro y rubí en las orillas, como a contraluz. Es caro;
// el sitio NO lo usa.
// `realce`: versión barata de lo del modo foto para tiempo real (orilla del
// agua luminosa del color del sabor + grosor del PET). Sin transmisión.
export function armarBotella({ texturaDe, ligera = false, foto = false, realce = false, forma = 'medida', rocio = false }) {
  const VUELTAS = ligera ? 56 : foto ? 256 : 128
  // ── La botella ───────────────────────────────────────────────────────────
  // Boston round de 500 ml: cuerpo recto y liso, hombro en domo, cuello corto
  // con su anillo y tapa de 28 mm. Medidas de catálogo (proporciones sacadas de sus
  // fotos: esbelta, unas 3.5 veces más alta que ancha, con el hombro largo.
  // R: radio del cuerpo · HOMBRO: donde termina lo recto · CUELLO: radio del
  // cuello en la base del domo · DOMO: alto del hombro (en sus fotos es largo
  // y suave)
  const { R, HOMBRO, CUELLO, DOMO } = FORMA
  const perfil = [new THREE.Vector2(0, 0.004)]
  if (forma !== 'medida') {
    // fondo con un redondeo chico
    for (let k = 0; k <= 6; k++) {
      const t = (k / 6) * (Math.PI / 2)
      perfil.push(new THREE.Vector2(R - 0.04 + 0.04 * Math.sin(t), 0.04 - 0.04 * Math.cos(t)))
    }
  }
  if (forma === 'medida') {
    for (const [r, y] of MEDIDA) perfil.push(new THREE.Vector2(r, y))
    perfil.push(new THREE.Vector2(0.137, 1.95))
  } else if (forma === 'antes') {
    // Silueta hasta el 12-nov-2026: hombro en cuarto de elipse, largo (1.25 R)
    for (let k = 0; k <= 24; k++) {
      const t = (k / 24) * (Math.PI / 2)
      perfil.push(new THREE.Vector2(CUELLO + (R - CUELLO) * Math.cos(t), HOMBRO + DOMO * Math.sin(t)))
    }
    perfil.push(new THREE.Vector2(0.138, 1.92), new THREE.Vector2(0.136, 1.94))
  } else {
    // Silueta medida contra sus fotos (12-nov-2026): hombro más corto (~R) y
    // redondo que se cierra al cuello en S (convexo abajo, cóncavo arriba),
    // no un cuarto de elipse que llegaba plano al cuello como mesita.
    // Medido en formacion.jpg: del cuerpo completo al anillo ≈ 0.6 R.
    const H0 = 1.745, H1 = 1.94, RC = 0.137
    const p0 = [R, H0], p1 = [R, H0 + 0.115], p2 = [RC + 0.075, H1], p3 = [RC, H1]
    const N = 32
    for (let k = 0; k <= N; k++) {
      const t = k / N, u = 1 - t
      const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0]
      const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]
      perfil.push(new THREE.Vector2(x, y))
    }
    perfil.push(new THREE.Vector2(0.136, 1.952))
  }
  perfil.push(
    // el cuello: un tramo recto corto hasta el anillo
    new THREE.Vector2(0.136, 1.975),
    new THREE.Vector2(0.136, 1.979), new THREE.Vector2(0.166, 1.983),
    new THREE.Vector2(0.166, 1.997), new THREE.Vector2(0.136, 2.001),
    new THREE.Vector2(0.134, 2.095),
  )

  const botella = new THREE.Group()

  // PET, no vidrio: el vidrio da brillos finos y nítidos; el plástico, más
  // anchos y suaves. El velo va muy bajo: más alto se veía como halo blanco
  // sobre los colores oscuros (jamaica, frutos rojos).
  const plastico = new THREE.MeshPhysicalMaterial({
    color: 0xeef1f2, metalness: 0, roughness: 0.16,
    transparent: true, opacity: 0.08, side: THREE.DoubleSide,
    clearcoat: 0.35, clearcoatRoughness: 0.22,
    specularIntensity: 0.7, depthWrite: false,
  })
  // Arriba del agua (el aire y el cuello) el plástico se nota más, blanquecino
  // como el PET vacío de verdad: casi invisible dejaba pasar nítidas las letras
  // gigantes del recorrido y la botella parecía cortada. Donde hay agua sigue
  // casi invisible, porque ahí más velo se veía como halo sobre la jamaica.
  plastico.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('void main() {', 'varying float vAltoBotella;\nvoid main() {')
      .replace('#include <project_vertex>', '#include <project_vertex>\n  vAltoBotella = transformed.y;')
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', 'varying float vAltoBotella;\nvoid main() {')
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        float vacio = smoothstep(${(nivel - 0.03).toFixed(3)}, ${(nivel + 0.04).toFixed(3)}, vAltoBotella);
        gl_FragColor.a = mix(gl_FragColor.a, 0.34, vacio);${foto ? `
        // Grosor del PET: de frente casi no se ve; de canto la luz cruza más
        // plástico y la orilla se ve blanca y espesa (fresnel).
        float canto = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.6);
        gl_FragColor.a = max(gl_FragColor.a, canto * 0.55);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.96), canto * 0.35);` : realce ? `
        float canto = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.6);
        gl_FragColor.a = max(gl_FragColor.a, canto * 0.45);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.97), canto * 0.3);` : ''}
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.93, 0.94, 0.95), vacio * 0.55);`)
  }
  botella.add(new THREE.Mesh(new THREE.LatheGeometry(perfil, VUELTAS), plastico))

  // ── El agua que se mueve ─────────────────────────────────────────────────
  // La malla llena la botella entera por dentro y el shader descarta todo lo que
  // queda arriba de la superficie. La superficie vive en el MUNDO: se queda
  // nivelada aunque la botella se incline, se ladea con la inercia cuando la
  // botella acelera o frena, y lleva una ola que crece con el movimiento. La
  // cara de arriba del agua son las caras de atrás de la malla, pintadas de un
  // tono más claro: el truco de siempre para "rellenar" un corte.
  const nivel = forma === 'antes' ? FORMA.NIVEL : forma === 'medida' ? 1.9 : 1.915  // casi hasta el anillo, como en sus fotos
  const perfilAgua = perfil
    .filter((p) => p.y <= 1.96)
    .map((p) => new THREE.Vector2(Math.max(0, p.x - 0.01), Math.max(0.012, p.y)))
  perfilAgua.push(new THREE.Vector2(0, 1.96))
  const uSuperficie = { value: new THREE.Color(0x5a1a2a) }
  const uBrillo = { value: new THREE.Color(0xc4123a) }
  const uNormal = { value: new THREE.Vector3(0, 1, 0) }
  const uCentro = { value: new THREE.Vector3() }
  const uOla = { value: new THREE.Vector3(0, 22, 0) }     // alto, frecuencia, fase
  const uRumbo = { value: new THREE.Vector3(1, 0, 0) }    // hacia dónde corre la ola
  // La pulpa vive DENTRO del shader del agua: por cada pixel se recorre el
  // rayo de la vista adentro del líquido, celda por celda (DDA en 3D), y cada
  // celda puede traer una partícula. Las del fondo salen borrosas y teñidas del
  // agua (absorción), hay más abajo que arriba (se asienta) y, como solo existe
  // donde hay agua, nunca se sale de la botella. Las figuritas sueltas de la
  // primera prueba se veían como confeti.
  const uPulpa = { value: new THREE.Vector4(0, 30, 0.3, 10) }     // densidad, frecuencia, tamaño, absorción
  const uPulpaColor = { value: new THREE.Vector3() }
  const uPulpaColor2 = { value: new THREE.Vector3() }
  const uAguaSRGB = { value: new THREE.Vector3() }
  const uFondo = { value: 0.5 }
  const uForma = { value: 0 }     // 0 = redondita (chía, semilla), 1 = trozo irregular (pulpa)
  const uCamLocal = { value: new THREE.Vector3() }
  const uDeriva = { value: new THREE.Vector3() }
  const uNivelLocal = { value: nivel }
  const uRadioL = { value: R - 0.01 }
  // Puntos repartidos parejo dentro del líquido posible (hasta 1.96) para medir
  // volumen: `llenado` = fracción que queda bajo el nivel con la botella parada.
  const radioEn = (y) => {
    let r = 0
    for (let k = 1; k < perfilAgua.length; k++) {
      const a = perfilAgua[k - 1], b = perfilAgua[k]
      if ((y - a.y) * (y - b.y) <= 0 && a.y !== b.y) r = Math.max(r, a.x + (b.x - a.x) * (y - a.y) / (b.y - a.y))
    }
    return r
  }
  const NMUESTRAS = 1600, muestras = new Float32Array(NMUESTRAS * 3), altos = new Float32Array(NMUESTRAS)
  let rnd = 7, bajo = 0
  const RM = Math.max(...perfilAgua.map((p) => p.x))
  const azar = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647)
  for (let k = 0; k < NMUESTRAS;) {
    const x = (azar() * 2 - 1) * RM, z = (azar() * 2 - 1) * RM, y = 0.012 + azar() * (1.96 - 0.012)
    if (Math.hypot(x, z) > radioEn(y)) continue
    muestras.set([x, y, z], k * 3); if (y < nivel) bajo++; k++
  }
  const llenado = bajo / NMUESTRAS
  const agua = new THREE.MeshPhysicalMaterial({
    color: 0x2e030e, roughness: 0.14, metalness: 0,
    transparent: true, opacity: 1, side: THREE.DoubleSide,
    clearcoat: 1, clearcoatRoughness: 0.03,
  })
  agua.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { uBrillo, uSuperficie, uNormal, uCentro, uOla, uRumbo,
      uPulpa, uPulpaColor, uPulpaColor2, uAguaSRGB, uFondo, uForma, uCamLocal, uDeriva, uNivelLocal, uRadioL })
    sh.vertexShader = sh.vertexShader
      .replace('void main() {', 'varying vec3 vMundo;\nvarying vec3 vLocal;\nvoid main() {')
      .replace('#include <project_vertex>', '#include <project_vertex>\n  vMundo = (modelMatrix * vec4(transformed, 1.0)).xyz;\n  vLocal = transformed;')
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', `varying vec3 vMundo;
        varying vec3 vLocal;
        uniform vec3 uBrillo, uSuperficie, uNormal, uCentro, uOla, uRumbo;
        uniform vec4 uPulpa;
        uniform vec3 uPulpaColor, uPulpaColor2, uAguaSRGB, uCamLocal, uDeriva;
        uniform float uFondo, uForma, uNivelLocal, uRadioL;
        float hash1(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        vec3 hash3(vec3 p) { return vec3(hash1(p), hash1(p + 19.19), hash1(p + 47.47)); }
        vec4 pulpa() {
          vec3 ro = vLocal;
          vec3 rd = normalize(vLocal - uCamLocal);
          float a = dot(rd.xz, rd.xz), b = 2.0 * dot(ro.xz, rd.xz), c = dot(ro.xz, ro.xz) - uRadioL * uRadioL;
          float disc = b * b - 4.0 * a * c;
          float tFin = disc > 0.0 ? (-b + sqrt(disc)) / (2.0 * a) : 0.0;
          tFin = clamp(tFin, 0.0, 0.7) * uPulpa.y;
          vec3 q0 = (ro + uDeriva) * uPulpa.y;
          vec3 celda = floor(q0);
          vec3 paso = sign(rd);
          vec3 tDelta = abs(1.0 / max(abs(rd), vec3(1e-4)));
          vec3 tMax = (paso * (celda - q0) + paso * 0.5 + 0.5) * tDelta;
          vec4 acc = vec4(0.0);
          for (int i = 0; i < 72; i++) {
            vec3 h = hash3(celda);
            if (h.x < uPulpa.x) {
              vec3 centro = celda + 0.2 + 0.6 * hash3(celda + 3.1);
              float tc = dot(centro - q0, rd);
              if (tc > 0.0 && tc < tFin) {
                vec3 punto = q0 + rd * tc;
                float y = punto.y / uPulpa.y - uDeriva.y;
                float r = uPulpa.z * (0.55 + 0.9 * h.z);
                // trozo irregular: girado al azar, aplanado y con la orilla
                // mordida por unas ondas; con uForma = 0 queda redondo
                vec3 v = punto - centro;
                float a1 = h.y * 6.2832, a2 = h.z * 6.2832;
                v.xz = mat2(cos(a1), -sin(a1), sin(a1), cos(a1)) * v.xz;
                v.xy = mat2(cos(a2), -sin(a2), sin(a2), cos(a2)) * v.xy;
                v *= mix(vec3(1.0), vec3(0.85, 1.3, 1.05), uForma);
                float ang = atan(v.y, v.x);
                float mordida = 1.0 + uForma * (0.13 * sin(2.0 * ang + h.x * 40.0)
                  + 0.07 * sin(3.0 * ang + h.y * 31.0) + 0.04 * sin(4.0 * atan(v.z, v.x) + h.z * 23.0));
                float d = length(v) * mordida;
                float m = smoothstep(r, r * mix(0.45, 0.2, uForma), d);
                float alto = clamp(y / uNivelLocal, 0.0, 1.0);
                float peso = clamp(mix(1.0 + uFondo, 1.0 - uFondo * 0.85, alto), 0.0, 2.0);
                float prof = tc / uPulpa.y;
                float atenua = exp(-prof * uPulpa.w);
                float al = m * atenua * peso * 0.85 * step(0.02, y) * step(y, uNivelLocal);
                vec3 col = mix(uPulpaColor, uPulpaColor2, h.y);
                col = mix(col, uAguaSRGB, (1.0 - atenua) * 0.6);
                acc.rgb += (1.0 - acc.a) * al * col;
                acc.a += (1.0 - acc.a) * al;
                if (acc.a > 0.96) break;
              }
            }
            if (min(tMax.x, min(tMax.y, tMax.z)) > tFin) break;
            if (tMax.x < tMax.y && tMax.x < tMax.z) { celda.x += paso.x; tMax.x += tDelta.x; }
            else if (tMax.y < tMax.z) { celda.y += paso.y; tMax.y += tDelta.y; }
            else { celda.z += paso.z; tMax.z += tDelta.z; }
          }
          return acc;
        }
        void main() {
          vec3 rel = vMundo - uCentro;
          float alto = dot(rel, uNormal);
          float lado = dot(rel, uRumbo);
          float ola = uOla.x * (sin(uOla.y * lado + uOla.z) + 0.45 * sin(uOla.y * 2.3 * lado - uOla.z * 1.7));
          if (alto > ola) discard;`)
      .replace('#include <transmission_fragment>', foto
        // El grosor que atraviesa la luz depende de por dónde mires: al centro
        // es el diámetro entero (oscuro), en las orillas casi nada (rubí).
        ? THREE.ShaderChunk.transmission_fragment.replace('material.thickness = thickness;',
          'material.thickness = thickness * clamp(abs(dot(normal, normalize(vViewPosition))), 0.05, 1.0);')
        : '#include <transmission_fragment>')
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        if (gl_FrontFacing && uPulpa.x > 0.0) {
          vec4 pp = pulpa();
          gl_FragColor.rgb = gl_FragColor.rgb * (1.0 - pp.a) + pp.rgb;
          gl_FragColor.a = max(gl_FragColor.a, pp.a);
        }
        if (!gl_FrontFacing) gl_FragColor.rgb = uSuperficie;${realce ? `
        else {
          // La luz que cruza poca agua en las orillas: se ve del color vivo del sabor
          float orilla = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.7);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, uBrillo, orilla * 0.8);
        }` : ''}`)
  }
  botella.add(new THREE.Mesh(new THREE.LatheGeometry(perfilAgua, VUELTAS), agua))

  // La física del chapoteo. Escala: la botella mide ~2.1 unidades = ~20 cm, así
  // que la gravedad en unidades es ~103 u/s². El agua se ladea contra la
  // aceleración (inercia) y regresa con un resorte del periodo de un líquido en
  // un recipiente de 7 cm (~0.5 s), con poca amortiguación: varios vaivenes.
  const G = 103
  const W = (2 * Math.PI) / 0.5
  const ZETA = 0.24          // más amortiguado: con 0.11 se sentía exagerado
  const RESPUESTA = 0.4      // cuánto se ladea por la inercia
  const fis = {
    previo: null, velPrev: new THREE.Vector3(), acel: new THREE.Vector3(),
    ladeo: new THREE.Vector2(), vel: new THREE.Vector2(), fase: 0, ultimo: performance.now(),
  }
  const centroLocal = new THREE.Vector3()
  const punto = new THREE.Vector3()
  function moverAgua() {
    const ahora = performance.now()
    const dt = Math.min(1 / 30, Math.max(1 / 240, (ahora - fis.ultimo) / 1000))
    fis.ultimo = ahora
    botella.updateWorldMatrix(true, false)
    botella.localToWorld(punto.copy(centroLocal.set(0, 1.1, 0)))
    if (!fis.previo) fis.previo = punto.clone()
    const vel = punto.clone().sub(fis.previo).divideScalar(dt)
    fis.previo.copy(punto)
    // aceleración suavizada para que el ruido del scroll no la haga temblar
    fis.acel.lerp(vel.clone().sub(fis.velPrev).divideScalar(dt), 0.35)
    fis.velPrev.copy(vel)
    const meta = new THREE.Vector2(-fis.acel.x / G, -fis.acel.z / G).multiplyScalar(RESPUESTA)
    const empuje = meta.sub(fis.ladeo).multiplyScalar(W * W).sub(fis.vel.clone().multiplyScalar(2 * ZETA * W))
    fis.vel.addScaledVector(empuje, dt)
    fis.ladeo.addScaledVector(fis.vel, dt)
    fis.ladeo.clampLength(0, 0.28)
    // la superficie
    uNormal.value.set(fis.ladeo.x, 1, fis.ladeo.y).normalize()
    // el agua conserva su volumen: la superficie va a la altura (del mundo) que
    // deja abajo la misma fracción de líquido que parada. Antes se anclaba al
    // nivel del cuello y al acostarla o voltearla se quedaba medio vacía.
    const m = botella.matrixWorld.elements
    for (let k = 0; k < NMUESTRAS; k++) altos[k] = m[1] * muestras[k * 3] + m[5] * muestras[k * 3 + 1] + m[9] * muestras[k * 3 + 2] + m[13]
    altos.sort()
    botella.localToWorld(uCentro.value.set(0, 1, 0))
    uCentro.value.y = altos[Math.min(NMUESTRAS - 1, Math.floor(llenado * NMUESTRAS))]
    const energia = Math.min(1, fis.vel.length() * 0.6 + fis.ladeo.length() * 1.5)
    fis.fase += dt * (5 + energia * 4)
    uOla.value.set(0.0015 + energia * 0.007, 22, fis.fase)
    if (fis.ladeo.lengthSq() > 1e-6) uRumbo.value.set(fis.ladeo.x, 0, fis.ladeo.y).normalize()
  }

  // ── La tapa ──────────────────────────────────────────────────────────────
  // Tapa de 28 mm como la de verdad: cuerpo con estrías finas y redondeadas,
  // filo de arriba redondeado con un aro hundido en la cara, y abajo el anillo
  // de seguridad separado por una ranura con sus puentecitos.
  const tapa = new THREE.Group()
  const blanco = new THREE.MeshPhysicalMaterial({
    color: 0xf3f1ed, roughness: 0.32, clearcoat: 0.25, clearcoatRoughness: 0.35, side: THREE.DoubleSide,
    sheen: 0.3, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff),
  })
  const sombraTapa = new THREE.MeshStandardMaterial({ color: 0xc9c5bf, roughness: 0.6 })

  const BASE = 2.003, CORTE = 2.03, ESTRIAS = 2.038, CIMA = 2.145, RT = 0.152

  // Estrías: un cilindro con el radio ondulado. Coseno, no escalón, para que
  // cada estría sea redonda; y se apagan en los dos extremos para fundirse con
  // el filo y con la ranura.
  const N = 96
  const estriasGeo = new THREE.CylinderGeometry(RT, RT, CIMA - ESTRIAS, N * (ligera ? 4 : 8), 6, true)
  const pe = estriasGeo.attributes.position
  const altoE = CIMA - ESTRIAS
  for (let k = 0; k < pe.count; k++) {
    const x = pe.getX(k), y = pe.getY(k), z = pe.getZ(k)
    const ang = Math.atan2(z, x)
    const v = (y + altoE / 2) / altoE                  // 0 abajo, 1 arriba
    const apaga = Math.min(1, v / 0.12, (1 - v) / 0.12)
    const r = RT - 0.0042 * (0.5 - 0.5 * Math.cos(ang * N)) * Math.max(0, apaga)
    pe.setX(k, Math.cos(ang) * r); pe.setZ(k, Math.sin(ang) * r)
  }
  estriasGeo.computeVertexNormals()
  const estrias = new THREE.Mesh(estriasGeo, blanco)
  estrias.position.y = ESTRIAS + altoE / 2
  tapa.add(estrias)

  // La cara de arriba: filo redondeado y un aro hundido.
  const cara = [new THREE.Vector2(RT, CIMA)]
  for (let k = 1; k <= 10; k++) {
    const t = (k / 10) * (Math.PI / 2)
    cara.push(new THREE.Vector2(RT - 0.014 + 0.014 * Math.cos(t), CIMA + 0.014 * Math.sin(t)))
  }
  cara.push(
    new THREE.Vector2(0.122, CIMA + 0.014), new THREE.Vector2(0.118, CIMA + 0.011),
    new THREE.Vector2(0.112, CIMA + 0.011), new THREE.Vector2(0.108, CIMA + 0.013),
    new THREE.Vector2(0, CIMA + 0.013),
  )
  tapa.add(new THREE.Mesh(new THREE.LatheGeometry(cara, VUELTAS), blanco))

  // El anillo de seguridad y la ranura.
  const anillo = [
    new THREE.Vector2(0.142, BASE - 0.002), new THREE.Vector2(0.149, BASE),
    new THREE.Vector2(0.15, BASE + 0.004), new THREE.Vector2(0.15, CORTE - 0.002),
    new THREE.Vector2(0.148, CORTE),
  ]
  tapa.add(new THREE.Mesh(new THREE.LatheGeometry(anillo, VUELTAS), blanco))
  const ranura = new THREE.Mesh(new THREE.CylinderGeometry(0.144, 0.144, ESTRIAS - CORTE, 96, 1, true), sombraTapa)
  ranura.position.y = (CORTE + ESTRIAS) / 2
  tapa.add(ranura)
  for (let k = 0; k < 16; k++) {
    const puente = new THREE.Mesh(new THREE.BoxGeometry(0.012, ESTRIAS - CORTE + 0.002, 0.008), blanco)
    const ang = (k / 16) * Math.PI * 2
    puente.position.set(Math.cos(ang) * 0.147, (CORTE + ESTRIAS) / 2, Math.sin(ang) * 0.147)
    puente.rotation.y = -ang
    tapa.add(puente)
  }
  // El fondo de la tapa por dentro, para que no se vea hueca desde abajo
  const fondoTapa = new THREE.Mesh(new THREE.RingGeometry(0.13, 0.15, 64), blanco)
  fondoTapa.rotation.x = Math.PI / 2
  fondoTapa.position.y = BASE - 0.002
  tapa.add(fondoTapa)
  botella.add(tapa)

  // La etiqueta mide 3:1 (las de nov-2026; antes eran 2:1 a 196°). Con el
  // mismo arco quedaba muy delgadita (Zahir): ahora da más vuelta (270°) para
  // ganar altura sin estirar el arte. 300° = "otro poquitito más ancha".
  const arcoEtq = (300 * Math.PI) / 180
  const altoEtq = (R * arcoEtq) / 3.0
  const etiqueta = new THREE.Mesh(
    new THREE.CylinderGeometry(R + 0.003, R + 0.003, altoEtq, ligera ? 72 : 160, 1, true, -arcoEtq / 2, arcoEtq),
    new THREE.MeshPhysicalMaterial({
      map: null, roughness: foto ? 0.5 : 0.42, clearcoat: foto ? 0.7 : 0.5, clearcoatRoughness: foto ? 0.12 : 0.2,
    }),
  )
  // Justo debajo del hombro, como en sus fotos: el filo de arriba queda a un
  // dedo de donde empieza el domo.
  etiqueta.position.y = forma === 'antes' ? 1.18 : forma === 'medida' ? 1.3 : 1.3
  botella.add(etiqueta)
  // El reverso del papel: visto desde dentro, a través del agua transparente,
  // la etiqueta se ve blanca como en la de verdad. Sin esto, al girar la botella
  // la etiqueta desaparecía detrás del tamarindo o la naranja.
  const reverso = new THREE.Mesh(
    new THREE.CylinderGeometry(R + 0.0025, R + 0.0025, altoEtq, ligera ? 72 : 160, 1, true, -arcoEtq / 2, arcoEtq),
    new THREE.MeshStandardMaterial({ color: 0xf1ece4, roughness: 0.85, side: THREE.BackSide }),
  )
  reverso.position.y = etiqueta.position.y
  botella.add(reverso)

  // Orden fijo de las capas transparentes: agua → plástico → etiqueta. Si se
  // deja al orden automático (por distancia a la cámara), en ciertos ángulos
  // del giro el plástico se pintaba ENCIMA de la etiqueta y deslavaba la
  // botella entera. La etiqueta entra a la pasada transparente solo para poder
  // ir al final; sigue siendo opaca.
  botella.traverse((o) => {
    if (o.material === agua) o.renderOrder = 1
    if (o.material === plastico) o.renderOrder = 2
  })
  etiqueta.material.transparent = true
  etiqueta.renderOrder = 3

  // ── Condensación (2026-11-13) ────────────────────────────────────────────
  // Recién sacada del refri: una piel apenas más grande que la botella (pasa
  // ENCIMA de la etiqueta, como en la vida real) con vaho fino y gotas. Las
  // gotas son lentes: el mapa de normales les da el brillo del estudio en el
  // borde; el vaho es blanco mate y casi transparente. Unas cuantas gotas
  // grandes ya escurrieron y dejaron su caminito limpio. Solo hay frío donde
  // hay agua: se apaga arriba del nivel.
  if (rocio) {
    const t = crearRocio(ligera ? 1024 : 2048, nivel)
    const perfilRocio = perfil.filter((q) => q.y <= nivel + 0.02).map((q) => new THREE.Vector2(q.x + 0.0065, q.y))
    const geo = new THREE.LatheGeometry(perfilRocio, VUELTAS)
    // UV por altura real (no por índice del perfil) para que las gotas no se estiren
    const pos = geo.attributes.position, uv = geo.attributes.uv
    for (let k = 0; k < pos.count; k++) uv.setY(k, pos.getY(k) / 2)
    const piel = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, depthWrite: false, map: t.mapa,
      emissive: 0xffffff, emissiveMap: t.brillo, emissiveIntensity: 0.9,
      normalMap: t.normal, normalScale: new THREE.Vector2(1.6, 1.6),
      roughnessMap: t.rugosidad, roughness: 1, metalness: 0, envMapIntensity: 1.8,
      clearcoat: ligera ? 0 : 0.6, clearcoatRoughness: 0.08,
    }))
    piel.renderOrder = 4
    botella.add(piel)
  }

  // Pone un sabor. `vigente()` permite a quien llama cancelar un pedido viejo
  // si mientras bajaba la etiqueta llegó otro (devuelve false si no se puso).
  async function aplicar(b, vigente = () => true) {
    let mapa
    try { mapa = await texturaDe(b.etq) } catch { return false }
    if (!vigente()) return false
    etiqueta.material.map = mapa
    etiqueta.material.needsUpdate = true
    agua.color.setHex(b.agua)
    uBrillo.value.setHex(b.luz ?? b.brillo ?? b.agua)
    blanco.color.setHex(b.tapa ?? blancoTapa)
    sombraTapa.color.setHex(b.tapa ?? blancoTapa).multiplyScalar(0.82)
    // la superficie: el mismo color, un poco más claro
    uSuperficie.value.setHex(b.agua).lerp(new THREE.Color(0xffffff), b.lechosa ? 0.12 : 0.22)
    // El brillo lo pone el plástico: el agua va satinada, no espejo
    agua.roughness = b.lechosa ? 0.3 : 0.14
    agua.clearcoat = ligera ? 0 : b.lechosa ? 0.15 : 0.3
    agua.clearcoatRoughness = 0.25
    // Las que dejan pasar la luz: apenas se alcanza a ver a través de ellas.
    // Antes se multiplicaba por 0.8 y quedaban al ~58%: se veían como vidrio
    // teñido, con la mancha y los dibujos de atrás nítidos.
    agua.opacity = b.opacidad ?? 1
    agua.depthWrite = !b.opacidad
    if (foto && !b.lechosa) {
      // Luz que atraviesa: blanco + absorción del color del sabor. Lo grueso
      // (el centro) se ve oscuro; lo delgado (orillas, hombro) brilla.
      agua.transparent = false
      agua.opacity = 1
      agua.depthWrite = true
      agua.color.setHex(0xffffff)
      agua.transmission = 1
      agua.ior = 1.34
      agua.thickness = 0.62
      agua.roughness = 0.04
      agua.clearcoat = 0
      agua.attenuationColor.setHex(b.luz ?? b.brillo ?? b.agua)
      agua.attenuationDistance = b.absorcion ?? 0.2
      agua.specularIntensity = 0.3
    }
    agua.needsUpdate = true
    receta = b
    ponerPulpa()
    return true
  }
  let receta = null
  let conPulpa = true
  function ponerPulpa() {
    const p = receta?.pulpa
    if (p && conPulpa) {
      uPulpa.value.set(p.dens, p.frec, p.tam, p.absor)
      aSRGB(p.color, uPulpaColor.value)
      aSRGB(p.color2, uPulpaColor2.value)
      aSRGB(receta.agua, uAguaSRGB.value)
      uFondo.value = p.fondo
      uForma.value = p.forma ?? 0
    } else {
      uPulpa.value.x = 0
    }
  }

  // Cada cuadro: el agua (física) y la pulpa (cámara en coordenadas de la
  // botella y una deriva lenta).
  const camLocal = new THREE.Vector3()
  function cuadro(t, camera) {
    moverAgua()
    uCamLocal.value.copy(botella.worldToLocal(camLocal.copy(camera.position)))
    uDeriva.value.set(fis.ladeo.x * 0.04, Math.sin(t * 0.35) * 0.008, fis.ladeo.y * 0.04)
  }

  // En la versión ligera (celular) fuera el barniz (clearcoat) y el brillo de
  // tela (sheen): son lo más caro del material y en pantalla chica casi no se
  // notan. Con ellos un iPhone se sentía trabado.
  if (ligera) {
    botella.traverse((o) => {
      const m = o.material
      if (m?.isMeshPhysicalMaterial) { m.clearcoat = 0; m.sheen = 0 }
    })
  }

  return {
    botella,
    aplicar,
    cuadro,
    // La pulpa es lo más caro de dibujar: en el refri solo la lleva la
    // botella que sale al frente.
    pulpa(si) { conPulpa = si; ponerPulpa() },
    // Tocar una botella le da un empujón al agua (para sacudirla)
    empujar(x, z = 0) { fis.vel.x += x; fis.vel.y += z },
  }
}


// Texturas de la condensación, hechas a mano en un canvas (sin imágenes).
// Altura de cada gota = media esfera; de ahí salen las normales. Canal verde =
// lo que lee three en alphaMap y roughnessMap.
function crearRocio(N, nivel) {
  let semilla = 91
  const r = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647)
  const alto = new Float32Array(N * N)     // altura de las gotas
  const limpio = new Float32Array(N * N)   // 1 = caminito sin vaho
  const s = N / 2048
  const gota = (cx, cy, rad, estira = 1) => {
    const rx = rad, ry = rad * estira
    for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(N - 1, Math.ceil(cy + ry)); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x - cx) / rx, dy = (y - cy) / ry
        // más panzona abajo, como gota que cuelga
        const d = dx * dx * (dy > 0 ? 0.85 : 1.1) + dy * dy
        if (d >= 1) continue
        const i = y * N + ((x % N) + N) % N
        const h = Math.sqrt(1 - d) * rad
        if (h > alto[i]) alto[i] = h
      }
    }
  }
  // escurridos: bajan zigzagueando, limpian el vaho y acaban en una gota gorda
  for (let k = 0; k < 14; k++) {
    let x = r() * N, y = r() * N * 0.5
    const largo = (0.15 + r() * 0.35) * N, ancho = (3 + r() * 3) * s
    for (let paso = 0; paso < largo && y < N - 2; paso++) {
      x += (r() - 0.5) * 1.6; y += 1
      for (let dx = -ancho; dx <= ancho; dx++) limpio[Math.floor(y) * N + (((Math.floor(x + dx)) % N) + N) % N] = 1
    }
    gota(x, y, (9 + r() * 7) * s, 1.35)
  }
  for (let k = 0; k < 190; k++) gota(r() * N, r() * N, (9 + r() * 11) * s, 1.15 + r() * 0.25)  // grandes
  for (let k = 0; k < 1800; k++) gota(r() * N, r() * N, (3 + r() * 4) * s)                      // medianas
  for (let k = 0; k < 5000; k++) gota(r() * N, r() * N, (1.2 + r() * 1.4) * s)                  // gotitas finas
  const lienzo = (f) => {
    const c = document.createElement('canvas'); c.width = c.height = N
    const g = c.getContext('2d'), img = g.createImageData(N, N)
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) f(x, y, img.data, (y * N + x) * 4)
    g.putImageData(img, 0, 0)
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping; tex.anisotropy = 4
    return tex
  }
  // y del canvas → altura en la botella (fila 0 = arriba = 2.0)
  const frio = (y) => { const h = 2 * (1 - y / N); return Math.min(1, Math.max(0, (nivel - 0.04 - h) / 0.12)) }
  // normales una vez; de ellas salen el brillo y el borde de cada gota
  const NX = new Float32Array(N * N), NY = new Float32Array(N * N), NZ = new Float32Array(N * N)
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = y * N + x
    const hx = alto[y * N + (x + 1) % N] - alto[y * N + (x - 1 + N) % N]
    const hy = alto[Math.min(N - 1, y + 1) * N + x] - alto[Math.max(0, y - 1) * N + x]
    let nx = -hx * 0.7, ny = hy * 0.7, nz = 1
    const l = Math.hypot(nx, ny, nz); NX[i] = nx / l; NY[i] = ny / l; NZ[i] = nz / l
  }
  const L = [-0.45, 0.55, 0.7]   // luz arriba a la izquierda, hacia la cámara
  const normal = lienzo((x, y, d, o) => {
    const i = y * N + x
    d[o] = (NX[i] * 0.5 + 0.5) * 255; d[o + 1] = (NY[i] * 0.5 + 0.5) * 255; d[o + 2] = (NZ[i] * 0.5 + 0.5) * 255; d[o + 3] = 255
  })
  // color + transparencia: vaho blanco parejo y fino; en la gota el centro es
  // clarito (deja ver el agua), el borde oscurece (refracta) y el brillo es blanco
  const mapa = lienzo((x, y, d, o) => {
    const i = y * N + x, f = frio(y)
    let c = 255, a
    if (alto[i] > 0) {
      const borde = 1 - NZ[i]                          // 0 centro → ~1 orilla
      const brillo = Math.pow(Math.max(0, NX[i] * L[0] + NY[i] * L[1] + NZ[i] * L[2]), 60)
      // la luz que atraviesa la gota se junta abajo, del lado contrario al brillo
      const cauce = Math.pow(Math.max(0, -NX[i] * L[0] - NY[i] * L[1] + NZ[i] * 0.55), 18) * 0.55
      c = 255 * Math.min(1, 0.12 + cauce + brillo * 2.2)
      a = Math.min(0.95, 0.22 + borde * 0.38 + cauce * 0.5 + brillo)
    } else a = limpio[i] ? 0.02 : 0.1
    d[o] = d[o + 1] = d[o + 2] = c; d[o + 3] = a * f * 255
  })
  const brillo = lienzo((x, y, d, o) => {
    const i = y * N + x
    const b = alto[i] > 0 ? Math.pow(Math.max(0, NX[i] * L[0] + NY[i] * L[1] + NZ[i] * L[2]), 80) * frio(y) : 0
    d[o] = d[o + 1] = d[o + 2] = Math.min(255, b * 255); d[o + 3] = 255
  })
  const rugosidad = lienzo((x, y, d, o) => {
    const v = alto[y * N + x] > 0 ? 0.03 : 0.7
    d[o] = d[o + 1] = d[o + 2] = v * 255; d[o + 3] = 255
  })
  return { normal, mapa, brillo, rugosidad }
}
