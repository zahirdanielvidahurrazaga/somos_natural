import { useCallback, useEffect, useRef, useState } from 'react'
import { sabores, grupos } from '../datos/negocio'
import Motivo from './Motivos'
import EtiquetaReal from './EtiquetaReal'

// ─────────────────────────────────────────────────────────────────────────────
// La portada es el refri (2026-10-18, idea elegida por Zahir entre dos
// prototipos). Al lado, lo que el negocio necesita decir en tres segundos: qué
// es, para quién y "toca un sabor".
//
// Justo abajo va la SECCIÓN DEL SABOR. Tocar una botella hace bajar la página
// hasta ahí y la botella baja con el scroll, dando una vuelta, hasta su lugar
// (Zahir pidió que nada se abra encima: todo de corrido). Ahí gira sola y se
// pasa de sabor como diapositivas. Es solo para ver: el pedido vive abajo.
//
// Cada sabor tiene su dirección (/#jamaica): al entrar con ella la página
// baja directo a ese sabor. Los catorce existen también como botones de
// verdad (teclado y buscadores), no solo dibujados en el 3D.
// ─────────────────────────────────────────────────────────────────────────────

const slug = (s) => s.nombre.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const porSlug = Object.fromEntries(sabores.map((s) => [slug(s), s]))
const ORDEN = grupos.flatMap((g) => sabores.filter((s) => s.grupo === g.llave))
const TIPO = { leche: 'Con leche', agua: 'De agua' }
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`
const nombreLargo = (s) => s.enEtiqueta || `Agua de ${s.nombre.toLowerCase()}`

// Desplazamiento propio, más lento que el del navegador (~1.2 s, entrada y
// salida suaves): el viaje de la botella va atado al scroll y con el del
// navegador apenas se alcanzaba a ver.
function deslizarA(meta, suave = true) {
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!suave || quieto) { window.scrollTo({ top: meta, behavior: 'instant' }); return }
  const inicio = scrollY, dura = 1200, t0 = performance.now()
  const curva = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const paso = (ahora) => {
    const k = Math.min(1, (ahora - t0) / dura)
    window.scrollTo({ top: inicio + (meta - inicio) * curva(k), behavior: 'instant' })
    if (k < 1) requestAnimationFrame(paso)
  }
  requestAnimationFrame(paso)
}

export default function RefriPortada() {
  const lienzoRefri = useRef(null)
  const lienzoBotella = useRef(null)
  const huecoRefri = useRef(null)
  const huecoBotella = useRef(null)
  const seccion = useRef(null)
  const motor = useRef(null)
  const [hay3D, setHay3D] = useState(null)         // null = cargando
  const [senalado, setSenalado] = useState(null)
  const [actual, setActual] = useState(ORDEN[0].nombre)
  const lado = useRef(0)

  const s = sabores.find((x) => x.nombre === actual)
  const i = ORDEN.indexOf(s)

  const bajar = useCallback((suave = true) => {
    const el = seccion.current
    if (!el) return
    const techo = document.querySelector('.techo')?.offsetHeight || 0
    deslizarA(el.getBoundingClientRect().top + scrollY - techo, suave)
  }, [])

  // Elegir un sabor: desde el refri baja la página; desde las flechas cambia
  // de lado sin moverse.
  const elegir = useCallback((nombre, { dir = 0, irAbajo = true } = {}) => {
    const x = sabores.find((y) => y.nombre === nombre)
    if (!x) return
    lado.current = dir
    setActual(nombre)
    history.replaceState(null, '', `#${slug(x)}`)
    if (irAbajo) requestAnimationFrame(() => bajar())
  }, [bajar])

  useEffect(() => { motor.current?.ponerActual(actual, { lado: lado.current }) }, [actual, hay3D])

  // con dirección de sabor al entrar, baja directo a él
  useEffect(() => {
    const x = porSlug[decodeURIComponent(location.hash.slice(1))]
    if (x) { setActual(x.nombre); setTimeout(() => bajar(false), 60) }
  }, [bajar])

  const vecino = (paso) => ORDEN[(i + paso + ORDEN.length) % ORDEN.length]
  const pasar = (paso) => elegir(vecino(paso).nombre, { dir: paso, irAbajo: false })

  // teclado: flechas cambian de sabor mientras la sección está a la vista
  useEffect(() => {
    const tecla = (e) => {
      const r = seccion.current?.getBoundingClientRect()
      if (!r || r.top > innerHeight * 0.4 || r.bottom < innerHeight * 0.6) return
      if (e.target.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowRight') pasar(1)
      if (e.key === 'ArrowLeft') pasar(-1)
    }
    addEventListener('keydown', tecla)
    return () => removeEventListener('keydown', tecla)
  })

  // deslizar de lado (teléfono) fuera de la botella cambia de sabor
  const toque = useRef(null)
  const alBajar = (e) => { toque.current = e.target.closest('.sabor-hueco, button') ? null : { x: e.clientX, y: e.clientY } }
  const alSoltar = (e) => {
    const t0 = toque.current
    toque.current = null
    if (!t0) return
    const dx = e.clientX - t0.x, dy = e.clientY - t0.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) pasar(dx < 0 ? 1 : -1)
  }

  // ── El 3D (se carga aparte, después de la página) ──────────────────────
  useEffect(() => {
    let vivo = true
    // Si algo falla al cargar el 3D (no llega el archivo, el aparato no puede
    // con el renderizador), se cae a la versión plana con las etiquetas en vez
    // de quedarse para siempre en "cargando".
    import('../refri/webgl').then(async ({ hayWebGL }) => {
      if (!vivo) return
      if (!hayWebGL()) { setHay3D(false); return }
      const { crearRefri } = await import('../refri/escena')
      if (!vivo) return
      motor.current = crearRefri({
        lienzoRefri: lienzoRefri.current,
        lienzoBotella: lienzoBotella.current,
        sabores,
        grupos,
        huecoRefri: huecoRefri.current,
        zonaRefri: huecoRefri.current,
        seccion: seccion.current,
        huecoBotella: huecoBotella.current,
        alSenalar: setSenalado,
        alElegir: (nombre) => elegir(nombre),
      })
      setHay3D(true)
    }).catch(() => { if (vivo) setHay3D(false) })
    return () => { vivo = false; motor.current?.destruir(); motor.current = null }
  }, [elegir])

  return (
    <>
      <section className="refri-portada" id="arriba">
        <div className="marco refri-portada-caja">
          <div className="refri-texto">
            <span className="rotulo caps">Aguas de sabor · Hechas por una familia</span>
            <h1>Se hacen hoy.<br />Te llegan <em>mañana</em>.</h1>
            <p className="entrada">
              Catorce sabores, hechos la tarde anterior y repartidos frescos en la
              zona sur de Puebla.
            </p>
            <div className="portada-botones">
              <a className="boton boton-vino" href="#negocios">Para mi negocio</a>
              <a className="boton" href="#eventos">Para mi fiesta</a>
              <a className="boton" href="#pedido">Para mí</a>
            </div>
            <p className="refri-pista" aria-live="polite">
              <span className="refri-pista-nombre">{senalado || 'Abre el refri'}</span>
              <span className="caps">{senalado ? 'Tócala para conocerla' : 'Toca una botella para conocerla'}</span>
            </p>
          </div>

          <div className="refri-hueco" ref={huecoRefri} data-estado={hay3D === null ? 'cargando' : hay3D ? '3d' : 'plano'}>
            {/* Mientras carga el 3D: el refri dibujado con CSS, para que nunca
                se vea vacío. Sin 3D, ahí mismo van las etiquetas en lista. */}
            {hay3D !== true && (
              <div className="refri-plano" aria-hidden={hay3D === null}>
                {grupos.map((g) => (
                  <div className="refri-plano-repisa" key={g.llave}>
                    {sabores.filter((x) => x.grupo === g.llave).map((x) => (
                      hay3D === false ? (
                        <button type="button" key={x.nombre} onClick={() => elegir(x.nombre)} aria-label={nombreLargo(x)}>
                          <EtiquetaReal sabor={x} />
                        </button>
                      ) : <i key={x.nombre} style={{ '--c': hex(x.botella.agua) }} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Los catorce como botones de verdad: se ven al llegar con el teclado */}
        <nav className="refri-lista" aria-label="Sabores">
          {ORDEN.map((x) => (
            <button type="button" key={x.nombre} onClick={() => elegir(x.nombre)}>{nombreLargo(x)}</button>
          ))}
        </nav>
      </section>

      {/* ── La sección del sabor ─────────────────────────────────────────
          El fondo, la mancha y el nombre gigante van en el flujo normal (por
          debajo del lienzo de la botella); los textos y controles llevan
          z-index para quedar encima de ella. */}
      <section
        className="sabor-escena"
        id="sabor"
        ref={seccion}
        style={{ '--c': s.color }}
        aria-label={nombreLargo(s)}
        onPointerDown={alBajar}
        onPointerUp={alSoltar}
      >
        <div className="sabor-mancha" key={`m-${s.nombre}`} aria-hidden="true">
          <svg viewBox="0 0 200 200"><path d="M47 33c25-24 79-23 105 4 26 27 33 73 9 101-24 28-77 43-112 22C14 139 4 96 15 69c7-16 19-24 32-36z" /></svg>
          <Motivo nombre={s.etiqueta.motivo} className="sabor-motivo" />
        </div>
        <span className="sabor-gigante" key={`g-${s.nombre}`} aria-hidden="true">{s.nombre.split(',')[0]}</span>

        <div className="sabor-hueco" ref={huecoBotella} aria-hidden="true">
          {hay3D === false && <div className="sabor-etiqueta-plana"><EtiquetaReal sabor={s} /></div>}
        </div>

        <button type="button" className="sabor-subir caps" onClick={() => deslizarA(0)}>
          <span aria-hidden="true">↑</span> Volver al refri
        </button>

        <div className="sabor-info" key={`i-${s.nombre}`}>
          <span className="rotulo caps">{grupos.find((g) => g.llave === s.grupo)?.titulo}</span>
          <h2>{nombreLargo(s)}</h2>
          <p className="entrada">{grupos.find((g) => g.llave === s.grupo)?.pie} Se prepara la tarde anterior y te llega fría a la mañana siguiente.</p>
          <ul className="sabor-hechos caps">
            {TIPO[s.tipo] && <li>{TIPO[s.tipo]}</li>}
            <li>Sin conservadores</li>
            <li>Dulzura a tu gusto</li>
          </ul>
        </div>

        <div className="sabor-avance">
          <button type="button" className="sabor-flecha" onClick={() => pasar(-1)} aria-label={`Anterior: ${vecino(-1).nombre}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="sabor-puntos" role="tablist" aria-label="Sabores">
            {ORDEN.map((x, k) => (
              <button
                type="button"
                key={x.nombre}
                role="tab"
                aria-selected={k === i}
                aria-label={x.nombre}
                style={{ '--c': hex(x.botella.agua) }}
                onClick={() => k !== i && elegir(x.nombre, { dir: k > i ? 1 : -1, irAbajo: false })}
              />
            ))}
          </div>
          <button type="button" className="sabor-flecha" onClick={() => pasar(1)} aria-label={`Siguiente: ${vecino(1).nombre}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <p className="sabor-siguiente caps" key={`n-${s.nombre}`}>
          {String(i + 1).padStart(2, '0')} / {ORDEN.length} · sigue {vecino(1).nombre.split(',')[0].toLowerCase()}
        </p>
      </section>

      <canvas className="lienzo-refri" ref={lienzoRefri} aria-hidden="true" />
      <canvas className="lienzo-botella" ref={lienzoBotella} aria-hidden="true" />
    </>
  )
}
