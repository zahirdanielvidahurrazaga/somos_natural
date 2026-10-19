import { negocio, ventajas, puntosDeVenta, minimo } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'
import Escena from './Escena'

// Tu negocio como escena: un paso por cada ventaja, con su palabra gigante.
const PALABRAS = [
  { palabra: [`Desde ${minimo}`], incl: -0.3, sabor: 'Horchata' },
  { palabra: ['Envases'], incl: 0.34, sabor: 'Maracuyá' },
  { palabra: ['Del día'], incl: -0.18, sabor: 'Tamarindo' },
  { palabra: ['Familia'], incl: 0.26, sabor: 'Naranja' },
]

export default function Negocios() {
  const enlace = enlaceWhatsapp(
    negocio.whatsapp,
    `Hola, ${negocio.nombre}. Tengo un negocio y me interesa vender sus aguas. ` +
    `¿Me pueden pasar precios y ver si llegan a mi zona?`,
  )

  return (
    <Escena
      id="negocios"
      nombre="negocios"
      rotulo="Tiendas, torterías y restaurantes"
      titulo="Nosotros pasamos a ver cuánto te queda."
      pasos={ventajas.map((v, i) => ({ ...v, ...PALABRAS[i] }))}
      extra={
        <>
          {/* La prueba social sale de un dato que ya existe: las tiendas que
              hoy las venden. Si un día no hubiera lista, la frase no aparece. */}
          {puntosDeVenta.length > 0 && (
            <p className="escena-prueba">
              Hoy nos venden <a href="#puntos">{puntosDeVenta.length} negocios de la zona</a>
            </p>
          )}
          {enlace && (
            <a className="boton escena-boton" href={enlace} target="_blank" rel="noopener noreferrer">
              Que pasen a mi negocio
            </a>
          )}
        </>
      }
    />
  )
}
