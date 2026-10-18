import { useEffect, useState } from 'react'
import { sabores, tamanos } from '../datos/negocio'
import EtiquetaReal from './EtiquetaReal'
import GotitaSello from './GotitaSello'
import { ordenDePila } from '../botella/orden'

const CADA = 3200

const PILA = ordenDePila(sabores)

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
                <EtiquetaReal sabor={s} />
              </div>
            ))}
          </div>
          {/* El hueco de la botella 3D: vacío a propósito. La botella vive en un
              lienzo fijo y se coloca encima de este div; sin WebGL no se
              enseña y queda la pila de etiquetas. */}
          <div className="botella-hueco botella-hueco-portada" data-botella="portada" />
          <GotitaSello />
        </div>
      </div>
    </section>
  )
}
