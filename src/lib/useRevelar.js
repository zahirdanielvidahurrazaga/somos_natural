import { useEffect } from 'react'

// Un solo observador para todo el sitio. Cada elemento con [data-revelar]
// entra una vez y se deja de observar: nada se re-anima al volver a subir.
// Si el sistema pide menos movimiento, todo aparece de golpe y ya.
export function useRevelar() {
  useEffect(() => {
    const nodos = document.querySelectorAll('[data-revelar]')
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (quieto || !('IntersectionObserver' in window)) {
      nodos.forEach((n) => { n.dataset.visible = 'si' })
      return
    }

    const ojo = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.dataset.visible = 'si'
          ojo.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    nodos.forEach((n) => ojo.observe(n))
    return () => ojo.disconnect()
  }, [])
}
