import { fotos } from '../datos/negocio'

// Las botellas de verdad, justo después de las etiquetas dibujadas.
export default function Trio() {
  return (
    <div className="trio" data-revelar>
      {fotos.trio.map((f) => (
        <figure className="foto-caja" key={f.src}>
          <img className="foto arco" src={f.src} alt={f.alt} width="800" height="800" loading="lazy" decoding="async" />
          <figcaption className="caps">{f.pie}</figcaption>
        </figure>
      ))}
    </div>
  )
}
