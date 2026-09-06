import { useState } from 'react'
import { puntosDeVenta, minimo, mapaGoogle } from '../datos/negocio'
import Mapa from './Mapa'

// Dónde comprar una sola botella, sin llegar al mínimo del pedido por WhatsApp.
// La lista es la del PDF que el negocio comparte en su historia destacada; los
// enlaces son los suyos, copiados tal cual.
//
// El mapa va DIBUJADO, no incrustado: ver src/datos/mapa.js. Señalar un renglón
// resalta su punto en el mapa y al revés, así la lista y el dibujo son la misma
// cosa vista de dos maneras.
export default function Puntos() {
  const [activo, setActivo] = useState(null)

  if (puntosDeVenta.length === 0) return null

  // Todas o ninguna: con la colonia de unas sí y de otras no, los renglones
  // sin ella se leen como un dato que falta por descuido.
  const hayColonias = puntosDeVenta.every((p) => p.colonia)

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

        <div className={mapaGoogle ? 'puntos-caja puntos-caja-ancha' : 'puntos-caja'}>
          {mapaGoogle ? (
            // El de Google gana cuando existe: la gente ya sabe usarlo y puede
            // navegar desde ahí. El dibujado queda de respaldo, no de adorno.
            <div className="mapa-google" data-revelar>
              <iframe
                src={mapaGoogle}
                title="Mapa con los puntos de venta de Somos Natural"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <Mapa puntos={puntosDeVenta} activo={activo} onSenalar={setActivo} />
          )}

          {/* El apagado va en la lista entera, no en cada renglón: al saltar de uno
              a otro el `mouseleave` del anterior no siempre llega, y se quedaban
              dos encendidos a la vez. */}
          <ul className="puntos-lista" onMouseLeave={() => setActivo(null)}>
            {puntosDeVenta.map((p) => (
              <li key={p.nombre} data-revelar data-activo={activo === p.nombre ? 'si' : undefined}>
                <a
                  href={p.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActivo(p.nombre)}
                  onFocus={() => setActivo(p.nombre)}
                  onBlur={() => setActivo(null)}
                >
                  <span className="punto-nombre">
                    {p.nombre}
                    {hayColonias && <span className="punto-colonia">{p.colonia}</span>}
                  </span>
                  <span className="punto-mapa caps">Ver en el mapa</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
