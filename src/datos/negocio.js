// ─────────────────────────────────────────────────────────────────────────────
// TODO lo editable del sitio vive aquí. No hay que tocar componentes para
// cambiar el teléfono, los sabores, los tamaños o la zona de reparto.
//
// ⚠️ Los campos marcados con FALTA son datos que todavía no tengo.
// ─────────────────────────────────────────────────────────────────────────────

export const negocio = {
  nombre: 'Somos Natural',
  lema: 'Aguas de sabor',

  // WhatsApp: 52 (México) + los 10 dígitos.
  // ⚠️ El MENÚ-3.pdf trae otros dos números (222 162 2676 y 951 509 5973) y la
  //    etiqueta trae este. Se usa este porque es el que Zahir confirmó.
  whatsapp: '522224422840',

  zona: 'la zona sur de Puebla',

  instagram: 'https://instagram.com/somos_natural_mx',
  facebook: '',

  reparto: 'Temprano por la mañana, tienda por tienda.',
}

// ── Ingredientes ─────────────────────────────────────────────────────────────
// Apagados a pedido de Zahir. Los datos se quedan aquí por si se retoman: salen
// de las recetas del ERP (abril 2026) y no están confirmados por la familia.
export const mostrarIngredientes = false

// ── Sabores ──────────────────────────────────────────────────────────────────
// Del MENÚ-3.pdf que manda el negocio por Instagram. Tres grupos.
// ⚠️ No coincide con el catálogo del ERP: ahí no existen "Limón, pepino y chía"
//    ni "Sandía", y Melón y Piña están apagados. FALTA cuadrar los dos.
//
// Cada sabor lleva su `etiqueta`: NO es una imagen, es la receta para DIBUJARLA.
//   real   — si el diseño está copiado de su etiqueta de verdad o es la plantilla
//   trazo  — 'arco' | 'centro' | 'esquinas' | 'sello' | 'casa'
//   fondo  — el papel de la etiqueta      tinta — la tinta
//   papel  — solo en 'sello': el color del festón del centro
//   acento — color del texto en arco cuando no es el mismo de la tinta
//   onda   — color de las ondas y de la fruta sembrada
//   letra  — 'groovy' | 'serif' | 'bold' | 'redonda' | 'fina'
//   motivo — cuál de los 15 dibujos
//   ondas / goteo / sembrado / rincones — adornos de fondo de esa etiqueta
//   selloRect — el sello va de estampilla rectangular, no redondo
//
// FALTA UNA SOLA: la de SANDÍA. Lleva la plantilla de la casa hasta que llegue.
// GUANÁBANA se dio de alta como sabor de temporada el 2026-09-04.
//
// El `color` es el acento del sabor en el resto del sitio (el punto de la lista
// de pedido, el nombre al pasar el mouse). Suele ser la tinta de su etiqueta.
export const grupos = [
  { llave: 'clasicos',  titulo: 'Los clásicos',  pie: 'Los de siempre, todo el año.' },
  { llave: 'especiales', titulo: 'Especiales',    pie: 'Los que llevan leche o algo más de trabajo.' },
  { llave: 'temporada', titulo: 'Por temporada',  pie: 'Van y vienen según la fruta que haya.' },
]

