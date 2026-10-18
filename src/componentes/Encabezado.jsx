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
        {/* Solo el sello con la gotita, sin el nombre escrito (pedido de
            Zahir): el nombre lo lleva el sello y lo dice el lector de pantalla */}
        <a className="marca" href="#arriba" aria-label={`${negocio.nombre}, ir arriba`}>
          <img src="/img/logo.png" alt="" width="48" height="48" />
        </a>

        <nav className="menu caps">
          <a href="#sabor">Sabores</a>
          <a href="#proceso">Cómo trabajamos</a>
          <a href="#negocios">Tu negocio</a>
          <a href="#eventos">Eventos</a>
          <a href="#puntos">Dónde comprar</a>
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
