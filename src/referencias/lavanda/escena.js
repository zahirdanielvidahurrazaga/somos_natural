import * as THREE from 'three'
import { ALTO_BOTELLA, armarBotella, crearTexturas, colorFiel, estudioProducto } from '../../botella/modelo'

// La botella de la versión Lavanda: UNA botella en UN lienzo fijo y
// transparente. La página le dice cada cuadro dónde va EN PIXELES (centro de la
// etiqueta, alto de la botella), cuánto gira y se ladea; aquí se traduce a
// mundo. Así puede caer exactamente encima de la botella del video.

export const ETIQUETA_Y = 1.3 // centro de la etiqueta, desde la base (forma nueva)

export function crearEscena(canvas, { movil = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  let dpr = Math.min(devicePixelRatio, movil ? 2 : 1.75)
  renderer.setPixelRatio(dpr)
  // Color fiel (Khronos PBR Neutral) desde el 20-nov-2026; antes ACES
  colorFiel(renderer)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  // Luz de foto de producto (cajas de luz en código, 20-nov-2026). Antes: la
  // foto 360° studio_small_09.hdr de Poly Haven, que ya no se descarga.
  scene.environment = estudioProducto(renderer)
  scene.environmentIntensity = 1
  const hdrListo = Promise.resolve()
  const luz = new THREE.DirectionalLight(0xfff4ec, 0.35) // la luz fuerte la dan las cajas
  luz.position.set(-3, 5, 4)
  scene.add(luz)

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60)
  camera.position.set(0, 0, 9)

  const texturaDe = crearTexturas(renderer)
  // condensa: gotas de frío (solo compu; en celular Nosotros usa la foto plana)
  // 22-nov (Zahir: "va fluido en mi iPhone"): en celular va completa con pulpa; la
  // versión ligera solo en teléfonos modestos. El sudor sigue solo en compu (él
  // prefirió que en celular la botella dé las vueltas).
  const lento = movil && ((navigator.deviceMemory || 8) < 4 || (navigator.hardwareConcurrency || 8) < 6)
  const modelo = armarBotella({ texturaDe, ligera: lento, realce: true, condensa: false })  // 22-nov: sin sudor (Zahir); el código queda apagado en modelo.js
  if (lento) modelo.pulpa(false)
  // Agua viva (20-nov-2026): la luz cruza el líquido + menisco
  modelo.agua(true)
  const giro = new THREE.Group()
  // Orden: primero gira sobre su eje (Y), luego se inclina hacia la cámara (X),
  // al final se ladea (Z). Con el orden normal, al acostarla el cabeceo solo la
  // hacía girar sobre su propio eje.
  giro.rotation.order = 'ZXY'
  giro.add(modelo.botella)
  modelo.botella.position.y = -ETIQUETA_Y // el origen del grupo = centro de la etiqueta
  const lugar = new THREE.Group()
  lugar.add(giro)
  scene.add(lugar)

  let vw = 0, vh = 0, mundoPorPx = 1
  function medir() {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (w === vw && h === vh) return
    vw = w; vh = h
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    mundoPorPx = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / h
  }

  // Pose: x, y = pixel del centro de la etiqueta; alto = pixeles de la botella
  function poner({ x, y, alto, giroY = 0, ladeo = 0, cabeceo = 0, voltea = 0 }) {
    medir()
    lugar.position.set((x - vw / 2) * mundoPorPx, (vh / 2 - y) * mundoPorPx, 0)
    lugar.scale.setScalar((alto * mundoPorPx) / ALTO_BOTELLA)
    giro.rotation.set(cabeceo, giroY, ladeo)
    // voltea: gira TODO el movimiento sobre la vertical, para que la maroma
    // corra en diagonal y nunca apunte de frente a la cámara (se veía un disco)
    lugar.rotation.y = voltea
  }

  // Sabor: si cambia, se aplica cuando la etiqueta está de espaldas (quien
  // llama hace girar la botella); aquí solo se carga.
  let actual = null
  function sabor(receta) {
    if (!receta || receta === actual) return
    actual = receta
    modelo.aplicar(receta, () => actual === receta)
  }

  // Calidad automática (igual que el motor del sitio): si va lento, baja la resolución
  // 22-nov (Zahir: "en mi cel baja la calidad de la etiqueta en algunas partes"):
  // antes bastaban 45 cuadros lentos (los de la carga de texturas o un scroll
  // brusco) para bajar la resolución PARA SIEMPRE. Ahora: no mide los primeros 4 s
  // ni los saltos sueltos (> 120 ms = pausa, no lentitud), baja solo si van DOS
  // tandas lentas seguidas, en celular no baja de 1.5 y vuelve a SUBIR si va fluido.
  const tiempos = []
  const dprMax = dpr, dprMin = movil ? 1.5 : 1.25, arranque = performance.now()
  let previo = performance.now(), lentas = 0, rapidas = 0
  function dibujar() {
    const ahora = performance.now()
    const dt = ahora - previo; previo = ahora
    if (ahora - arranque > 4000 && dt < 120 && !document.hidden) tiempos.push(dt)
    if (tiempos.length >= 60) {
      const prom = tiempos.reduce((a, b) => a + b, 0) / tiempos.length
      tiempos.length = 0
      lentas = prom > 24 ? lentas + 1 : 0
      // < 18 ms: a 60 Hz un cuadro fluido dura ~16.7 ms (con < 15 nunca subía; Codex)
      rapidas = prom < 18 ? rapidas + 1 : 0
      if (lentas >= 2 && dpr > dprMin) { dpr = Math.max(dprMin, dpr - 0.25); renderer.setPixelRatio(dpr); vw = 0; lentas = 0 }
      else if (rapidas >= 3 && dpr < dprMax) { dpr = Math.min(dprMax, dpr + 0.25); renderer.setPixelRatio(dpr); vw = 0; rapidas = 0 }
    }
    modelo.cuadro(ahora / 1000, camera)
    renderer.render(scene, camera)
  }

  // Carga de antemano las etiquetas (si no, la primera vez sale en blanco)
  const precargar = (recetas) => recetas.forEach((b) => texturaDe(b.etq).catch(() => {}))

  // Lista para mostrarse: la luz del estudio y la etiqueta del primer sabor ya
  // cargaron (la pantalla de carga espera esto para no destapar una botella
  // en blanco o con la luz inventada)
  const listo = (etq) => Promise.all([hdrListo, texturaDe(etq).catch(() => {})])

  // fondo: el color de la página detrás de la botella (#RRGGBB), lo que se ve
  // a través del agua en las orillas
  // Dónde cae la TAPA en el lienzo (px) y hacia dónde apunta la botella
  // (ángulo en pantalla desde la vertical): para sentar a la gotita en ella.
  const vTapa = new THREE.Vector3(), vAbajo = new THREE.Vector3()
  function tapa() {
    modelo.botella.updateWorldMatrix(true, false)
    modelo.botella.localToWorld(vTapa.set(0, 2.145, 0)).project(camera)
    modelo.botella.localToWorld(vAbajo.set(0, 1.6, 0)).project(camera)
    const px = (v) => [(v.x + 1) / 2 * vw, (1 - v.y) / 2 * vh]
    const [x, y] = px(vTapa), [x2, y2] = px(vAbajo)
    return { x, y, ang: Math.atan2(x - x2, y2 - y), escala: lugar.scale.x / mundoPorPx }
  }
  const fondo = (css) => modelo.fondo(parseInt(String(css).replace('#', ''), 16))
  return { poner, sabor, dibujar, medir, precargar, listo, fondo, tapa, lleno: modelo.lleno, frio: modelo.frio, empujar: modelo.empujar }
}
