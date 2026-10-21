import { useEffect, useRef, useState } from 'react'
import { grupos, negocio } from '../datos/negocio'
import { ORDEN, ponerSaborActual, useSaborActual } from '../botella/saborActual'
import { tonos } from './color'
import Gotita, { frutaDe } from './Gotita'
import Globo from './Globo'

// Portada del mundo de la gotita: la botella REAL (3D, con su etiqueta de
// verdad) es la protagonista y la gotita la presenta, como la lata real con el
// monito de la referencia de Tarragon. Todo lo demás es caricatura.
const palabra = (s) => s.nombre.split(',')[0]
const AUTO_MS = 6000

export default function Portada() {
  const nombre = useSaborActual()
  const i = ORDEN.findIndex((s) => s.nombre === nombre)
  const s = ORDEN[i]
  const t = tonos(s)
  const [tocado, setTocado] = useState(false)
  const raiz = useRef(null)

  const ir = (paso, porUsuario = true) => {
    if (porUsuario) setTocado(true)
    ponerSaborActual(ORDEN[(i + paso + ORDEN.length) % ORDEN.length].nombre, paso)
  }

  // cambia sola hasta que alguien toca algo
  useEffect(() => {
    if (tocado || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => ir(1, false), AUTO_MS)
    return () => clearTimeout(id)
  })

  useEffect(() => {
    const tecla = (e) => {
      const r = raiz.current?.getBoundingClientRect()
      if (!r || r.bottom < innerHeight * 0.4) return
      if (e.key === 'ArrowRight') ir(1)
      if (e.key === 'ArrowLeft') ir(-1)
    }
    addEventListener('keydown', tecla)
    return () => removeEventListener('keydown', tecla)
  })

  // deslizar con el dedo (fuera de la botella, que se agarra para girarla)
  const toque = useRef(null)
  const empieza = (e) => {
    if (e.pointerType === 'mouse' || e.target.closest('[data-botella], button, a')) return
    toque.current = { x: e.clientX, y: e.clientY }
  }
  const termina = (e) => {
    const a = toque.current
    toque.current = null
    if (!a) return
    const dx = e.clientX - a.x
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - a.y)) ir(dx < 0 ? 1 : -1)
  }

  return (
    <section
      className="m-portada trama"
      id="inicio"
      ref={raiz}
      onPointerDown={empieza}
      onPointerUp={termina}
      style={{ '--fondo': t.cielo, '--fuerte': t.fuerte }}
    >
      <div className="m-portada-texto">
        <p className="m-etiqueta">Aguas naturales · {negocio.zona.replace('la ', '')}</p>
        <p className="m-portada-agua">Agua de</p>
        <h1 className="m-portada-nombre rotulo" key={s.nombre} data-largo={palabra(s).length > 7 ? 'si' : undefined}>
          <span className="m-oculto">Agua de </span>{palabra(s)}
        </h1>
        <p className="m-portada-dato">
          <span className="m-chip">{grupos.find((g) => g.llave === s.grupo)?.titulo}</span>
          {s.tipo === 'leche' && <span className="m-chip">Con leche</span>}
          <span>Hechas el mismo día, sin conservadores.</span>
        </p>
        <div className="m-portada-mando">
          <button className="m-boton m-boton-redondo" onClick={() => ir(-1)} aria-label="Sabor anterior">←</button>
          <a className="m-boton" href="#sabores">Ver los {ORDEN.length} sabores</a>
          <button className="m-boton m-boton-redondo" onClick={() => ir(1)} aria-label="Siguiente sabor">→</button>
        </div>
      </div>

      <div className="m-portada-escena">
        <div className="m-frutas" key={s.nombre} aria-hidden="true">
          <img className="m-fruta m-fruta-1" src={frutaDe(s)} alt="" />
          <img className="m-fruta m-fruta-2" src={frutaDe(s)} alt="" />
        </div>
        <div className="m-portada-hueco" data-botella data-agarrable title="Agárrala y gírala" />
        <img className="m-portada-respaldo" src={`/etiquetas/${s.botella.etq}.webp`} alt={`Etiqueta del agua de ${s.nombre}`} />
        <div className="m-portada-gotita">
          <Globo lado="abajo" key={`g-${s.nombre}`}>¡Prueba la de {palabra(s).toLowerCase()}!</Globo>
          <Gotita pose="presenta" alt="La gotita de Somos Natural presentando la botella" />
        </div>
      </div>

      <p className="m-portada-cuenta" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}<span>/{ORDEN.length}</span>
      </p>
    </section>
  )
}
