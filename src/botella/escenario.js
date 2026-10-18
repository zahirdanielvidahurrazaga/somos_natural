import * as THREE from 'three'
import { ALTO_BOTELLA, armarBotella, crearTexturas, estudioDe } from './modelo'

// ─────────────────────────────────────────────────────────────────────────────
// La botella que acompaña toda la página (2026-10-18). Referencia directa de
// Zahir: el video de la lata de mango — la lata cae girando en la portada, al
// bajar cruza de lado junto a la información y llega a una sección a todo
// color. Después del refri (que trababa un iPhone 16 Pro con 14 botellas) la
// regla es: UNA botella, UN lienzo, calidad ligera en celular, y solo se
// dibuja cuando se ve.
//
// La página marca dónde va la botella con divs vacíos `data-botella`, en orden.
// Cada uno puede decir su inclinación (`data-inclina`, radianes) y si ahí se
// puede agarrar (`data-agarrable`). Entre un hueco y el siguiente la botella
// viaja con el scroll dando una vuelta. Los huecos de las secciones largas
// van pegados (sticky), así la botella se queda junto al texto mientras se lee.
// ─────────────────────────────────────────────────────────────────────────────

export function crearEscenario(canvas, { movil = false, quieto = false } = {}) {
  // Suavizado siempre y resolución 2× en celular: sin suavizado y a 1.5× la
  // botella se veía pixeleada en un iPhone (pantalla 3×). Si el aparato no
  // alcanza, la resolución baja sola (ver `ajustarCalidad`).
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  let dpr = Math.min(devicePixelRatio, movil ? 2 : 1.75)
  renderer.setPixelRatio(dpr)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.92
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.environment = estudioDe(renderer)
  const luz = new THREE.DirectionalLight(0xfff4ec, 0.9)
  luz.position.set(-3, 5, 4)
  scene.add(luz)
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50)
  camera.position.set(0, 0, 7)

  const texturaDe = crearTexturas(renderer)
  const modelo = armarBotella({ texturaDe, ligera: movil })
  // La pulpa (calculada pixel por pixel) es lo más caro: en celular, fuera.
  if (movil) modelo.pulpa(false)
  const giro = new THREE.Group()
  giro.add(modelo.botella)
  modelo.botella.position.y = -ALTO_BOTELLA / 2
  const lugar = new THREE.Group()
  lugar.add(giro)
  scene.add(lugar)

  // ── Pantalla ───────────────────────────────────────────────────────────
  // El lienzo mide lo alto MÁXIMO de la pantalla (100lvh en el CSS) y solo se
  // reconstruye si cambia el ancho o ese alto (girar el teléfono). En iPhone la
  // barra de Safari aparece y desaparece al hacer scroll y cada vez disparaba
  // un "resize": reconstruir el lienzo ahí daba tirones.
  let vw = 0, vh = 0, altoMundo = 1
  function medir() {
    const w = canvas.clientWidth || innerWidth
    const h = canvas.clientHeight || innerHeight
    if (w !== vw || h !== vh) {
      vw = w; vh = h
      renderer.setSize(vw, vh, false)
      camera.aspect = vw / vh
      camera.updateProjectionMatrix()
      altoMundo = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    }
    huecos = [...document.querySelectorAll('[data-botella]')]
    despertar()
  }

  // Calidad automática: si el promedio de los últimos cuadros pasa de ~22 ms
  // (menos de 45 por segundo), la resolución baja un escalón. Nunca sube de
  // regreso, para que no oscile.
  const tiempos = []
  function ajustarCalidad(dt) {
    tiempos.push(dt)
    if (tiempos.length < 45) return
    const prom = tiempos.reduce((a, b) => a + b, 0) / tiempos.length
    tiempos.length = 0
    if (prom > 0.022 && dpr > 1.25) {
      dpr = Math.max(1.25, dpr - 0.25)
      renderer.setPixelRatio(dpr)
      renderer.setSize(vw, vh, false)
    }
  }
  let huecos = []
  addEventListener('resize', medir)

  // ── Sabor (con una vuelta; el cambio ocurre de espaldas) ───────────────
  let turno = 0
  let cambio = null
  function ponerSabor(receta, { inmediato = false } = {}) {
    const mio = ++turno
    texturaDe(receta.etq)
    if (inmediato || quieto) { modelo.aplicar(receta, () => mio === turno); return }
    cambio = { receta, mio, inicio: performance.now(), puesto: false }
    despertar()
  }
  function precargar(recetas) { recetas.forEach((r) => texturaDe(r.etq)) }

  // ── Agarrar (solo en los huecos que lo permiten) ───────────────────────
  const mano = { giro: 0, vel: 0, x: 0, y: 0, vx: 0, vy: 0, arrastrando: false, px: 0, py: 0 }
  let zona = null
  const abajo = (ev) => {
    mano.arrastrando = true
    mano.px = ev.clientX; mano.py = ev.clientY
    ev.currentTarget.setPointerCapture?.(ev.pointerId)
    ev.currentTarget.classList.add('agarrando')
  }
  const mover = (ev) => {
    if (!mano.arrastrando) return
    const dx = ev.clientX - mano.px, dy = ev.clientY - mano.py
    mano.px = ev.clientX; mano.py = ev.clientY
    mano.vel = dx * 0.012
    mano.giro += mano.vel
    mano.x = Math.max(-0.6, Math.min(0.6, mano.x + dx * 0.004))
    mano.y = Math.max(-0.4, Math.min(0.4, mano.y - dy * 0.004))
    despertar()
  }
  const arriba = (ev) => { mano.arrastrando = false; ev.currentTarget?.classList?.remove('agarrando') }
  function escuchar(el) {
    if (el === zona) return
    if (zona) {
      zona.removeEventListener('pointerdown', abajo)
      zona.removeEventListener('pointermove', mover)
      zona.removeEventListener('pointerup', arriba)
      zona.removeEventListener('pointercancel', arriba)
    }
    zona = el
    if (!el) return
    el.addEventListener('pointerdown', abajo)
    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerup', arriba)
    el.addEventListener('pointercancel', arriba)
  }

  // ── Cada cuadro ────────────────────────────────────────────────────────
  const reloj = new THREE.Clock()
  const inicio = performance.now()
  let antes = 0
  let vivo = true
  let dormido = false
  let pintada = false
  const GIRO_SOLO = quieto ? 0 : 0.4
  const suave = (t) => t * t * (3 - 2 * t)
  const curva = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
  const sale = (t) => 1 - Math.pow(1 - t, 3)
  function despertar() { if (dormido && vivo) { dormido = false; requestAnimationFrame(cuadro) } }

  function tramo(ra, rb) {
    const ac = ra.top + ra.height / 2
    const bc = rb.top + rb.height / 2
    if (Math.abs(bc - ac) < 1) return 1
    return Math.min(1, Math.max(0, (vh * 0.5 - ac) / (bc - ac)))
  }

  function cuadro() {
    if (!vivo) return
    const t = reloj.getElapsedTime()
    const dt = Math.min(1 / 30, t - antes)
    antes = t

    const visibles = huecos.filter((el) => el.offsetParent !== null)
    if (visibles.length === 0 || document.hidden) { dormir(); return }
    const rs = visibles.map((el) => el.getBoundingClientRect())
    const ultimo = rs[rs.length - 1]
    const primero = rs[0]
    const movil = innerWidth < 860
    // fuera de todos los huecos (muy abajo en la página): se duerme. En
    // teléfono se le da más margen: ahí la botella se va de la esquina
    // deslizándose después del último hueco.
    if (ultimo.bottom < (movil ? -vh : -60) || primero.top > vh + 60) { dormir(); return }

    let cx, cy, alto, incl, rodar, aqui
    if (!movil) {
      // en qué tramo va: el primero que todavía no termina
      let k = 0
      let e = rs.length > 1 ? tramo(rs[0], rs[1]) : 0
      while (e >= 1 && k < rs.length - 2) { k++; e = tramo(rs[k], rs[k + 1]) }
      const a = rs[k], b = rs[Math.min(k + 1, rs.length - 1)]
      const ea = visibles[k], eb = visibles[Math.min(k + 1, visibles.length - 1)]
      const s = suave(e)
      cx = a.left + a.width / 2 + (b.left + b.width / 2 - (a.left + a.width / 2)) * s
      cy = a.top + a.height / 2 + (b.top + b.height / 2 - (a.top + a.height / 2)) * s
      alto = a.height + (b.height - a.height) * s
      incl = Number(ea.dataset.inclina || 0) + (Number(eb.dataset.inclina || 0) - Number(ea.dataset.inclina || 0)) * s
      // de un hueco al otro da una vuelta completa
      rodar = (k + s) * Math.PI * 2
      aqui = s < 0.02 ? ea : s > 0.98 ? eb : null
      if (cy + alto / 2 < -40 || cy - alto / 2 > vh + 40) { dormir(); return }
    } else {
      // En teléfono no hay espacio a los lados: mientras se lee, la botella
      // se queda chiquita en la esquina de abajo a la izquierda (lejos del
      // botón de WhatsApp) y RUEDA con el scroll. Cuando un hueco se acerca
      // al centro de la pantalla (portada, galería, inicio de una sección),
      // sale de la esquina, crece y se acomoda en él.
      let mejor = 0, pres = 0
      rs.forEach((r, i) => {
        const c = r.top + r.height / 2
        const p = Math.max(0, 1 - Math.abs(c - vh / 2) / (vh * 0.5))
        if (p > pres) { pres = p; mejor = i }
      })
      const p = suave(Math.min(1, pres * 1.6))
      const r = rs[mejor]
      const altoEsquina = vh * 0.2
      // pasado el último hueco (Dónde comprar, el pedido), se va de la
      // esquina hacia la izquierda para no estorbar en el formulario
      const salida = Math.min(1, Math.max(0, -ultimo.bottom / (vh * 0.6)))
      if (salida >= 1) { dormir(); return }
      const esqX = 14 + altoEsquina * 0.2 - salida * (altoEsquina + 60)
      const esqY = vh - altoEsquina / 2 - 20
      cx = esqX + (r.left + r.width / 2 - esqX) * p
      cy = esqY + (r.top + r.height / 2 - esqY) * p
      alto = altoEsquina + (r.height - altoEsquina) * p
      incl = -0.35 + (Number(visibles[mejor].dataset.inclina || 0) + 0.35) * p
      rodar = quieto ? 0 : scrollY * 0.006
      aqui = p > 0.98 ? visibles[mejor] : null
    }

    escuchar(aqui && aqui.dataset.agarrable !== undefined ? aqui : null)

    // cambio de sabor con una vuelta
    let giroCambio = 0
    if (cambio) {
      const c = Math.min(1, (performance.now() - cambio.inicio) / 950)
      giroCambio = curva(c) * Math.PI * 2
      if (!cambio.puesto && c >= 0.5) {
        cambio.puesto = true
        const mio = cambio.mio
        modelo.aplicar(cambio.receta, () => mio === turno)
      }
      if (c >= 1) cambio = null
    }

    // la mano (arrastre) y el giro solo
    if (!mano.arrastrando) {
      mano.vel += (GIRO_SOLO * dt - mano.vel) * 0.04
      mano.giro += mano.vel
      mano.vx += (-mano.x * 60 - mano.vx * 9) * dt
      mano.vy += (-mano.y * 60 - mano.vy * 9) * dt
      mano.x += mano.vx * dt
      mano.y += mano.vy * dt
    }

    // la entrada: cae girando desde arriba hasta su lugar (como la lata)
    const ki = quieto ? 1 : Math.min(1, (performance.now() - inicio) / 1400)
    const caida = (1 - sale(ki)) * altoMundo * 0.9
    const vueltaEntrada = (1 - sale(ki)) * Math.PI * 3

    const escala = (alto / vh) * altoMundo / ALTO_BOTELLA
    lugar.position.set(
      ((cx - vw / 2) / vh) * altoMundo + mano.x,
      (-(cy - vh / 2) / vh) * altoMundo + mano.y + caida + (quieto ? 0 : Math.sin(t * 1.2) * 0.02 * escala),
      0,
    )
    lugar.scale.setScalar(escala)
    lugar.rotation.z = incl
    // de un hueco al otro da una vuelta completa
    giro.rotation.y = mano.giro + giroCambio + vueltaEntrada + (quieto ? 0 : rodar)

    modelo.cuadro(t, camera)
    renderer.render(scene, camera)
    pintada = true
    if (t - antesDormir > 0.5) ajustarCalidad(dt)
    requestAnimationFrame(cuadro)
  }
  // después de dormir, el primer cuadro trae un dt enorme: no cuenta para
  // la calidad automática
  let antesDormir = 0
  function dormir() {
    if (pintada) { renderer.clear(); pintada = false }
    dormido = true
    tiempos.length = 0
    antesDormir = reloj.getElapsedTime()
  }
  const alRodar = () => despertar()
  const alVer = () => despertar()
  addEventListener('scroll', alRodar, { passive: true })
  document.addEventListener('visibilitychange', alVer)
  medir()
  requestAnimationFrame(cuadro)

  return {
    ponerSabor,
    precargar,
    // la página cambió de forma (se agregó o quitó un hueco)
    remedir: medir,
    destruir() {
      vivo = false
      removeEventListener('resize', medir)
      removeEventListener('scroll', alRodar)
      document.removeEventListener('visibilitychange', alVer)
      escuchar(null)
      renderer.dispose()
    },
  }
}
