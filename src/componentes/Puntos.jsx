import { puntosDeVenta, minimo } from '../datos/negocio'

// Dónde comprar una sola botella, sin llegar al mínimo del pedido por WhatsApp.
// La lista es la del PDF que el negocio comparte en su historia destacada; los
// enlaces son los suyos, copiados tal cual.
//
// Sin mapa incrustado a propósito: pesa, pide llave de API y se ve genérico.
// Una lista de nombres con su enlace dice lo mismo y va con el resto del sitio.
export default function Puntos() {
  if (puntosDeVenta.length === 0) return null

  return (
    <section className="seccion" id="puntos">
      <div className="marco">
        <div className="cabeza" data-revelar>
          <span className="rotulo caps">Puntos de venta</span>
          <h2>Encuentra la más cercana.</h2>
          <p className="entrada">
            Estos negocios de la zona ya las tienen frías. Si quieres una sola y
            no llegas a las {minimo} del pedido, ahí la encuentras.
          </p>
        </div>

        <ul className="puntos-lista">
          {puntosDeVenta.map((p) => (
            <li key={p.nombre} data-revelar>
              <a href={p.mapa} target="_blank" rel="noopener noreferrer">
                <span className="punto-nombre">{p.nombre}</span>
                <span className="punto-mapa caps">Ver en el mapa</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
