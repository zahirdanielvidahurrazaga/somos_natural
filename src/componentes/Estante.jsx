import { useEffect, useRef, useState } from 'react'
import { mostrarIngredientes } from '../datos/negocio'
import Etiqueta from './Etiqueta'

// Solo se rotula lo que es distinto: "con leche". Lo de agua es lo normal, y
// como no todos los sabores traen `tipo`, rotular también "de agua" dejaba la
// mitad de las tarjetas con pie y la otra mitad sin él, como si fuera un error.
const TIPO = { leche: 'Con leche' }

function Flecha({ lado }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {lado === 'izq' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  )
}

// Un estante por grupo: la fila se desliza de lado y sale por el borde derecho
// de la pantalla. Antes eran quince tarjetas iguales en cinco filas —un tercio
// del sitio— con filas huérfanas de dos y de una. Aquí cada grupo es una
// repisa: se ven tres y media, la que asoma invita a deslizar, y en teléfono
// es el gesto de siempre.
export default function Estante({ grupo, sabores }) {
  const ref = useRef(null)
  const [desborda, setDesborda] = useState(false)

  // Las flechas solo aparecen si de verdad hay algo escondido a la derecha.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setDesborda(el.scrollWidth > el.clientWidth + 1)
    medir()
    const ojo = new ResizeObserver(medir)
    ojo.observe(el)
    return () => ojo.disconnect()
  }, [])

  const mover = (dir) => {
    const el = ref.current
    if (!el) return
    const tarjeta = el.querySelector('.sabor')
    const hueco = parseFloat(getComputedStyle(el).columnGap) || 0
    const paso = tarjeta ? tarjeta.getBoundingClientRect().width + hueco : el.clientWidth * 0.8
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * paso, behavior: quieto ? 'auto' : 'smooth' })
  }

  return (
    <div className="grupo">
      <div className="grupo-cabeza" data-revelar>
        <h3 className="caps">{grupo.titulo}</h3>
        <span>{grupo.pie}</span>
        {desborda && (
          <div className="flechas">
            <button type="button" onClick={() => mover(-1)} aria-label={`${grupo.titulo}: ver anteriores`}>
              <Flecha lado="izq" />
            </button>
            <button type="button" onClick={() => mover(1)} aria-label={`${grupo.titulo}: ver siguientes`}>
              <Flecha lado="der" />
            </button>
          </div>
        )}
      </div>

      <div className="estante" ref={ref}>
        {sabores.map((s) => (
          <article className="sabor" key={s.nombre} style={{ '--c': s.color }} data-revelar>
            <Etiqueta sabor={s} />
            <div className="sabor-pie">
              <h3>{s.nombre}</h3>
              {TIPO[s.tipo] && <span className="sabor-tipo caps">{TIPO[s.tipo]}</span>}
              {mostrarIngredientes && s.ingredientes.length > 0 && (
                <p className="sabor-ingredientes">{s.ingredientes.join(' · ')}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
