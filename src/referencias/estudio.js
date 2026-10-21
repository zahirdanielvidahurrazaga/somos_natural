import * as THREE from 'three'
import { ALTO_BOTELLA, armarBotella, crearTexturas, estudioDe } from '../botella/modelo'
import { sabores } from '../datos/negocio'

// Estudio de fotos: dibuja las 14 botellas con el mismo 3D del sitio, en tres
// poses, con fondo transparente, y las guarda (ver vite.config.js). De aquí
// salen las "fotos de producto" de los prototipos de referencias.
const log = document.getElementById('log')
const ANCHO = 900, ALTO = 1500
const canvas = document.createElement('canvas')
document.body.append(canvas)
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1.6)
renderer.setSize(ANCHO, ALTO, false)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.92
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setClearColor(0x000000, 0)

const scene = new THREE.Scene()
scene.environment = estudioDe(renderer)
const luz = new THREE.DirectionalLight(0xfff4ec, 0.9)
luz.position.set(-3, 5, 4)
scene.add(luz)
const camera = new THREE.PerspectiveCamera(22, ANCHO / ALTO, 0.1, 50)
camera.position.set(0, 0, 8.6)

const modelo = armarBotella({ texturaDe: crearTexturas(renderer) })
const giro = new THREE.Group()
giro.add(modelo.botella)
modelo.botella.position.y = -ALTO_BOTELLA / 2
scene.add(giro)

// frente: de frente · tres: girada a tres cuartos · ladeada: inclinada a la derecha
const poses = {
  frente: { ry: -0.12, rz: 0 },
  tres: { ry: -0.55, rz: 0.06 },
  ladeada: { ry: -0.25, rz: -0.32 },
}

// recorta lo transparente de las orillas, dejando un margen chico
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
  const m = 6
  x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(width, x1 + m); y1 = Math.min(height, y1 + m)
  const r = document.createElement('canvas')
  r.width = x1 - x0; r.height = y1 - y0
  r.getContext('2d').drawImage(c, x0, y0, r.width, r.height, 0, 0, r.width, r.height)
  return r
}

const lista = []
for (const s of sabores) {
  await modelo.aplicar(s.botella)
  for (const [nombre, p] of Object.entries(poses)) {
    giro.rotation.set(0, p.ry, p.rz)
    for (let k = 0; k < 3; k++) modelo.cuadro(1, camera)
    renderer.render(scene, camera)
    const blob = await new Promise((ok) => recortar(canvas).toBlob(ok, 'image/png'))
    const archivo = `${s.botella.etq}-${nombre}`
    await fetch(`/__guardar?nombre=${archivo}`, { method: 'POST', body: blob })
    lista.push(archivo)
    log.textContent = `Guardadas ${lista.length}\n` + lista.join('\n')
  }
}
log.textContent = `LISTO: ${lista.length} fotos\n` + lista.join('\n')
