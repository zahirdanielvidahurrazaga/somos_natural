import { puntosDeVenta, mapaGoogleVer } from '../datos/negocio'
import Gotita from './Gotita'
import Globo from './Globo'

// Dónde comprar una: las tiendas como boletitos que abren su mapa.
export default function Donde() {
  return (
    <section className="m-seccion m-donde" id="donde">
      <div className="m-marco">
        <header className="m-cabeza">
          <h2 className="m-titulo rotulo">¿Dónde las encuentro?</h2>
          <div className="m-cabeza-gotita">
            <Globo lado="abajo">¡Aquí me tienen!</Globo>
            <Gotita pose="saluda" />
          </div>
        </header>
        <ul className="m-tiendas">
          {puntosDeVenta.map((p) => (
            <li key={p.nombre}>
              <a className="m-tienda" href={p.mapa} target="_blank" rel="noreferrer">
                {p.nombre} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="m-enlace" href={mapaGoogleVer} target="_blank" rel="noreferrer">Ver todas en el mapa →</a>
      </div>
    </section>
  )
}
