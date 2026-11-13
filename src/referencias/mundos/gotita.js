// La gotita dibujada A MANO en vector (2026-11-12), en el mismo estilo plano de
// la botánica del hero (a la Mana): sin contorno, cuerpo con degradado suave,
// ojos grandes con brillo, cachetes rosas, brazos de manguera, guantes blancos y
// zapatos lavanda. Zahir pidió rehacerla "sin pedírselo a ChatGPT" para que de
// verdad esté integrada. Colores FIJOS (no toma el color del sabor: en limón la
// de contorno teñido se veía lavada).

let n = 0
export function gotita({ pose = 'saluda' } = {}) {
  const id = `g${n++}`
  // brazo izquierdo (de ella): saluda arriba; derecho: en la cintura
  const brazoIzq = pose === 'saluda'
    ? `<path class="g-brazo" d="M70 196 C 46 186 36 160 40 128" /><g transform="translate(40 112) rotate(-18)">${guante()}</g>`
    : `<path class="g-brazo" d="M70 200 C 44 214 34 238 44 262" /><g transform="translate(46 268) rotate(160)">${guante()}</g>`
  return `<svg class="gotita-svg" viewBox="0 0 300 380" aria-hidden="true">
    <defs>
      <linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAF8FE" /><stop offset="1" stop-color="#A7DBF1" /></linearGradient>
      <linearGradient id="${id}z" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A486CF" /><stop offset="1" stop-color="#7653A8" /></linearGradient>
    </defs>
    <!-- piernas y zapatos -->
    <path class="g-brazo" d="M128 262 C 124 292 112 314 104 334" />
    <path class="g-brazo" d="M172 262 C 178 292 192 312 202 330" />
    <ellipse cx="94" cy="342" rx="34" ry="17" fill="url(#${id}z)" />
    <ellipse cx="212" cy="338" rx="34" ry="17" fill="url(#${id}z)" transform="rotate(-8 212 338)" />
    <ellipse cx="84" cy="336" rx="10" ry="4" fill="#fff" opacity=".35" />
    <!-- brazo derecho (de ella), en la cintura -->
    <path class="g-brazo" d="M232 204 C 266 214 270 244 250 262" />
    <g transform="translate(248 266) rotate(150)">${guante()}</g>
    <!-- el cuerpo -->
    <path d="M150 18 C 176 72 244 122 244 192 A 94 94 0 0 1 56 192 C 56 122 124 72 150 18 Z" fill="url(#${id}c)" />
    <ellipse cx="104" cy="150" rx="13" ry="30" fill="#fff" opacity=".75" transform="rotate(-22 104 150)" />
    <circle cx="96" cy="196" r="5" fill="#fff" opacity=".6" />
    <!-- la cara -->
    <ellipse cx="126" cy="178" rx="19" ry="27" fill="#fff" /><ellipse cx="176" cy="178" rx="19" ry="27" fill="#fff" />
    <ellipse cx="131" cy="182" rx="10" ry="15" fill="#2A1A40" /><ellipse cx="181" cy="182" rx="10" ry="15" fill="#2A1A40" />
    <circle cx="135" cy="175" r="3.6" fill="#fff" /><circle cx="185" cy="175" r="3.6" fill="#fff" />
    <ellipse cx="104" cy="218" rx="15" ry="9" fill="#F7A3BE" opacity=".85" /><ellipse cx="200" cy="218" rx="15" ry="9" fill="#F7A3BE" opacity=".85" />
    <path d="M136 220 Q 152 238 168 220" fill="none" stroke="#2A1A40" stroke-width="6" stroke-linecap="round" />
    <g fill="#2A1A40" opacity=".35"><circle cx="98" cy="232" r="2" /><circle cx="108" cy="236" r="2" /><circle cx="196" cy="232" r="2" /><circle cx="206" cy="236" r="2" /></g>
    ${brazoIzq}
  </svg>`
}

// guante de caricatura: palma redonda, tres dedos y el puño con rayitas
function guante() {
  return `<g>
    <circle r="21" fill="#fff" /><ellipse cx="-14" cy="-16" rx="8" ry="13" fill="#fff" transform="rotate(-25 -14 -16)" />
    <ellipse cx="0" cy="-22" rx="8" ry="14" fill="#fff" /><ellipse cx="14" cy="-18" rx="8" ry="13" fill="#fff" transform="rotate(20 14 -18)" />
    <path d="M-10 4 Q 0 10 10 4" fill="none" stroke="#C9D7EE" stroke-width="3" stroke-linecap="round" />
    <rect x="-16" y="16" width="32" height="12" rx="6" fill="#fff" /><path d="M-10 22 h20" stroke="#C9D7EE" stroke-width="3" stroke-linecap="round" />
  </g>`
}
