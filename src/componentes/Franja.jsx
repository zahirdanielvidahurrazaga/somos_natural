import { fotos } from '../datos/negocio'

// Una sola foto ancha, de borde a borde y en silencio: sin velo, sin texto,
// sin marco. Es el remate de Sabores —después de quince etiquetas dibujadas,
// las botellas de verdad, todas juntas.
//
// Antes aquí había cuatro fotos cuadradas en cuatro columnas y se veían
// pésimas: el navegador las estiraba a 360x700 con object-fit: fill, y aun
// bien recortadas, una foto cuadrada con una botella vertical no sobrevive
// una banda horizontal. La formación sí, porque su composición ya es una
// línea horizontal.
export default function Franja() {
  const f = fotos.franja
  return (
    <div className="franja foto" data-revelar>
      <img
        src={f.src}
        alt={f.alt}
        width={f.ancho}
        height={f.alto}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
