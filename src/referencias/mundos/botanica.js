// La botánica del hero (2026-11-12). Vector a mano, con el MISMO contorno
// morado oscuro que las ilustraciones (así todo es un solo mundo).
//
// Cada sabor arma SU composición (Zahir: "que las gotitas y las flores estén
// repartidas, no en el mismo lugar"): un generador con semilla por sabor
// reparte flores, destellos, hojas, la ventana con nubes y decide dónde va la
// gotita. La semilla es fija, así que el mismo sabor siempre se ve igual.
//
// Colores por variables CSS del mundo:
//   --h hoja · --hl nervadura · --p1/--p2 pétalos · --v ventana · --s estallido · --crema
// Animaciones (estilo.css): al entrar un sabor los tallos se DIBUJAN, las hojas
// BROTAN, las flores FLORECEN girando y los destellos aparecen; luego en reposo.

let n = 0
const azar = (semilla) => () => {
  semilla |= 0; semilla = (semilla + 0x6D2B79F5) | 0
  let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const entre = (r, a, b) => a + r() * (b - a)

// orden de aparición (para escalonar la animación de entrada)
let orden = 0
const d = () => `style="--d:${(orden++ * 0.05).toFixed(2)}s"`

const hoja = (x, y, ang, e = 1, espejo = false) => {
  const s = espejo ? -1 : 1
  return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${ang.toFixed(0)})"><g class="b-brota" ${d()}><g transform="scale(${(e * s).toFixed(2)} ${e.toFixed(2)})">
    <path class="b-hoja" d="M0 0 C 30 -46 110 -64 172 -26 C 130 22 52 30 0 0 Z" />
    <path class="b-vena" d="M8 -2 C 60 -18 112 -26 160 -24" />
    ${[34, 64, 94, 124].map((k, i) => `<path class="b-vena" d="M${k} ${-8 - i * 3} c 10 -12 18 -20 26 -26" /><path class="b-vena" d="M${k} ${-6 - i * 3} c 12 6 20 10 30 12" />`).join('')}
  </g></g></g>`
}
const flor = (x, y, e = 1, ang = 0) => {
  const id = `p${n++}`
  return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${e.toFixed(2)})"><g class="b-flor" ${d()}><g class="b-gira" style="--g:${(14 + (n % 5) * 3)}s;--sentido:${n % 2 ? 1 : -1}"><g transform="rotate(${ang.toFixed(0)})">
    <defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="b-p1" /><stop offset="1" class="b-p2" /></linearGradient></defs>
    ${[0, 72, 144, 216, 288].map((a) => { const r = (a - 90) * Math.PI / 180; return `<ellipse cx="${(Math.cos(r) * 40).toFixed(1)}" cy="${(Math.sin(r) * 40).toFixed(1)}" rx="38" ry="34" transform="rotate(${a} ${(Math.cos(r) * 40).toFixed(1)} ${(Math.sin(r) * 40).toFixed(1)})" fill="url(#${id})" />` }).join('')}
    <circle class="b-crema" r="21" />
  </g></g></g></g>`
}
const nube = (x, y, e = 1) => `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${e.toFixed(2)})"><g class="b-crema b-nube" style="--nv:${(7 + (n++ % 4) * 2)}s"><circle cx="-34" cy="6" r="26" /><circle cx="0" cy="-12" r="36" /><circle cx="38" cy="2" r="28" /><rect x="-60" y="4" width="126" height="30" rx="15" /></g></g>`
const destello = (x, y, e = 1) => `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${e.toFixed(2)})"><g class="b-destello" ${d()}><path class="b-crema" d="M0 -26 C 3 -8 8 -3 26 0 C 8 3 3 8 0 26 C -3 8 -8 3 -26 0 C -8 -3 -3 -8 0 -26 Z" /></g></g>`
const estallido = (x, y, r1, r2, puntas = 14) => `<g class="b-sol-caja" ${d()}><polygon class="b-sol" points="${Array.from({ length: puntas * 2 }, (_, i) => { const a = (i / (puntas * 2)) * Math.PI * 2, r = i % 2 ? r2 : r1; return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}` }).join(' ')}" /></g>`
// Margarita grande (13-nov): reemplaza al estallido de picos, que no decía
// nada. Pétalos largos en el color del sabor, una corona más oscura y el
// centro amarillo con semillitas. Gira lento (b-sol) y florece al entrar.
const margarita = (x, y, r) => {
  const petalos = (n, dist, rx, ry, color, giro = 0) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * 360 + giro
    return `<ellipse cx="0" cy="${(-dist).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" transform="rotate(${a.toFixed(1)})" style="fill:${color}" />`
  }).join('')
  const semillas = Array.from({ length: 14 }, (_, i) => {
    const a = i * 2.39996, rr = Math.sqrt(i / 14) * r * 0.2
    return `<circle cx="${(Math.cos(a) * rr).toFixed(1)}" cy="${(Math.sin(a) * rr).toFixed(1)}" r="${(r * 0.025).toFixed(1)}" style="fill:var(--tinta);stroke:none" />`
  }).join('')
  return `<g class="b-sol-caja" ${d()}><g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><g class="b-sol b-margarita">
    ${petalos(16, r * 0.58, r * 0.16, r * 0.44, 'var(--p2)')}${petalos(12, r * 0.4, r * 0.13, r * 0.26, 'var(--p1)', 15)}
    <circle r="${(r * 0.3).toFixed(1)}" style="fill:var(--s)" />${semillas}</g></g></g>`
}
const tallo = (dd, fino = false) => `<path class="b-tallo-borde" pathLength="1" stroke-width="${fino ? 24 : 32}" d="${dd}" /><path class="b-tallo${fino ? ' fino' : ''}" pathLength="1" d="${dd}" />`

