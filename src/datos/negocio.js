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
//   trazo  — 'arco' | 'centro' | 'esquinas' | 'casa'
//   fondo  — el papel de la etiqueta      tinta — la tinta
//   letra  — 'groovy' | 'serif' | 'bold' | 'redonda'   motivo — el dibujo
//
// FALTAN los diseños reales de: Chocolate, Frutos rojos, Vainilla, Melón, Piña,
// Sandía y Mango. En Downloads hay además etiquetas de GUANÁBANA y TARO que no
// están en el menú: si esos sabores existen, hay que darlos de alta.
//
// El `color` es el acento del sabor en el resto del sitio (el punto de la lista
// de pedido, el nombre al pasar el mouse). Suele ser la tinta de su etiqueta.
export const grupos = [
  { llave: 'clasicos',  titulo: 'Los clásicos',  pie: 'Los de siempre, todo el año.' },
  { llave: 'especiales', titulo: 'Especiales',    pie: 'Los que llevan leche o algo más de trabajo.' },
  { llave: 'temporada', titulo: 'Por temporada',  pie: 'Van y vienen según la fruta que haya.' },
]

export const sabores = [
  // ── Los 7 que SÍ tienen etiqueta real (`real: true`) ──────────────────────
  // El trazo, el fondo, la tinta y la tipografía copian su etiqueta de verdad.
  {
    nombre: 'Jamaica', grupo: 'clasicos', color: '#9B2247', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Flor de jamaica'],
    etiqueta: { real: true, trazo: 'arco', fondo: '#FAEDE9', tinta: '#9B2247', letra: 'groovy', motivo: 'jamaica' },
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
  {
    nombre: 'Café', grupo: 'especiales', color: '#B5651D', tipo: 'leche',
    ingredientes: ['Agua', 'Leche entera', 'Café'],
    etiqueta: { real: true, trazo: 'esquinas', fondo: '#F3EFE7', tinta: '#B5651D', letra: 'bold', motivo: 'cafe' },
  },
  {
    nombre: 'Naranja', grupo: 'temporada', color: '#EF8A3C', tipo: null, ingredientes: [],
    etiqueta: { real: true, trazo: 'arco', fondo: '#FDF8EE', tinta: '#E07B2A', letra: 'serif', motivo: 'naranja' },
  },

  // ── Los 7 SIN etiqueta real (`real: false`) ───────────────────────────────
  // Llevan la plantilla de la casa con su color y su fruta. NO inventan un
  // diseño y lo presentan como el suyo: en cuanto llegue el arte, se cambian
  // el trazo y la letra aquí mismo y ya.
  {
    nombre: 'Chocolate', grupo: 'especiales', color: '#6E3B2A', tipo: 'leche',
    ingredientes: ['Agua', 'Leche entera', 'Chocolate'],
    etiqueta: { real: false, trazo: 'casa', fondo: '#F5ECE6', tinta: '#6E3B2A', letra: 'serif', motivo: 'chocolate' },
  },
  {
    nombre: 'Frutos rojos', grupo: 'especiales', color: '#7E2C5C', tipo: null, ingredientes: [],
    etiqueta: { real: false, trazo: 'casa', fondo: '#F8EBF1', tinta: '#7E2C5C', letra: 'serif', motivo: 'frutos-rojos' },
  },
  {
    nombre: 'Vainilla', grupo: 'especiales', color: '#A9873F', tipo: 'leche',
    ingredientes: ['Agua', 'Azúcar', 'Vainilla', 'Leche entera', 'Leche condensada', 'Leche evaporada'],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FBF4E4', tinta: '#A9873F', letra: 'serif', motivo: 'vainilla' },
  },
  {
    nombre: 'Melón', grupo: 'temporada', color: '#D9793F', tipo: null, ingredientes: [],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FDF2E9', tinta: '#D9793F', letra: 'serif', motivo: 'melon' },
  },
  {
    nombre: 'Piña', grupo: 'temporada', color: '#B98F14', tipo: null, ingredientes: [],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FBF6E0', tinta: '#B98F14', letra: 'serif', motivo: 'pina' },
  },
  {
    nombre: 'Sandía', grupo: 'temporada', color: '#C33B52', tipo: null, ingredientes: [],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FCEEF0', tinta: '#C33B52', letra: 'serif', motivo: 'sandia' },
  },
  {
    nombre: 'Mango', grupo: 'temporada', color: '#D98A1B', tipo: 'agua',
    ingredientes: ['Agua', 'Azúcar', 'Concentrado de mango'],
    etiqueta: { real: false, trazo: 'casa', fondo: '#FDF4E4', tinta: '#D98A1B', letra: 'serif', motivo: 'mango' },
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

// ── Fotos ────────────────────────────────────────────────────────────────────
// Del AirDrop del 2026-09-04 (96 fotos). Ya vienen recortadas y comprimidas a
// public/img/fotos/. Los originales siguen en ~/Downloads como IMG_46xx/47xx.
export const fotos = {
  formacion: {
    src: '/img/fotos/formacion.jpg',
    alt: 'Nueve aguas de distintos sabores formadas sobre una barda de ladrillo',
    ancho: 1200, alto: 1200,
  },
  tira: [
    { src: '/img/fotos/tira-1.jpg', alt: 'Agua de jamaica junto a una maceta de talavera con geranios' },
    { src: '/img/fotos/tira-2.jpg', alt: 'Agua de jamaica sostenida frente a una palma' },
    { src: '/img/fotos/tira-3.jpg', alt: 'Agua de horchata apoyada en un portón, con un Vocho crema atrás' },
    { src: '/img/fotos/tira-4.jpg', alt: 'Agua de café sostenida entre margaritas moradas' },
  ],
}
