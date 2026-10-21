import { negocio } from '../datos/negocio'
import { whatsapp, telefono } from './contacto'
import Gotita from './Gotita'

const LIGAS = [
  ['#sabores', 'Sabores'],
  ['#como', 'Cómo las hacemos'],
  ['#negocios', 'Negocios'],
  ['#eventos', 'Eventos'],
  ['#donde', 'Dónde encontrarlas'],
]

export function Encabezado() {
  return (
    <header className="m-encabezado">
      <a className="m-marca" href="#inicio" aria-label={negocio.nombre}>
        <img src="/img/logo.png" alt="" width={56} height={56} />
      </a>
      <nav className="m-nav" aria-label="Secciones">
        {LIGAS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
      </nav>
      <a className="m-boton m-boton-chico" href="#contacto">Contacto</a>
    </header>
  )
}

export function Pie() {
  return (
    <footer className="m-pie" id="contacto">
      <div className="m-marco m-pie-rejilla">
        <div>
          <p className="m-pie-frase rotulo">¿Se te antojó?</p>
          <a className="m-boton m-boton-fuerte" href={whatsapp()} target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
          <ul className="m-pie-datos">
            <li>WhatsApp {telefono}</li>
            <li>Reparto en {negocio.zona}</li>
            <li><a href={negocio.instagram} target="_blank" rel="noreferrer">Instagram @somos_natural_mx</a></li>
          </ul>
        </div>
        <Gotita pose="logo" className="m-pie-gotita" />
      </div>
      <p className="m-pie-legal">© {new Date().getFullYear()} {negocio.nombre} · Aguas de sabor</p>
    </footer>
  )
}
