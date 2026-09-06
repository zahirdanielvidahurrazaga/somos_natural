import { useEffect, useState } from 'react'
import { sabores, tamanos } from '../datos/negocio'
import Etiqueta from './Etiqueta'
import GotitaSello from './GotitaSello'

const CADA = 3200

// Luminosidad del papel de una etiqueta (0 = negro, 1 = blanco).
function luz(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => v / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// En el orden del menú se juntan tres papeles claros seguidos (tamarindo,
// limón, café) y la pila se queda sin color. Aquí se intercalan: el más
// oscuro, el más claro, el siguiente más oscuro… así siempre asoman papeles
// distintos detrás del de adelante. Sale de los datos: si llega la etiqueta
// de sandía o cambia un papel, el orden se acomoda solo.
function intercalarPorPapel(lista) {
  const porLuz = [...lista].sort((a, b) => luz(a.etiqueta.fondo) - luz(b.etiqueta.fondo))
  const orden = []
  while (porLuz.length) {
    orden.push(porLuz.shift())
    if (porLuz.length) orden.push(porLuz.pop())
  }
  return orden
}

const PILA = intercalarPorPapel(sabores)

export default function Portada() {
  const [i, setI] = useState(() => Math.max(0, PILA.findIndex((s) => s.nombre === 'Jamaica')))

  // La pila va rotando sola: la de adelante se va al fondo y asoma la que
  // sigue. Es la forma de enseñar los 15 sabores sin llenar la primera
  // pantalla de tarjetas, y de meter color: tres papeles distintos a la vez.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const reloj = setInterval(() => setI((n) => (n + 1) % PILA.length), CADA)
    return () => clearInterval(reloj)
  }, [])

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

        <div className="portada-muestra" data-revelar>
          {/* Se renderizan las 15 y el CSS enseña solo las de adelante. Así cada
              etiqueta conserva su nodo cuando cambia de puesto y la transición
              la lleva de un lugar al otro en vez de aparecer de golpe. */}
          <div className="pila">
            {PILA.map((s, k) => (
              <div
                className="pila-hoja"
                data-pos={(k - i + PILA.length) % PILA.length}
                key={s.nombre}
                style={{ '--c': s.color }}
              >
                <Etiqueta sabor={s} />
              </div>
            ))}
          </div>
          <GotitaSello />
        </div>
      </div>
    </section>
  )
}
