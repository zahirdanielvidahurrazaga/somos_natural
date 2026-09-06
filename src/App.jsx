import { useRevelar } from './lib/useRevelar'
import Encabezado from './componentes/Encabezado'
import Portada from './componentes/Portada'
import Tira from './componentes/Tira'
import Sabores from './componentes/Sabores'
import Proceso from './componentes/Proceso'
import Formacion from './componentes/Formacion'
import Puntos from './componentes/Puntos'
import Negocios from './componentes/Negocios'
import Eventos from './componentes/Eventos'
import Pedido from './componentes/Pedido'
import Pie from './componentes/Pie'
import Flotante from './componentes/Flotante'

export default function App() {
  useRevelar()

  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <Tira />
        <Sabores />
        <Proceso />
        <Formacion />
        <Puntos />
        <Negocios />
        <Eventos />
        <Pedido />
      </main>
      <Pie />
      <Flotante />
    </>
  )
}
