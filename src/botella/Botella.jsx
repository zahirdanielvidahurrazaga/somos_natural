import { useEffect, useRef } from 'react'
import { sabores } from '../datos/negocio'
import { oirSabor, saborActual } from './saborActual'

// El lienzo fijo de la botella que acompaña la página. Se carga aparte, después
// de la página, y si el aparato no tiene WebGL (o el 3D no carga) no pasa nada:
// los huecos se quedan con la etiqueta plana (html sin data-botella).
export default function Botella() {
  const lienzo = useRef(null)

  useEffect(() => {
    let vivo = true
    let motor = null
    let soltar = null
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const movil = window.matchMedia('(max-width: 859px), (pointer: coarse)').matches

    import('./webgl')
      .then(async ({ hayWebGL }) => {
        if (!vivo || !hayWebGL()) return
        const { crearEscenario } = await import('./escenario')
        if (!vivo) return
        motor = crearEscenario(lienzo.current, { movil, quieto })
        const receta = (n) => sabores.find((s) => s.nombre === n)?.botella
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

  return <canvas className="botella-lienzo" ref={lienzo} aria-hidden="true" />
}
