import { useEffect, useState } from 'react'
import { sabores, tamanos } from '../datos/negocio'
import Etiqueta from './Etiqueta'
import Sello from './Sello'

const CADA = 3200

export default function Portada() {
  const [i, setI] = useState(() => Math.max(0, sabores.findIndex((s) => s.nombre === 'Jamaica')))

  // La etiqueta de la portada va cambiando de sabor sola: es la forma de
  // enseñar los 14 sin llenar la primera pantalla de tarjetas.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const reloj = setInterval(() => setI((n) => (n + 1) % sabores.length), CADA)
    return () => clearInterval(reloj)
  }, [])

  const sabor = sabores[i]

  return (
    <section className="portada" id="arriba">
      <div className="marco portada-caja">
        <div>
          <span className="rotulo caps" data-revelar>Aguas de sabor · Hechas por una familia</span>

          <h1 data-revelar>
            Se hacen hoy.<br />
            Te llegan <em>mañana</em>.
          </h1>

          <p className="entrada" data-revelar>
            Preparamos por la tarde con tu pedido en la mano, las guardamos frías,
            y a la mañana siguiente las repartimos una por una.
          </p>

          <div className="portada-botones" data-revelar>
            <a className="boton boton-vino" href="#negocios">Para mi negocio</a>
            <a className="boton" href="#eventos">Para mi fiesta</a>
            <a className="boton" href="#pedido">Para mí</a>
          </div>

          <div className="portada-fija caps" data-revelar>
            <span>{sabores.length} sabores</span>
            <span>{tamanos.length} tamaños</span>
            <span>Sin conservadores</span>
          </div>
        </div>

        <div
          className="portada-muestra"
          style={{ '--c': sabor.color }}
          data-revelar
        >
          <Etiqueta sabor={sabor} key={sabor.nombre} />
          <Sello />
          <img
            className="gotita-portada"
            src="/img/gotita.png"
            alt="La gotita de Somos Natural"
            width="454"
            height="550"
          />
        </div>
      </div>
    </section>
  )
}
