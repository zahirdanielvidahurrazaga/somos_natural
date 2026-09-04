import { negocio, eventos } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'
import Banda from './Banda'

export default function Eventos() {
  const enlace = enlaceWhatsapp(
    negocio.whatsapp,
    `Hola, ${negocio.nombre}. Quiero aguas para un evento. ¿Tienen disponible la fecha?`,
  )

  return (
    <section className="seccion" id="eventos">
      <div className="marco">
        <div className="cabeza" data-revelar>
          <span className="rotulo caps">Fiestas y reuniones</span>
          <h2>Para tu fiesta, hechas ese día.</h2>
          <p className="entrada">
            Bautizos, cumpleaños, comidas de oficina. Apartas la fecha y esa
            mañana te las llevamos frías: en botella o en garrafón de 20&nbsp;L.
          </p>
        </div>

        <Banda
          video="/video/paseo.mp4"
          cartel="/video/paseo.jpg"
          alt="Recorrido por la fachada de la casa donde se preparan las aguas"
          rotulo="Se hacen para tu evento"
          frase="No salen de una bodega. Se preparan la tarde anterior y llegan frías el día que quedamos."
        />

        <div className="puntos">
          {eventos.map((e) => (
            <div className="punto" key={e.titulo} data-revelar>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </div>
          ))}
        </div>

        <div className="portada-botones" data-revelar>
          {enlace && (
            <a className="boton boton-vino" href={enlace} target="_blank" rel="noopener noreferrer">
              Apartar una fecha
            </a>
          )}
          <a className="boton" href="#pedido">Armar el pedido</a>
        </div>
      </div>
    </section>
  )
}