// Tallos posibles por lado, cada uno con los puntos donde caben hojas y flores
const TALLOS_DER = [
  { d: 'M300 1010 C 300 880 250 760 300 640 C 340 540 330 420 280 300 C 250 230 260 170 300 110', rama: 'M300 640 C 380 600 420 520 430 430',
    hojas: [[300, 860, -150], [304, 760, -30], [296, 560, -160], [330, 470, -20], [268, 330, -150], [430, 470, -70]], punta: [300, 105], ramaPunta: [430, 420] },
  { d: 'M420 1010 C 400 860 480 760 440 620 C 400 500 470 380 440 230 C 430 180 450 140 480 100', rama: 'M440 620 C 360 580 330 500 320 420',
    hojas: [[420, 900, -30], [450, 760, -150], [430, 600, -20], [460, 470, -160], [445, 320, -30], [320, 470, -110]], punta: [480, 95], ramaPunta: [320, 410] },
  { d: 'M220 1010 C 260 900 200 800 250 700 C 300 600 360 560 380 450 C 395 360 360 280 400 180', rama: 'M250 700 C 160 660 140 580 150 500',
    hojas: [[230, 920, -150], [260, 780, -30], [330, 590, -150], [385, 420, -30], [380, 260, -150], [150, 560, -100]], punta: [400, 170], ramaPunta: [150, 490] },
]
const TALLOS_IZQ = [
  { d: 'M120 1010 C 110 900 190 840 170 740 C 150 640 60 600 80 500', rama: 'M170 740 C 240 720 290 660 300 600',
    hojas: [[120, 940, -20], [178, 800, -160], [150, 680, -10], [80, 560, -150], [300, 610, -40]], punta: [80, 470], ramaPunta: [310, 560] },
  { d: 'M60 1010 C 90 880 40 780 110 660 C 170 560 160 440 220 330 C 250 270 240 220 230 170', rama: 'M110 660 C 200 640 260 600 290 520',
    hojas: [[70, 930, -30], [100, 760, -150], [160, 540, -30], [215, 400, -150], [230, 250, -40], [280, 560, -60]], punta: [230, 160], ramaPunta: [300, 500] },
]

// Lugares posibles de la gotita en el hero (en % de la pantalla)
const GOTITA = [
  { lado: 'izq', left: '8vw', bottom: '10svh', alto: 46 },
  { lado: 'izq', left: '4vw', bottom: '30svh', alto: 40 },
  { lado: 'izq', left: '13vw', bottom: '4svh', alto: 50 },
  { lado: 'der', right: '9vw', bottom: '8svh', alto: 44 },
  { lado: 'der', right: '15vw', bottom: '32svh', alto: 38 },
]