export const sabores = [
  // ── LOS CLÁSICOS ─────────────────────────────────────────────────────────
  {
    nombre: 'Jamaica', grupo: 'clasicos', color: '#9B2247', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Flor de jamaica'],
    etiqueta: { real: true, trazo: 'centro', fondo: '#FAEDE9', tinta: '#9B2247', letra: 'groovy', motivo: 'jamaica', rincones: 'jamaica-rama' },
  },
  {
    nombre: 'Horchata', grupo: 'clasicos', color: '#2C4A6E', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Arroz'],
    etiqueta: { real: true, trazo: 'centro', fondo: '#EFEFE8', tinta: '#2C4A6E', letra: 'serif', motivo: 'horchata' },
  },
  {
    nombre: 'Maracuyá', grupo: 'clasicos', color: '#4A4436', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Concentrado de maracuyá'],
    etiqueta: { real: true, trazo: 'arco', fondo: '#4A4436', tinta: '#F2EADA', letra: 'redonda', motivo: 'maracuya' },
  },
  {
    nombre: 'Tamarindo', grupo: 'clasicos', color: '#7A5A2E', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Concentrado de tamarindo'],
    etiqueta: { real: true, trazo: 'centro', fondo: '#FAF3D8', tinta: '#7A5A2E', letra: 'serif', motivo: 'tamarindo' },
  },
  {
    nombre: 'Limón, pepino y chía', enEtiqueta: 'Agua de limón con pepino y chía',
    grupo: 'clasicos', color: '#4F7A3A', tipo: 'agua', ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#FAF6E8', tinta: '#4F7A3A', letra: 'serif', motivo: 'limon' },
  },

  // ── ESPECIALES ───────────────────────────────────────────────────────────
  {
    nombre: 'Café', grupo: 'especiales', color: '#B5651D', tipo: 'leche',
    ingredientes: ['Agua', 'Leche entera', 'Café'],
    etiqueta: { real: true, trazo: 'esquinas', fondo: '#F3EFE7', tinta: '#B5651D', letra: 'bold', motivo: 'cafe' },
  },
  {
    nombre: 'Chocolate', grupo: 'especiales', color: '#6E3B2A', tipo: 'leche',
    ingredientes: ['Agua', 'Leche entera', 'Chocolate'],
    etiqueta: { real: true, trazo: 'arco', fondo: '#2E1D16', tinta: '#F5DFC0', onda: '#6B4230', letra: 'bold', motivo: 'chocolate', goteo: true },
  },
  {
    nombre: 'Frutos rojos', grupo: 'especiales', color: '#5E2323', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#4E1D1D', tinta: '#E8E2DE', letra: 'groovy', motivo: 'frutos-rojos' },
  },
  {
    nombre: 'Vainilla', grupo: 'especiales', color: '#B8952F', tipo: 'leche',
    ingredientes: ['Agua', 'Azúcar', 'Vainilla', 'Leche entera', 'Leche condensada', 'Leche evaporada'],
    etiqueta: { real: true, trazo: 'sello', selloRect: true, fondo: '#1C1A17', tinta: '#C9A227', papel: '#F7F1EE', onda: '#7E8B5A', letra: 'serif', motivo: 'vainilla' },
  },

  // ── POR TEMPORADA ────────────────────────────────────────────────────────
  {
    nombre: 'Naranja', grupo: 'temporada', color: '#EF8A3C', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#FDF8EE', tinta: '#E07B2A', letra: 'serif', motivo: 'naranja' },
  },
  {
    nombre: 'Mango', grupo: 'temporada', color: '#E8873C', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Concentrado de mango'],
    etiqueta: { real: true, trazo: 'arco', fondo: '#E8873C', tinta: '#FBF0DC', onda: '#F0B23F', letra: 'redonda', motivo: 'mango', ondas: true, sembrado: true },
  },
  {
    nombre: 'Piña', grupo: 'temporada', color: '#7FA394', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#C6D6D1', tinta: '#F7EBC6', acento: '#C98A12', onda: '#E4AE33', letra: 'redonda', motivo: 'pina', sembrado: true },
  },
  {
    nombre: 'Melón', grupo: 'temporada', color: '#C97A4A', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#DFA075', tinta: '#16130F', letra: 'fina', motivo: 'melon' },
  },
  {
    nombre: 'Guanábana', grupo: 'temporada', color: '#2C5340', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'sello', fondo: '#9FC4B4', tinta: '#2C5340', papel: '#FFFFFF', acento: '#A9713C', letra: 'redonda', motivo: 'guanabana' },
  },
  {
    // ÚNICO sin diseño real todavía: lleva la plantilla de la casa.
    nombre: 'Sandía', grupo: 'temporada', color: '#C33B52', tipo: null, ingredientes: [],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FCEEF0', tinta: '#C33B52', letra: 'serif', motivo: 'sandia' },
  },
]

