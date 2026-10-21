import { negocio } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

// El sitio es vitrina, no tienda: el único contacto es un WhatsApp con un
// saludo ya escrito.
export const whatsapp = (texto = 'Quiero información.') =>
  enlaceWhatsapp(negocio.whatsapp, `Hola, ${negocio.nombre}. ${texto}`)

// 522224422840 → 222 442 2840
export const telefono = negocio.whatsapp.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