export function componer(semilla) {
  const r = azar(semilla * 9973 + 17)
  orden = 0
  const gotita = GOTITA[semilla % GOTITA.length]
  // ── derecha
  const td = TALLOS_DER[Math.floor(r() * TALLOS_DER.length)]
  const conVentana = r() > 0.4
  const vx = entre(r, 440, 540), vy = entre(r, 300, 480)
  let der = ''
  if (conVentana) {
    der += `<g class="b-ventana-caja" ${d()}><ellipse class="b-ventana" cx="${vx.toFixed(0)}" cy="${vy.toFixed(0)}" rx="128" ry="260" />
      <clipPath id="bv${semilla}"><ellipse cx="${vx.toFixed(0)}" cy="${vy.toFixed(0)}" rx="128" ry="260" /></clipPath>
      <g clip-path="url(#bv${semilla})">${nube(vx - 30, vy - 110, 1.1)}${nube(vx + 40, vy + 50, 1.25)}${nube(vx - 50, vy + 180, .9)}</g></g>`
  } else {
    der += `<g class="b-ventana-caja" ${d()}><circle class="b-ventana" cx="${vx.toFixed(0)}" cy="${vy.toFixed(0)}" r="${entre(r, 130, 170).toFixed(0)}" /></g>`
  }
  der += tallo(td.d) + tallo(td.rama, true)
  der += td.hojas.filter(() => r() > 0.15).map(([x, y, a], k) => hoja(x, y, a, entre(r, 1.05, 1.5), k % 2 === 0)).join('')
  const sx = entre(r, 120, 380), sy = entre(r, 640, 860)
  der += margarita(sx, sy, entre(r, 150, 200))
  der += flor(td.punta[0], td.punta[1], entre(r, 1.1, 1.5), entre(r, 0, 60)) + flor(td.ramaPunta[0], td.ramaPunta[1], entre(r, .8, 1.2), entre(r, 0, 60))
  for (let k = 0; k < 1 + Math.floor(r() * 2); k++) der += flor(entre(r, 150, 600), entre(r, 120, 880), entre(r, .6, 1.1), entre(r, 0, 60))
  der += hoja(entre(r, 360, 460), 1000, -60, entre(r, 1.6, 2.2)) + hoja(entre(r, 520, 600), 980, -100, entre(r, 1.3, 1.8), true)
  for (let k = 0; k < 3 + Math.floor(r() * 2); k++) der += destello(entre(r, 60, 600), entre(r, 80, 900), entre(r, .6, 1.2))
  // ── izquierda
  const ti = TALLOS_IZQ[Math.floor(r() * TALLOS_IZQ.length)]
  let izq = tallo(ti.d) + tallo(ti.rama, true)
  izq += ti.hojas.filter(() => r() > 0.15).map(([x, y, a], k) => hoja(x, y, a, entre(r, 1.05, 1.45), k % 2 === 1)).join('')
  izq += flor(ti.punta[0], ti.punta[1], entre(r, 1, 1.35), entre(r, 0, 60)) + flor(ti.ramaPunta[0], ti.ramaPunta[1], entre(r, .8, 1.1), entre(r, 0, 60))
  izq += flor(entre(r, 200, 420), entre(r, 820, 960), entre(r, 1.1, 1.5), entre(r, 0, 60))
  for (let k = 0; k < 2 + Math.floor(r() * 2); k++) izq += destello(entre(r, 30, 460), entre(r, 120, 900), entre(r, .6, 1.1))
  return { der, izq, gotita }
}

// Hojas que van DELANTE de la gotita (para que quede metida entre las plantas)
export function frente() {
  orden = 8
  return `<svg class="bota bota-frente" viewBox="0 0 420 260" aria-hidden="true"><g class="b-viento">${hoja(40, 230, -25, 1.25)}${hoja(250, 250, -150, 1.05, true)}${flor(330, 200, .9, 10)}</g></svg>`
}

