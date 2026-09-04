import { fotos } from '../datos/negocio'

// Cuatro fotos pegadas una junto a otra, de borde a borde de la pantalla y sin
// separación. No son cuatro recuadros puestos encima del papel: son una franja,
// como la del video. Integra por escala y continuidad, no por marco.
export default function TiraFotos() {
  return (
    <div className="tira-fotos foto" data-revelar>
      {fotos.tira.map((f) => (
        <img key={f.src} src={f.src} alt={f.alt} width="700" height="700" loading="lazy" decoding="async" />
      ))}
    </div>
  )
}
