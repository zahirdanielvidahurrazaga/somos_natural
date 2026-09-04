import Motivo from './Motivos'
import Arco from './Arco'
import { negocio } from '../datos/negocio'

// La etiqueta del producto, DIBUJADA. No es una foto del arte: es el arte
// rehecho con las piezas del sitio, para que 14 etiquetas distintas se sigan
// viendo de la misma familia.
//
// Sus etiquetas de verdad no se parecen entre sí —la de jamaica es setentera en
// vino, la de horchata una serif azul marino, la de maracuyá olivo oscuro— así
// que cada sabor trae su propia receta en `sabor.etiqueta`.

const TELEFONO = negocio.whatsapp.replace(/^52/, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')

function comoSeLlama(sabor) {
  return sabor.enEtiqueta || `Agua de ${sabor.nombre}`
}

// ── Los cuatro trazos ────────────────────────────────────────────────────────

function Arcada({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-grande" />
      <div className="etq-esquinas caps">
        <span>500 ml</span>
        <span>Sin conservadores</span>
      </div>
      <Arco texto={comoSeLlama(sabor)} hacia="arriba" className="etq-arco etq-arco-alto" />
      <span className="etq-firma">NATURAL</span>
      <Arco texto={`Pedidos al: ${TELEFONO}`} hacia="abajo" className="etq-arco etq-arco-bajo" />
      <span className="etq-pie caps">Agítese antes de beber</span>
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
        <span>500 ml · Sin conservadores</span>
        <span>Agítese antes de beber</span>
        <span>Pedidos al: {TELEFONO}</span>
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
        <span>Sin conservadores · 500 ml</span>
      </div>
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-firma">NATURAL</span>
        <span className="etq-pie caps">Pedidos al: {TELEFONO}</span>
      </div>
    </>
  )
}

function Casa({ sabor }) {
  return (
    <>
      <Motivo nombre={sabor.etiqueta.motivo} className="etq-motivo etq-motivo-fondo" />
      <div className="etq-esquinas caps">
        <span>500 ml</span>
        <span>Sin conservadores</span>
      </div>
      <div className="etq-medio etq-medio-suelto">
        <span className="etq-titulo caps">{comoSeLlama(sabor)}</span>
        <span className="etq-regla" />
        <span className="etq-firma">NATURAL</span>
      </div>
      <span className="etq-pie caps">Agítese antes de beber</span>
    </>
  )
}

const TRAZOS = { arco: Arcada, centro: Centrada, esquinas: Esquinada, casa: Casa }

export default function Etiqueta({ sabor }) {
  const e = sabor.etiqueta
  const Trazo = TRAZOS[e.trazo] || Casa

  return (
    <div
      className="etiqueta"
      data-letra={e.letra}
      data-trazo={e.trazo}
      style={{ '--papel': e.fondo, '--pluma': e.tinta }}
    >
      <Trazo sabor={sabor} />
    </div>
  )
}
