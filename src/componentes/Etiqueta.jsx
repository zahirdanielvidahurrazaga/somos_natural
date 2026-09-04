import Motivo from './Motivos'
import Arco from './Arco'

// La etiqueta del producto, DIBUJADA. No es una foto del arte: es el arte
// rehecho con las piezas del sitio, para que quince etiquetas distintas se
// sigan viendo de la misma familia.
//
// En la tarjeta NO van el teléfono ni el "agítese antes de beber" (decisión del
// negocio, 2026-09-04): el número ya está en el encabezado, el botón flotante,
// el armador y el pie, y en la etiqueta era justo lo que chocaba con la firma.
// El "agítese" es una instrucción para quien ya trae la botella en la mano.
// Se queda "sin conservadores", que es argumento de venta y va en todas las
// etiquetas de verdad.

function comoSeLlama(sabor) {
  return sabor.enEtiqueta || `Agua de ${sabor.nombre}`
}

// ── Adornos de fondo ─────────────────────────────────────────────────────────

// El lienzo es 2:1 igual que la etiqueta, así que preserveAspectRatio="none"
// no deforma nada: solo evita el letterbox.
function Ondas() {
  const fila = (y) => `M0 ${y} q25 -7 50 0 t50 0 t50 0 t50 0 V100 H0 Z`
  return (
    <svg className="etq-ondas" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={fila(18)} opacity=".55" />
      <path d={fila(34)} opacity=".45" />
      <path d={fila(50)} opacity=".35" />
    </svg>
  )
}

// El chocolate escurriendo arriba y las barras abajo: es lo que hace
// reconocible esa etiqueta, más que el color.
function Goteo() {
  return (
    <svg className="etq-goteo" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h200v9c-8 0-8 11-16 11s-8-7-16-7-8 14-16 14-8-12-16-12-8 8-16 8-8-13-16-13-8 10-16 10-8-9-16-9-8 12-16 12-8-14-16-14-8 6-16 6z" />
      <path d="M0 100h200V84c-10 0-10-6-20-6s-10 8-20 8-10-9-20-9-10 7-20 7-10-6-20-6-10 8-20 8-10-9-20-9-10 7-20 7-10-6-20-6z" />
    </svg>
  )
}

// Fruta suelta por la orilla, como la etiqueta de piña.
const SIEMBRA = [
  { left: '2%', top: '6%', width: '13%' },
  { left: '10%', top: '58%', width: '10%' },
  { right: '3%', top: '10%', width: '12%' },
  { right: '11%', top: '62%', width: '10%' },
  { left: '30%', top: '76%', width: '8%' },
  { right: '30%', top: '4%', width: '8%' },
]

function Sembrado({ motivo }) {
  return (
    <span className="etq-sembrado" aria-hidden="true">
      {SIEMBRA.map((s, i) => (
        <span key={i} style={s}><Motivo nombre={motivo} /></span>
      ))}
    </span>
  )
}

// Las cuatro esquinas de la etiqueta de jamaica.
const RINCONES = ['ne', 'no', 'se', 'so']

function Rincones({ motivo }) {
  return (
    <span className="etq-rincones" aria-hidden="true">
      {RINCONES.map((r) => (
        <span key={r} data-rincon={r}><Motivo nombre={motivo} /></span>
      ))}
    </span>
  )
}

// Festón: el borde ondulado del sello. Se genera para no depender de máscaras
// que se portan distinto en cada navegador.
function festonRedondo(cx, cy, r, n) {
  const onda = ((Math.PI * 2 * r) / n) * 0.56
  let d = ''
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const x = (cx + r * Math.cos(a)).toFixed(2)
    const y = (cy + r * Math.sin(a)).toFixed(2)
    d += i === 0 ? `M${x} ${y}` : ` A${onda.toFixed(2)} ${onda.toFixed(2)} 0 0 1 ${x} ${y}`
  }
  return `${d} Z`
}

// La de vainilla no es redonda: es una estampilla, y el festón recorre un
// rectángulo. Se camina el perímetro con ondas del mismo tamaño.
function festonRect(x0, y0, x1, y1, paso) {
  const puntos = []
  const lado = (ax, ay, bx, by) => {
    const largo = Math.hypot(bx - ax, by - ay)
    const n = Math.max(2, Math.round(largo / paso))
    for (let i = 0; i < n; i++) {
      puntos.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n])
    }
  }
  lado(x0, y0, x1, y0)
  lado(x1, y0, x1, y1)
  lado(x1, y1, x0, y1)
  lado(x0, y1, x0, y0)

  const r = paso * 0.58
  let d = `M${puntos[0][0].toFixed(2)} ${puntos[0][1].toFixed(2)}`
  for (let i = 1; i <= puntos.length; i++) {
    const [x, y] = puntos[i % puntos.length]
    d += ` A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return `${d} Z`
}

const SELLO_REDONDO = festonRedondo(100, 50, 36, 22)
const SELLO_RECT = festonRect(38, 8, 162, 92, 8)

// ── Los cinco trazos ─────────────────────────────────────────────────────────

function Arcada({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-grande" />
      <Arco texto={comoSeLlama(sabor)} hacia="arriba" className="etq-arco etq-arco-alto" />
      <span className="etq-firma">NATURAL</span>
      <Arco texto="Sin conservadores" hacia="abajo" className="etq-arco etq-arco-bajo" />
    </>
  )
}

function Centrada({ sabor }) {
  return (
    <>
      <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
      <div className="etq-medio">
        {!sabor.etiqueta.rincones && (
          <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-fondo" />
        )}
        <span className="etq-firma">NATURAL</span>
      </div>
      <span className="etq-pie caps">Sin conservadores</span>
    </>
  )
}

function Esquinada({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-izq" />
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-der" />
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-firma">NATURAL</span>
        <span className="etq-pie caps">Sin conservadores</span>
      </div>
    </>
  )
}

function Sellada({ sabor }) {
  const rect = sabor.etiqueta.selloRect
  return (
    <>
      {rect && <Rincones motivo={sabor.etiqueta.motivo} />}
      <svg className="etq-feston" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={rect ? SELLO_RECT : SELLO_REDONDO} />
      </svg>
      {!rect && <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-sello" />}
      <Arco texto={comoSeLlama(sabor)} hacia="arriba" className="etq-arco etq-arco-alto" />
      <span className="etq-firma">NATURAL</span>
      <span className="etq-pie caps">Sin conservadores</span>
    </>
  )
}

function Casa({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-fondo" />
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-regla" />
        <span className="etq-firma">NATURAL</span>
      </div>
      <span className="etq-pie caps">Sin conservadores</span>
    </>
  )
}

const TRAZOS = { arco: Arcada, centro: Centrada, esquinas: Esquinada, sello: Sellada, casa: Casa }

export default function Etiqueta({ sabor }) {
  const e = sabor.etiqueta
  const Trazo = TRAZOS[e.trazo] || Casa

  return (
    <div
      className="etiqueta"
      data-letra={e.letra}
      data-trazo={e.trazo}
      data-sello={e.selloRect ? 'rect' : undefined}
      style={{
        '--papel': e.fondo,
        '--pluma': e.tinta,
        '--sello': e.papel || e.tinta,
        '--acento': e.acento || e.tinta,
        '--onda': e.onda || e.acento || e.tinta,
      }}
    >
      {e.ondas && <Ondas />}
      {e.goteo && <Goteo />}
      {e.sembrado && <Sembrado motivo={e.motivo} />}
      {e.rincones && <Rincones motivo={e.rincones} />}
      <Trazo sabor={sabor} />
    </div>
  )
}
