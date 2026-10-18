import { useEffect, useState } from 'react'
import { sabores, grupos, tamanos, dulzura } from '../datos/negocio'
import { canal } from '../botella/canal'
import Estante from './Estante'
import Franja from './Franja'

// Debajo del hueco de la botella: qué sabor está enseñando. Lo avisa la
// botella cuando termina de cambiar (canal 'mostrando').
function Rotulo() {
  const [nombre, setNombre] = useState('Jamaica')
  useEffect(() => {
    const oir = (e) => setNombre(e.detail)
    canal.addEventListener('mostrando', oir)
    return () => canal.removeEventListener('mostrando', oir)
  }, [])
  const s = sabores.find((x) => x.nombre === nombre)
  return (
    <p className="vitrina-rotulo" aria-live="polite">
      <span className="vitrina-nombre">{s?.enEtiqueta || `Agua de ${nombre.toLowerCase()}`}</span>
      <span className="caps">Elige un sabor abajo para verlo aquí</span>
    </p>
  )
}

export default function Sabores() {
  return (
    <section className="seccion" id="sabores">
      <div className="marco">
        {/* La cabeza y los estantes a la izquierda, la vitrina de la botella a
            la derecha y PEGADA mientras se recorren los sabores: así se ve el
            cambio en cualquier fila. En teléfono no hay columna al lado y la
            vitrina queda entre la cabeza y los estantes. Sin botella 3D, la
            vitrina no se enseña y todo vuelve a ir a lo ancho. */}
        <div className="sabores-cuerpo">
          <div className="cabeza" data-revelar>
            <span className="rotulo caps">Los sabores</span>
            <h2>{sabores.length} sabores, en {tamanos.length} tamaños.</h2>
            <p className="entrada">
              Los clásicos están todo el año. Los de temporada van y vienen según
              la fruta que haya.
            </p>
          </div>

          <div className="vitrina">
            <div className="vitrina-pegada">
              <div className="botella-hueco botella-hueco-sabores" data-botella="sabores" />
              <Rotulo />
            </div>
          </div>

          <div className="sabores-estantes">
            {grupos.map((g) => {
              const suyos = sabores.filter((s) => s.grupo === g.llave)
              if (suyos.length === 0) return null
              return <Estante grupo={g} sabores={suyos} key={g.llave} />
            })}
          </div>
        </div>

        <Franja />

        <div className="opciones" data-revelar>
          <div>
            <h3 className="caps">Tamaños</h3>
            <ul>
              {tamanos.map((t) => (
                <li key={t.nombre}>
                  {t.nombre}
                  {t.principal && <span className="caps"> · el de la etiqueta</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="caps">Personaliza la dulzura</h3>
            <ul>
              {dulzura.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="opciones-pie">
              Se prepara como lo pidas, sin costo extra.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
