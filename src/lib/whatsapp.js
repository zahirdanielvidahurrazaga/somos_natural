// Un solo lugar arma los enlaces de WhatsApp. Si no hay número configurado
// devuelve null y quien lo use tiene que enseñar el aviso, no un botón muerto.
export function enlaceWhatsapp(numero, texto) {
  if (!numero) return null
  const limpio = String(numero).replace(/\D/g, '')
  if (!limpio) return null
  return `https://wa.me/${limpio}?text=${encodeURIComponent(texto)}`
}
