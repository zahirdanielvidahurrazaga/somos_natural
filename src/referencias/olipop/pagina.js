import { lista, porEtq, wa, html, revelar, barraReferencias, proceso, ventajas, eventos, puntosDeVenta, minimo } from '../comun'
import { grupos } from '../../datos/negocio'

// FUENTE DE SODAS (referencia: drinkolipop.com). Crema y verde botella, letra
// gorda retro, estampas de estrella ("hecha hoy"), los sabores por grupo con
// píldoras y fotos con cielo azul. La gotita del logo hace el proceso.
const estrella = (texto, clase = '') => `<span class="estrella ${clase}"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${puntas()}"/></svg><b>${texto}</b></span>`
function puntas(n = 14) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 42 : 50, a = (Math.PI * i) / n
    d += `${i ? 'L' : 'M'}${(50 + r * Math.sin(a)).toFixed(1)} ${(50 - r * Math.cos(a)).toFixed(1)}`
  }
  return d + 'Z'
}
const logo = `<svg class="logo" viewBox="0 0 220 70" aria-label="Natural"><path id="arco" d="M10 62 Q110 -6 210 62" fill="none"/><text><textPath href="#arco" startOffset="50%" text-anchor="middle">NATURAL</textPath></text></svg>`
const gotitas = ['revisa', 'anota', 'cocina', 'reparte']
const confeti = Array.from({ length: 16 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--y:${(i * 53) % 100}%;--c:${['#FFE66B', '#8FE3F0', '#F5A3C7', '#FFF6E9'][i % 4]};--t:${10 + (i % 4) * 8}px"></i>`).join('')

document.getElementById('app').innerHTML = html`
<div class="aviso">Reparto en la zona sur de Puebla • Desde ${minimo} aguas por pedido</div>
<header class="nav">
  <nav><a href="#sabores">Sabores</a><a href="#asi">Cómo trabajamos</a><a href="#eventos">Eventos</a></nav>
  <a href="#" class="nav-logo">${logo}</a>
  <nav class="der"><a href="#donde">Dónde comprar</a><a class="nav-wa" href="${wa()}">Pedir</a></nav>
</header>

<section class="hero">
  <div class="hero-txt">
    <i class="brillo b1">✦</i><i class="brillo b2">✦</i><i class="brillo b3">✦</i>
    <h1>Ven por<br/>una fresca</h1>
    <p>Jamaica, horchata, tamarindo y once sabores más. Hechas hoy por una familia del sur de Puebla, para que mañana estén en tu refri.</p>
    <a class="boton" href="#sabores">Encuentra tu sabor</a>
  </div>
  <div class="hero-foto"><img src="/referencias/fotos/olipop-jamaica.webp" alt="Agua de jamaica Natural con un vaso con hielo" />${estrella('hecha<br/>hoy', 'e-rosa')}</div>
</section>

<section class="sabores" id="sabores">
  <div class="pildoras" role="tablist">${grupos.map((g, i) => `<button role="tab" data-g="${g.llave}"${i ? '' : ' aria-selected="true"'}>${g.titulo}</button>`).join('')}<button role="tab" data-g="todos">Todos</button></div>
  <p class="frio">Mantener en refri ❄</p>
  <div class="vitrina">
    <button class="flecha izq" aria-label="Anterior">←</button>
    <div class="carril">${lista.map((s) => `
      <a class="sabor" data-g="${s.grupo}" href="${wa(`Hola, quiero agua de ${s.nombre.toLowerCase()}`)}" style="--c:${s.color}">
        ${s.grupo === 'temporada' ? estrella('de<br/>temporada', 'e-verde chica') : ''}
        <img src="${s.foto('frente')}" alt="Agua de ${s.nombre}" loading="lazy" />
        <h3>${s.corto}</h3>
      </a>`).join('')}
    </div>
    <button class="flecha der" aria-label="Siguiente">→</button>
  </div>
</section>

<section class="cielo">
  <h2>Hecha hoy, sin nada raro</h2>
  <p>Sin conservadores. Por eso duran poco y por eso pasamos seguido: cada botella trae su clave del día en que se hizo.</p>
  <a class="boton verde" href="#sabores">Ver los 14</a>
  <div class="mostrador">${['tamarindo', 'jamaica', 'mango', 'horchata', 'maracuya'].map((e) => `<img src="${porEtq(e).foto('frente')}" alt="" />`).join('')}</div>
</section>

<section class="frase">${confeti}
  <p class="medios">De la familia a tu refri</p>
  <blockquote>Hecha hoy.<br/>Tomada mañana.</blockquote>
</section>

<section class="fotos">
  <figure><img src="/referencias/fotos/olipop-horchata.webp" alt="Horchata Natural con canela" />${estrella('recién<br/>hecha')}</figure>
  <figure><img src="/referencias/fotos/olipop-jamaica.webp" alt="Jamaica Natural con hielo" />${estrella('500<br/>ml', 'e-azul')}</figure>
</section>

<section class="asi" id="asi">
  <h2>Así llega a tu negocio</h2>
  <div class="pasos">${proceso.map((p, i) => `<article data-revela><img src="/mundo/gotita-${gotitas[i]}.webp" alt="" /><span>Paso ${i + 1}</span><h3>${p.titulo}</h3><p>${p.texto}</p></article>`).join('')}</div>
  <div class="ventajas">${ventajas.map((v) => `<div><h4>${v.titulo}</h4><p>${v.texto}</p></div>`).join('')}</div>
  <a class="boton" href="${wa('Hola, tengo un negocio y me interesa surtir aguas Natural')}">Quiero surtir mi negocio</a>
</section>

<section class="eventos" id="eventos">
  <img src="/mundo/gotita-fiesta.webp" alt="La gotita de fiesta" />
  <div>
    <h2>¿Hay fiesta?<br/>Ahí llegamos</h2>
    <ul>${eventos.map((e) => `<li><b>${e.titulo}.</b> ${e.texto}</li>`).join('')}</ul>
    <a class="boton" href="${wa('Hola, quiero apartar fecha para un evento')}">Aparta tu fecha</a>
  </div>
</section>

<section class="donde" id="donde">
  <h2>Búscanos en</h2>
  <div class="tiendas">${puntosDeVenta.map((p) => `<a href="${p.mapa}" target="_blank" rel="noopener">${p.nombre}</a>`).join('')}</div>
</section>

<footer class="pie">${logo}<p>Aguas de sabor · zona sur de Puebla · 222 442 2840</p></footer>
`

revelar()
barraReferencias('olipop')

// Píldoras: filtran los sabores por grupo
const carril = document.querySelector('.carril')
function filtrar(g) {
  document.querySelectorAll('.pildoras button').forEach((b) => b.setAttribute('aria-selected', b.dataset.g === g))
  document.querySelectorAll('.sabor').forEach((s) => { s.hidden = g !== 'todos' && s.dataset.g !== g })
  carril.scrollTo({ left: 0 })
}
document.querySelector('.pildoras').addEventListener('click', (e) => e.target.dataset.g && filtrar(e.target.dataset.g))
filtrar('clasicos')
document.querySelector('.flecha.izq').onclick = () => carril.scrollBy({ left: -carril.clientWidth * 0.8, behavior: 'smooth' })
document.querySelector('.flecha.der').onclick = () => carril.scrollBy({ left: carril.clientWidth * 0.8, behavior: 'smooth' })
