import { negocio, sabores, tamanos } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

export default function Pie() {
  const enlace = enlaceWhatsapp(negocio.whatsapp, `Hola, ${negocio.nombre}.`)
  const anio = new Date().getFullYear()
  const telefono = negocio.whatsapp.replace(/^52/, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')

  return (
    <footer className="pie">
      <span className="gotita-marca" aria-hidden="true" />
      <div className="marco">
        <div className="pie-caja">
          <div>
            <div className="marca">
              <img src="/img/logo.png" alt="" width="42" height="42" />
              <span>
                <span className="marca-nombre">{negocio.nombre}</span>
                <span className="marca-lema caps">{negocio.lema}</span>
              </span>
            </div>
            <p className="pie-texto">
              Aguas naturales embotelladas, hechas y repartidas por una familia.
              {negocio.zona ? ` Repartimos en ${negocio.zona}.` : ''}
            </p>
          </div>

          <div>
            <h3>El sitio</h3>
            <ul>
              <li><a href="#sabores">Sabores</a></li>
              <li><a href="#proceso">Cómo trabajamos</a></li>
              <li><a href="#puntos">Dónde comprar</a></li>
              <li><a href="#negocios">Tu negocio</a></li>
              <li><a href="#eventos">Eventos</a></li>
              <li><a href="#pedido">Hacer un pedido</a></li>
            </ul>
          </div>

          <div>
            <h3>Pedidos</h3>
            <ul>
              {enlace && <li><a href={enlace} target="_blank" rel="noopener noreferrer">WhatsApp {telefono}</a></li>}
              {negocio.instagram && <li><a href={negocio.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
              {negocio.facebook && <li><a href={negocio.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>}
              <li>{negocio.reparto}</li>
            </ul>
          </div>
        </div>

        <div className="pie-fondo caps">
          <span>© {anio} {negocio.nombre}</span>
          <span>{sabores.length} sabores · {tamanos.length} tamaños · Sin conservadores</span>
        </div>
      </div>
    </footer>
  )
}
