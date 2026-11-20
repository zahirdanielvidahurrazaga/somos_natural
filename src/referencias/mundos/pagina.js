import { lista, negocio, proceso, ventajas, eventos, puntosDeVenta, minimo, tamanos, dulzura, wa, html, revelar, barraReferencias } from '../comun'
import { mundos } from '../marca/datos'
import { sello } from '../marca/sello'
import { componer, frente, escenario, ramito, ventanita } from './botanica'

// "Mundos" (2026-11-12): la web nueva con la IDENTIDAD de la hoja de marca
// (/referencias/marca.html), a la manera de en.manayerbamate.com.
// - SIN video (Zahir: "las referencias no tenían video"): el hero ES el
//   mundo de los sabores, como en Mana.
// - Sabores: TODA la pantalla toma el mundo (fondo + tinta) del sabor; la
//   botella 3D aprobada al centro, el nombre gigante detrás y su ilustración
//   a un lado. Se cambia con flechas, píldoras, teclado o deslizando — NO con
//   el scroll (pasar por los 14 a fuerza se rechazó en Lavanda).
// - Logo: solo las letras en la barra; la firma (gotita sentada sobre la L)
//   en el pie. Sello A para el detalle.

// Colores de la botánica por sabor (hoja, nervadura, pétalos, ventana, sol),
// escogidos para contrastar con su fondo. Lo que no se dice, usa la base.
const base = { h: '#3F7A3C', hl: '#A6D67F', p1: '#EF6A3A', p2: '#F7C65A', v: '#8FB4E3', s: '#F7C65A' }
const botanica = {
  // flores del color de su fruta (p1 = base oscura del pétalo, p2 = punta clara)
  jamaica: { v: '#F7B2C8', p1: '#9E1530', p2: '#E5475B' },
  horchata: { h: '#2F5A2E', p1: '#C98B55', p2: '#FCE9D2', s: '#F6E3A1', v: '#F3C8F3' },
  maracuya: { p1: '#E39A12', p2: '#FFE45C' },
  tamarindo: { h: '#2F6B35', p1: '#7A3E1D', p2: '#C9844A' },
  limon: { p1: '#3F8A2A', p2: '#C9F27A' },
  cafe: { s: '#F59E7A', p1: '#4A2416', p2: '#9A5B34' },
  chocolate: { p1: '#5A2616', p2: '#A8643C' },
  'frutos-rojos': { p1: '#7E0F38', p2: '#D93A5E' },
  vainilla: { p1: '#E8C66E', p2: '#FFF6DA' },
  naranja: { v: '#F7B2C8', p1: '#E2570C', p2: '#FFA43A' },
  mango: { p1: '#EE8500', p2: '#FFD23F' },
  pina: { p1: '#E0A000', p2: '#FFE36E' },
  melon: { h: '#24452A', hl: '#D9E39A', p1: '#E8713A', p2: '#FFB98A' },
  guanabana: { h: '#173A2A', hl: '#6FA36A', p1: '#D6EBC0', p2: '#FFFFFF' },
  sandia: { h: '#2E6B32', hl: '#8FCB6A', p1: '#C8173F', p2: '#FF7A8C', v: '#F7B2C8' },
  guayaba: { h: '#3E4A12', hl: '#C9D36A', p1: '#D9A912', p2: '#FFE98A', v: '#F6EFC4', s: '#FFE98A' },
}

function estallido(n = 12, r1 = 50, r2 = 32) {
  const p = []
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? r2 : r1
    p.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`)
  }
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="${p.join(' ')}" /></svg>`
}
// la palabra del sello junto a la botella, una por paso
const PALABRAS = ['Cada semana', 'Poco y seguido', 'El mismo día', 'Bien frías']
const ondas = `<svg class="ondas" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">${Array.from({ length: 10 }, (_, i) =>
  `<path d="M-20 ${10 + i * 21} C 60 ${-10 + i * 21}, 120 ${32 + i * 21}, 200 ${10 + i * 21} S 340 ${-10 + i * 21}, 420 ${10 + i * 21}" />`).join('')}</svg>`

