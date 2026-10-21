import { proceso } from '../datos/negocio'
import Gotita from './Gotita'
import Globo from './Globo'

// "Así las hacemos" como historieta: cuatro viñetas con la gotita haciendo
// cada paso. Los textos de abajo son los de proceso (negocio.js); los globos
// son lo que la gotita dice en la viñeta.
const VINETAS = [
  { pose: 'revisa', dice: '¿Cuántas te quedan?' },
  { pose: 'anota', dice: '¡Anotado!' },
  { pose: 'cocina', dice: '¡Recién hechas!' },
  { pose: 'reparte', dice: '¡Buenos días!' },
]

export default function Historieta() {
  return (
    <section className="m-seccion m-historieta trama" id="como">
      <div className="m-marco">
        <header className="m-cabeza">
          <h2 className="m-titulo rotulo">Así las hacemos</h2>
          <p className="m-entrada">
            Poco y seguido, para que nadie se quede con producto parado. Del día en que se hacen al refri
            pasa una sola noche.
          </p>
        </header>

        <ol className="m-pagina">
          {proceso.map((p, i) => (
            <li key={p.titulo} className="m-vineta" data-revelar>
              <p className="m-vineta-rotulo"><span>{i + 1}</span> {p.titulo}</p>
              <div className="m-vineta-dibujo">
                <Globo lado={i % 2 ? 'izq' : 'der'}>{VINETAS[i].dice}</Globo>
                <Gotita pose={VINETAS[i].pose} />
              </div>
              <p className="m-vineta-texto">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
