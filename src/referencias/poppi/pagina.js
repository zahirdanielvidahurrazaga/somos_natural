import { lista, porEtq, wa, html, revelar, barraReferencias, proceso, ventajas, eventos, puntosDeVenta, minimo } from '../comun'

// POP (referencia: drinkpoppi.com). Rosa mexicano con amarillo, una cinta que
// corre, y la página como un tablero de mosaicos: fotos antojables, frases
// enormes y la gotita del logo guiñando donde poppi pone su carita.
const frases = ['hecha hoy', 'sin conservadores', 'agua de verdad', 'de la familia a tu refri', '14 sabores', 'del sur de Puebla']
const cinta = (clase = '') => html`<div class="cinta ${clase}" aria-hidden="true"><div>${[...frases, ...frases, ...frases].map((f) => `<span>${f}</span><i>✦</i>`)}</div></div>`

const destacados = ['jamaica', 'maracuya', 'limon', 'mango', 'horchata', 'tamarindo'].map(porEtq)

document.getElementById('app').innerHTML = html`
<header class="nav">
  <nav><a href="#sabores">sabores</a><a href="#negocio">tu negocio</a><a href="#eventos">eventos</a><a href="#donde">dónde comprar</a></nav>
  <a class="marca" href="#">natural</a>
  <a class="nav-wa" href="${wa()}">pide por WhatsApp</a>
</header>
${cinta()}

<section class="hero">
  <div class="cielo"></div>
  <h1><span>agua de</span><b>verdad</b></h1>
  <img class="hero-botella" src="${porEtq('jamaica').foto('frente')}" alt="Agua de jamaica Natural" />
  <img class="hero-flor f1" src="/frutas/jamaica-1.webp" alt="" /><img class="hero-flor f2" src="/frutas/jamaica-2.webp" alt="" />
  <img class="hero-flor f3" src="/frutas/jamaica-1.webp" alt="" />
  <p class="hero-sub">Aguas de sabor hechas el mismo día que te las entregamos.<br />Sin conservadores. En botella de 500 ml.</p>
</section>

<section class="tablero">
  <article class="t t-cielo" data-revela>
    <h2 class="gorda">¿sed?<br/>tenemos<br/>14 sabores</h2>
    <a class="boton" href="#sabores">ver todos</a>
  </article>
  <article class="t t-foto alto" data-revela><img src="/referencias/fotos/poppi-jamaica.webp" alt="Agua de jamaica con flores y limón" /><span class="pegote">la favorita</span></article>
  <article class="t t-morado" data-revela><p class="inclinada">HECHA HOY<br/>TOMADA<br/>MAÑANA</p></article>
  <article class="t t-naranja" data-revela><p class="alta">rica<br/><em>fresca</em></p></article>
  <article class="t t-amarillo centro" data-revela>
    <h2 class="suave">Fáciles de querer</h2>
    <div class="abanico">${destacados.slice(0, 4).map((s, i) => `<img style="--i:${i}" src="${s.foto('frente')}" alt="${s.nombre}" />`)}</div>
    <a class="boton boton-rosa" href="${wa('Hola, quiero probar las aguas Natural')}">quiero probarlas</a>
  </article>
  <article class="t t-verde gotita" data-revela><img src="/mundo/gotita-saluda.webp" alt="La gotita de Natural saludando" /></article>
  <article class="t t-foto" data-revela><img src="/referencias/fotos/poppi-maracuya.webp" alt="Agua de maracuyá" /></article>
  <article class="t t-azul centro" data-revela>
    <h2 class="suave amarilla">estamos en tu<br/>tiendita</h2>
    <div class="tiendas"><div>${[...puntosDeVenta, ...puntosDeVenta].map((p) => `<span>${p.nombre}</span>`)}</div></div>
    <a class="boton boton-amarillo" href="#donde">encuéntranos</a>
  </article>
  <article class="t t-foto" data-revela><img src="/referencias/fotos/poppi-limon.webp" alt="Agua de limón con pepino y chía" /></article>
  <article class="t t-foto alto" data-revela><img src="/referencias/fotos/poppi-mango.webp" alt="Agua de mango con chile" /><span class="pegote pegote-n">de temporada</span></article>
  <article class="t t-rosa" data-revela><p class="gorda blanca">cero<br/>conser&shy;vadores.<br/>cero<br/>pena.</p></article>
  <article class="t t-naranja centro" data-revela><p class="mini blanca">tamaños</p><p class="alta chica">250 ml · 500 ml<br/>1 litro<br/><em>garrafón</em></p></article>
  <article class="t t-crema centro" data-revela>
    <img class="gotita-chica" src="/mundo/gotita-cocina.webp" alt="" />
    <h2 class="suave rosa">somos cuatro</h2>
    <p class="cuerpo">Una familia que hace cada agua a mano, en el sur de Puebla. Sin bodega: lo que se hace hoy, se reparte mañana.</p>
  </article>
</section>

${cinta('cinta-amarilla')}

<section class="sabores" id="sabores">
  <h2 class="titulo">elige tu <em>sabor</em></h2>
  <div class="carrusel">${lista.map((s) => `
    <a class="sabor" style="--c:${s.fondoGaleria || s.color}" href="${wa(`Hola, quiero agua de ${s.nombre.toLowerCase()}`)}">
      <img class="fr" src="${s.fruta(1)}" alt="" onerror="this.remove()" />
      <img class="bt" src="${s.foto('frente')}" alt="Agua de ${s.nombre}" loading="lazy" />
      <span>${s.corto}</span>
    </a>`)}
  </div>
  <p class="pista">desliza →</p>
</section>

<section class="negocio" id="negocio">
  <div class="negocio-txt" data-revela>
    <p class="mini">para tu negocio</p>
    <h2 class="titulo blanca">tu refri lleno,<br/>sin acordarte</h2>
    <ol>${proceso.map((p, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${p.titulo}</h3><p>${p.texto}</p></div></li>`)}</ol>
    <a class="boton boton-amarillo" href="${wa('Hola, tengo un negocio y me interesa surtir aguas Natural')}">quiero surtir mi negocio</a>
  </div>
  <div class="negocio-ventajas">${ventajas.map((v, i) => `<article class="vent v${i}" data-revela><h3>${v.titulo}</h3><p>${v.texto}</p></article>`)}</div>