document.getElementById('app').innerHTML = html`
<header class="barra">
  <a class="barra-logo" href="#" aria-label="Natural"><span></span></a>
  <nav><a href="#nosotros">Nosotros</a><a href="#negocios">Negocios</a><a href="#donde">Dónde comprar</a><a href="#dudas">Dudas</a></nav>
  <button class="pildora clara abre-pedido">Mi pedido <b class="cuenta-pedido" hidden>0</b></button>
  <button class="abre-menu" aria-label="Menú" aria-expanded="false"><i></i><i></i></button>
</header>

<canvas class="lienzo" aria-hidden="true"></canvas>
<div class="viaje">
<section class="sabores" id="sabores" aria-roledescription="carrusel" aria-label="Sabores">
  <h1 class="solo-lector">Somos Natural · Aguas de sabor hechas en Puebla. Se hacen hoy, te llegan mañana.</h1>
  <div class="hueco-hero" data-botella="hero" aria-hidden="true"></div>
  <img class="botella-plana" alt="" />
  <div class="lado lado-izq"><svg class="bota bota-izq" viewBox="0 0 520 1000" preserveAspectRatio="xMinYMax meet" aria-hidden="true"></svg></div>
  <div class="lado lado-der"><svg class="bota bota-der" viewBox="0 0 640 1000" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"></svg></div>
  <div class="gotita-caja" aria-hidden="true"><div class="ilu"></div>${frente()}</div>
</section>
<div class="capa-frente">
  <div class="mando">
    <button class="flechita izq" aria-label="Sabor anterior">←</button>
    <p class="nombre-pildora" aria-live="polite"><span class="nombre"></span></p>
    <button class="mas agregar" aria-label="Agregar este sabor a mi pedido">+</button>
    <button class="flechita der" aria-label="Sabor siguiente">→</button>
  </div>
</div>
</div>

<div class="stickers" aria-hidden="true"><div class="stickers-pista">${[...lista, ...lista].map((s) => { const [f] = mundos[s.etq]; return `<span style="--f:${f}"><img src="/marca/ilu-${s.etq}.svg" alt="" loading="lazy" onerror="this.parentNode.remove()" /></span>` })}</div></div>

<section class="proceso" id="proceso">
  ${ondas}
  <div class="proceso-cols">
    <div class="proceso-txt">
      <div class="proceso-cabeza" data-revela>
        <p class="sobre">Así le hacemos</p>
        <h2>De la olla a tu refri<br />en menos de un día.</h2>
      </div>
      <div class="proceso-movil" data-revela aria-hidden="true">${escenario('esc-movil')}<img class="proceso-movil-botella" alt="" /></div>
      <ol>${proceso.map((p, i) => `<li><span>0${i + 1}</span><h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('')}</ol>
    </div>
    <div class="hueco-proceso" data-botella="proceso" aria-hidden="true">${escenario()}<div class="proceso-sello">${PALABRAS.map((w, i) => `<b style="--k:${i}">${w}</b>`).join('')}</div></div>
  </div>
</section>

<section class="nosotros" id="nosotros">
  <figure class="nosotros-foto" data-revela>${ramito(3)}<img class="asoma" src="/marca/gotita-asoma.svg" alt="" /><img src="/img/fotos/formacion.jpg" alt="Un agua de jamaica y una de horchata, frías y recién puestas, junto a una maceta de talavera" loading="lazy" /></figure>
  <div class="nosotros-txt" data-revela>
    <p class="sobre">Nosotros</p>
    <h2>Somos una familia poblana que hace aguas de verdad.</h2>
    <p>Somos cuatro. Las hacemos la tarde anterior y te las dejamos frías por la mañana.</p>
  </div>
</section>



