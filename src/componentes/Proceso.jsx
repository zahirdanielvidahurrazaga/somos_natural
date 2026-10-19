import { proceso } from '../datos/negocio'
import Escena from './Escena'

// Cómo trabajamos como escena: el día de una botella, de la revisión en tienda
// a la madrugada fría del reparto (los colores, en index.css). Cada paso
// enseña un sabor que resalte sobre su color.
const PALABRAS = [
  { palabra: ['Revisamos'], incl: 0.28, sabor: 'Jamaica' },
  { palabra: ['Pides'], incl: -0.32, sabor: 'Horchata' },
  { palabra: ['Esa tarde'], incl: 0.42, sabor: 'Limón, pepino y chía' },
  { palabra: ['Temprano'], incl: -0.12, sabor: 'Mango' },
]

export default function Proceso() {
  return (
    <Escena
      id="proceso"
      nombre="proceso"
      rotulo="Cómo trabajamos"
      titulo="Se echan a perder rápido. Por eso trabajamos así."
      pasos={proceso.map((p, i) => ({ ...p, ...PALABRAS[i] }))}
    />
  )
}
