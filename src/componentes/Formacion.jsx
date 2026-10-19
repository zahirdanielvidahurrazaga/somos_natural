import { useEffect, useRef } from 'react'
import { fotos } from '../datos/negocio'

// "Así salen" como escena de foto (2026-10-18): después de la botella 3D, la
// fila de botellas DE VERDAD a pantalla completa. La foto se queda pegada y se
// acerca despacio mientras se baja (--z, de 1.14 a 1), con el título gigante
// encima. Va después de las escenas: la botella 3D ya se fue y nunca pasa
// encima de una foto real.
export default function Formacion() {
  const ref = useRef(null)

  useEffect(() => {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (quieto) return
    let pendiente = false
    const medir = () => {
      pendiente = false
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const avance = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)))
      el.style.setProperty('--z', (1.14 - avance * 0.14).toFixed(4))
    }
    const alRodar = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(medir) } }
    medir()
    addEventListener('scroll', alRodar, { passive: true })
    return () => removeEventListener('scroll', alRodar)
  }, [])

  return (
    <section className="foto-escena" ref={ref} aria-label="Así salen, cada mañana">
      <div className="foto-escena-fija">
        <img
          src={fotos.formacionAncha.src}
          alt={fotos.formacionAncha.alt}
          width={fotos.formacionAncha.ancho}
          height={fotos.formacionAncha.alto}
          loading="lazy"
          decoding="async"
        />
        <div className="marco foto-escena-texto">
          <span className="caps">La formación de un día</span>
          <h2>Así salen, cada mañana.</h2>
          <p>
            Ninguna lleva más de un día hecha. Lo que ves aquí se preparó la tarde
            anterior y esa misma mañana se repartió, botella por botella.
          </p>
        </div>
      </div>
    </section>
  )
}
