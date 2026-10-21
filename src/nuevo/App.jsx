import { useRevelar } from '../lib/useRevelar'
import { Encabezado, Pie } from './Marco'
import Portada from './Portada'
import Sabores from './Sabores'
import Historieta from './Historieta'
import Frase from './Frase'
import { Negocio, Evento } from './Caminos'
import Donde from './Donde'
import BotellaNueva from './BotellaNueva'
import './mundo.css'

// EL MUNDO DE LA GOTITA (rama `inicio-nuevo`, 2026-10-20). Elegido por Zahir
// entre tres rumbos: todo ilustrado en caricatura/cómic con la gotita del logo
// guiando cada sección, y la botella REAL (3D) como protagonista. Es VITRINA,
// no tienda: enseña los sabores y el proceso; el único contacto es WhatsApp.
export default function App() {
  useRevelar()
  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <Sabores />
        <Historieta />
        <Frase />
        <Negocio />
        <Evento />
        <Donde />
      </main>
      <Pie />
      <BotellaNueva />
    </>
  )
}
