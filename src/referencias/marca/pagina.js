import { lista, html } from '../comun'

// Hoja de marca de Somos Natural (2026-11-12). Paso 1 del plan con Zahir:
// la IDENTIDAD antes de la web nueva (referencias: Mana, Fizzly, Juicy Joy,
// Giddy Grapes, Pure Froot, Lemon Chill). Todo aquí es vector o código —nada
// de imagen generada salvo las pruebas de ilustración (camino "mixto":
// boceto de IA → vectorizado a tintas planas → limpieza).

// Cada sabor = un mundo de color: fondo + tinta (a la Juicy Joy / Mana)
import { mundos } from './datos'
export { mundos }

const base = [
  ['Lavanda', '#8C66BB', 'El sello. Color de la marca'], ['Crema', '#FFFDF2', 'Fondo y papel'], ['Aqua', '#E0F2F6', 'La gotita'],
  ['Tinta', '#2A1A40', 'Texto y contornos'], ['Jamaica', '#C8243E', 'Acento (la flor del sello)'], ['Maracuyá', '#F2C230', 'Acento (la fruta del sello)'],
]

const estallido = (n = 12, r1 = 50, r2 = 30) => {
  const p = []
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? r2 : r1
    p.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`)
  }
  return `<svg viewBox="0 0 100 100"><polygon points="${p.join(' ')}" /></svg>`
}
const ondas = `<svg viewBox="0 0 400 200" preserveAspectRatio="none">${Array.from({ length: 9 }, (_, i) =>
  `<path d="M-20 ${12 + i * 22} C 60 ${-8 + i * 22}, 120 ${36 + i * 22}, 200 ${12 + i * 22} S 340 ${-8 + i * 22}, 420 ${12 + i * 22}" />`).join('')}</svg>`
import { sello } from './sello'
const logo = (color = 'tinta') => `<img class="logo-palabra" src="/marca/natural-${color}.svg" alt="Natural" />`

document.getElementById('app').innerHTML = html`
<header class="portada">
  <p class="sobre">Somos Natural · Hoja de marca · v1</p>
  <div class="portada-logo">${logo('crema')}</div>
  <p class="portada-txt">Aguas de sabor. Zona sur de Puebla.</p>
</header>

<section class="bloque">
  <h2>1 · Logotipo</h2>
  <p class="nota">La palabra "NATURAL" de sus etiquetas, trazada a vector (no es una fuente nueva: es la suya, limpia). Funciona en cualquier color. Con la gotita es la versión para redes y sellos.</p>
  <div class="logos">
    <div style="background:#FFFDF2">${logo('tinta')}</div>
    <div style="background:#8C66BB">${logo('crema')}</div>
    <div style="background:#2A1A40">${logo('lavanda')}</div>
    <div style="background:#C8243E">${logo('crema')}</div>
  </div>
  <div class="logos dos">
    <div style="background:#FFFDF2" class="combo"><img src="/marca/gotita.svg" alt="" />${logo('tinta')}</div>
    <div style="background:#E0F2F6" class="combo vertical"><img src="/marca/gotita.svg" alt="" />${logo('lavanda')}<span>Aguas de sabor</span></div>
    <div style="background:#8C66BB"><img class="sello" src="/img/logo.png" alt="El sello" /><small class="antes">antes</small></div>
  </div>
  <h3 class="sub">Logo · el sistema (elegido: la gotita sobre la L como firma; solo las letras cuando haga falta)</h3>
  <div class="opciones">
    <figure><div class="op op1" style="background:#FFFDF2">${logo('tinta')}<img class="icono" src="/marca/gotita.svg" alt="" /></div>
      <figcaption><b>1 · Solo las letras ✓</b> Cuando haga falta sobrio: encabezados, etiquetas, facturas. La gotita sola es el ícono (perfil, favicon).</figcaption></figure>
    <figure class="elegida"><div class="op op2" style="background:#C0D6FF"><span class="sobre-l">${logo('tinta')}<img class="sentada" src="/marca/gotita-sentada.svg" alt="" /></span></div>
      <figcaption><b>2 · La firma ✓</b> La gotita sentada sobre la L. Para el hero, redes y publicidad. (La pose sentada con las piernas colgando viene en camino.)</figcaption></figure>
    <figure><div class="op op3" style="background:#FFFDF2"><svg viewBox="0 0 200 260" class="gota"><path d="M100 6 C 120 60 186 110 186 168 A 86 86 0 0 1 14 168 C 14 110 80 60 100 6 Z" fill="#8C66BB" /><path d="M100 22 C 117 70 174 114 174 168 A 74 74 0 0 1 26 168 C 26 114 83 70 100 22 Z" fill="none" stroke="#FFFDF2" stroke-width="2" opacity=".6" /><image href="/marca/natural-crema.svg" x="34" y="150" width="132" height="32" /><text x="100" y="206" text-anchor="middle" class="gota-txt">AGUAS DE SABOR</text></svg></div>
      <figcaption><b>3 · Insignia en forma de gota</b> El contenedor es una gota en vez de un círculo: habla de agua sin decirlo.</figcaption></figure>
    <figure><div class="op op4" style="background:#E8F9A2"><div class="timbre grande" style="--f:#8C66BB;--t:#FFFDF2"><img src="/marca/gotita.svg" alt="" />${logo('crema')}</div></div>
      <figcaption><b>4 · Timbre</b> La gotita y NATURAL en un timbre postal. Muy de etiqueta, como Giddy Grapes.</figcaption></figure>
  </div>
  <h3 class="sub">El sello, nuevo (para stickers, tapas y empaque)</h3>
  <div class="sellos">
    <div style="background:#FFFDF2">${sello('a')}<small>A · Clásico</small></div>
    <div style="background:#8C66BB">${sello('a', { anillo: '#2A1A40', papel: '#FFFDF2' })}<small>A · sobre lavanda</small></div>
    <div style="background:#E0F2F6">${sello('b')}<small>B · Con logotipo</small></div>
    <div style="background:#C0D6FF">${sello('b', { anillo: '#2A1A40', tinta: '#2A1A40' })}<small>B · en tinta</small></div>
  </div>
</section>

<section class="bloque">
  <h2>La gotita, ahora en vector</h2>
  <p class="nota">La misma gotita del sello (cara, guantes, amor y paz) redibujada en tintas planas para que hable igual que las ilustraciones. Vector: se ve nítida a cualquier tamaño y pesa 25 KB.</p>
  <div class="gotitas">
    <figure><img src="/img/gotita.png" alt="" /><figcaption>Antes · con sombras y brillos</figcaption></figure>
    <figure class="ahora"><img src="/marca/gotita.svg" alt="" /><figcaption>Ahora · plana, oficial</figcaption></figure>
  </div>
</section>

<section class="bloque">
  <h2>2 · Paleta base</h2>
  <p class="nota">Sale del sello: lavanda, crema y el aqua de la gotita; los acentos son la flor de jamaica y el maracuyá que la gotita carga en el logo.</p>
  <div class="paleta">${base.map(([n, c, d]) => `<div style="--c:${c}"><span></span><b>${n}</b><code>${c}</code><small>${d}</small></div>`)}</div>
</section>

<section class="bloque">
  <h2>3 · Cada sabor es un mundo</h2>
  <p class="nota">Un fondo y una tinta por sabor. La regla: el fondo CONTRASTA con el color del agua para que la botella resalte (como guanábana). Tonos con carácter pero no chillones.</p>
  <div class="mundos">${lista.map((s) => { const [f, t] = mundos[s.etq]; return `<div class="mundo" style="--f:${f};--t:${t}"><img src="/referencias/cartas/${s.etq}.webp" alt="" loading="lazy" /><b>${s.corto}</b><code>${f} · ${t}</code></div>` })}</div>
</section>

<section class="bloque">
  <h2>4 · Tipografía</h2>
  <div class="tipos">
    <div><p class="muestra fraunces">Se hacen hoy.<br />Te llegan mañana.</p><small>Títulos · <b>Fraunces</b> (suave, setentera, como "Wine" de Giddy Grapes) · Google Fonts, libre</small></div>
    <div><p class="muestra rubik">Catorce sabores hechos por una familia poblana, repartidos tienda por tienda.</p><small>Texto · <b>Rubik</b> (redonda, como las letras del sello) · Google Fonts, libre</small></div>
  </div>
</section>

<section class="bloque">
  <h2>5 · Recursos gráficos</h2>
  <p class="nota">Las piezas que se repiten en web, etiquetas y redes. Todas en vector.</p>
  <div class="recursos">
    <div class="r-ondas" style="--f:#F3E7D3;--t:#E9C9A4">${ondas}<span>Ondas</span></div>
    <div class="r-estallido">${estallido()}<em>¡Hechas hoy!</em><span>Estallido</span></div>
    <div class="r-cuadros"><i></i><span>Borde a cuadros</span></div>
    <div class="r-timbre"><div class="timbre" style="--f:#C8243E;--t:#FFD3DC"><img src="/marca/gotita.svg" alt="" /><b>Puebla</b></div><span>Timbre</span></div>
  </div>
</section>

<section class="bloque" id="ilustracion">
  <h2>6 · Ilustración</h2>
  <p class="nota">Camino mixto: boceto → vector a tintas planas con los colores exactos de la marca → limpieza. La gotita es la protagonista y en cada sabor convive con su fruta, sobre su mundo de color.</p>
  <div class="ilus">
    ${lista.map((s) => { const [f, t] = mundos[s.etq]; return `<figure class="mundo-grande" style="--f:${f};--t:${t}"><img src="/marca/ilu-${s.etq}.svg" alt="" loading="lazy" onerror="this.closest('figure').classList.add('pendiente')" /><figcaption>${s.corto}</figcaption></figure>` })}
  </div>
</section>
`
