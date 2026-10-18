// Un canal chiquito entre la botella 3D y el resto de la página, sin estado
// global ni contexto de React:
//   'pedir'     — alguien quiere ver un sabor (una tarjeta al pasar el mouse)
//   'mostrando' — la botella ya enseña ese sabor (para el rótulo de Sabores)
export const canal = new EventTarget()

// Se guarda el último pedido: la botella carga three.js aparte y, si alguien
// pide un sabor antes de que termine (p. ej. al recargar a media página, en el
// recorrido), al arrancar empieza por ese y no por jamaica.
export let ultimoPedido = null

export function pedirSabor(nombre) {
  ultimoPedido = nombre
  canal.dispatchEvent(new CustomEvent('pedir', { detail: nombre }))
}
