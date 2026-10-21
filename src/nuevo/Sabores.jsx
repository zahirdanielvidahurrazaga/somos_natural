import { useState } from 'react'
import { grupos, sabores } from '../datos/negocio'
import { ponerSaborActual } from '../botella/saborActual'
import { tonos } from './color'
import Gotita, { frutaDe } from './Gotita'
import Globo from './Globo'

// Los sabores como tarjetas de historieta: borde negro, sombra dura, su fruta
// en caricatura. Es vitrina, no tienda: tocar una sube a la portada con ese
// sabor en la botella real.
export default function Sabores() {
  const [grupo, setGrupo] = useState('todos')
  const lista = grupo === 'todos' ? sabores : sabores.filter((s) => s.grupo === grupo)
  const pie = grupos.find((g) => g.llave === grupo)?.pie

  const ver = (s) => {
    ponerSaborActual(s.nombre)
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="m-seccion m-sabores" id="sabores">
      <div className="m-marco">
        <header className="m-cabeza">
          <h2 className="m-titulo rotulo">Nuestros sabores</h2>
          <div className="m-cabeza-gotita">
            <Globo lado="abajo">¡Los {sabores.length} son mis favoritos!</Globo>
            <Gotita pose="abraza" />
          </div>
        </header>

        <div className="m-filtros" role="tablist" aria-label="Grupos de sabores">
          {[{ llave: 'todos', titulo: 'Todos' }, ...grupos].map((g) => (
            <button key={g.llave} role="tab" aria-selected={grupo === g.llave} className="m-boton m-filtro" onClick={() => setGrupo(g.llave)}>
              {g.titulo}
            </button>
          ))}
          {pie && <p className="m-filtros-pie">{pie}</p>}
        </div>

        <ul className="m-tarjetas">
          {lista.map((s) => {
            const t = tonos(s)
            return (
              <li key={s.nombre} style={{ '--pastel': t.pastel, '--fuerte': t.fuerte }}>
                <button className="m-tarjeta" onClick={() => ver(s)} aria-label={`Ver el agua de ${s.nombre} en la botella`}>
                  <span className="m-tarjeta-foto trama">
                    <img src={frutaDe(s)} alt="" loading="lazy" />
                  </span>
                  <span className="m-tarjeta-nombre">{s.nombre}</span>
                  <span className="m-tarjeta-pie">
                    <span className="m-chip">{s.tipo === 'leche' ? 'Con leche' : grupos.find((g) => g.llave === s.grupo)?.titulo}</span>
                    <span className="m-tarjeta-ver" aria-hidden="true">Verla ↑</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
