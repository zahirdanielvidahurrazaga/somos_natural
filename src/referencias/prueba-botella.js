import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { ALTO_BOTELLA, armarBotella, crearTexturas, estudioDe } from '../botella/modelo'
import { lista } from './comun'
import { mundos } from './marca/datos'

// ─────────────────────────────────────────────────────────────────────────────
// PRUEBA (20-nov-2026): la botella de HOY junto a la PROPUESTA, girando juntas,
// para que Zahir decida con sus ojos. Solo desarrollo; el sitio no la carga.
// Las tres mejoras baratas de la investigación, cada una con su interruptor:
//   1. Color fiel: Khronos PBR Neutral (hecho para comercio en línea: respeta el
//      color de la etiqueta) en vez de ACES, que lava y corre los rojos.
//   2. Luz de estudio: cajas de luz altas y angostas (los reflejos verticales de
//      la foto de producto de bebidas) en vez de la foto 360° de un estudio.
//   3. Etiqueta de vinil: barniz brillante, grano de papel y orilla con filo
//      que agarra la luz, en vez de una calcomanía perfecta.
// Lo de "Hoy" es EXACTAMENTE lo del sitio (lavanda/escena.js).
// ─────────────────────────────────────────────────────────────────────────────

// Khronos PBR Neutral como tone mapping "Custom" (three r160 aún no lo trae;
// llegó como NeutralToneMapping en versiones posteriores). Fórmula de la spec.
THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
  'vec3 CustomToneMapping( vec3 color ) { return color; }',
  `vec3 CustomToneMapping( vec3 color ) {
    color *= toneMappingExposure;
    const float StartCompression = 0.8 - 0.04;
    const float Desaturation = 0.15;
    float x = min( color.r, min( color.g, color.b ) );
    float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
    color -= offset;
    float peak = max( color.r, max( color.g, color.b ) );
    if ( peak < StartCompression ) return color;
    const float d = 1. - StartCompression;
    float newPeak = 1. - d * d / ( peak + d - StartCompression );
    color *= newPeak / peak;
    float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
    return mix( color, vec3( newPeak ), g );
  }`,
)

const movil = matchMedia('(max-width: 700px)').matches

// La luz de foto de producto: cuarto oscuro, una caja ALTA y ancha de luz
// principal a la izquierda, dos tiras angostas atrás a los lados (recortan la
// silueta con una línea de luz), una arriba y un relleno bajo de frente para la
// etiqueta.
function estudioProducto(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const cuarto = new THREE.Scene()
  cuarto.add(new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 16),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.16, 0.15, 0.15), side: THREE.BackSide }),
  ))
  const caja = (w, h, brillo, x, y, z, tibio = 1) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(brillo, brillo * (0.98 + 0.02 * tibio), brillo * (0.93 + 0.07 * tibio)), side: THREE.DoubleSide }))
    m.position.set(x, y, z); m.lookAt(0, y, 0)
    cuarto.add(m)
  }
  caja(2.2, 14, 7, -5, 0.5, 3)        // principal, izquierda al frente
  caja(0.5, 14, 9, 5.2, 0.5, -1.2)    // tira de contorno, derecha atrás
  caja(0.4, 14, 6, -4.6, 0.5, -3)     // tira de contorno, izquierda atrás
  caja(5, 2.4, 4, 0, 8, 0)            // arriba
  caja(9, 2.5, 0.9, 0, -1.5, 7)       // relleno bajo de frente (la etiqueta)
  const env = pmrem.fromScene(cuarto, 0.015).texture
  pmrem.dispose()
  return env
}

