import { lista, porEtq, wa, html, revelar, barraReferencias, proceso, ventajas, eventos, puntosDeVenta, minimo } from '../comun'

// CALMA (referencia: takearecess.com). Un degradado de durazno a lavanda que
// cambia de tono al bajar, letra ancha y tranquila, la firma en cursiva y
// cosas flotando despacio (nubes y fruta) en vez de mosaicos que gritan.
const fila = ['tamarindo', 'maracuya', 'jamaica', 'horchata', 'mango', 'limon', 'cafe'].map(porEtq)
const nube = (x, y, s, d) => `<i class="nube" style="--x:${x}%;--y:${y}%;--s:${s};--d:${d}s"></i>`

const momentos = [
  { titulo: 'para tu negocio', texto: 'Pasamos cada semana, reponemos lo que se vendió y te dejamos aguas recién hechas.', botellas: ['jamaica', 'horchata', 'tamarindo'], wa: 'Hola, tengo un negocio y me interesa surtir aguas Natural' },
  { titulo: 'para tu fiesta', texto: `Desde ${minimo} aguas, hechas para tu fecha y frías el día que quedamos.`, botellas: ['mango', 'maracuya', 'limon'], wa: 'Hola, quiero apartar fecha para un evento' },
  { titulo: 'para ti', texto: 'Encuéntralas en tu tiendita de la zona sur de Puebla, o pídelas directo.', botellas: ['cafe', 'chocolate', 'vainilla'], wa: 'Hola, quiero pedir aguas Natural' },
]

document.getElementById('app').innerHTML = html`
<div class="aviso">reparto en la zona sur de Puebla &nbsp;☁&nbsp; desde ${minimo} aguas &nbsp;☁&nbsp; hechas el mismo día</div>
<header class="nav">
  <a class="firma" href="#">natural</a>
  <nav><a href="#sabores">sabores</a><a href="#momentos">momentos</a><a href="#donde">dónde</a></nav>
  <a class="nav-wa" href="${wa()}">pedir</a>
</header>

<div class="cielo">${[nube(8, 14, 1, 0), nube(84, 22, 1.4, -6), nube(70, 62, .8, -3), nube(4, 70, 1.2, -9), nube(46, 88, .9, -12)]}</div>

<section class="hero">
  <h1 data-revela>fresca para cada momento</h1>
  <p class="sub" data-revela>aguas de sabor que te ayudan a bajarle dos rayitas al calor, al tráfico y a la prisa del día</p>
  <div class="fila">${fila.map((s, i) => `<a style="--i:${i}" href="#sabores"><img src="${s.foto('frente')}" alt="Agua de ${s.nombre}" /><span>${s.corto.toLowerCase()}</span></a>`)}</div>
  <a class="boton" href="#sabores">ver los 14 sabores</a>
  <span class="flecha">⌄</span>
</section>

<section class="porque">
  <h2 data-revela>por qué hacemos <span class="firma">natural</span></h2>
  <p data-revela>Todos traemos demasiadas pestañas abiertas, en el navegador y en la cabeza. Por eso hacemos aguas sencillas, sin conservadores. Hechas hoy por una familia de cuatro, para que te tomes un respiro mañana.</p>
  <img class="flota-fruta a" src="/frutas/jamaica-1.webp" alt="" /><img class="flota-fruta b" src="/frutas/limon-2.webp" alt="" /><img class="flota-fruta c" src="/frutas/maracuya-1.webp" alt="" />
</section>

<section class="momentos" id="momentos">
  <h2 data-revela>un agua para cada plan</h2>
  <p class="sub" data-revela>¿no sabes por dónde empezar? estos son los caminos</p>
  <div class="tarjetas">${momentos.map((m) => `
    <a class="momento" href="${wa(m.wa)}" data-revela>
      <div class="trio">${m.botellas.map((e, i) => `<img style="--i:${i}" src="${porEtq(e).foto(i === 1 ? 'frente' : 'tres')}" alt="" />`).join('')}</div>
      <h3>${m.titulo}</h3><p>${m.texto}</p><span class="mas">escríbenos →</span>
    </a>`)}
  </div>
</section>

<section class="sabores" id="sabores">
  <h2 data-revela>los sabores</h2>
  <p class="sub" data-revela>todos en botella de 500 ml · con azúcar, poca azúcar, stevia o sin azúcar</p>
  <div class="rejilla">${lista.map((s) => `
    <figure class="sabor" style="--c:${s.fondoGaleria || s.color}" data-revela>
      <img src="${s.foto('frente')}" alt="Agua de ${s.nombre}" loading="lazy" />
      <figcaption>${s.corto.toLowerCase()}</figcaption>
    </figure>`)}
  </div>
</section>

<section class="proceso">
  <h2 data-revela>así de tranquilo funciona</h2>
  <ol>${proceso.map((p, i) => `<li data-revela><span class="firma">${i + 1}</span><h3>${p.titulo.toLowerCase()}</h3><p>${p.texto}</p></li>`)}</ol>
  <div class="ventajas">${ventajas.map((v) => `<p data-revela><b>${v.titulo.toLowerCase()}</b> ${v.texto}</p>`)}</div>
</section>

<section class="donde" id="donde">
  <h2 data-revela>encuéntranos cerca</h2>
  <ul>${puntosDeVenta.map((p) => `<li><a href="${p.mapa}" target="_blank" rel="noopener">${p.nombre.toLowerCase()}</a></li>`)}</ul>
</section>

<footer class="pie">
  <p class="firma grande">natural</p>
  <p>aguas de sabor · zona sur de Puebla</p>
  <a class="boton" href="${wa()}">escríbenos por WhatsApp</a>
</footer>
`

revelar()
barraReferencias('recess')

// El cielo cambia de tono según qué tanto bajaste: durazno → rosa → lavanda → azul
const tonos = [[255, 176, 140], [255, 140, 160], [196, 170, 255], [160, 196, 255], [255, 200, 170]]
const mezcla = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
function pintar() {
  const p = scrollY / Math.max(1, document.body.scrollHeight - innerHeight)
  const x = p * (tonos.length - 1), i = Math.min(tonos.length - 2, Math.floor(x))
  const c1 = mezcla(tonos[i], tonos[i + 1], x - i), c2 = mezcla(tonos[i + 1], tonos[Math.min(tonos.length - 1, i + 2)], x - i)
  document.documentElement.style.setProperty('--c1', `rgb(${c1})`)
  document.documentElement.style.setProperty('--c2', `rgb(${c2})`)
  document.documentElement.style.setProperty('--sy', scrollY)
}
addEventListener('scroll', pintar, { passive: true })
pintar()
