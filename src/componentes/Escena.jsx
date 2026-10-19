import { useEffect, useRef, useState } from 'react'

// Una ESCENA (2026-10-18, Zahir: "quiero inmersión, no un sitio que parece del
// 2010"). Mismo lenguaje que la galería: color a sangre, la botella al centro y
// una palabra gigante detrás. La sección mide un alto de pantalla por paso y
// adentro todo se queda pegado: al bajar no se recorre la página, avanza la
// historia, y con cada paso cambia el color de todo. Los colores viven en el
// CSS por sección y paso (`[data-escena][data-paso]`), no aquí.
//
// pasos: [{ palabra: ['Esa tarde'], incl, sabor, titulo, texto }] — `sabor`
// es el que enseña la botella en ese paso (escogido para resaltar sobre su
// color); sin él, la botella lleva el que se eligió en la galería.
// fondo: opcional, un video o foto que se ve teñido detrás de todo
// extra: lo que acompaña a todos los pasos (prueba social, botones)
export default function Escena({ id, nombre, rotulo, titulo, pasos, fondo, extra }) {
  const ref = useRef(null)
  const [k, setK] = useState(0)

  useEffect(() => {
    const medir = () => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const avance = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
      setK(Math.min(pasos.length - 1, Math.floor(avance * pasos.length)))
    }
    medir()
    addEventListener('scroll', medir, { passive: true })
    addEventListener('resize', medir)
    return () => { removeEventListener('scroll', medir); removeEventListener('resize', medir) }
  }, [pasos.length])

  const p = pasos[k]
  // el nombre gigante llena el ancho: la letra depende de la palabra más larga
  const letras = Math.min(9, Math.max(4, ...p.palabra.map((w) => w.length)))

  return (
    <section
      className="escena"
      id={id}
      ref={ref}
      data-escena={nombre}
      data-paso={k}
      data-pasos={pasos.length}
      aria-label={rotulo}
    >
      {/* Dos capas pegadas, una encima de la otra: atrás el color, el video y
          la palabra gigante (quedan DETRÁS de la botella, que va en su propio
          lienzo fijo); adelante el texto y los botones (ENCIMA de la botella).
          En una sola capa no se puede: lo pegado (sticky) arma su propio
          grupo y entero queda o atrás o adelante del lienzo. */}
      <div className="escena-fija">
        {fondo && <div className="escena-fondo" aria-hidden="true">{fondo}</div>}

        <p
          className="galeria-gigante escena-gigante"
          data-letras={letras}
          data-renglones={p.palabra.length}
          aria-hidden="true"
          key={`g-${k}`}
        >
          {p.palabra.map((w) => <span key={w}>{w}</span>)}
        </p>

        <div className="escena-hueco" data-botella="" data-inclina={p.incl} data-sabor={p.sabor} aria-hidden="true" />
      </div>

      <div className="escena-frente">
        <div className="marco escena-arriba">
          <span className="caps">{rotulo}</span>
          <h2 className="escena-titulo">{titulo}</h2>
        </div>

        <div className="marco escena-pie">
          {/* Lo que se ve es solo el paso actual; para lectores de pantalla
              van TODOS los pasos en una lista (revisión de ChatGPT): si no,
              quien navega por encabezados no los encontraba sin hacer scroll. */}
          <ol className="solo-lector">
            {pasos.map((x) => <li key={x.titulo}><h3>{x.titulo}</h3><p>{x.texto}</p></li>)}
          </ol>
          <div className="escena-dato" aria-hidden="true" key={`d-${k}`}>
            <span className="caps">{String(k + 1).padStart(2, '0')} / {String(pasos.length).padStart(2, '0')}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </div>
          <div className="escena-lado">
            {extra}
            <ol className="escena-avance" aria-hidden="true">
              {pasos.map((x, i) => <li key={x.titulo} data-hecho={i <= k ? 'si' : undefined} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
