// Mezcla dos colores hex. `t` = cuánto del segundo (0 → a, 1 → b).
export function mezclar(a, b, t) {
  const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const x = n(a), y = n(b)
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

const PAPEL = '#FFF6E6'

// Del color de cada sabor: el cielo de la portada (color de caricatura, vivo
// pero no chillón), el pastel de su tarjeta y el fuerte para acentos.
export function tonos(s) {
  const base = s.fondoGaleria || s.color
  return {
    cielo: mezclar(base, PAPEL, 0.55),
    pastel: mezclar(base, PAPEL, 0.78),
    fuerte: base,
  }
}
