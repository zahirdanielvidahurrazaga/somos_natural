import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { ALTO_BOTELLA, armarBotella, crearTexturas, estudioDe } from '../botella/modelo'

// ─────────────────────────────────────────────────────────────────────────────
// El refri de la portada (2026-10-18). Zahir eligió esta idea entre dos
// prototipos: la página te recibe con el refri y sus 14 sabores; tocas uno y
// la página baja a la sección del sabor mientras la botella sale del refri y
// baja contigo dando una vuelta (nada se abre encima: todo de corrido). En la
// sección gira sola y se pasa de sabor como diapositivas. Solo es para ver: el
// pedido vive abajo.
//
// DOS lienzos fijos, por las capas: abajo el refri con sus botellas; arriba
// solo la botella del sabor, entre el fondo de la sección (nombre gigante y
// mancha, DETRÁS) y sus textos (ENCIMA, con z-index mayor).
// ─────────────────────────────────────────────────────────────────────────────

// Medidas del refri (unidades del mundo). Interior grande y botellas a 0.92
// de su tamaño: a 0.6 y luego a 0.8 Zahir las sintió chiquitas.
const W = 6.6, H = 7.6, D = 1.9
// La cabeza va lisa: el letrero "Somos Natural" se quitó a pedido de Zahir.
const LADO = 0.5, CABEZA = 0.55, BASE = 1.0, FONDO_CAJA = D + 0.5
const ESCALA_REPISA = 0.92
const ALTO_TOTAL = H + CABEZA + BASE + 0.25
const ANCHO_TOTAL = W + 2 * LADO
const CENTRO_Y = (CABEZA - BASE) / 2
const ENTRE_REPISAS = 2.42

function renderizador(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  r.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  r.toneMapping = THREE.ACESFilmicToneMapping
  r.toneMappingExposure = 0.92
  r.outputColorSpace = THREE.SRGBColorSpace
  return r
}

// Texturas pintadas en un canvas: las tiras de las repisas, la
// rejilla y el brillo del vidrio. Todo sale de aquí para no cargar imágenes.
function lienzo(w, h, pintar) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  pintar(c.getContext('2d'), w, h)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}
function tira(texto) {
  return lienzo(1600, 120, (g, w, h) => {
    g.fillStyle = '#FBF3F0'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#9B2247'; g.fillRect(0, h - 10, w, 10)
    g.font = '500 46px "Jost", sans-serif'
    g.fillStyle = '#6E1732'
    g.textAlign = 'left'; g.textBaseline = 'middle'
    g.fillText(texto.toUpperCase().split('').join(' '), 46, h / 2 - 4)
  })
}
function rejilla() {
  return lienzo(1024, 160, (g, w, h) => {
    g.fillStyle = '#6E1732'; g.fillRect(0, 0, w, h)
    for (let x = 60; x < w - 60; x += 26) {
      const v = g.createLinearGradient(0, 0, 0, h)
      v.addColorStop(0, '#3a0c1b'); v.addColorStop(1, '#52122a')
      g.fillStyle = v
      g.fillRect(x, 34, 12, h - 68)
    }
  })
}
function costillas() {
  const t = lienzo(512, 64, (g, w, h) => {
    g.fillStyle = '#F6E8E3'; g.fillRect(0, 0, w, h)
    for (let x = 0; x < w; x += 32) {
      const v = g.createLinearGradient(x, 0, x + 32, 0)
      v.addColorStop(0, 'rgba(0,0,0,.06)'); v.addColorStop(.5, 'rgba(255,255,255,.08)'); v.addColorStop(1, 'rgba(0,0,0,.03)')
      g.fillStyle = v; g.fillRect(x, 0, 32, h)
    }
  })
  t.wrapS = THREE.RepeatWrapping
  t.repeat.set(3, 1)
  return t
}
function brilloVidrio() {
  const t = lienzo(512, 512, (g, w, h) => {
    g.clearRect(0, 0, w, h)
    g.translate(w / 2, h / 2); g.rotate(-0.5); g.translate(-w / 2, -h / 2)
    const franja = (x, ancho, a) => {
      const v = g.createLinearGradient(x, 0, x + ancho, 0)
      v.addColorStop(0, 'rgba(255,255,255,0)'); v.addColorStop(.5, `rgba(255,255,255,${a})`); v.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = v; g.fillRect(x, -h, ancho, h * 3)
    }
    franja(90, 120, 0.55)
    franja(240, 40, 0.35)
  })
  t.colorSpace = THREE.NoColorSpace
  return t
}

