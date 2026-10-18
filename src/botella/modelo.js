import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// La botella como pieza: geometría, materiales, agua con física y pulpa. No
// tiene cámara ni lienzo; la usan el motor del sitio (una botella que sigue
// sus huecos) y los prototipos (el configurador, el refri con 14 botellas).
// Todo lo que se decidió con Zahir sobre la botella vive aquí (ver CLAUDE.md,
// "La botella 3D").
// ─────────────────────────────────────────────────────────────────────────────

export const ALTO_BOTELLA = 2.16   // de la base a la tapa, en unidades

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
        // Recorta el filo negro que traen varios artes
        t.offset.set(0.012, 0.02)
        t.repeat.set(0.976, 0.96)
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
export function armarBotella({ texturaDe, ligera = false }) {
  const VUELTAS = ligera ? 56 : 128
  // ── La botella ───────────────────────────────────────────────────────────
  // Boston round de 500 ml: cuerpo recto y liso, hombro en domo, cuello corto
  // con su anillo y tapa de 28 mm. Medidas de catálogo (proporciones sacadas de sus
  // fotos: esbelta, unas 3.5 veces más alta que ancha, con el hombro largo.
  const R = 0.32
  const HOMBRO = 1.5          // donde termina lo recto
  const CUELLO = 0.142        // radio del cuello en la base del domo
  const DOMO = 0.4            // alto del hombro: en sus fotos es largo y suave
  const perfil = [new THREE.Vector2(0, 0.004)]
  // fondo con un redondeo chico
  for (let k = 0; k <= 6; k++) {
    const t = (k / 6) * (Math.PI / 2)
    perfil.push(new THREE.Vector2(R - 0.04 + 0.04 * Math.sin(t), 0.04 - 0.04 * Math.cos(t)))
  }
  // el domo del hombro: un cuarto de elipse
  for (let k = 0; k <= 24; k++) {
    const t = (k / 24) * (Math.PI / 2)
    perfil.push(new THREE.Vector2(CUELLO + (R - CUELLO) * Math.cos(t), HOMBRO + DOMO * Math.sin(t)))
  }
  perfil.push(
    // el cuello: un tramo recto entre el domo y el anillo, como en sus fotos
    new THREE.Vector2(0.138, 1.92), new THREE.Vector2(0.136, 1.94),
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
        float vacio = smoothstep(1.8, 1.87, vAltoBotella);
        gl_FragColor.a = mix(gl_FragColor.a, 0.34, vacio);
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
  const nivel = 1.83  // casi hasta el cuello, como en sus fotos
  const perfilAgua = perfil
    .filter((p) => p.y <= 1.96)
    .map((p) => new THREE.Vector2(Math.max(0, p.x - 0.01), Math.max(0.012, p.y)))
  perfilAgua.push(new THREE.Vector2(0, 1.96))
  const uSuperficie = { value: new THREE.Color(0x5a1a2a) }
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
  const agua = new THREE.MeshPhysicalMaterial({
    color: 0x2e030e, roughness: 0.14, metalness: 0,
    transparent: true, opacity: 1, side: THREE.DoubleSide,
    clearcoat: 1, clearcoatRoughness: 0.03,
  })
  agua.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { uSuperficie, uNormal, uCentro, uOla, uRumbo,
      uPulpa, uPulpaColor, uPulpaColor2, uAguaSRGB, uFondo, uForma, uCamLocal, uDeriva, uNivelLocal, uRadioL })
    sh.vertexShader = sh.vertexShader
      .replace('void main() {', 'varying vec3 vMundo;\nvarying vec3 vLocal;\nvoid main() {')
      .replace('#include <project_vertex>', '#include <project_vertex>\n  vMundo = (modelMatrix * vec4(transformed, 1.0)).xyz;\n  vLocal = transformed;')
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', `varying vec3 vMundo;
        varying vec3 vLocal;
        uniform vec3 uSuperficie, uNormal, uCentro, uOla, uRumbo;
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
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        if (gl_FrontFacing && uPulpa.x > 0.0) {
          vec4 pp = pulpa();
          gl_FragColor.rgb = gl_FragColor.rgb * (1.0 - pp.a) + pp.rgb;
          gl_FragColor.a = max(gl_FragColor.a, pp.a);
        }
        if (!gl_FrontFacing) gl_FragColor.rgb = uSuperficie;`)
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
    botella.localToWorld(uCentro.value.set(0, nivel, 0))
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

  const arcoEtq = (196 * Math.PI) / 180
  const altoEtq = (R * arcoEtq) / 2.0
  const etiqueta = new THREE.Mesh(
    new THREE.CylinderGeometry(R + 0.003, R + 0.003, altoEtq, ligera ? 72 : 160, 1, true, -arcoEtq / 2, arcoEtq),
    new THREE.MeshPhysicalMaterial({
      map: null, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.2,
    }),
  )
  // Justo debajo del hombro, como en sus fotos: el filo de arriba queda a un
  // dedo de donde empieza el domo.
  etiqueta.position.y = 1.18
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

  // Pone un sabor. `vigente()` permite a quien llama cancelar un pedido viejo
  // si mientras bajaba la etiqueta llegó otro (devuelve false si no se puso).
  async function aplicar(b, vigente = () => true) {
    let mapa
    try { mapa = await texturaDe(b.etq) } catch { return false }
    if (!vigente()) return false
    etiqueta.material.map = mapa
    etiqueta.material.needsUpdate = true
    agua.color.setHex(b.agua)
    blanco.color.setHex(b.tapa ?? blancoTapa)
    sombraTapa.color.setHex(b.tapa ?? blancoTapa).multiplyScalar(0.82)
    // la superficie: el mismo color, un poco más claro
    uSuperficie.value.setHex(b.agua).lerp(new THREE.Color(0xffffff), b.lechosa ? 0.12 : 0.22)
    // El brillo lo pone el plástico: el agua va satinada, no espejo
    agua.roughness = b.lechosa ? 0.3 : 0.14
    agua.clearcoat = b.lechosa ? 0.15 : 0.3
    agua.clearcoatRoughness = 0.25
    // Las que dejan pasar la luz: apenas se alcanza a ver a través de ellas.
    // Antes se multiplicaba por 0.8 y quedaban al ~58%: se veían como vidrio
    // teñido, con la mancha y los dibujos de atrás nítidos.
    agua.opacity = b.opacidad ?? 1
    agua.depthWrite = !b.opacidad
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