// ── Tamaños y dulzura ────────────────────────────────────────────────────────
// El 500 ml es el que lleva etiqueta; los otros tres son formatos.
export const tamanos = [
  { nombre: '250 ml' },
  { nombre: '500 ml', principal: true },
  { nombre: '1 L' },
  { nombre: 'Garrafón 20 L' },
]

export const dulzura = ['Con azúcar', 'Poca azúcar', 'Stevia', 'Sin azúcar']

// ── Pedido mínimo ────────────────────────────────────────────────────────────
export const minimo = 10

// ── Cómo trabajan ────────────────────────────────────────────────────────────
export const proceso = [
  { titulo: 'Pasamos a revisar',      texto: 'Cada semana nos paramos en tu negocio a ver cuántas aguas te quedan. No tienes que acordarte de pedir.' },
  { titulo: 'Pides lo que se te acabó', texto: 'Poco y seguido. Así nadie se queda con producto parado echándose a perder.' },
  { titulo: 'Las hacemos esa tarde',  texto: 'Se preparan el mismo día, con tu pedido en la mano, y se van derechito al refri.' },
  { titulo: 'Te las dejamos temprano', texto: 'A la mañana siguiente pasamos tienda por tienda. Llegan frías y recién hechas.' },
]

// ── Argumentos para un negocio ───────────────────────────────────────────────
export const ventajas = [
  { titulo: 'Sin pedido mínimo grande', texto: `Desde ${minimo} aguas. Si se queda corto, la semana que entra pides más.` },
  { titulo: 'Te recogemos los envases', texto: 'Nos devuelves las botellas vacías y se te descuentan del total.' },
  { titulo: 'Cada botella trae su marca', texto: 'Una clave de producción para saber de qué día es. Nunca te dejamos una de la semana pasada.' },
  { titulo: 'Trato directo con la familia', texto: 'Somos cuatro: no hay call center ni vendedor de paso. Al que te surte lo conoces por su nombre.' },
]

// ── Eventos ──────────────────────────────────────────────────────────────────
export const eventos = [
  { titulo: 'Apartas la fecha',        texto: 'Nos escribes con el día del evento y lo bloqueamos. Entre más antes, mejor, porque producimos por día.' },
  { titulo: `Desde ${minimo} aguas`,   texto: 'Ese es el mínimo. De ahí para arriba, nos dices cuánta gente va y sacamos el número contigo.' },
  { titulo: 'Llegan frías ese día',    texto: 'Se hacen para tu evento, no salen de una bodega. Te las entregamos el día que quedamos.' },
]

// Mapa de Google (My Maps) con los puntos marcados. En cuanto tenga la dirección
// del mapa incrustado, el sitio la usa en lugar del mapa dibujado, porque la
// gente ya sabe usar Google Maps y puede navegar desde ahí.
//
// Va SOLO la parte del `src` del iframe que Google entrega en "Insertar en mi
// sitio web". Si se deja vacío, el sitio dibuja su propio mapa (datos/mapa.js).
//
// 🔴 Google entrega la dirección con `/u/1/` —la segunda cuenta de quien lo
// creó— y así **redirige (302) a quien no tiene esa sesión**. Se le quita: sin
// `/u/1/` responde 200 y se ve sin iniciar sesión. Comprobado con curl.
// `ehbc` es el color de la barra del mapa. Va la TINTA de la marca (#2B181D),
// la misma del pie. No un color claro: Google escribe su texto en claro encima
// y con el crema no se leía.
export const mapaGoogle =
  'https://www.google.com/maps/d/embed?mid=1GMoR6_5cunknwX-zmbkdqFlKUs6uYks&ehbc=2B181D&noprof=1'

// El mismo mapa a pantalla completa, para el enlace de abajo. Reemplaza al
// botón de pantalla completa que traía la barra recortada.
export const mapaGoogleVer =
  'https://www.google.com/maps/d/viewer?mid=1GMoR6_5cunknwX-zmbkdqFlKUs6uYks'

