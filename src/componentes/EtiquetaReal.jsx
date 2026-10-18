import Etiqueta from './Etiqueta'

// El arte REAL de la etiqueta (2026-10-18), el mismo que lleva la botella 3D.
// Antes las tarjetas usaban la etiqueta dibujada en código, pero junto a la
// botella convivían dos versiones de cada etiqueta y chocaban (Zahir eligió el
// arte real). Si un sabor no trae arte —hoy ninguno—, cae a la dibujada.
// Lleva la clase .etiqueta para heredar el tamaño, el filo y el levantón de
// "calcomanía" al pasar el mouse.
export default function EtiquetaReal({ sabor }) {
  if (!sabor.botella?.etq) return <Etiqueta sabor={sabor} />
  return (
    <div className="etiqueta etiqueta-real">
      <img
        src={`/etiquetas/${sabor.botella.etq}.webp`}
        alt={`Etiqueta de ${sabor.enEtiqueta || `agua de ${sabor.nombre.toLowerCase()}`}`}
        width="1181"
        height="591"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