</section>

<section class="eventos" id="eventos">
  <img class="ev-gotita" src="/mundo/gotita-fiesta.webp" alt="La gotita de fiesta" />
  <div>
    <p class="mini">para tu fiesta</p>
    <h2 class="titulo">tu fiesta<br/><em>con sabor</em></h2>
    <div class="ev-pasos">${eventos.map((e) => `<article data-revela><h3>${e.titulo}</h3><p>${e.texto}</p></article>`)}</div>
    <a class="boton boton-rosa" href="${wa('Hola, quiero apartar fecha para un evento')}">aparta tu fecha</a>
  </div>
</section>

<section class="donde" id="donde">
  <h2 class="titulo amarilla">¿dónde nos<br/>encuentras?</h2>
  <ul>${puntosDeVenta.map((p) => `<li><a href="${p.mapa}" target="_blank" rel="noopener">${p.nombre}<span>↗</span></a></li>`)}</ul>
</section>

<footer class="pie">
  <p class="pie-grande">natural</p>
  <p>Aguas de sabor · zona sur de Puebla · desde ${minimo} aguas</p>
  <a class="boton boton-amarillo" href="${wa()}">222 442 2840</a>
</footer>
`

revelar()
barraReferencias('poppi')

// la botella de la portada se ladea y sube con el scroll
const botella = document.querySelector('.hero-botella')
addEventListener('scroll', () => {
  const y = Math.min(scrollY, innerHeight)
  botella.style.transform = `translate(-50%, ${-y * 0.25}px) rotate(${y * 0.02}deg)`
}, { passive: true })
