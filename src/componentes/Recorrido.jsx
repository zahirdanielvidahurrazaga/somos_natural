import { useEffect, useRef, useState } from 'react'
import { sabores, grupos } from '../datos/negocio'
import Motivo from './Motivos'
import { pedirSabor } from '../botella/canal'

// El recorrido de los clásicos (2026-10-18), sacado de una referencia que pasó
// Zahir: la escena se queda fija mientras bajas y cada tramo de scroll es un
// sabor. Cambian el fondo, la mancha con el dibujo de su fruta y el nombre
// gigante; la botella 3D (que vive en su propio lienzo y se coloca sobre el
// hueco de aquí) se endereza, da la vuelta y regresa con la etiqueta nueva.
//
// Solo van los cinco clásicos: con los catorce eran catorce pantallas de
// scroll. Los textos son los que sí son ciertos para todos (nada inventado);
// si el negocio da una frase de cada sabor, va en negocio.js.
const CLASICOS = sabores.filter((s) => s.grupo === 'clasicos')
const GRUPO = grupos.find((g) => g.llave === 'clasicos')
const TIPO = { leche: 'Con leche', agua: 'De agua' }

export default function Recorrido() {
  const ref = useRef(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    let actual = -1
    let activo = false
    const medir = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const recorrido = r.height - innerHeight
      const p = Math.min(0.9999, Math.max(0, -r.top / recorrido))
      const k = Math.floor(p * CLASICOS.length)
      const dentro = r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5
      if (k !== actual) {
        actual = k
        setI(k)
      }
      // a la botella solo se le pide el sabor mientras la escena manda
      if (dentro && (!activo || k !== activo.k)) pedirSabor(CLASICOS[k].nombre)
      activo = dentro ? { k } : false
    }
    medir()
    addEventListener('scroll', medir, { passive: true })
    addEventListener('resize', medir)
    return () => {
      removeEventListener('scroll', medir)
      removeEventListener('resize', medir)
    }
  }, [])

  const s = CLASICOS[i]

  return (
    <section className="recorrido" ref={ref} aria-label="Los clásicos" style={{ '--n': CLASICOS.length }}>
      <div className="recorrido-escena" style={{ '--c': s.color }}>
        <div className="recorrido-mancha" key={`m-${s.nombre}`}>
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path d="M47 33c25-24 79-23 105 4 26 27 33 73 9 101-24 28-77 43-112 22C14 139 4 96 15 69c7-16 19-24 32-36z" />
          </svg>
          <Motivo nombre={s.etiqueta.motivo} className="recorrido-motivo" />
        </div>

        {/* El gigante va con la primera palabra: "Limón, pepino y chía" no cabe */}
        <span className="recorrido-nombre" aria-hidden="true" key={`n-${s.nombre}`}>{s.nombre.split(',')[0]}</span>

        <div className="botella-hueco botella-hueco-recorrido" data-botella="recorrido" />

        <div className="marco recorrido-texto">
          <div className="recorrido-cuenta caps">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <i />
            <span>{String(CLASICOS.length).padStart(2, '0')}</span>
          </div>
          <div className="recorrido-dato" key={`d-${s.nombre}`}>
            <span className="rotulo caps">{GRUPO?.titulo}</span>
            <h2>{s.enEtiqueta || `Agua de ${s.nombre.toLowerCase()}`}</h2>
            <p className="entrada">{GRUPO?.pie} Hecha el mismo día que te la entregamos.</p>
            <ul className="recorrido-hechos caps">
              {TIPO[s.tipo] && <li>{TIPO[s.tipo]}</li>}
              <li>Sin conservadores</li>
              <li>Dulzura a tu gusto</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
