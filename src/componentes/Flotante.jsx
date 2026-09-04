import { negocio } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'
import { IconoWhatsapp } from './Iconos'

export default function Flotante() {
  const enlace = enlaceWhatsapp(negocio.whatsapp, `Hola, ${negocio.nombre}. Quiero preguntarles por las aguas.`)
  if (!enlace) return null

  return (
    <a className="flotante" href={enlace} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
      <IconoWhatsapp />
    </a>
  )
}