// El escenario de "Así le hacemos" (2026-11-13): la ventana con nubes detrás de
// la botella y dos tallos que CRECEN con el scroll (dibujados según --avance).
// Cada hoja y flor trae --k: brota cuando la sección llega a ese paso (--paso),
// así el jardín se va llenando mientras se leen los pasos.
export function escenario(id = 'esc-v') {
  orden = 0
  const r = azar(4242)
  const paso = (k, svg) => `<g class="e-paso" style="--k:${k}">${svg}</g>`
  const izq = 'M150 1000 C 130 860 200 760 160 640 C 120 520 190 420 150 300 C 130 240 140 190 170 150'
  const der = 'M450 1000 C 480 880 410 790 450 680 C 490 570 430 470 470 360 C 490 300 480 250 455 210'
  let s = `<ellipse class="b-ventana" cx="300" cy="500" rx="262" ry="440" />
    <clipPath id="${id}"><ellipse cx="300" cy="500" rx="262" ry="440" /></clipPath>
    <g clip-path="url(#${id})">${nube(220, 260, 1.3)}${nube(380, 470, 1.5)}${nube(200, 700, 1.1)}${nube(400, 860, 1.2)}</g>`
  s += `<g class="e-crece">${tallo(izq)}${tallo(der)}</g>`
  const hojasI = [[150, 900, -150], [170, 760, -30], [140, 600, -160], [175, 470, -20], [150, 330, -150]]
  const hojasD = [[455, 920, -30], [440, 770, -150], [470, 620, -20], [445, 480, -160], [470, 330, -30]]
  hojasI.forEach(([x, y, a], i) => { s += paso(Math.min(3, Math.floor(i * 0.8)), hoja(x, y, a, entre(r, 1.05, 1.35), i % 2 === 1)) })
  hojasD.forEach(([x, y, a], i) => { s += paso(Math.min(3, Math.floor(i * 0.8)), hoja(x, y, a, entre(r, 1.05, 1.35), i % 2 === 0)) })
  s += paso(1, flor(80, 560, 1)) + paso(2, flor(530, 520, 1.1, 30)) + paso(3, flor(170, 140, 1.25, 15)) + paso(3, flor(455, 200, 1.3, 40))
  s += paso(0, destello(60, 300, 1)) + paso(1, destello(560, 330, .8)) + paso(2, destello(80, 820, .9)) + paso(3, destello(540, 760, 1.1))
  return `<svg class="bota escenario" viewBox="0 0 600 1000" aria-hidden="true">${s}</svg>`
}

// Adornos para el resto de la página (2026-11-13): el mismo lenguaje del hero
// (tallo con contorno, hojas con nervadura, flores del color del sabor y
// destellos) en piezas chicas. Entran animados cuando su bloque aparece (.ver).
export function ramito(semilla = 1, { espejo = false, flores = 2 } = {}) {
  orden = 0
  const r = azar(semilla * 7919 + 3)
  const dd = 'M150 440 C 150 360 120 300 150 230 C 175 170 160 110 170 70'
  let s = tallo(dd) + tallo('M150 300 C 200 280 235 240 245 190', true)
  ;[[150, 400, -150], [148, 330, -30], [140, 250, -150], [162, 175, -25]].forEach(([x, y, a], k) => {
    if (r() > 0.1) s += hoja(x, y, a, entre(r, 0.75, 0.95), k % 2 === 0)
  })
  s += flor(170, 62, entre(r, 0.85, 1.05), entre(r, 0, 60))
  if (flores > 1) s += flor(248, 182, entre(r, 0.55, 0.7), entre(r, 0, 60))
  s += destello(50, entre(r, 120, 260), entre(r, 0.6, 0.9)) + destello(270, entre(r, 300, 400), entre(r, 0.5, 0.8))
  return `<svg class="adorno ramito${espejo ? ' espejo' : ''}" viewBox="0 0 320 440" aria-hidden="true">${s}</svg>`
}

// Una ventanita con nubes (como la del hero) para que la gotita se asome
export function ventanita(id) {
  return `<svg class="adorno ventanita" viewBox="0 0 300 420" aria-hidden="true"><g class="b-ventana-caja"><ellipse class="b-ventana" cx="150" cy="210" rx="140" ry="200" />
    <clipPath id="${id}"><ellipse cx="150" cy="210" rx="140" ry="200" /></clipPath>
    <g clip-path="url(#${id})">${nube(110, 110, 0.9)}${nube(200, 250, 1.05)}${nube(90, 360, 0.8)}</g></g></svg>`
}
