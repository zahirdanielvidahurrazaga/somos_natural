import { sabores, tamanos } from '../datos/negocio'
import Etiqueta from './Etiqueta'

export default function Portada() {
  const jamaica = sabores.find((s) => s.nombre === 'Jamaica') || sabores[0]

  return (
    <section className="portada" id="arriba">
      <div className="marco portada-caja">
        <div>
          <span className="rotulo caps">Aguas de sabor · Hechas por una familia</span>

          <h1>
            Se hacen hoy.<br />
            Te llegan <em>mañana</em>.
          </h1>

          <p className="entrada">
            Preparamos por la tarde con tu pedido en la mano, las guardamos frías,
            y a la mañana siguiente las repartimos una por una.
          </p>

          <div className="portada-botones">
            <a className="boton boton-vino" href="#negocios">Para mi negocio</a>
            <a className="boton" href="#eventos">Para mi fiesta</a>
            <a className="boton" href="#pedido">Para mí</a>
          </div>

          <div className="portada-fija caps">
            <span>{sabores.length} sabores</span>
            <span>{tamanos.length} tamaños</span>
            <span>Sin conservadores</span>
          </div>
        </div>

        <div className="portada-muestra" style={{ '--c': jamaica.color }}>
          <Etiqueta sabor={jamaica} />
        </div>
      </div>
    </section>
  )
}
