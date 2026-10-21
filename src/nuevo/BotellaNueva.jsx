import { useEffect, useRef } from 'react'
import { sabores } from '../datos/negocio'
import { oirSabor, saborActual } from '../botella/saborActual'

// El mismo motor 3D de la botella, pero sin irse a la esquina en teléfono: en
// el diseño nuevo la botella vive en la portada, al centro, y nada más.
export default function BotellaNueva() {
  const lienzo = useRef(null)

  useEffect(() => {
    let vivo = true
    let motor = null
    let soltar = null
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const movil = window.matchMedia('(max-width: 859px), (pointer: coarse)').matches

    import('../botella/webgl')
      .then(async ({ hayWebGL }) => {
        if (!vivo || !hayWebGL()) return
        const { crearEscenario } = await import('../botella/escenario')
        if (!vivo) return
        const receta = (n) => sabores.find((s) => s.nombre === n)?.botella
        motor = crearEscenario(lienzo.current, { movil, quieto, esquina: false })
        motor.ponerSabor(receta(saborActual()), { inmediato: true })
        const despues = window.requestIdleCallback || ((f) => setTimeout(f, 1500))
        despues(() => motor?.precargar(sabores.map((s) => s.botella)))
        soltar = oirSabor(() => motor?.ponerSabor(receta(saborActual())))
        document.documentElement.dataset.botella = 'si'
        motor.remedir()
      })
      .catch(() => {})

    return () => {
      vivo = false
      soltar?.()
      motor?.destruir()
      delete document.documentElement.dataset.botella
    }
  }, [])

  return <canvas className="n-lienzo" ref={lienzo} aria-hidden="true" />
}
