import { ventajas, eventos, puntosDeVenta, minimo } from '../datos/negocio'
import { whatsapp } from './contacto'
import Gotita from './Gotita'
import Globo from './Globo'

// Los dos caminos del negocio, cada uno con su gotita.
const CIFRAS = [String(minimo), '↺', '#', '4']

export function Negocio() {
  return (
    <section className="m-camino m-camino-negocio trama" id="negocios">
      <div className="m-marco m-camino-rejilla">
        <div className="m-camino-texto">
          <h2 className="m-titulo rotulo">Para tu negocio</h2>
          <p className="m-entrada">
            Tiendas, torterías, cafeterías y restaurantes. Pasamos cada semana y te dejamos lo que se te
            acabó, frío y del día.
          </p>
          <ul className="m-stickers">
            {ventajas.map((v, i) => (
              <li key={v.titulo} className="m-sticker">
                <span className="m-sticker-cifra">{CIFRAS[i]}</span>
                <strong>{v.titulo}</strong>
                <span>{v.texto}</span>
              </li>
            ))}
          </ul>
          <div className="m-acciones">
            <a className="m-boton m-boton-fuerte" href={whatsapp('Quiero surtir mi negocio.')} target="_blank" rel="noreferrer">
              Quiero surtir mi negocio
            </a>
            {puntosDeVenta.length > 0 && <a className="m-enlace" href="#donde">{puntosDeVenta.length} negocios ya las venden →</a>}
          </div>
        </div>
        <div className="m-camino-gotita">
          <Globo lado="abajo">¡Voy para tu tienda!</Globo>
          <Gotita pose="reparte2" />
        </div>
      </div>
    </section>
  )
}

export function Evento() {
  return (
    <section className="m-camino m-camino-evento trama" id="eventos">
      <div className="m-marco m-camino-rejilla m-camino-al-reves">
        <div className="m-camino-gotita">
          <Globo lado="abajo">¡Que no falte el agua!</Globo>
          <Gotita pose="fiesta" />
        </div>
        <div className="m-camino-texto">
          <h2 className="m-titulo rotulo">Para tu fiesta</h2>
          <p className="m-entrada">Fiestas, reuniones o cualquier plan. Aparta tu fecha y las llevamos frías ese día.</p>
          <ol className="m-stickers">
            {eventos.map((e, i) => (
              <li key={e.titulo} className="m-sticker">
                <span className="m-sticker-cifra">{i + 1}</span>
                <strong>{e.titulo}</strong>
                <span>{e.texto}</span>
              </li>
            ))}
          </ol>
          <div className="m-acciones">
            <a className="m-boton m-boton-fuerte" href={whatsapp('Quiero apartar una fecha para un evento.')} target="_blank" rel="noreferrer">
              Pregunta por tu fecha
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
