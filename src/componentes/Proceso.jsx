import { proceso } from '../datos/negocio'

export default function Proceso() {
  return (
    <section className="seccion franja-suave" id="proceso">
      <div className="marco">
        <div className="cabeza" data-revelar>
          <span className="rotulo caps">Cómo trabajamos</span>
          <h2>Se echan a perder rápido. Por eso trabajamos así.</h2>
          <p className="entrada">
            Un agua natural no aguanta semanas guardada. En vez de pelearnos con
            eso, todo está armado para que nadie se quede con producto parado.
          </p>
        </div>

        <div className="pasos">
          {proceso.map((p) => (
            <div className="paso" key={p.titulo} data-revelar>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
