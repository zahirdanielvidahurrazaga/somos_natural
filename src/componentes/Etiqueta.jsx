import Motivo from './Motivos'
import Arco from './Arco'
import { negocio } from '../datos/negocio'

// La etiqueta del producto, DIBUJADA. No es una foto del arte: es el arte
// rehecho con las piezas del sitio, para que quince etiquetas distintas se
// sigan viendo de la misma familia.
//
// El "500 ml" NO va en ninguna: el sitio vende cuatro tamaños y ponerlo en cada
// etiqueta contradecía la sección de Tamaños. (Decisión del negocio, 2026-09-04.)

const TELEFONO = negocio.whatsapp.replace(/^52/, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
const PEDIDOS = `Pedidos al: ${TELEFONO}`

function comoSeLlama(sabor) {
  return sabor.enEtiqueta || `Agua de ${sabor.nombre}`
}

// ── Adornos de fondo ─────────────────────────────────────────────────────────

// Ondas de la etiqueta de mango. El lienzo es 2:1 igual que la etiqueta, así
// que preserveAspectRatio="none" no deforma nada: solo evita el letterbox.
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

// Fruta suelta por la orilla, como la etiqueta de piña.
const SIEMBRA = [
  { left: '2%', top: '6%', w: '13%' },
  { left: '10%', top: '58%', w: '10%' },
  { right: '3%', top: '10%', w: '12%' },
  { right: '11%', top: '62%', w: '10%' },
  { left: '30%', top: '76%', w: '8%' },
  { right: '30%', top: '4%', w: '8%' },
]

function Sembrado({ motivo }) {
  return (
    <span className="etq-sembrado" aria-hidden="true">
      {SIEMBRA.map((s, i) => (
        <span key={i} style={{ ...s, width: s.w }}>
          <Motivo nombre={motivo} />
        </span>
      ))}
    </span>
  )
}

// Festón: el borde ondulado del sello. Se genera para no depender de máscaras
// que se portan distinto en cada navegador.
function feston(cx, cy, r, n) {
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

const FESTON = feston(100, 50, 36, 22)

// ── Los cinco trazos ─────────────────────────────────────────────────────────

function Arcada({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-grande" />
      <div className="etq-esquinas caps">
        <span>Sin conservadores</span>
        <span>Agítese antes de beber</span>
      </div>
      <Arco texto={comoSeLlama(sabor)} hacia="arriba" className="etq-arco etq-arco-alto" />
      <span className="etq-firma">NATURAL</span>
      <Arco texto={PEDIDOS} hacia="abajo" className="etq-arco etq-arco-bajo" />
    </>
  )
}

function Centrada({ sabor }) {
  return (
    <>
      <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
      <div className="etq-medio">
        <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-fondo" />
        <span className="etq-firma">NATURAL</span>
      </div>
      <div className="etq-fila caps">
        <span>Sin conservadores</span>
        <span>Agítese antes de beber</span>
        <span>{PEDIDOS}</span>
      </div>
    </>
  )
}

function Esquinada({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-izq" />
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-der" />
      <div className="etq-esquinas caps">
        <span>Agítese antes de beber</span>
        <span>Sin conservadores</span>
      </div>
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-firma">NATURAL</span>
        <span className="etq-pie caps">{PEDIDOS}</span>
      </div>
    </>
  )
}

function Sellada({ sabor }) {
  return (
    <>
      <svg className="etq-feston" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={FESTON} />
      </svg>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-sello" />
      <div className="etq-esquinas caps">
        <span>Agítese antes de beber</span>
        <span>{PEDIDOS}</span>
      </div>
      <Arco texto={comoSeLlama(sabor)} hacia="arriba" className="etq-arco etq-arco-alto" />
      <span className="etq-firma">NATURAL</span>
      <Arco texto="Sin conservadores" hacia="abajo" className="etq-arco etq-arco-bajo" />
    </>
  )
}

function Casa({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-fondo" />
      <div className="etq-esquinas caps">
        <span>Sin conservadores</span>
        <span>Agítese antes de beber</span>
      </div>
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-regla" />
        <span className="etq-firma">NATURAL</span>
      </div>
      <span className="etq-pie caps">{PEDIDOS}</span>
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
      style={{
        '--papel': e.fondo,
        '--pluma': e.tinta,
        '--sello': e.papel || e.tinta,
        '--acento': e.acento || e.tinta,
        '--onda': e.onda || e.acento || e.tinta,
      }}
    >
      {e.ondas && <Ondas />}
      {e.sembrado && <Sembrado motivo={e.motivo} />}
      <Trazo sabor={sabor} />
    </div>
  )
}
