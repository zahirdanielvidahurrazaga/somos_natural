import * as THREE from 'three'
import { ALTO_BOTELLA, armarBotella, crearTexturas, colorFiel, estudioProducto } from '../botella/modelo'
import { lista } from './comun'
import { mundos } from './marca/datos'

// ─────────────────────────────────────────────────────────────────────────────
// PRUEBA de la botella: la de HOY (igual que el sitio, lavanda/escena.js) junto a
// la PROPUESTA, girando juntas, para que Zahir decida con sus ojos. Solo
// desarrollo; el sitio no la carga.
//   Ronda 1 (20-nov-2026, APROBADA y publicada): color fiel, luz de estudio,
//   etiqueta de vinil → ya viven en modelo.js, así que las dos la traen.
//   Ronda 2 (20-nov-2026): el AGUA. La refracción de three solo deforma lo que
//   está DENTRO de la escena y detrás de la botella en el sitio está la página
//   (HTML), así que se simula lo que sí se nota: la luz que cruza el líquido
//   (grosor real del rayo → centro oscuro, orillas con el fondo teñido) y el
//   menisco. Interruptores en la propuesta.
// ─────────────────────────────────────────────────────────────────────────────

const movil = matchMedia('(max-width: 700px)').matches

function escena(nodo, { propuesta }) {
  const canvas = document.createElement('canvas')
  nodo.append(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, movil ? 2 : 1.75))
  colorFiel(renderer)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  scene.environment = estudioProducto(renderer)
  scene.environmentIntensity = 1
  const luz = new THREE.DirectionalLight(0xfff4ec, 0.35)
  luz.position.set(-3, 5, 4)
  scene.add(luz)

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60)
  camera.position.set(0, 0, 9)
  const texturaDe = crearTexturas(renderer)
  const modelo = armarBotella({ texturaDe, ligera: movil, realce: true, condensa: propuesta })
  modelo.agua(true)   // ya está en el sitio: las dos la traen
  if (movil) modelo.pulpa(false)
  const giro = new THREE.Group()
  giro.add(modelo.botella)
  modelo.botella.position.y = -ALTO_BOTELLA / 2
  scene.add(giro)

  function aplicarEstado() {
    modelo.lleno(estado.acostada ? 1 : 0)
    if (!propuesta) return
    modelo.frio(estado.frio ? 1 : 0)
    renderer.toneMappingExposure = estado.expo
  }

  function dibujar(angulo, t) {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (canvas.width !== Math.round(w * renderer.getPixelRatio()) || canvas.height !== Math.round(h * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const mundoAlto = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    giro.scale.setScalar((mundoAlto * (estado.acostada ? 0.95 : 0.84)) / ALTO_BOTELLA)
    giro.rotation.set(0, angulo, estado.acostada ? -0.6 : -0.06)
    modelo.cuadro(t, camera)
    renderer.render(scene, camera)
  }

  return {
    dibujar, aplicarEstado,
    sabor: async (b, fondo) => { modelo.fondo(fondo); await modelo.aplicar(b); aplicarEstado() },
    empujar: modelo.empujar,
  }
}

const estado = { frio: true, acostada: true, gira: true, expo: 1 }
const antes = escena(document.getElementById('antes'), { propuesta: false })
const despues = escena(document.getElementById('despues'), { propuesta: true })

let i = 0
function sabor(k) {
  i = (k + lista.length) % lista.length
  const s = lista[i], [f, t] = mundos[s.etq] ?? ['#C0D6FF', '#6D0101']
  document.documentElement.style.setProperty('--f', f)
  document.documentElement.style.setProperty('--t', t)
  document.getElementById('nombre').textContent = s.nombre
  const hex = parseInt(f.slice(1), 16)
  antes.sabor(s.botella, hex); despues.sabor(s.botella, hex)
}
document.getElementById('prev').onclick = () => sabor(i - 1)
document.getElementById('next').onclick = () => sabor(i + 1)
addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') sabor(i - 1); if (e.key === 'ArrowRight') sabor(i + 1) })
for (const k of ['frio', 'acostada', 'gira']) {
  document.getElementById(`t-${k}`).onchange = (e) => { estado[k] = e.target.checked; antes.aplicarEstado(); despues.aplicarEstado() }
}
document.getElementById('expo').oninput = (e) => { estado.expo = +e.target.value; despues.aplicarEstado() }
// Sacudir: el agua chapotea en las dos (para ver el menisco moverse)
document.getElementById('sacude').onclick = () => { antes.empujar(1.4); despues.empujar(1.4) }
sabor(0)

// Arrastrar cualquiera de los dos gira a los dos (con inercia)
let angulo = 0.25, vel = 0, x0 = null
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

// ?captura: guarda capturas en public/referencias/prueba/ (solo desarrollo, por el
// middleware /__guardar) para revisar sin tener que mirar la pantalla.
if (new URLSearchParams(location.search).has('captura')) {
  const espera = (ms) => new Promise((ok) => setTimeout(ok, ms))
  const guardar = (canvas, nombre) => new Promise((ok) => canvas.toBlob((b) => fetch(`/__guardar?carpeta=prueba&nombre=${nombre}`, { method: 'POST', body: b }).then(ok), 'image/png'))
  ;(async () => {
    estado.gira = false; angulo = 0.15
    await espera(2500)
    for (const etq of ['jamaica', 'horchata', 'naranja', 'guanabana']) {
      sabor(lista.findIndex((s) => s.etq === etq)); await espera(1200)
      const [ca, cd] = document.querySelectorAll('.lado canvas')
      antes.dibujar(angulo, performance.now() / 1000)
      const a = guardar(ca, `${etq}-antes`)
      despues.dibujar(angulo, performance.now() / 1000)
      await Promise.all([a, guardar(cd, `${etq}-despues`)])
    }
    document.title = 'CAPTURAS LISTAS'
  })()
}
