import { lista, porEtq, wa, html, revelar, barraReferencias, proceso, ventajas, eventos, puntosDeVenta, minimo, dulzura } from '../comun'

// MERCADO (propuesta propia). Las aguas frescas nacieron en el puesto del
// mercado: papel picado, vitroleros y letreros pintados a mano ("SE SURTE A
// TIENDAS"). Natural es eso mismo, embotellado. El centro de la página es un
// vitrolero que se llena del sabor que escojas en la pizarra.
const colores = ['#E8336B', '#F7B500', '#13A89E', '#7B4BC4', '#F26B1D', '#2D7DD2']
const picado = html`<div class="picado" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<span style="--c:${colores[i % colores.length]};--d:${(i % 5) * -0.7}s"></span>`)}</div>`
const gotitas = ['revisa', 'anota', 'cocina', 'reparte']

document.getElementById('app').innerHTML = html`
${picado}
<header class="nav">
  <a class="logo" href="#"><img src="/img/logo.png" alt="Somos Natural" /></a>
  <nav><a href="#puesto">Sabores</a><a href="#letreros">Negocios y fiestas</a><a href="#donde">Dónde</a></nav>
  <a class="nav-wa" href="${wa()}">Pide aquí</a>
</header>

<section class="hero">
  <div class="letrero" data-revela>
    <p class="arriba">Aguas de sabor</p>
    <h1><span>Del vitrolero</span><span class="chica">a tu</span><span>refri</span></h1>
    <p class="abajo">Hechas el mismo día · Sin conservadores</p>
  </div>
  <figure class="hero-foto"><img src="/referencias/fotos/vitrolero-mercado.webp" alt="Puesto de aguas frescas con vitroleros y botellas Natural" /></figure>
</section>

<section class="puesto" id="puesto">
  <div class="pizarra">
    <h2>Hoy hay</h2>
    <ul>${lista.map((s, i) => `<li><button data-i="${i}" style="--c:${s.color}">${s.corto}${s.grupo === 'temporada' ? '<small>temporada</small>' : ''}</button></li>`)}</ul>
    <p class="nota">Todas en 250 ml, 500 ml, 1 L o garrafón · ${dulzura.join(', ').toLowerCase()}</p>
  </div>
  <div class="mostrador">
    <svg class="vitrolero" viewBox="0 0 300 420" aria-hidden="true">
      <defs><clipPath id="vaso"><path d="M60 70 Q40 90 40 130 L40 360 Q40 400 80 400 L220 400 Q260 400 260 360 L260 130 Q260 90 240 70 Z"/></clipPath></defs>
      <g clip-path="url(#vaso)">
        <rect class="liquido" x="0" y="120" width="300" height="300" />
        <path class="ola" d="M0 120 Q37 108 75 120 T150 120 T225 120 T300 120 T375 120 T450 120 V140 H0Z" />
        <g class="hielos"><rect x="80" y="150" width="48" height="44" rx="10"/><rect x="150" y="170" width="54" height="46" rx="10"/><rect x="110" y="230" width="44" height="40" rx="9"/></g>
      </g>
      <path class="vidrio" d="M60 70 Q40 90 40 130 L40 360 Q40 400 80 400 L220 400 Q260 400 260 360 L260 130 Q260 90 240 70 Z"/>
      <rect class="tapa" x="52" y="44" width="196" height="30" rx="8" />
      <path class="brillo" d="M70 140 L70 340" />
      <rect class="cucharon" x="196" y="0" width="12" height="230" rx="6" />
    </svg>
    <img class="botella" src="${lista[0].foto('tres')}" alt="" />
    <div class="ficha"><h3></h3><a class="boton" href="#">Pedir esta</a></div>
  </div>
</section>

<section class="pasos">
  <h2 class="rotulo">Así le hacemos</h2>
  <div class="muro">${proceso.map((p, i) => `<article data-revela style="--c:${colores[i]}"><span class="num">${i + 1}</span><img src="/mundo/gotita-${gotitas[i]}.webp" alt="" /><h3>${p.titulo}</h3><p>${p.texto}</p></article>`)}</div>
</section>

<section class="letreros" id="letreros">
  <article class="tabla t1" data-revela>
    <p class="se">Se surte a</p>
    <h2>Tiendas,<br/>torterías y<br/>restaurantes</h2>
    <ul>${ventajas.map((v) => `<li><b>${v.titulo}.</b> ${v.texto}</li>`)}</ul>
    <a class="boton" href="${wa('Hola, tengo un negocio y me interesa surtir aguas Natural')}">Quiero que me surtan</a>
  </article>
  <article class="tabla t2" data-revela>
    <p class="se">Se hacen pedidos para</p>
    <h2>Fiestas,<br/>reuniones y<br/>todo plan</h2>
    <ul>${eventos.map((e) => `<li><b>${e.titulo}.</b> ${e.texto}</li>`)}</ul>
    <a class="boton" href="${wa('Hola, quiero apartar fecha para un evento')}">Apartar mi fecha</a>
    <img class="gotita-fiesta" src="/mundo/gotita-fiesta.webp" alt="" />
  </article>
</section>

<section class="donde" id="donde">
  <h2 class="rotulo">Aquí las venden</h2>
  <ul>${puntosDeVenta.map((p, i) => `<li style="--c:${colores[i % colores.length]}"><a href="${p.mapa}" target="_blank" rel="noopener">${p.nombre}</a></li>`)}</ul>
</section>

<footer class="pie">
  ${picado}
  <p class="gracias">Gracias por su preferencia</p>
  <p>Somos Natural · Zona sur de Puebla · Desde ${minimo} aguas · 222 442 2840</p>
</footer>
`

revelar()
barraReferencias('mercado')

// El vitrolero se llena del sabor que escoges en la pizarra
const svg = document.querySelector('.vitrolero')
const botella = document.querySelector('.mostrador .botella')
const ficha = document.querySelector('.ficha')
function servir(i) {
  const s = lista[i]
  document.querySelectorAll('.pizarra button').forEach((b) => b.classList.toggle('si', +b.dataset.i === i))
  svg.style.setProperty('--agua', `color-mix(in srgb, #${s.botella.agua.toString(16).padStart(6, '0')} 78%, #fff)`)
  botella.classList.remove('entra'); void botella.offsetWidth
  botella.src = s.foto('tres'); botella.alt = `Agua de ${s.nombre}`; botella.classList.add('entra')
  ficha.querySelector('h3').textContent = `Agua de ${s.nombre.toLowerCase()}`
  ficha.querySelector('a').href = wa(`Hola, quiero agua de ${s.nombre.toLowerCase()}`)
}
document.querySelector('.pizarra').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) servir(+b.dataset.i) })
servir(0)
// se adelanta a cargar las fotos para que el cambio no parpadee
lista.forEach((s) => { new Image().src = s.foto('tres') })
