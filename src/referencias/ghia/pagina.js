import { lista, wa, html, revelar, barraReferencias, proceso, ventajas, eventos, puntosDeVenta, minimo, dulzura } from '../comun'
import { grupos } from '../../datos/negocio'

// SOBREMESA (referencia: drinkghia.com). Revista: fotos de sol duro a sangre,
// mayúsculas altas, listones amarillos, la tienda de sabores sobre negro como
// un aparador. Cae natural en su marca: el vino y el rosa pálido de la
// etiqueta de jamaica son casi los colores de Ghia.
const romanos = ['I', 'II', 'III', 'IV']
const notas = {
  Jamaica: 'La de siempre.', Horchata: 'Fresca y cremosa.', 'Maracuyá': 'Ácida y perfumada.',
  Tamarindo: 'Dulce y agrio, como debe ser.', 'Limón, pepino y chía': 'La más fresca de todas.', 'Café': 'Para la tarde.',
  Chocolate: 'Postre en botella.', 'Frutos rojos': 'Dulce y un poquito ácida.', Vainilla: 'Suave y cremosa.',
  Naranja: 'Para el desayuno.', Mango: 'Cuando hay mango bueno.', 'Piña': 'Dulce, de temporada.', 'Melón': 'Ligera, de verano.', 'Guanábana': 'Cremosa y poco común.',
}
const liston = (t) => `<span class="liston">${t}</span>`

document.getElementById('app').innerHTML = html`
<div class="aviso">Hechas el mismo día · Reparto en la zona sur de Puebla · Desde ${minimo} aguas</div>
<header class="nav">
  <nav><a href="#sabores">Sabores</a><a href="#negocio">Tu negocio</a><a href="#eventos">Eventos</a></nav>
  <a class="logo" href="#">Natural</a>
  <nav class="der"><a href="#donde">Dónde comprar</a><a class="nav-wa" href="${wa()}">Pedir</a></nav>
</header>

<section class="hero">
  <img src="/referencias/fotos/ghia-sol.webp" alt="Una botella de agua de jamaica Natural al sol sobre un petate" />
  <div class="hero-txt">
    <p class="pre">Hecha hoy · Sin conservadores</p>
    <h1>La jamaica<br/>de siempre,<br/>hecha hoy</h1>
    <a class="boton" href="#sabores">Ver los sabores</a>
  </div>
</section>

<section class="sabores" id="sabores">
  <div class="sab-cab">
    <h2>El aparador</h2>
    <div class="tabs">${grupos.map((g, i) => `<button data-g="${g.llave}"${i ? '' : ' class="si"'}>${g.titulo}</button>`).join('')}</div>
  </div>
  <div class="aparador">${lista.map((s) => `
    <a class="pieza" data-g="${s.grupo}" href="${wa(`Hola, quiero agua de ${s.nombre.toLowerCase()}`)}">
      <div class="caja">${s.nombre === 'Jamaica' ? liston('La favorita') : s.grupo === 'temporada' ? liston('De temporada') : ''}<img src="${s.foto('frente')}" alt="Agua de ${s.nombre}" loading="lazy" /></div>
      <div class="pie-pieza"><h3>${s.corto}</h3><span>500 ml</span></div>
      <p>${notas[s.nombre] || ''}</p>
    </a>`).join('')}
  </div>
  <p class="dulzura">Cada una, como la quieras: ${dulzura.map((d) => d.toLowerCase()).join(' · ')}.</p>
</section>

<section class="familia">
  <div class="fam-txt" data-revela>
    ${liston('De la familia')}
    <h2>Somos cuatro y<br/>las hacemos a mano</h2>
    <p>No hay bodega ni camión de reparto con logo. Hay una cocina en el sur de Puebla y una familia que cada tarde prepara lo que se va a tomar mañana.</p>
    <p>Por eso no llevan conservadores, y por eso pasamos seguido.</p>
    <p class="firma">— La familia Natural</p>
  </div>
  <figure data-revela><img src="/referencias/fotos/ghia-mesa.webp" alt="Mesa al aire libre con agua de tamarindo Natural" /></figure>
</section>

<section class="negocio" id="negocio">
  <figure><img src="/referencias/fotos/ghia-tienda.webp" alt="Refrigerador de una tiendita con aguas Natural" /></figure>
  <div class="neg-txt">
    ${liston('Para tu negocio')}
    <h2>Tu refri,<br/>siempre surtido</h2>
    <ol>${proceso.map((p, i) => `<li data-revela><b>${romanos[i]}</b><div><h3>${p.titulo}</h3><p>${p.texto}</p></div></li>`).join('')}</ol>
    <a class="boton" href="${wa('Hola, tengo un negocio y me interesa surtir aguas Natural')}">Quiero surtir mi negocio</a>
  </div>
</section>

<section class="ventajas">${ventajas.map((v) => `<div data-revela><h3>${v.titulo}</h3><p>${v.texto}</p></div>`).join('')}</section>

<section class="eventos" id="eventos">
  <img src="/referencias/fotos/vitrolero-mercado.webp" alt="" />
  <div class="ev-txt">
    <p class="pre">Para la fiesta</p>
    <h2>Que no falte<br/>el agua</h2>
    <ul>${eventos.map((e) => `<li><b>${e.titulo}</b><span>${e.texto}</span></li>`).join('')}</ul>
    <a class="boton" href="${wa('Hola, quiero apartar fecha para un evento')}">Apartar fecha</a>
  </div>
</section>

<section class="donde" id="donde">
  <h2>Dónde encontrarlas</h2>
  <ul>${puntosDeVenta.map((p) => `<li><a href="${p.mapa}" target="_blank" rel="noopener"><span>${p.nombre}</span><i></i><em>Ver mapa</em></a></li>`).join('')}</ul>
</section>

<footer class="pie"><p class="logo grande">Natural</p><p>Aguas de sabor · Zona sur de Puebla · 222 442 2840</p></footer>
`

revelar()
barraReferencias('ghia')

const tabs = document.querySelector('.tabs')
function filtrar(g) {
  tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('si', b.dataset.g === g))
  document.querySelectorAll('.pieza').forEach((p) => { p.hidden = p.dataset.g !== g })
}
tabs.addEventListener('click', (e) => e.target.dataset.g && filtrar(e.target.dataset.g))
filtrar('clasicos')

// la foto de portada se acerca despacio al bajar
const portada = document.querySelector('.hero img')
addEventListener('scroll', () => { portada.style.transform = `scale(${1 + Math.min(scrollY, 800) / 4000}) translateY(${scrollY * 0.15}px)` }, { passive: true })
