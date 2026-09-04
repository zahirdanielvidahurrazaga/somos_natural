import { useId } from 'react'

// Texto curvado, como el "PEDIDOS AL: 222 442 2840" de sus etiquetas.
//
// El id lo da React: si dos etiquetas compartieran uno, la segunda se colgaría
// de la curva de la primera y el texto se iría de su sitio.
//
// El tamaño baja con lo largo del texto porque el arco mide lo que mide: con
// "Agua de limón con pepino y chía" a tamaño fijo, el final se sale de la curva
// y desaparece.
export default function Arco({ texto, hacia = 'arriba', className }) {
  const id = useId().replace(/:/g, '')
  const d = hacia === 'arriba' ? 'M4,30 Q100,-2 196,30' : 'M4,10 Q100,42 196,10'

  const largo = texto.length
  const tam = largo > 26 ? 8.4 : largo > 20 ? 10 : 11.4
  const espaciado = largo > 26 ? 0.9 : largo > 20 ? 1.3 : 1.8

  return (
    <svg viewBox="0 0 200 42" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs><path id={id} d={d} fill="none" /></defs>
      <text fontSize={tam} letterSpacing={espaciado}>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{texto}</textPath>
      </text>
    </svg>
  )
}
