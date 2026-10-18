import { useEffect, useRef } from 'react'
import { sabores } from '../datos/negocio'
import { canal, ultimoPedido } from './canal'
import { ordenDePila } from './orden'

const CADA = 4200

// La botella vive en UN lienzo fijo a toda la pantalla, encima de la página y
// sin recibir clics. En cada cuadro se coloca sobre su hueco: el de la portada
// arriba, el de Sabores después, y en medio viaja dando una vuelta. Los huecos
// son divs vacíos con data-botella; el diseño de la página decide dónde van y
// de qué tamaño, la botella solo los sigue.
//
// Si el aparato no tiene WebGL, este componente no hace nada y la portada
// enseña la pila de etiquetas dibujadas de siempre (ver index.css,
// html[data-botella='si']).
export default function Botella3D() {
  const lienzo = useRef(null)

  useEffect(() => {
    let motor = null
    let vivo = true
    let reloj = null
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    import('./motor').then(({ crearBotella, hayWebGL }) => {
      if (!vivo || !hayWebGL()) return
      motor = crearBotella(lienzo.current, { quieto })
      document.documentElement.dataset.botella = 'si'

      const porNombre = Object.fromEntries(sabores.map((s) => [s.nombre, s]))
      const pila = ordenDePila(sabores)
      let i = Math.max(0, pila.findIndex((s) => s.nombre === 'Jamaica'))
      // si ya pidieron un sabor mientras cargaba la botella, se empieza por ese
      if (ultimoPedido && porNombre[ultimoPedido]) i = Math.max(0, pila.findIndex((s) => s.nombre === ultimoPedido))
      let actual = pila[i].nombre
      const anunciar = (nombre) => canal.dispatchEvent(new CustomEvent('mostrando', { detail: nombre }))
      motor.aplicarYa(pila[i].botella).then((ok) => ok && anunciar(actual))
      // las demás etiquetas, cuando el navegador esté desocupado
      const despues = window.requestIdleCallback || ((f) => setTimeout(f, 1500))
      despues(() => motor?.precargar(sabores.map((s) => s.botella)))

      const mostrar = (nombre) => {
        if (!motor || nombre === actual || !porNombre[nombre]) return
        actual = nombre
        motor.ponerSabor(porNombre[nombre].botella, () => anunciar(nombre))
      }
      const alPedir = (e) => mostrar(e.detail)
      canal.addEventListener('pedir', alPedir)

      // ── Dónde va en cada cuadro ──────────────────────────────────────────
      // Tres huecos en orden: portada → recorrido de los clásicos → Sabores.
      // Entre dos huecos seguidos viaja dando una vuelta; el del recorrido va
      // dentro de una escena pegada (sticky), así que mientras la escena está
      // fija la botella también, y ahí la cambia el recorrido.
      let p = 0
      const suave = (t) => t * t * (3 - 2 * t)
      const tramo = (ra, rb) => {
        const ac = ra.top + ra.height / 2
        const bc = rb.top + rb.height / 2
        return Math.min(1, Math.max(0, (innerHeight * 0.5 - ac) / (bc - ac)))
      }
      const mezcla = (ra, rb, e) => ({
        x: ra.left + ra.width / 2 + (rb.left + rb.width / 2 - (ra.left + ra.width / 2)) * e,
        y: ra.top + ra.height / 2 + (rb.top + rb.height / 2 - (ra.top + ra.height / 2)) * e,
        altoPx: ra.height + (rb.height - ra.height) * e,
      })
      motor.seguir(() => {
        const huecos = ['portada', 'recorrido', 'sabores']
          .map((n) => document.querySelector(`[data-botella="${n}"]`))
          .filter((el) => el && el.offsetParent !== null)
        if (huecos.length < 2) return { visible: false }
        const rs = huecos.map((el) => el.getBoundingClientRect())
        const movil = innerWidth < 860
        // en qué tramo va: el primero que todavía no termina
        let k = 0
        let t = tramo(rs[0], rs[1])
        p = t
        while (t >= 1 && k < rs.length - 2) { k++; t = tramo(rs[k], rs[k + 1]) }
        // En teléfono no viaja (pasaba encima del texto): salta de un hueco al
        // siguiente cuando el anterior sale de la pantalla.
        const e = movil ? (rs[k].bottom > 0 ? 0 : 1) : suave(t)
        const pos = mezcla(rs[k], rs[k + 1], e)
        // Inclinada en reposo, derecha al viajar y en los cambios del
        // recorrido (como en la referencia)
        let rz = -0.1 + 0.16 * e
        const rec = document.querySelector('.recorrido')
        const enRecorrido = huecos[k]?.dataset.botella === 'recorrido' && t <= 0
        if (rec && enRecorrido) {
          const r = rec.getBoundingClientRect()
          const n = Number(getComputedStyle(rec).getPropertyValue('--n')) || 5
          const q = Math.min(0.9999, Math.max(0, -r.top / (r.height - innerHeight))) * n
          const borde = Math.min(q % 1, 1 - (q % 1))
          rz = -0.32 * suave(Math.min(1, borde / 0.18))
        }
        const ultimo = rs[rs.length - 1]
        return {
          visible: ultimo.bottom > -40,
          ...pos,
          rz,
          giro: (k + e) * Math.PI * 2,
        }
      })
      motor.empezar()

      // En la portada va cambiando sola de sabor, como lo hacía la pila.
      if (!quieto) {
        reloj = setInterval(() => {
          if (p > 0.04 || document.hidden) return
          i = (i + 1) % pila.length
          mostrar(pila[i].nombre)
        }, CADA)
      }

      motor.limpiar = () => canal.removeEventListener('pedir', alPedir)
    })

    return () => {
      vivo = false
      clearInterval(reloj)
      motor?.limpiar?.()
      motor?.destruir()
      delete document.documentElement.dataset.botella
    }
  }, [])

  return <canvas className="botella-lienzo" ref={lienzo} aria-hidden="true" />
}