// Texturas del vinil hechas en canvas: grano fino de papel + el filo de arriba
// y abajo (la normal se inclina en la orilla y ahí se prende una línea de luz).
function texturasVinil() {
  const W = 1536, H = 512, FILO = 7
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const r = document.createElement('canvas'); r.width = W; r.height = H
  const g = c.getContext('2d'), gr = r.getContext('2d')
  const n = g.createImageData(W, H), rr = gr.createImageData(W, H)
  let s = 7
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const ruido = new Float32Array(W * H).map(() => rnd())
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x
    // grano: diferencia con el vecino = una pendiente chiquita
    const gx = (ruido[i] - ruido[y * W + ((x + 1) % W)]) * 0.18
    const gy = (ruido[i] - ruido[Math.min(H - 1, y + 1) * W + x]) * 0.18
    let ny = gy
    if (y < FILO) ny += 0.85 * (1 - y / FILO)                 // filo de arriba (v=1 → fila 0)
    if (y > H - 1 - FILO) ny -= 0.85 * (1 - (H - 1 - y) / FILO)
    const l = Math.hypot(gx, ny, 1)
    const o = i * 4
    n.data[o] = (gx / l * 0.5 + 0.5) * 255
    n.data[o + 1] = (ny / l * 0.5 + 0.5) * 255
    n.data[o + 2] = (1 / l * 0.5 + 0.5) * 255
    n.data[o + 3] = 255
    const rug = 0.22 + ruido[i] * 0.1 + (y < FILO || y > H - 1 - FILO ? 0.15 : 0)
    rr.data[o] = rr.data[o + 1] = rr.data[o + 2] = rug * 255; rr.data[o + 3] = 255
  }
  g.putImageData(n, 0, 0); gr.putImageData(rr, 0, 0)
  const normal = new THREE.CanvasTexture(c), rugosidad = new THREE.CanvasTexture(r)
  for (const t of [normal, rugosidad]) { t.anisotropy = 8; t.needsUpdate = true }
  return { normal, rugosidad }
}

