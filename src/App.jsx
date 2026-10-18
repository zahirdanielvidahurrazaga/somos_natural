import { useRevelar } from './lib/useRevelar'
import Encabezado from './componentes/Encabezado'
import Hero from './componentes/Hero'
import Galeria from './componentes/Galeria'
import Proceso from './componentes/Proceso'
import Formacion from './componentes/Formacion'
import Puntos from './componentes/Puntos'
import Negocios from './componentes/Negocios'
import Eventos from './componentes/Eventos'
import Pedido from './componentes/Pedido'
import Pie from './componentes/Pie'
import Flotante from './componentes/Flotante'
import Botella from './botella/Botella'

export default function App() {
  useRevelar()

  return (
    <>
      <Encabezado />
      <main>
        <Hero />
        <Galeria />
        <Proceso />
        <Formacion />
        {/* Primero los dos caminos por los que el negocio vende —tiendas y
            eventos—, y después dónde comprar una sola, pegado al armador: el
            aviso de "faltan N para el mínimo" enlaza justo ahí arriba. */}
        <Negocios />
        <Eventos />
        <Puntos />
        <Pedido />
      </main>
      <Pie />
      <Flotante />
      <Botella />
    </>
  )
}