<section class="negocios" id="negocios">
  <article class="tarjeta" data-revela style="--f:#E8F9A2;--t:#6D0101">
    <div class="estallido">${estallido()}<em>¡Desde ${minimo}!</em></div>${ramito(5, { espejo: true })}
    <p class="sobre">Para tu negocio</p>
    <h2>Tiendas, torterías y restaurantes</h2>
    <ul>${ventajas.map((v) => `<li>${v.titulo}</li>`)}</ul>
    <a class="pildora oscura" href="${wa('Hola, tengo un negocio y me interesa surtir aguas Natural')}" target="_blank" rel="noopener">Quiero que me surtan</a>
  </article>
  <article class="tarjeta" data-revela style="--f:#FFD5FB;--t:#5F0032">
    <div class="timbre" style="--f:#8C66BB;--t:#FFFDF2"><img src="/marca/gotita.svg" alt="" /><b>¡Salud!</b></div>${ramito(8)}
    <p class="sobre">Para tu evento</p>
    <h2>Fiestas, bodas y reuniones</h2>
    <ul>${eventos.map((v) => `<li>${v.titulo}</li>`)}</ul>
    <a class="pildora oscura" href="${wa('Hola, quiero aguas Natural para un evento')}" target="_blank" rel="noopener">Apartar mi fecha</a>
  </article>
</section>

<section class="dudas" id="dudas">
  <div class="dudas-cabeza" data-revela><p class="sobre">Dudas</p><h2>Lo que más nos preguntan.</h2><div class="dudas-ventana">${ventanita('v-dudas')}<img class="gotita-duda" src="/marca/gotita-dudando.svg" alt="" /></div></div>
  <div class="acordeon" data-revela>
    <details><summary>¿Cuál es el pedido mínimo?</summary><p>${minimo} aguas, del sabor o sabores que quieras. Si solo quieres una, búscala en las tiendas de la zona.</p></details>
    <details><summary>¿Hasta dónde reparten?</summary><p>Repartimos en la zona sur de Puebla, temprano por la mañana, tienda por tienda.</p></details>
    <details><summary>¿Tienen sin azúcar?</summary><p>Sí. Cada agua puede ir ${dulzura.map((d) => d.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' o $1')}.</p></details>
    <details><summary>¿Hacen pedidos para eventos?</summary><p>Sí. Nos escribes con la fecha, la apartamos y las hacemos para ese día: llegan frías, no salen de una bodega.</p></details>
    <details><summary>¿Qué tamaños manejan?</summary><p>${tamanos.map((t) => t.nombre).join(', ').replace(/, ([^,]*)$/, ' y $1')}.</p></details>
    <details><summary>¿Y si una botella se echa a perder?</summary><p>Nos avisas y te la cambiamos por una nueva.</p></details>
  </div>
</section>

<section class="donde" id="donde">
  <div data-revela>
    <p class="sobre">¿Solo quieres una?</p>
    <h2>Búscala en la tienda de la esquina.</h2>
    <p class="donde-txt">Estas tiendas de la zona sur las tienen frías.</p>
  </div>
  <ul>${puntosDeVenta.map((p) => `<li><a href="${p.mapa}" target="_blank" rel="noopener">${p.nombre}<span>↗</span></a></li>`)}</ul>
  <div class="seto" data-revela aria-hidden="true">${[11, 12, 13, 14, 15, 16, 17].map((k, i) => ramito(k, { espejo: i % 2 === 1, flores: 1 + (i % 2) })).join('')}</div>
</section>

<footer class="pie">
  <div class="pie-arriba">
    <div class="firma"><img class="firma-letras" src="/marca/natural-crema.svg" alt="Natural" /><img class="firma-gotita" src="/marca/gotita-sentada.svg" alt="" /></div>
    <div class="pie-cta"><p>¿Se te antojó?</p><button class="pildora abre-pedido-pie">Armar mi pedido</button></div>
  </div>
  <div class="pie-cols">
    <div class="pie-sello">${sello('a', { anillo: '#FFFDF2', papel: '#8C66BB' })}</div>
    <nav><b>Sitio</b><a href="#sabores">Sabores</a><a href="#nosotros">Nosotros</a><a href="#negocios">Negocios y eventos</a><a href="#donde">Dónde comprar</a><a href="#dudas">Dudas</a></nav>
    <div><b>Pedidos</b><a href="${wa()}" target="_blank" rel="noopener">WhatsApp 222 442 2840</a><a href="${negocio.instagram}" target="_blank" rel="noopener">Instagram @somos_natural_mx</a></div>
    <div><b>Reparto</b><span>Zona sur de Puebla</span><span>Temprano por la mañana</span><span>Desde ${minimo} aguas</span></div>
  </div>
  <div class="pie-legal">
    <p>© ${new Date().getFullYear()} Somos Natural · Aguas de sabor hechas en Puebla</p>
    <a class="kaizen" href="https://kaizenstudiomx.com" target="_blank" rel="noopener" aria-label="Developed by KaiZen">Developed by<svg viewBox="-8 -10 498 120" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="15" stroke-linejoin="miter"><path d="M7 0V100 M66 0 12 54 M30 37 70 100"/><path d="M92 100 132 6 172 100"/><path d="M201 0V100"/><path d="M230 7H300L230 93H300"/><path d="M388 7H322L360 50 322 93H388"/><path d="M417 100V7L473 93V0"/></g></svg></a>
  </div>
