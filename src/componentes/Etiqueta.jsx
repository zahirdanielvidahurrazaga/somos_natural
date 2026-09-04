// La etiqueta real del producto, en chiquito. Es el dibujo del producto y a la
// vez la unidad de diseño del sitio: cada sabor se ve como su propia etiqueta.
function Hoja({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor"
         strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <path d="M60 116 C60 78 54 44 30 14" />
      <path d="M56 92 C36 90 22 78 16 60 C36 58 50 70 56 92 Z" />
      <path d="M52 66 C34 60 24 46 22 28 C40 32 51 46 52 66 Z" />
      <path d="M58 96 C74 90 84 76 86 58 C70 62 60 76 58 96 Z" />
      <path d="M50 44 C38 34 33 20 34 6 C46 14 51 30 50 44 Z" />
    </svg>
  )
}

export default function Etiqueta({ sabor }) {
  return (
    <div className="etiqueta">
      <Hoja className="etiqueta-hoja izq" />
      <Hoja className="etiqueta-hoja der" />

      <div className="etiqueta-arriba caps">
        <span>500 ml</span>
        <span>Sin conservadores</span>
      </div>

      <div>
        <span className="etiqueta-sabor caps">Agua de {sabor.nombre}</span>
        <span className="etiqueta-regla" />
        <span className="etiqueta-nombre">NATURAL</span>
      </div>

      <div className="etiqueta-abajo caps">
        <span>Agítese antes de beber</span>
      </div>
    </div>
  )
}

export { Hoja }
