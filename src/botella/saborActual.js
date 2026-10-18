import { useSyncExternalStore } from 'react'
import { sabores, grupos } from '../datos/negocio'

// El sabor que te acompaña por la página: lo elige la galería y la botella lo
// lleva a todas las secciones. Un almacén chiquito, sin contexto de React.
export const ORDEN = grupos.flatMap((g) => sabores.filter((s) => s.grupo === g.llave))

let actual = ORDEN[0].nombre
let lado = 0
const oyentes = new Set()

export function ponerSaborActual(nombre, dir = 0) {
  if (nombre === actual) return
  actual = nombre
  lado = dir
  oyentes.forEach((f) => f())
}
export const saborActual = () => actual
export const ladoDelCambio = () => lado
export function oirSabor(f) { oyentes.add(f); return () => oyentes.delete(f) }
export const useSaborActual = () => useSyncExternalStore(oirSabor, saborActual)
