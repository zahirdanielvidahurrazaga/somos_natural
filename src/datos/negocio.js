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
// `etiqueta` apunta a public/img/etiquetas/<nombre>.jpg — el DISEÑO REAL de ese
// sabor. Los 7 que no la traen caen al dibujo genérico teñido de su color.
// FALTAN los archivos de: Chocolate, Frutos rojos, Vainilla, Melón, Piña,
// Sandía y Mango. En Downloads hay además etiquetas de GUANÁBANA y TARO que no
// están en el menú: si esos sabores existen, hay que darlos de alta.
//
// El `color` de los sabores CON etiqueta se cambió al color dominante de su
// etiqueta real (la horchata es azul marino, el maracuyá olivo…), para que el
// punto de la lista de pedido y el nombre casen con lo que se ve.
export const grupos = [
  { llave: 'clasicos',  titulo: 'Los clásicos',  pie: 'Los de siempre, todo el año.' },
  { llave: 'especiales', titulo: 'Especiales',    pie: 'Los que llevan leche o algo más de trabajo.' },
  { llave: 'temporada', titulo: 'Por temporada',  pie: 'Van y vienen según la fruta que haya.' },
]

export const sabores = [
  { nombre: 'Jamaica',                grupo: 'clasicos',   color: '#9B2247', tipo: 'agua',  etiqueta: 'jamaica',  ingredientes: ['Agua', 'Azúcar', 'Flor de jamaica'] },
  { nombre: 'Horchata',               grupo: 'clasicos',   color: '#2C4A6E', tipo: 'agua',  etiqueta: 'horchata',  ingredientes: ['Agua', 'Azúcar', 'Arroz'] },
  { nombre: 'Maracuyá',               grupo: 'clasicos',   color: '#4A4436', tipo: 'agua',  etiqueta: 'maracuya',  ingredientes: ['Agua', 'Azúcar', 'Concentrado de maracuyá'] },
  { nombre: 'Tamarindo',              grupo: 'clasicos',   color: '#7A5A2E', tipo: 'agua',  etiqueta: 'tamarindo',  ingredientes: ['Agua', 'Azúcar', 'Concentrado de tamarindo'] },
  { nombre: 'Limón, pepino y chía',   grupo: 'clasicos',   color: '#4F7A3A', tipo: 'agua',  etiqueta: 'limon',  ingredientes: [] },

  { nombre: 'Café',                   grupo: 'especiales', color: '#B5651D', tipo: 'leche', etiqueta: 'cafe', ingredientes: ['Agua', 'Leche entera', 'Café'] },
  { nombre: 'Chocolate',              grupo: 'especiales', color: '#7A4230', tipo: 'leche', ingredientes: ['Agua', 'Leche entera', 'Chocolate'] },
  { nombre: 'Frutos rojos',           grupo: 'especiales', color: '#7E2C5C', tipo: null,    ingredientes: [] },
  { nombre: 'Vainilla',               grupo: 'especiales', color: '#D9BE86', tipo: 'leche', ingredientes: ['Agua', 'Azúcar', 'Vainilla', 'Leche entera', 'Leche condensada', 'Leche evaporada'] },

  { nombre: 'Naranja',                grupo: 'temporada',  color: '#EF8A3C', tipo: null,    etiqueta: 'naranja',    ingredientes: [] },
  { nombre: 'Melón',                  grupo: 'temporada',  color: '#E88B5A', tipo: null,    ingredientes: [] },
  { nombre: 'Piña',                   grupo: 'temporada',  color: '#D9AE1F', tipo: null,    ingredientes: [] },
  { nombre: 'Sandía',                 grupo: 'temporada',  color: '#D9455F', tipo: null,    ingredientes: [] },
  { nombre: 'Mango',                  grupo: 'temporada',  color: '#F2A82B', tipo: 'agua',  ingredientes: ['Agua', 'Azúcar', 'Concentrado de mango'] },
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
