// ¿El aparato puede dibujar 3D? Sin WebGL la portada enseña el refri dibujado
// con CSS y las etiquetas como botones.
export function hayWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}
