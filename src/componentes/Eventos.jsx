import { negocio, eventos } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'
import Escena from './Escena'

// Eventos como escena. El video del paseo por la casa queda de fondo, teñido
// con el color de cada paso: se siente el lugar sin que la botella 3D quede
// encima de una foto real.
const PALABRAS = [
  { palabra: ['Aparta'], incl: 0.3, sabor: 'Piña' },
  { palabra: ['Tu gente'], incl: -0.28, sabor: 'Frutos rojos' },
  { palabra: ['Frías'], incl: 0.16, sabor: 'Melón' },
]

export default function Eventos() {
  const enlace = enlaceWhatsapp(
    negocio.whatsapp,
    `Hola, ${negocio.nombre}. Quiero aguas para un evento. ¿Tienen disponible la fecha?`,
  )

  return (
    <Escena
      id="eventos"
      nombre="eventos"
      rotulo="Fiestas y reuniones"
      titulo="Para tu fiesta, hechas ese día."
      pasos={eventos.map((e, i) => ({ ...e, ...PALABRAS[i] }))}
      fondo={
        <video
          src="/video/paseo.mp4"
          poster="/video/paseo.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      }
      extra={
        <div className="escena-botones">
          {enlace && (
            <a className="boton escena-boton" href={enlace} target="_blank" rel="noopener noreferrer">
              Apartar una fecha
            </a>
          )}
          <a className="boton escena-boton escena-boton-hueco" href="#pedido">Armar el pedido</a>
        </div>
      }
    />
  )
}