function armarRefri(grupos) {
  const refri = new THREE.Group()
  const vino = new THREE.MeshPhysicalMaterial({ color: 0x9b2247, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12 })
  const cromo = new THREE.MeshStandardMaterial({ color: 0xe8e6e4, metalness: 1, roughness: 0.18 })
  const interior = new THREE.MeshStandardMaterial({ color: 0xffffff, map: costillas(), roughness: 0.55 })
  const pared = new THREE.MeshStandardMaterial({ color: 0xefdcd6, roughness: 0.6 })
  const zFrente = D / 2

  // el cuerpo: costados, cabeza y base, con esquinas redondeadas
  const caja = (w, h, d, r, x, y, z, mat) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat)
    m.position.set(x, y, z)
    refri.add(m)
    return m
  }
  for (const lado of [-1, 1]) caja(LADO, H + 0.3, FONDO_CAJA, 0.14, lado * (W / 2 + LADO / 2), 0, -0.2, vino)
  caja(ANCHO_TOTAL, CABEZA, FONDO_CAJA, 0.18, 0, H / 2 + CABEZA / 2 + 0.1, -0.2, vino)
  caja(ANCHO_TOTAL, BASE, FONDO_CAJA, 0.18, 0, -H / 2 - BASE / 2 - 0.1, -0.2, vino)


  // la rejilla de abajo y las patitas
  const rej = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.4, BASE - 0.4), new THREE.MeshStandardMaterial({ map: rejilla(), roughness: 0.7 }))
  rej.position.set(0, -H / 2 - BASE / 2 - 0.1, zFrente + 0.06)
  refri.add(rej)
  for (const x of [-1, 1]) {
    const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.25, 24), cromo)
    pata.position.set(x * (W / 2), -H / 2 - BASE - 0.2, 0.2)
    refri.add(pata)
  }

  // el interior: fondo con costillas, paredes, techo con su tira LED
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(W, H), interior)
  fondo.position.z = -D / 2
  refri.add(fondo)
  for (const lado of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(D, H), pared)
    p.rotation.y = -lado * Math.PI / 2
    p.position.set(lado * W / 2, 0, 0)
    refri.add(p)
  }
  const techo = new THREE.Mesh(new THREE.PlaneGeometry(W, D), pared)
  techo.rotation.x = Math.PI / 2; techo.position.y = H / 2
  refri.add(techo)
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ color: 0xe6cdc5, roughness: 0.5 }))
  piso.rotation.x = -Math.PI / 2; piso.position.y = -H / 2
  refri.add(piso)
  const led = new THREE.Mesh(new THREE.BoxGeometry(W * 0.92, 0.05, 0.12), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 2.3, 2.2), toneMapped: false }))
  led.position.set(0, H / 2 - 0.05, zFrente - 0.25)
  refri.add(led)
  // luz del refri: arriba al frente y un relleno suave abajo
  const luz = new THREE.PointLight(0xfff1e6, 9, 12, 1.5)
  luz.position.set(0, H / 2 - 0.5, 0.8)
  refri.add(luz)
  const relleno = new THREE.PointLight(0xffe6e0, 3, 10, 1.6)
  relleno.position.set(0, -H / 2 + 1, 1.2)
  refri.add(relleno)

  // las repisas: vidrio con su tira al frente que dice el grupo
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.22, clearcoat: 1, depthWrite: false })
  // la de abajo va en una repisa baja (no en el piso) para que se lea su tira
  const alturas = grupos.map((_, i) => -H / 2 + 0.36 + (grupos.length - 1 - i) * ENTRE_REPISAS)
  alturas.forEach((y, i) => {
    if (y > -H / 2 + 0.1) {
      const repisa = new THREE.Mesh(new THREE.BoxGeometry(W - 0.04, 0.045, D * 0.92), vidrio)
      repisa.position.set(0, y - 0.03, -0.04)
      refri.add(repisa)
    }
    const t = new THREE.Mesh(new THREE.BoxGeometry(W - 0.04, 0.2, 0.04), [cromo, cromo, cromo, cromo, new THREE.MeshStandardMaterial({ map: tira(grupos[i].titulo), roughness: 0.5 }), cromo])
    t.position.set(0, y - 0.09, zFrente - 0.12)
    refri.add(t)
  })

  // la puerta de vidrio: casi invisible, solo sus reflejos y un brillo en
  // diagonal; un marco cromado delgado y la jaladera a la derecha
  const puerta = new THREE.Group()
  const cristal = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, roughness: 0.02, clearcoat: 1, depthWrite: false }),
  )
  puerta.add(cristal)
  const brillo = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: brilloVidrio(), transparent: true, opacity: 0.22, depthWrite: false, toneMapped: false }),
  )
  brillo.position.z = 0.002
  puerta.add(brillo)
  const marco = (w, h, x, y) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), cromo)
    m.position.set(x, y, 0)
    puerta.add(m)
  }
  marco(W, 0.07, 0, H / 2 - 0.035); marco(W, 0.07, 0, -H / 2 + 0.035)
  marco(0.07, H, -W / 2 + 0.035, 0); marco(0.07, H, W / 2 - 0.035, 0)
  const jaladera = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, H * 0.42, 6, 16), cromo)
  jaladera.position.set(W / 2 - 0.35, 0, 0.2)
  puerta.add(jaladera)
  for (const y of [-1, 1]) {
    const soporte = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 12), cromo)
    soporte.rotation.x = Math.PI / 2
    soporte.position.set(W / 2 - 0.35, y * H * 0.21, 0.1)
    puerta.add(soporte)
  }
  puerta.position.z = zFrente + 0.02
  puerta.traverse((o) => { if (o.isMesh) o.renderOrder = 20 })
  refri.add(puerta)

  return { refri, alturas }
}