// ── Puntos de venta ──────────────────────────────────────────────────────────
// Salen del PDF "Puntos de venta" que el negocio comparte en su historia
// destacada de Instagram (📍Donde comprar). Revisado el 2026-09-06; el PDF es
// de marzo de 2026, así que conviene confirmarlo antes de cada temporada.
//
// El enlace es el MISMO enlace corto de Google Maps que trae el PDF: se copió,
// no se generó. No se inventan colonias ni direcciones — Google solo devuelve
// dirección completa en tres de ellos, y publicar la colonia de unos sí y de
// otros no se leería como error.
//
// FALTA UNO de los 19 del PDF: el de la página 6 viene rotulado solo como
// "super" y su enlace apunta a un punto del mapa sin ficha de negocio. Se deja
// fuera hasta saber su nombre.
//
// `colonia` está VACÍA en nueve de los doce y el sitio no la enseña hasta que
// estén las doce: mostrar la colonia de unas sí y de otras no se lee como un
// error, igual que pasó con "de agua" en las tarjetas de sabor. Las tres que
// hay salieron de la dirección completa que devolvió Google; las otras nueve
// las tiene que dictar la familia, porque OpenStreetMap no mapea las colonias
// de esta zona de Puebla (ver CLAUDE.md).
//
// BAJAS del 2026-09-06, dichas por Zahir: Colegio Miguel Hidalgo, Miscelánea
// Nachito, Miscelánea de la 10, Minisuper Ricky's y Miscelánea Never ya no las
// venden. Y "Super Sanm" era el mismo local que Miscelánea Tity —compartían
// coordenadas exactas—, así que se quedó solo Tity.
export const puntosDeVenta = [
  { nombre: 'Super La Hacienda',          mapa: 'https://maps.app.goo.gl/tiQj7iBJUtnRdpGk8' , colonia: 'La Hacienda' },
  { nombre: 'Mini Super San Manuel',      mapa: 'https://maps.app.goo.gl/Ubiak52zsApYK6neA' , colonia: '' },
  { nombre: 'Abarrotes Andy SM',          mapa: 'https://maps.app.goo.gl/uvCcZXFtYnWA8vuQ8' , colonia: '' },
  { nombre: 'El Super Poblano',           mapa: 'https://maps.app.goo.gl/xmR5Ms2zhBUMhc32A' , colonia: '' },
  { nombre: 'Vinos y Licores San Manuel', mapa: 'https://maps.app.goo.gl/xhi1oYvYaBPBtFmK7' , colonia: '' },
  { nombre: 'Cocina Mateo',               mapa: 'https://maps.app.goo.gl/HVBPuYGYHtqmPfme7' , colonia: 'Arboledas de Loma Bella' },
  { nombre: 'Tortas Máximo',              mapa: 'https://maps.app.goo.gl/GZ3gyYKrdEpCY59D9' , colonia: '22 de Septiembre' },
  { nombre: 'Vinos y Licores Caribe',     mapa: 'https://maps.app.goo.gl/5pwLrjzxMvd1opzJ9' , colonia: '' },
  { nombre: 'Miscelánea Tity',            mapa: 'https://maps.app.goo.gl/EvEzCgpk27QegR6z5' , colonia: '' },
  { nombre: 'Super Pablito',              mapa: 'https://maps.app.goo.gl/YYZh1gJU1h84TToc8' , colonia: '' },
  { nombre: 'Súper Milenio',              mapa: 'https://maps.app.goo.gl/vEsacbhXf9FGrCgM9' , colonia: '' },
  { nombre: 'El Perro Mago Hot Dogs',     mapa: 'https://maps.app.goo.gl/Y6SkHP6cSpZWuzLj6' , colonia: '' },
]

// ── Fotos ────────────────────────────────────────────────────────────────────
// Del AirDrop del 2026-09-04 (96 fotos). Ya vienen recortadas y comprimidas a
// public/img/fotos/. Los originales siguen en ~/Downloads como IMG_46xx/47xx.
export const fotos = {
  formacion: {
    src: '/img/fotos/formacion.jpg',
    alt: 'Un agua de jamaica y una de horchata, frías y recién puestas, junto a una maceta de talavera',
    ancho: 1200, alto: 1500,
  },
  franja: {
    src: '/img/fotos/formacion-ancha.jpg',
    alt: 'Nueve aguas de distintos sabores formadas frente a una pared roja',
    ancho: 2200, alto: 1000,
  },
}
