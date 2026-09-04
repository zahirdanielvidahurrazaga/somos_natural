import { sabores, grupos, tamanos, dulzura, mostrarIngredientes } from '../datos/negocio'
import Etiqueta from './Etiqueta'

const TIPO = { agua: 'De agua', leche: 'Con leche' }

export default function Sabores() {
  return (
    <section className="seccion" id="sabores">
      <div className="marco">
        <div className="cabeza">
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

          return (
            <div className="grupo" key={g.llave}>
              <div className="grupo-cabeza">
                <h3 className="caps">{g.titulo}</h3>
                <span>{g.pie}</span>
              </div>

              <div className="rejilla-sabores">
                {suyos.map((s) => (
                  <article className="sabor" key={s.nombre} style={{ '--c': s.color }}>
                    <Etiqueta sabor={s} />
                    <div className="sabor-pie">
                      <h3>{s.nombre}</h3>
                      {s.tipo && <span className="sabor-tipo caps">{TIPO[s.tipo]}</span>}
                      {mostrarIngredientes && s.ingredientes.length > 0 && (
                        <p className="sabor-ingredientes">{s.ingredientes.join(' · ')}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}

        <div className="opciones">
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