export function crearRefri({ lienzoRefri, lienzoBotella, sabores, grupos, huecoRefri, zonaRefri, seccion, huecoBotella, alSenalar, alElegir }) {
  // Con "reducir movimiento" la botella no gira sola, no flota, no da la
  // vuelta al bajar ni sale de lado: solo se coloca donde le toca.
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const r1 = renderizador(lienzoRefri)
  const r2 = renderizador(lienzoBotella)
  const escena1 = new THREE.Scene()
  const escena2 = new THREE.Scene()
  escena1.environment = estudioDe(r1)
  escena2.environment = estudioDe(r2)
  for (const e of [escena1, escena2]) {
    const l = new THREE.DirectionalLight(0xfff4ec, 0.9)
    l.position.set(-3, 5, 4)
    e.add(l)
  }
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 90)
  camera.position.set(0, 0, 20)
  const texturaDe = crearTexturas(r1)

  // ── El refri y sus botellas ────────────────────────────────────────────
  const { refri, alturas } = armarRefri(grupos)
  escena1.add(refri)
  const botellas = []
  grupos.forEach((g, i) => {
    const y = alturas[i]
    const suyos = sabores.filter((s) => s.grupo === g.llave)
    const paso = Math.min(1.22, (W - 1.0) / Math.max(1, suyos.length - 1))
    suyos.forEach((s, j) => {
      const modelo = armarBotella({ texturaDe })
      modelo.pulpa(false)
      modelo.aplicar(s.botella)
      const giro = new THREE.Group()
      giro.add(modelo.botella)
      const lugar = new THREE.Group()
      lugar.add(giro)
      const casa = new THREE.Vector3((j - (suyos.length - 1) / 2) * paso, y, 0.15)
      lugar.position.copy(casa)
      lugar.scale.setScalar(ESCALA_REPISA)
      // de frente pero no idénticas: cada una un poquito girada
      const base = -0.22 + ((j * 37) % 5) * 0.11
      giro.rotation.y = base
      lugar.userData.i = botellas.length
      refri.add(lugar)
      botellas.push({ s, modelo, giro, lugar, casa, base, levante: 0 })
    })
  })
  const porNombre = Object.fromEntries(botellas.map((b) => [b.s.nombre, b]))

  // ── Pantalla ───────────────────────────────────────────────────────────
  let vw = 1, vh = 1
  const altoMundo = (z) => 2 * (camera.position.z - z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
  function aMundo(rect, z) {
    const hm = altoMundo(z)
    return {
      x: ((rect.left + rect.width / 2 - vw / 2) / vh) * hm,
      y: (-(rect.top + rect.height / 2 - vh / 2) / vh) * hm,
      alto: (rect.height / vh) * hm,
      ancho: (rect.width / vh) * hm,
    }
  }
  function medir() {
    vw = innerWidth; vh = innerHeight
    for (const r of [r1, r2]) r.setSize(vw, vh, false)
    camera.aspect = vw / vh
    camera.updateProjectionMatrix()
  }
  addEventListener('resize', medir)
  medir()

  function encuadrarRefri() {
    const rect = huecoRefri.getBoundingClientRect()
    const m = aMundo(rect, 0)
    const s = Math.min(m.alto / ALTO_TOTAL, m.ancho / ANCHO_TOTAL)
    refri.scale.setScalar(s)
    refri.position.set(m.x, m.y - CENTRO_Y * s, 0)
    return rect
  }

  // ── Señalar y tocar el refri ───────────────────────────────────────────
  const rayo = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  let encima = null
  function botellaEn(ev) {
    ndc.set((ev.clientX / vw) * 2 - 1, -(ev.clientY / vh) * 2 + 1)
    rayo.setFromCamera(ndc, camera)
    const hits = rayo.intersectObjects(botellas.filter((b) => b !== actual || bajada === 0).map((b) => b.lugar), true)
    if (!hits.length) return null
    let o = hits[0].object
    while (o && o.userData.i === undefined) o = o.parent
    return o ? botellas[o.userData.i] : null
  }
  const alMover = (ev) => {
    const b = botellaEn(ev)
    if (b !== encima) { encima = b; alSenalar?.(b ? b.s.nombre : null) }
    zonaRefri.style.cursor = b ? 'pointer' : ''
  }
  const alSalir = () => { if (encima) { encima = null; alSenalar?.(null) } }
  const alTocar = (ev) => {
    const b = botellaEn(ev)
    if (b) alElegir?.(b.s.nombre)
  }
  zonaRefri.addEventListener('pointermove', alMover)
  zonaRefri.addEventListener('pointerleave', alSalir)
  zonaRefri.addEventListener('click', alTocar)

  // ── La botella del sabor ───────────────────────────────────────────────
  // Hay siempre un sabor "actual". Su botella vive en la repisa mientras se ve
  // el refri y, conforme la página baja a la sección del sabor, sale del refri
  // y baja con el scroll dando una vuelta hasta su lugar (pedido de Zahir:
  // nada que se abra encima, todo de corrido). En la sección gira sola, flota
  // apenas y se puede agarrar; las flechas la cambian de lado.
  const Z_FRENTE = 3
  const GIRO_SOLO = quieto ? 0 : 0.55   // radianes por segundo
  const mano = { giro: 0, velGiro: 0, x: 0, y: 0, vx: 0, vy: 0, arrastrando: false, px: 0, py: 0 }
  let actual = botellas[0]
  let bajada = 0                  // 0 = en su repisa · 1 = en la sección
  let entrada = 0                 // corrimiento de lado al cambiar con flechas
  const salientes = []
  const tAbajo = (ev) => {
    if (bajada < 0.9) return
    mano.arrastrando = true
    mano.px = ev.clientX; mano.py = ev.clientY
    huecoBotella.setPointerCapture?.(ev.pointerId)
    huecoBotella.classList.add('agarrando')
  }
  const tMover = (ev) => {
    if (!mano.arrastrando) return
    const dx = ev.clientX - mano.px, dy = ev.clientY - mano.py
    mano.px = ev.clientX; mano.py = ev.clientY
    mano.velGiro = dx * 0.012
    mano.giro += mano.velGiro
    mano.x = Math.max(-0.7, Math.min(0.7, mano.x + dx * 0.005))
    mano.y = Math.max(-0.5, Math.min(0.5, mano.y - dy * 0.005))
  }
  const tArriba = () => { mano.arrastrando = false; huecoBotella.classList.remove('agarrando') }
  huecoBotella.addEventListener('pointerdown', tAbajo)
  huecoBotella.addEventListener('pointermove', tMover)
  huecoBotella.addEventListener('pointerup', tArriba)
  huecoBotella.addEventListener('pointercancel', tArriba)

  function aRepisa(b) {
    if (b.lugar.parent !== refri) refri.add(b.lugar)
    b.lugar.position.copy(b.casa)
    b.lugar.scale.setScalar(ESCALA_REPISA)
    b.giro.rotation.y = b.base
    b.modelo.pulpa(false)
  }

  // Cambiar el sabor actual. Con `lado` (flechas) y la botella ya abajo, la
  // vieja sale de lado y la nueva entra por el otro; si no, la nueva sale de
  // su repisa con el scroll.
  function ponerActual(nombre, { lado = 0 } = {}) {
    const b = porNombre[nombre]
    if (!b || b === actual) return
    // si la que llega todavía iba saliendo (siguiente y anterior muy rápido),
    // deja de salir: si no, al terminar su salida se iba de golpe al refri
    for (let k = salientes.length - 1; k >= 0; k--) if (salientes[k].b === b) salientes.splice(k, 1)
    if (bajada > 0.02 && !quieto) salientes.push({ b: actual, lado: -(lado || 1), inicio: performance.now() })
    else aRepisa(actual)
    actual = b
    entrada = bajada > 0.02 && !quieto ? (lado || 1) : 0
    mano.velGiro = 0; mano.x = 0; mano.y = 0
    despertar()
  }

  // ── Cada cuadro ────────────────────────────────────────────────────────
  const reloj = new THREE.Clock()
  let antes = 0
  let vivo = true
  let dormido = false
  let pintada1 = true, pintada2 = false
  const ir = (v, meta, k) => v + (meta - v) * k
  const suave = (t) => t * t * (3 - 2 * t)
  const desde = new THREE.Vector3()
  function despertar() { if (dormido) { dormido = false; requestAnimationFrame(cuadro) } }

  function cuadro() {
    if (!vivo) return
    const t = reloj.getElapsedTime()
    const dt = Math.min(1 / 30, t - antes)
    antes = t

    const rect = encuadrarRefri()
    const dibujarRefri = rect.bottom > 0 && rect.top < vh && rect.width > 0

    // cuánto ha bajado la página hacia la sección: 0 cuando su borde de
    // arriba apenas asoma abajo, 1 cuando la sección llena la pantalla
    const rs = seccion.getBoundingClientRect()
    bajada = Math.min(1, Math.max(0, (vh - rs.top) / (vh * 0.85)))
    const e = suave(bajada)
    const seccionVisible = rs.bottom > 0 && rs.top < vh

    for (const b of botellas) {
      if ((b === actual && e > 0) || salientes.some((x) => x.b === b)) continue
      b.levante = ir(b.levante, b === encima ? 1 : 0, 0.15)
      if (b.lugar.parent !== refri) refri.add(b.lugar)
      b.lugar.position.set(b.casa.x, b.casa.y + b.levante * 0.18, b.casa.z + b.levante * 0.3)
      b.lugar.scale.setScalar(ESCALA_REPISA)
      b.giro.rotation.y = b.levante > 0.05 && !quieto ? b.giro.rotation.y + dt * 0.9 * b.levante : ir(b.giro.rotation.y, b.base, 0.06)
      if (dibujarRefri) b.modelo.cuadro(t, camera)
    }

    // la botella actual, entre su repisa y la sección
    if (e > 0) {
      const b = actual
      if (b.lugar.parent !== escena2) escena2.add(b.lugar)
      if (!mano.arrastrando) {
        mano.velGiro = ir(mano.velGiro, GIRO_SOLO * dt, 0.04)
        mano.giro += mano.velGiro
        mano.vx += (-mano.x * 60 - mano.vx * 9) * dt
        mano.vy += (-mano.y * 60 - mano.vy * 9) * dt
        mano.x += mano.vx * dt
        mano.y += mano.vy * dt
      }
      entrada = ir(entrada, 0, 0.09)
      // de dónde sale: su repisa, en el mundo
      refri.updateMatrixWorld(true)
      refri.localToWorld(desde.copy(b.casa))
      const escalaRepisa = refri.scale.x * ESCALA_REPISA
      // a dónde llega: el hueco de la sección
      const m = aMundo(huecoBotella.getBoundingClientRect(), Z_FRENTE)
      const escalaSeccion = m.alto / ALTO_BOTELLA
      const flota = quieto ? 0 : Math.sin(t * 1.3) * m.alto * 0.012 * e
      const llegaX = m.x + mano.x * e + entrada * m.ancho * 2.4
      const llegaY = m.y - m.alto / 2 + mano.y * e + flota
      b.lugar.position.set(
        desde.x + (llegaX - desde.x) * e,
        desde.y + (llegaY - desde.y) * e,
        desde.z + (Z_FRENTE - desde.z) * e,
      )
      b.lugar.scale.setScalar(escalaRepisa + (escalaSeccion - escalaRepisa) * e)
      // de bajada da una vuelta completa; ya abajo, gira sola
      b.giro.rotation.y = b.base + (mano.giro - b.base) * e + (quieto ? 0 : e * Math.PI * 2)
      b.modelo.pulpa(e > 0.6)
      b.modelo.cuadro(t, camera)
    } else if (actual.lugar.parent !== refri) {
      aRepisa(actual)
    }

    // las que salen de lado (flechas) y regresan a su repisa
    for (let i = salientes.length - 1; i >= 0; i--) {
      const x = salientes[i]
      const c = (performance.now() - x.inicio) / 520
      x.b.lugar.position.x += x.lado * dt * 16 * (0.4 + c)
      x.b.giro.rotation.y += dt * GIRO_SOLO
      x.b.modelo.cuadro(t, camera)
      if (c >= 1) { aRepisa(x.b); salientes.splice(i, 1) }
    }

    if (dibujarRefri) { r1.render(escena1, camera); pintada1 = true }
    else if (pintada1) { r1.clear(); pintada1 = false }
    const dibujar2 = (e > 0 && (seccionVisible || dibujarRefri)) || salientes.length > 0
    if (dibujar2) { r2.render(escena2, camera); pintada2 = true }
    else if (pintada2) { r2.clear(); pintada2 = false }

    if (!dibujarRefri && !dibujar2) { dormido = true; return }
    requestAnimationFrame(cuadro)
  }
  const alRodar = () => despertar()
  addEventListener('scroll', alRodar, { passive: true })
  requestAnimationFrame(cuadro)

  return {
    ponerActual,
    destruir() {
      vivo = false
      removeEventListener('resize', medir)
      removeEventListener('scroll', alRodar)
      zonaRefri.removeEventListener('pointermove', alMover)
      zonaRefri.removeEventListener('pointerleave', alSalir)
      zonaRefri.removeEventListener('click', alTocar)
      huecoBotella.removeEventListener('pointerdown', tAbajo)
      huecoBotella.removeEventListener('pointermove', tMover)
      huecoBotella.removeEventListener('pointerup', tArriba)
      huecoBotella.removeEventListener('pointercancel', tArriba)
      r1.dispose(); r2.dispose()
    },
  }
}