</footer>

<div class="pedido" id="pedido" hidden>
  <div class="pedido-fondo"></div>
  <aside class="pedido-panel" role="dialog" aria-modal="true" aria-label="Mi pedido">
    <header><h2>Mi pedido</h2><button class="pedido-cerrar" aria-label="Cerrar">×</button></header>
    <ul class="pedido-lista">${lista.map((s) => { const [f] = mundos[s.etq]; return `<li style="--f:${f}"><img src="/referencias/cartas/${s.etq}.webp" alt="" loading="lazy" /><span>${s.corto}</span><div class="contador"><button data-etq="${s.etq}" data-d="-1" aria-label="Una menos de ${s.corto}">−</button><output data-etq="${s.etq}">0</output><button data-etq="${s.etq}" data-d="1" aria-label="Una más de ${s.corto}">+</button></div></li>` })}</ul>
    <div class="pedido-opciones">
      <label>Tamaño <select id="p-tamano">${tamanos.filter((t) => !t.nombre.startsWith('Garraf')).map((t) => `<option${t.principal ? ' selected' : ''}>${t.nombre}</option>`)}</select></label>
      <label>Dulzura <select id="p-dulzura">${dulzura.map((d) => `<option>${d}</option>`)}</select></label>
    </div>
    <p class="pedido-aviso"></p>
    <a class="pildora oscura pedido-enviar" target="_blank" rel="noopener">Enviar por WhatsApp</a>
  </aside>