function escena(nodo, { propuesta }) {
  const canvas = document.createElement('canvas')
  nodo.append(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, movil ? 2 : 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.environment = estudioDe(renderer)
  scene.environmentIntensity = 0.95
  let hdri = null
  const hdrListo = new RGBELoader().loadAsync('/hdri/studio_small_09.hdr').then((hdr) => {
    const pmrem = new THREE.PMREMGenerator(renderer)
    hdri = pmrem.fromEquirectangular(hdr).texture
    hdr.dispose(); pmrem.dispose()
    if (!propuesta || !estado.luz) scene.environment = hdri
  }).catch(() => {})
  const luz = new THREE.DirectionalLight(0xfff4ec, 0.7)
  luz.position.set(-3, 5, 4)
  scene.add(luz)

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60)
  camera.position.set(0, 0, 9)
  const texturaDe = crearTexturas(renderer)
  const modelo = armarBotella({ texturaDe, ligera: movil, realce: true })
  if (movil) modelo.pulpa(false)
  const giro = new THREE.Group()
  giro.add(modelo.botella)
  modelo.botella.position.y = -ALTO_BOTELLA / 2
  scene.add(giro)

  // La etiqueta: la única con renderOrder 3 (ver modelo.js)
  let etiqueta = null
  modelo.botella.traverse((o) => { if (o.renderOrder === 3 && o.material?.isMeshPhysicalMaterial) etiqueta = o })
  const original = etiqueta && {
    roughness: etiqueta.material.roughness, clearcoat: etiqueta.material.clearcoat,
    clearcoatRoughness: etiqueta.material.clearcoatRoughness, specularIntensity: etiqueta.material.specularIntensity,
  }
  const productoEnv = propuesta ? estudioProducto(renderer) : null
  const vinil = propuesta ? texturasVinil() : null

  function aplicarEstado() {
    if (!propuesta) return
    renderer.toneMapping = estado.color ? THREE.CustomToneMapping : THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = estado.expo
    scene.environment = estado.luz ? productoEnv : (hdri ?? scene.environment)
    scene.environmentIntensity = estado.luz ? 1 : 0.95
    luz.intensity = estado.luz ? 0.35 : 0.7
    if (etiqueta) {
      const m = etiqueta.material
      if (estado.etq) {
        Object.assign(m, { roughness: 1, clearcoat: 1, clearcoatRoughness: 0.07, specularIntensity: 1 })
        m.roughnessMap = vinil.rugosidad; m.normalMap = vinil.normal
        m.normalScale.set(0.6, 0.6)
      } else {
        Object.assign(m, original)
        m.roughnessMap = null; m.normalMap = null
      }
      m.needsUpdate = true
    }
  }

  function dibujar(angulo, t) {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (canvas.width !== Math.round(w * renderer.getPixelRatio()) || canvas.height !== Math.round(h * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    // la botella ocupa el 84% del alto, como en el hero
    const mundoAlto = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    giro.scale.setScalar((mundoAlto * 0.84) / ALTO_BOTELLA)
    giro.rotation.set(0, angulo, -0.06)
    modelo.cuadro(t, camera)
    renderer.render(scene, camera)
  }

  return { dibujar, aplicarEstado, sabor: (b) => modelo.aplicar(b), listo: hdrListo }
}

const estado = { color: true, luz: true, etq: true, gira: true, expo: 1 }
const antes = escena(document.getElementById('antes'), { propuesta: false })
const despues = escena(document.getElementById('despues'), { propuesta: true })
despues.aplicarEstado()
despues.listo.then(() => despues.aplicarEstado())

let i = 0
function sabor(k) {
  i = (k + lista.length) % lista.length
  const s = lista[i], [f, t] = mundos[s.etq] ?? ['#C0D6FF', '#6D0101']
  document.documentElement.style.setProperty('--f', f)
  document.documentElement.style.setProperty('--t', t)
  document.getElementById('nombre').textContent = s.nombre
  antes.sabor(s.botella); despues.sabor(s.botella)
}
document.getElementById('prev').onclick = () => sabor(i - 1)
document.getElementById('next').onclick = () => sabor(i + 1)
addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') sabor(i - 1); if (e.key === 'ArrowRight') sabor(i + 1) })
for (const k of ['color', 'luz', 'etq', 'gira']) {
  document.getElementById(`t-${k}`).onchange = (e) => { estado[k] = e.target.checked; despues.aplicarEstado() }
}
document.getElementById('expo').oninput = (e) => { estado.expo = +e.target.value; despues.aplicarEstado() }
sabor(0)

// Arrastrar cualquiera de los dos gira a los dos (con inercia)
let angulo = 0.25, vel = 0, x0 = null  // (la captura los fija)
for (const n of document.querySelectorAll('.lado')) {
  n.addEventListener('pointerdown', (e) => { x0 = e.clientX; n.setPointerCapture(e.pointerId) })
  n.addEventListener('pointermove', (e) => { if (x0 === null) return; const d = (e.clientX - x0) * 0.01; angulo += d; vel = d; x0 = e.clientX })
  n.addEventListener('pointerup', () => { x0 = null })
}
let previo = performance.now()
function bucle(ahora) {
  const dt = Math.min(0.05, (ahora - previo) / 1000); previo = ahora
  if (x0 === null) { angulo += vel; vel *= 0.94; if (estado.gira && Math.abs(vel) < 0.002) angulo += dt * 0.45 }
  antes.dibujar(angulo, ahora / 1000)
  despues.dibujar(angulo, ahora / 1000)
  requestAnimationFrame(bucle)
}
requestAnimationFrame(bucle)

// ?captura: guarda unas capturas en public/referencias/prueba/ (solo desarrollo,
// por el middleware /__guardar) para revisar sin tener que mirar la pantalla.
if (new URLSearchParams(location.search).has('captura')) {
  const espera = (ms) => new Promise((ok) => setTimeout(ok, ms))
  const guardar = (canvas, nombre) => new Promise((ok) => canvas.toBlob((b) => fetch(`/__guardar?carpeta=prueba&nombre=${nombre}`, { method: 'POST', body: b }).then(ok), 'image/png'))
  ;(async () => {
    estado.gira = false; angulo = 0.15
    await Promise.all([antes.listo, despues.listo]); await espera(1500)
    for (const etq of ['jamaica', 'sandia', 'mango', 'chocolate', 'horchata']) {
      sabor(lista.findIndex((s) => s.etq === etq)); await espera(900)
      antes.dibujar(angulo, performance.now() / 1000)
      const [ca, cd] = document.querySelectorAll('.lado canvas')
      const a = guardar(ca, `${etq}-antes`)
      despues.dibujar(angulo, performance.now() / 1000)
      await Promise.all([a, guardar(cd, `${etq}-despues`)])
    }
    document.title = 'CAPTURAS LISTAS'
  })()
}
