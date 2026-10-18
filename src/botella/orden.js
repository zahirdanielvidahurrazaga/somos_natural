// Luminosidad del papel de una etiqueta (0 = negro, 1 = blanco).
function luz(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => v / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// En el orden del menú se juntan tres papeles claros seguidos (tamarindo,
// limón, café). Aquí se intercalan: el más oscuro, el más claro, el siguiente
// más oscuro… así cada cambio de la portada salta a un papel distinto. Sale de
// los datos: si llega la sandía o cambia un papel, el orden se acomoda solo.
// Lo usan la pila de etiquetas (respaldo sin 3D) y la botella.
export function ordenDePila(lista) {
  const porLuz = [...lista].sort((a, b) => luz(a.etiqueta.fondo) - luz(b.etiqueta.fondo))
  const orden = []
  while (porLuz.length) {
    orden.push(porLuz.shift())
    if (porLuz.length) orden.push(porLuz.pop())
  }
  return orden
}