</div>
`

const barra = document.querySelector('.barra')
const alBajar = () => barra.classList.toggle('bajo', scrollY > 40)
addEventListener('scroll', alBajar, { passive: true }); alBajar()

// ── Sabores: un mundo a la vez ──────────────────────────────────────────────
const sec = document.querySelector('.sabores')
const $s = (c) => sec.querySelector(c)
const lienzo = document.querySelector('.lienzo')
const plana = $s('.botella-plana')
let actual = 0, escena = null, giro = null

function pintar(i) {
  const s = lista[i], [f, t] = mundos[s.etq]
  const raiz = document.documentElement.style
  raiz.setProperty('--f', f); raiz.setProperty('--t', t)
  const b = { ...base, ...botanica[s.etq] }
  for (const k in b) raiz.setProperty(`--${k}`, b[k])
  // su composición: flores, destellos, hojas, ventana y DÓNDE va la gotita
  const comp = componer(i + 1)
  sec.querySelector('.bota-izq').innerHTML = comp.izq
  sec.querySelector('.bota-der').innerHTML = comp.der
  const caja = sec.querySelector('.gotita-caja')
  const g = comp.gotita
  sec.querySelector(g.lado === 'der' ? '.lado-der' : '.lado-izq').append(caja)
  Object.assign(caja.style, { left: g.left || 'auto', right: g.right || 'auto', bottom: g.bottom, height: `min(${g.alto}svh, ${Math.round(g.alto * 0.6)}vw)` })
  caja.classList.toggle('espejo', g.lado === 'der')
  // que brote: tallos que se dibujan, hojas que brotan, flores que florecen
  sec.classList.remove('brota'); void sec.offsetWidth; sec.classList.add('brota')
  clearTimeout(pintar.t); pintar.t = setTimeout(() => sec.classList.remove('brota'), 2600)
  document.querySelector('.mando .nombre').textContent = s.nombre
  document.querySelector('.mando .agregar').setAttribute('aria-label', `Agregar ${s.corto} a mi pedido`)
  const ilu = $s('.ilu')
  ilu.classList.remove('ver')
  const pedida = s.etq
  fetch(`/marca/ilu-${s.etq}.svg`).then((r) => (r.ok ? r.text() : Promise.reject())).then((svg) => {
    if (lista[actual].etq !== pedida) return
    svg = String(svg)
    // vtracer no pone viewBox: sin él el SVG no escala y se ve recortado
    const [, w, h] = svg.match(/width="([0-9.]+)"[^>]*height="([0-9.]+)"/) || []
    if (w && !/viewBox/.test(svg)) svg = svg.replace('<svg ', `<svg viewBox="0 0 ${w} ${h}" `)
    ilu.innerHTML = svg // con sus colores de siempre (teñida se veía lavada en limón)
    requestAnimationFrame(() => ilu.classList.add('ver'))
  }).catch(() => { ilu.innerHTML = '' })
  plana.src = `/referencias/cartas/${s.etq}.webp`
  const pm = document.querySelector(".proceso-movil-botella"); if (pm) pm.src = plana.src
}
function ir(i, dir = 1) {
  i = (i + lista.length) % lista.length
  sec.style.setProperty('--dir', dir)
  ir.dir = dir
  if (i === actual) return
  const de = actual
  actual = i
  if (escena) giro = { inicio: performance.now(), dura: 1300, cambio: false, de, a: i } // 1.3 s (antes 0.9): Zahir lo quiso más despacio
  // Como Mana: los dos lados van pegados a UN DISCO enorme con el centro muy
  // abajo (fuera de la pantalla). Gira hacia donde va la flecha: lo viejo se va
  // rodando y pasa POR DETRÁS de la botella, y lo nuevo viene justo detrás, en la
  // misma rueda, al mismo tiempo. Lo viejo es una copia "fantasma" que conserva
  // sus colores mientras sale.
  clearTimeout(ir.t1)
  sec.querySelectorAll('.fantasma').forEach((f) => f.remove())
  const raizEst = getComputedStyle(document.documentElement)
  const fantasma = document.createElement('div')
  fantasma.className = 'fantasma'
  fantasma.dataset.variante = sec.dataset.variante
  if (sec.classList.contains('con-elem')) fantasma.classList.add('con-elem')
  for (const k of ['--f', '--t', '--h', '--hl', '--p1', '--p2', '--v', '--s']) fantasma.style.setProperty(k, raizEst.getPropertyValue(k))
  sec.querySelectorAll(':scope > .lado').forEach((l) => fantasma.append(l.cloneNode(true)))
  sec.append(fantasma)
  pintar(i)
  sec.classList.remove('entra'); sec.classList.add('entra-desde')
  void sec.offsetWidth
  sec.classList.remove('entra-desde'); sec.classList.add('entra')
  fantasma.classList.add('va')
  ir.t1 = setTimeout(() => { fantasma.remove(); sec.classList.remove('entra') }, 950)
}
document.querySelector('.mando .izq').addEventListener('click', () => ir(actual - 1, -1))
document.querySelector('.mando .der').addEventListener('click', () => ir(actual + 1, 1))
sec.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') ir(actual - 1, -1); if (e.key === 'ArrowRight') ir(actual + 1, 1) })
let x0 = null
sec.addEventListener('pointerdown', (e) => { if (!e.target.closest('button,a')) x0 = e.clientX })
sec.addEventListener('pointerup', (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) ir(actual + (e.clientX < x0 ? 1 : -1), e.clientX < x0 ? 1 : -1); x0 = null })
pintar(0)

// El tramo pegado del hero y el movimiento de las ilustraciones con el scroll
const viaje = document.querySelector('.viaje')
function viajeP() { const r = viaje.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))) }
addEventListener('scroll', () => sec.style.setProperty('--p', viajeP().toFixed(3)), { passive: true })

// ── La botella acompaña la página ───────────────────────────────────────────
// UNA botella en UN lienzo fijo. Paradas (huecos data-botella): el hero (donde
// se inclina hacia la cámara al bajar, como en Mana), "Así le hacemos" (viaja
// girando hasta ahí y da vueltas mientras se recorren los pasos) y el pie (cae
// desde arriba junto a la firma). Entre proceso y el pie se va: no pasa encima
// del texto. En teléfono solo vive en el hero.
const suave = (t) => t * t * (3 - 2 * t)
const lim = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const mezcla = (a, b, t) => a + (b - a) * t
const mezclaPose = (A, B, t) => Object.fromEntries(Object.keys(A).map((k) => [k, mezcla(A[k], B[k] ?? 0, t)]))
const hProc = document.querySelector('[data-botella="proceso"]')
const secProc = document.querySelector('.proceso')
const pasosProc = [...secProc.querySelectorAll('li')]
const selloProc = [...secProc.querySelectorAll('.proceso-sello b')]
const esMovil = () => innerWidth < 900

function poseHueco(el, extra = {}) {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height * 0.46, alto: r.height * 0.92, giroY: 0, ladeo: 0, cabeceo: 0, ...extra }
}
// ── Pantalla de carga (13-nov, 2ª versión) ──────────────────────────────────
// Una frase gigante que se arma letra por letra, cada letra del color de un
// sabor; luego todas se pintan de tinta, aparecen los destellos y la gotita, y
// sale con un disco del color del primer sabor que crece desde el centro (el
// hero tiene ese mismo fondo: el corte no se nota). Espera a la botella 3D pero
// dura mínimo lo que tarda la frase (3 s) y máximo 9 s. Al picar el logotipo de la
// barra se vuelve a ver y regresa al inicio.
const FRASE = ['AGUAS', 'DE SABOR', 'DE VERDAD']
const colores = Object.values(mundos).map(([f, t]) => t === '#FCE9D2' || t === '#FCF4F0' || t === '#E8F9A2' || t === '#E8F5D8' ? f : t)
function htmlCarga() {
  let i = 0
  // la gotita va sentada sobre la S de AGUAS (dentro de la primera línea)
  const lineas = FRASE.map((l, n) => `<span class="cl">${[...l].map((c) => c === ' ' ? '<i class="esp"></i>' : `<b style="--i:${i};--c:${colores[(i++ * 5) % colores.length]}">${c}</b>`).join('')}${n === 0 ? '<img class="carga-gotita" src="/marca/gotita-sentada.svg" alt="" />' : ''}</span>`).join('')
  const destellos = [[16, 22, 1.2], [84, 18, 0.9], [10, 70, 0.8], [90, 74, 1.3], [30, 88, 0.7], [70, 10, 0.7]].map(([x, y, e], k) =>
    `<svg class="cd" style="left:${x}%;top:${y}%;--e:${e};--k:${k}" viewBox="-30 -30 60 60"><path d="M0 -26 C 3 -8 8 -3 26 0 C 8 3 3 8 0 26 C -3 8 -8 3 -26 0 C -8 -3 -3 -8 0 -26 Z" /></svg>`).join('')
  return `<div class="carga" aria-hidden="true"><span class="carga-lado izq">Hechas</span><span class="carga-lado der">en Puebla</span>
    <div class="carga-frase">${lineas}</div>${destellos}<span class="carga-disco"></span></div>`
}
let carga = null, cargaLista = 0
function mostrarCarga() {
  carga?.remove()
  document.body.insertAdjacentHTML('afterbegin', htmlCarga())
  carga = document.querySelector('.carga')
  const minimo = matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 3000
  cargaLista = performance.now() + minimo
}
function quitarCarga() {
  const c = carga
  if (!c || c.classList.contains('sale')) return
  setTimeout(() => {
    c.classList.add('sale')
    setTimeout(() => c.remove(), 1100)
  }, Math.max(0, cargaLista - performance.now()))
}
mostrarCarga()
setTimeout(quitarCarga, 9000)   // tope: con internet muy lento, mejor ver el sitio que esperar más
document.querySelector('.barra-logo').addEventListener('click', (ev) => {
  ev.preventDefault()
  mostrarCarga()
  barra.classList.remove('menu-abierto')
  setTimeout(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 0); document.documentElement.style.scrollBehavior = '' }, 500)
  quitarCarga()
})
function cuadro() {
  if (!escena) return
  const W = innerWidth, H = innerHeight, ahora = performance.now()
  // vaivén en reposo: 0.38 rad (antes 0.22) para que enseñe más de la etiqueta
  let respira = Math.sin(ahora / 1600) * 0.38
  if (giro) {
    const t = Math.min(1, (ahora - giro.inicio) / giro.dura)
    respira += suave(t) * Math.PI * 2 * (ir.dir || 1)
    if (!giro.cambio && t > 0.5) { escena.sabor(lista[giro.a].botella); giro.cambio = true } // de espaldas
    if (t >= 1) giro = null
  }
  // 1 · del hero a "Así le hacemos" en UN solo viaje (como Mana): mientras se
  // scrollea va bajando con la página y da una maroma completa hacia la cámara
  // (enseña la tapa, se acuesta, queda de cabeza) que TERMINA, ya parada, justo
  // al llegar a su lugar en la sección. Antes giraba quieta en el hero.
  const e = suave(viajeP())
  let opacidad = 1
  let pose = { x: W / 2 + e * W * 0.02, y: H * (0.42 + e * 0.08) + Math.sin(ahora / 900) * 4 * (1 - e), alto: H * (0.74 + e * 0.06),
    giroY: respira, ladeo: -0.13, cabeceo: 0 }
  if (!esMovil()) {
    const rs = secProc.getBoundingClientRect()
    const llegada = Math.max(1, rs.top + scrollY)          // scroll en que la sección toca arriba
    const c = suave(lim(scrollY / llegada))                // 0 → 1 en todo el viaje
    const avance = lim(-rs.top / Math.max(1, rs.height - H))
    const destino = poseHueco(hProc)
    const inicio = { x: W / 2, y: H * 0.42 + Math.sin(ahora / 900) * 4 * (1 - c), alto: H * 0.8 }
    // el hueco viene subiendo desde abajo: se topa para que la botella baje con
    // la página sin hundirse fuera de la pantalla
    const yDestino = Math.min(destino.y, H * 0.74)
    pose = {
      x: mezcla(inicio.x, destino.x, c), y: mezcla(inicio.y, yDestino, c), alto: mezcla(inicio.alto, destino.alto, c),
      giroY: respira + c * 0.8 + avance * Math.PI * 2,
      ladeo: mezcla(-0.13 - Math.sin(c * Math.PI) * 0.35, 0.1, c),
      cabeceo: c * Math.PI * 2,
      voltea: 0.95 * Math.pow(Math.sin(c * Math.PI), 0.35),    // la maroma en diagonal: nunca de frente
    }
    if (c >= 1) Object.assign(pose, { x: destino.x, y: destino.y })
    // 2 · en la sección gira sobre su eje mientras se leen los pasos
    const paso = Math.min(pasosProc.length - 1, Math.floor(avance * pasosProc.length))
    pasosProc.forEach((li, k) => li.classList.toggle('activo', k === paso))
    selloProc.forEach((b, k) => b.classList.toggle('activo', c >= 1 && k === paso))
    secProc.style.setProperty('--avance', avance.toFixed(3))
    secProc.style.setProperty('--paso', String(c >= 1 ? paso + 1 : 0))
    // 3 · se va antes del contenido de texto
    if (rs.top < H) opacidad = lim((rs.bottom - H * 0.35) / (H * 0.35))
    // (el pie ya no lleva botella: 13-nov Zahir prefirió la firma sola, al centro)
  } else {
    opacidad = lim((viaje.getBoundingClientRect().bottom - H * 0.3) / (H * 0.4))
  }
  lienzo.style.opacity = opacidad
  if (opacidad > 0.01) { escena.poner(pose); escena.dibujar() }
  requestAnimationFrame(cuadro)
}
import('../../botella/webgl').then(({ hayWebGL }) => hayWebGL() ? import('../lavanda/escena') : null).then((m) => {
  if (!m) return
  escena = m.crearEscena(lienzo, { movil: matchMedia('(max-width: 900px)').matches })
  escena.precargar(lista.map((s) => s.botella))
  escena.sabor(lista[actual].botella)
  sec.classList.add('con-3d')
  document.documentElement.classList.add('con-3d')
  cuadro()
  // se destapa cuando la botella ya tiene su luz y su etiqueta, y las letras
  // ya cargaron; dos cuadros después, para que ya esté dibujada
  return Promise.all([escena.listo(lista[actual].botella.etq), document.fonts.ready])
    .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}).catch(() => {}).finally(() => { if (escena) quitarCarga(); else document.fonts.ready.then(quitarCarga) })

// ── Mi pedido: varios sabores, tamaño y dulzura → WhatsApp ────────────────
const cantidades = Object.fromEntries(lista.map((s) => [s.etq, 0]))
const panel = document.getElementById('pedido')
function actualizarPedido() {
  const total = Object.values(cantidades).reduce((a, b) => a + b, 0)
  document.querySelectorAll('.pedido-lista output').forEach((o) => { o.value = cantidades[o.dataset.etq]; o.closest('li').classList.toggle('con', cantidades[o.dataset.etq] > 0) })
  const cuenta = document.querySelector('.cuenta-pedido')
  cuenta.textContent = total; cuenta.hidden = total === 0
  const falta = Math.max(0, minimo - total)
  document.querySelector('.pedido-aviso').textContent = total === 0 ? `Mínimo ${minimo} aguas, del sabor que quieras.` : falta ? `Llevas ${total}. Faltan ${falta} para el mínimo.` : `Llevas ${total} aguas. ¡Listo!`
  const lineas = lista.filter((s) => cantidades[s.etq]).map((s) => `• ${cantidades[s.etq]} de ${s.nombre.toLowerCase()}`)
  const tam = document.getElementById('p-tamano').value, dul = document.getElementById('p-dulzura').value
  document.querySelector('.pedido-enviar').href = wa(lineas.length ? `Hola, quiero pedir (${tam}, ${dul.toLowerCase()}):\n${lineas.join('\n')}` : 'Hola, quiero pedir aguas Natural')
}
function abrirPedido() { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('abierto')); document.documentElement.classList.add('con-pedido') }
function cerrarPedido() { panel.classList.remove('abierto'); document.documentElement.classList.remove('con-pedido'); setTimeout(() => { panel.hidden = true }, 350) }
document.querySelector('.abre-pedido').addEventListener('click', abrirPedido)
document.querySelector('.abre-pedido-pie').addEventListener('click', abrirPedido)
// menú del celular: las mismas píldoras en un panel de vidrio
const botonMenu = document.querySelector('.abre-menu')
botonMenu.addEventListener('click', () => { const abierto = barra.classList.toggle('menu-abierto'); botonMenu.setAttribute('aria-expanded', abierto) })
barra.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', () => { barra.classList.remove('menu-abierto'); botonMenu.setAttribute('aria-expanded', 'false') }))
panel.querySelector('.pedido-cerrar').addEventListener('click', cerrarPedido)
panel.querySelector('.pedido-fondo').addEventListener('click', cerrarPedido)
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) cerrarPedido() })
panel.querySelectorAll('.contador button').forEach((b) => b.addEventListener('click', () => {
  cantidades[b.dataset.etq] = Math.max(0, cantidades[b.dataset.etq] + Number(b.dataset.d)); actualizarPedido()
}))
panel.querySelectorAll('select').forEach((x) => x.addEventListener('change', actualizarPedido))
// "Agregar a mi pedido" suma una del sabor en pantalla y brinca el contador
document.querySelector('.mando .agregar').addEventListener('click', () => {
  cantidades[lista[actual].etq]++; actualizarPedido()
  const c = document.querySelector('.abre-pedido'); c.classList.remove('brinca'); void c.offsetWidth; c.classList.add('brinca')
  const m = document.querySelector('.mando .agregar'); m.classList.remove('hecho'); void m.offsetWidth; m.classList.add('hecho')
})
actualizarPedido()

revelar()
barraReferencias('mundos')
