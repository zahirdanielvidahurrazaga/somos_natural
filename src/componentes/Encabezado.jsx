import { useEffect, useState } from 'react'
import { negocio } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

export default function Encabezado() {
  const [pegado, setPegado] = useState(false)

  useEffect(() => {
    const alRodar = () => setPegado(window.scrollY > 8)
    alRodar()
    window.addEventListener('scroll', alRodar, { passive: true })
    return () => window.removeEventListener('scroll', alRodar)
  }, [])

  const saludo = enlaceWhatsapp(negocio.whatsapp, `Hola, ${negocio.nombre}. Quiero preguntarles por las aguas.`)

  return (
    <header className={pegado ? 'techo techo-pegado' : 'techo'}>
      <div className="marco techo-fila">
        <a className="marca" href="#arriba">
          <img src="/img/logo.png" alt="" width="38" height="38" />
          <span>
            <span className="marca-nombre">{negocio.nombre}</span>
            <span className="marca-lema caps">{negocio.lema}</span>
          </span>
        </a>

        <nav className="menu caps">
          <a href="#sabores">Sabores</a>
          <a href="#proceso">Cómo trabajamos</a>
          <a href="#negocios">Tu negocio</a>
          <a href="#eventos">Eventos</a>
          <a href="#pedido">Pedir</a>
        </nav>

        {saludo ? (
          <a className="boton boton-vino" href={saludo} target="_blank" rel="noopener noreferrer">
            Escríbenos
          </a>
        ) : (
          <a className="boton" href="#pedido">Pedir</a>
        )}
      </div>
    </header>
  )
}
