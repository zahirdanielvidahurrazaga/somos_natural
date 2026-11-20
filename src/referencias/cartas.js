import * as THREE from 'three'
import { ALTO_BOTELLA, armarBotella, crearTexturas, colorFiel, estudioProducto } from '../botella/modelo'
import { sabores } from '../datos/negocio'
import { mundos } from './marca/datos'

// Las fotos de las cartas de la Lotería Natural: cada sabor con la botella
// real (forma medida), fondo transparente, a tres cuartos. Solo desarrollo:
// se guardan en public/referencias/cartas/<etq>.png (ver vite.config.js).
const log = document.getElementById('log')
const ANCHO = 900, ALTO = 1500
const canvas = document.createElement('canvas')
document.body.append(canvas)
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1.6)
renderer.setSize(ANCHO, ALTO, false)
colorFiel(renderer) // igual que el sitio desde el 20-nov-2026
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setClearColor(0x000000, 0)

const scene = new THREE.Scene()
scene.environment = estudioProducto(renderer)
const luz = new THREE.DirectionalLight(0xfff4ec, 0.35)
luz.position.set(-3, 5, 4)
scene.add(luz)
const camera = new THREE.PerspectiveCamera(22, ANCHO / ALTO, 0.1, 50)
camera.position.set(0, 0.25, 8.6)
camera.lookAt(0, 0, 0)

const modelo = armarBotella({ texturaDe: (() => { const t = crearTexturas(renderer); return t })(), realce: true })
modelo.agua(true)   // igual que el sitio (20-nov-2026)
const giro = new THREE.Group()
giro.add(modelo.botella)
modelo.botella.position.y = -ALTO_BOTELLA / 2
giro.rotation.set(0, -0.02, 0.03)
scene.add(giro)

function recortar(origen) {
  const c = document.createElement('canvas')
  c.width = origen.width; c.height = origen.height
  const x = c.getContext('2d')
  x.drawImage(origen, 0, 0)
  const { data, width, height } = x.getImageData(0, 0, c.width, c.height)
  let x0 = width, y0 = height, x1 = 0, y1 = 0
  for (let y = 0; y < height; y++) for (let i = 0; i < width; i++) {
    if (data[(y * width + i) * 4 + 3] > 8) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y }
  }
  const m = 8
  x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(width, x1 + m); y1 = Math.min(height, y1 + m)
  const r = document.createElement('canvas')
  r.width = x1 - x0; r.height = y1 - y0
  r.getContext('2d').drawImage(c, x0, y0, r.width, r.height, 0, 0, r.width, r.height)
  return r
}

const lista = []
for (const s of sabores) {
  modelo.fondo(parseInt((mundos[s.botella.etq]?.[0] ?? '#FFFFFF').slice(1), 16))
  await modelo.aplicar(s.botella)
  for (let k = 0; k < 4; k++) modelo.cuadro(1, camera)
  renderer.render(scene, camera)
  const blob = await new Promise((ok) => recortar(canvas).toBlob(ok, 'image/png'))
  await fetch(`/__guardar?carpeta=cartas&nombre=${s.botella.etq}`, { method: 'POST', body: blob })
  lista.push(s.botella.etq)
  log.textContent = `Guardadas ${lista.length}\n` + lista.join('\n')
}
log.textContent = `LISTO: ${lista.length}\n` + lista.join('\n')
