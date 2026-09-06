import { sabores, grupos, tamanos, dulzura } from '../datos/negocio'
import Estante from './Estante'
import Franja from './Franja'

export default function Sabores() {
  return (
    <section className="seccion" id="sabores">
      <div className="marco">
        <div className="cabeza" data-revelar>
          <span className="rotulo caps">Los sabores</span>
          <h2>{sabores.length} sabores, en {tamanos.length} tamaños.</h2>
          <p className="entrada">
            Los clásicos están todo el año. Los de temporada van y vienen según
            la fruta que haya.
          </p>
        </div>

        {grupos.map((g) => {
          const suyos = sabores.filter((s) => s.grupo === g.llave)
          if (suyos.length === 0) return null
          return <Estante grupo={g} sabores={suyos} key={g.llave} />
        })}

        <Franja />

        <div className="opciones" data-revelar>
          <div>
            <h3 className="caps">Tamaños</h3>
            <ul>
              {tamanos.map((t) => (
                <li key={t.nombre}>
                  {t.nombre}
                  {t.principal && <span className="caps"> · el de la etiqueta</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="caps">Personaliza la dulzura</h3>
            <ul>
              {dulzura.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="opciones-pie">
              Se prepara como lo pidas, sin costo extra.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
