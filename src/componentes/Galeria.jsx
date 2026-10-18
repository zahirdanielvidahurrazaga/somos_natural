import { useEffect, useRef } from 'react'
import { grupos } from '../datos/negocio'
import Motivo from './Motivos'
import EtiquetaReal from './EtiquetaReal'
import { ORDEN, ponerSaborActual, useSaborActual } from '../botella/saborActual'

// La galería de sabores: la sección a todo color del video de la lata
// ("FRESH | JUICE"), con la botella al centro, derecha, un círculo detrás y la
// frase partida a sus lados. Con flechas, puntitos, teclado o deslizando se
// recorren los catorce; el sabor que quede es el que acompaña el resto de la
// página. Cada sabor tiene su dirección (/#jamaica).
const slug = (s) => s.nombre.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const TIPO = { leche: 'Con leche', agua: 'De agua' }
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`
// El fondo de la galería es el color del sabor mezclado con 14% de blanco (ver
// index.css). Si queda claro (naranja, piña, vainilla, mango, melón), el texto
// va en tinta oscura: en crema no se leía (contraste de ~2 a 1).
function esClaro(color) {
  const n = parseInt(color.slice(1), 16)
  const lin = (v) => { v = (v * 0.86 + 255 * 0.14) / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  const L = 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  // contraste contra crema (L≈0.86) vs contra tinta (L≈0.012): gana el mayor
  return (L + 0.05) / 0.062 > 0.91 / (L + 0.05)
}

export default function Galeria() {
  const nombre = useSaborActual()
  const s = ORDEN.find((x) => x.nombre === nombre)
  const i = ORDEN.indexOf(s)
  const ref = useRef(null)
  const toque = useRef(null)

  const ir = (k, dir) => {
    const x = ORDEN[(k + ORDEN.length) % ORDEN.length]
    ponerSaborActual(x.nombre, dir)
    history.replaceState(null, '', `#${slug(x)}`)
  }
  const pasar = (paso) => ir(i + paso, paso)

  // con dirección de un sabor al entrar, baja directo a la galería
  useEffect(() => {
    const x = ORDEN.find((y) => slug(y) === decodeURIComponent(location.hash.slice(1)))
    if (!x) return
    ponerSaborActual(x.nombre)
    // el navegador, al cargar, restaura el scroll arriba y le ganaba al salto
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    setTimeout(() => {
      const techo = document.querySelector('.techo')?.offsetHeight || 0
      window.scrollTo({ top: ref.current.getBoundingClientRect().top + scrollY - techo, behavior: 'instant' })
    }, 200)
  }, [])

  // flechas del teclado mientras la galería está a la vista
  useEffect(() => {
    const tecla = (e) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r || r.top > innerHeight * 0.5 || r.bottom < innerHeight * 0.5) return
      if (e.target.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowRight') pasar(1)
      if (e.key === 'ArrowLeft') pasar(-1)
    }
    addEventListener('keydown', tecla)
    return () => removeEventListener('keydown', tecla)
  })

  // deslizar de lado (fuera de la botella) cambia de sabor
  const alBajar = (e) => { toque.current = e.target.closest('.galeria-hueco, button') ? null : { x: e.clientX, y: e.clientY } }
  const alSoltar = (e) => {
    const t0 = toque.current
    toque.current = null
    if (!t0) return
    const dx = e.clientX - t0.x, dy = e.clientY - t0.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) pasar(dx < 0 ? 1 : -1)
  }

  const grupo = grupos.find((g) => g.llave === s.grupo)
  // El nombre del lado derecho: los de dos palabras van en dos renglones
  // ("Frutos / rojos") y, según la palabra más larga, la letra de las dos
  // palabras baja un escalón para que nunca se corte en la orilla.
  const renglones = s.nombre.split(',')[0].split(' ')
  const masLarga = Math.max(7, ...renglones.map((w) => w.length))
  const largo = masLarga <= 7 ? 'corto' : masLarga <= 8 ? 'medio' : 'largo'

  return (
    <section
      className="galeria"
      id="sabor"
      ref={ref}
      style={{ '--c': s.color }}
      data-tono={esClaro(s.color) ? 'claro' : 'oscuro'}
      aria-label="Los sabores"
      onPointerDown={alBajar}
      onPointerUp={alSoltar}
    >
      <svg className="galeria-onda galeria-onda-arriba" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0h1440v22c-120 26-240 26-360 0s-240-26-360 0-240 26-360 0-240-26-360 0V0z" />
      </svg>

      <div className="galeria-circulo" aria-hidden="true">
        <Motivo nombre={s.etiqueta.motivo} className="galeria-motivo" key={`m-${s.nombre}`} />
      </div>

      <p className="galeria-palabra galeria-palabra-izq" data-largo={largo} aria-hidden="true" key={`a-${s.nombre}`}>Agua de</p>
      <p className="galeria-palabra galeria-palabra-der" data-largo={largo} aria-hidden="true" key={`b-${s.nombre}`}>
        {renglones.map((w) => <span key={w}>{w}</span>)}
      </p>

      <div className="galeria-hueco" data-botella="" data-inclina="0" data-agarrable="" aria-hidden="true">
        <div className="galeria-plana"><EtiquetaReal sabor={s} /></div>
      </div>

      <div className="marco galeria-pie">
        <div className="galeria-dato" aria-live="polite" key={`d-${s.nombre}`}>
          <span className="caps">{grupo?.titulo} · {String(i + 1).padStart(2, '0')}/{ORDEN.length}</span>
          <h2>{s.enEtiqueta || `Agua de ${s.nombre.toLowerCase()}`}</h2>
          <ul className="galeria-hechos caps">
            {TIPO[s.tipo] && <li>{TIPO[s.tipo]}</li>}
            <li>Sin conservadores</li>
            <li>Dulzura a tu gusto</li>
          </ul>
        </div>

        <div className="galeria-avance">
          <button type="button" className="galeria-flecha" onClick={() => pasar(-1)} aria-label={`Anterior: ${ORDEN[(i - 1 + ORDEN.length) % ORDEN.length].nombre}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="galeria-puntos" role="tablist" aria-label="Sabores">
            {ORDEN.map((x, k) => (
              <button
                type="button"
                key={x.nombre}
                role="tab"
                aria-selected={k === i}
                aria-label={x.nombre}
                style={{ '--c': hex(x.botella.agua) }}
                onClick={() => k !== i && ir(k, k > i ? 1 : -1)}
              />
            ))}
          </div>
          <button type="button" className="galeria-flecha" onClick={() => pasar(1)} aria-label={`Siguiente: ${ORDEN[(i + 1) % ORDEN.length].nombre}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <svg className="galeria-onda galeria-onda-abajo" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60h1440V38c-120-26-240-26-360 0s-240 26-360 0-240-26-360 0-240 26-360 0v22z" />
      </svg>
    </section>
  )
}
