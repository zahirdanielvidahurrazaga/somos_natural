import { fotos } from '../datos/negocio'
import Gotita from './Gotita'

// La botella de verdad: la foto real en una viñeta grande, con la gotita
// sentada en la orilla tomándose una.
export default function Frase() {
  const f = fotos.formacion
  return (
    <section className="m-frase trama" aria-label="Hechas hoy, frías mañana">
      <div className="m-marco m-frase-rejilla">
        <p className="m-frase-texto rotulo" data-revelar>
          Hechas hoy,<br /><span>frías mañana.</span>
        </p>
        <figure className="m-frase-vineta" data-revelar>
          <img src={f.src} alt={f.alt} width={f.ancho} height={f.alto} loading="lazy" />
          <Gotita pose="sentada" className="m-frase-gotita" />
          <figcaption>Así salen de la cocina: jamaica y horchata, recién hechas.</figcaption>
        </figure>
      </div>
    </section>
  )
}
