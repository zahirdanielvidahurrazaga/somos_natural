// La gotita es azul clara. Para que se tiña del sabor se le aplica un
// hue-rotate en CSS, y el giro sale de restarle su tono al tono del sabor.
// Se calcula aquí y no a mano: si mañana cambia el color de un sabor, el
// tinte del personaje lo sigue solo.

const TONO_GOTITA = 203 // azul del cuerpo

function tono(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d === 0) return 0

  let h
  if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4

  return (h * 60 + 360) % 360
}

// Devuelve el giro en grados, siempre por el camino corto (-180 a 180).
export function giroHacia(hex) {
  let d = tono(hex) - TONO_GOTITA
  while (d > 180) d -= 360
  while (d < -180) d += 360
  return Math.round(d)
}
