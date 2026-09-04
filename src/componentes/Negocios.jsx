import { negocio, ventajas } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

export default function Negocios() {
  const enlace = enlaceWhatsapp(
    negocio.whatsapp,
    `Hola, ${negocio.nombre}. Tengo un negocio y me interesa vender sus aguas. ` +
    `¿Me pueden pasar precios y ver si llegan a mi zona?`,
  )

  return (
    <section className="seccion franja-honda" id="negocios">
      <div className="marco">
        <div className="cabeza">
          <span className="rotulo caps">Tiendas, torterías y restaurantes</span>
          <h2>Nosotros pasamos a ver cuánto te queda.</h2>
          <p className="entrada">
            No tienes que acordarte de pedir ni calcular de más. Cada semana nos
            paramos en tu negocio, revisamos y surtimos lo que se vendió.
          </p>
        </div>

        <div className="puntos">
          {ventajas.map((v) => (
            <div className="punto" key={v.titulo}>
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </div>
          ))}
        </div>

        {enlace && (
          <div className="cierre">
            <a className="boton boton-claro" href={enlace} target="_blank" rel="noopener noreferrer">
              Que pasen a mi negocio
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
