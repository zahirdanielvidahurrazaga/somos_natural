import { negocio, sabores, proceso, ventajas, eventos, puntosDeVenta, tamanos, dulzura, minimo } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

// Lo que comparten los cinco prototipos de referencias: los datos de siempre
// (negocio.js) más las fotos de botella que salen del estudio 3D.
export { negocio, proceso, ventajas, eventos, puntosDeVenta, tamanos, dulzura, minimo }

export const lista = sabores.map((s) => ({
  ...s,
  etq: s.botella.etq,
  foto: (pose = 'frente') => `/referencias/botellas/${s.botella.etq}-${pose}.webp`,
  fruta: (n = 1) => `/frutas/${s.botella.etq}-${n}.webp`,
  corto: s.nombre.replace(', pepino y chía', ''),
}))

export const porEtq = (etq) => lista.find((s) => s.etq === etq)

export const wa = (texto = 'Hola, quiero pedir aguas Natural') => enlaceWhatsapp(negocio.whatsapp, texto)

// html`` sin dependencias: arma el texto y lo pega con innerHTML
export const html = (partes, ...vals) => partes.reduce((a, p, i) => a + p + (i < vals.length ? [].concat(vals[i]).join('') : ''), '')

// Aparece al entrar a la pantalla (clase .ver)
export function revelar(selector = '[data-revela]') {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('ver'); io.unobserve(e.target) }
  }), { threshold: 0.15 })
  document.querySelectorAll(selector).forEach((el) => io.observe(el))
}

// Barra para saltar entre prototipos (arriba a la derecha, discreta)
export function barraReferencias(actual) {
  const nombres = { poppi: 'Pop', recess: 'Calma', olipop: 'Fuente de sodas', ghia: 'Sobremesa', mercado: 'Mercado' }
  const nav = document.createElement('nav')
  nav.className = 'ref-barra'
  nav.innerHTML = `<a href="/referencias/">◀ Versiones</a>` + Object.entries(nombres)
    .map(([k, n]) => `<a href="/referencias/${k}.html"${k === actual ? ' aria-current="page"' : ''}>${n}</a>`).join('')
  const css = document.createElement('style')
  css.textContent = `.ref-barra{position:fixed;z-index:999;left:50%;bottom:14px;transform:translateX(-50%);display:flex;gap:2px;padding:4px;border-radius:99px;background:rgba(20,16,14,.82);backdrop-filter:blur(8px);font:500 12px/1 system-ui,sans-serif;max-width:calc(100vw - 20px);overflow-x:auto}
.ref-barra a{color:#fff;text-decoration:none;padding:8px 11px;border-radius:99px;white-space:nowrap;opacity:.75}
.ref-barra a[aria-current]{background:#fff;color:#111;opacity:1}`
  document.head.append(css)
  document.body.append(nav)
}
