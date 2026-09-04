import { useMemo, useState } from 'react'
import { negocio, sabores, tamanos, dulzura, minimo } from '../datos/negocio'
import { enlaceWhatsapp } from '../lib/whatsapp'

const VACIO = () => Object.fromEntries(sabores.map((s) => [s.nombre, 0]))

// Cada camino pide datos distintos y manda un mensaje distinto.
const MODOS = {
  negocio: {
    rotulo: 'Mi negocio',
    lugar: 'Nombre del negocio',
    lugarEjemplo: 'Ej. Abarrotes La Esquina',
    pie: 'El precio lo vemos juntos en la primera visita.',
    encabezado: 'Quiero surtir mi negocio:',
  },
  evento: {
    rotulo: 'Un evento',
    lugar: 'Dónde es',
    lugarEjemplo: 'Salón, casa, oficina…',
    pie: 'Te confirmamos por WhatsApp si tenemos la fecha libre.',
    encabezado: 'Quiero aguas para un evento:',
  },
  personal: {
    rotulo: 'Para mí',
    lugar: 'Dónde te la dejamos',
    lugarEjemplo: 'Calle y número',
    pie: `Te confirmamos por WhatsApp si llegamos a tu zona.`,
    encabezado: 'Quiero hacer un pedido:',
  },
}

const PRINCIPAL = tamanos.find((t) => t.principal) || tamanos[0]

export default function Pedido() {
  const [modo, setModo] = useState('negocio')
  const [tamano, setTamano] = useState(PRINCIPAL.nombre)
  const [dulce, setDulce] = useState(dulzura[0])
  const [cantidades, setCantidades] = useState(VACIO)
  const [quien, setQuien] = useState('')
  const [lugar, setLugar] = useState('')
  const [fecha, setFecha] = useState('')
  const [gente, setGente] = useState('')
  const [nota, setNota] = useState('')

  const m = MODOS[modo]
  const esGarrafon = tamano.startsWith('Garrafón')
  const unidad = esGarrafon ? 'garrafones' : 'aguas'

  const mover = (nombre, paso) =>
    setCantidades((c) => ({ ...c, [nombre]: Math.max(0, Math.min(999, c[nombre] + paso)) }))

  const elegidos = useMemo(() => sabores.filter((s) => cantidades[s.nombre] > 0), [cantidades])
  const total = elegidos.reduce((t, s) => t + cantidades[s.nombre], 0)
  const faltan = esGarrafon ? 0 : Math.max(0, minimo - total)

  const mensaje = useMemo(() => {
    const l = [`Hola, ${negocio.nombre}. ${m.encabezado}`, '']
    elegidos.forEach((s) => l.push(`• ${s.nombre} — ${cantidades[s.nombre]}`))
    l.push('', `Total: ${total} ${unidad} de ${tamano}`, `Dulzura: ${dulce}`)
    if (quien.trim()) l.push(`Nombre: ${quien.trim()}`)
    if (lugar.trim()) l.push(`${m.lugar}: ${lugar.trim()}`)
    if (modo === 'evento') {
      if (fecha.trim()) l.push(`Fecha del evento: ${fecha.trim()}`)
      if (gente.trim()) l.push(`Cuánta gente: ${gente.trim()}`)
    }
    if (nota.trim()) l.push(`Nota: ${nota.trim()}`)
    return l.join('\n')
  }, [elegidos, cantidades, total, unidad, tamano, dulce, quien, lugar, fecha, gente, nota, modo, m])

  const enlace = total > 0 ? enlaceWhatsapp(negocio.whatsapp, mensaje) : null

  return (
    <section className="seccion franja-suave" id="pedido">
      <div className="marco">
        <div className="cabeza cabeza-centro" data-revelar>
          <span className="rotulo caps">Hacer un pedido</span>
          <h2>Ármalo aquí y te lo mandas por WhatsApp.</h2>
          <p className="entrada">
            Elige tamaño, dulzura y cuántas quieres de cada sabor. Al terminar se
            abre WhatsApp con el mensaje ya escrito; tú nada más le das enviar.
          </p>
        </div>

        <div className="pedido-caja">
          <div>
            <div className="cambiador" role="group" aria-label="Tipo de pedido">
              {Object.entries(MODOS).map(([llave, def]) => (
                <button key={llave} type="button" data-activo={modo === llave ? 'si' : 'no'} onClick={() => setModo(llave)}>
                  {def.rotulo}
                </button>
              ))}
            </div>

            <div className="eleccion">
              <span className="caps">Tamaño</span>
              <div className="fichas">
                {tamanos.map((t) => (
                  <button key={t.nombre} type="button" data-activo={tamano === t.nombre ? 'si' : 'no'} onClick={() => setTamano(t.nombre)}>
                    {t.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div className="eleccion">
              <span className="caps">Dulzura</span>
              <div className="fichas">
                {dulzura.map((d) => (
                  <button key={d} type="button" data-activo={dulce === d ? 'si' : 'no'} onClick={() => setDulce(d)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="eleccion">
              <span className="caps">Sabores</span>
              <div>
                {sabores.map((s) => (
                  <div className="linea" key={s.nombre} style={{ '--c': s.color }}>
                    <span className="gota" />
                    <span className="linea-nombre">{s.nombre}</span>
                    <span className="contador">
                      <button type="button" onClick={() => mover(s.nombre, -1)} disabled={cantidades[s.nombre] === 0} aria-label={`Quitar una de ${s.nombre}`}>
                        −
                      </button>
                      <output data-cero={cantidades[s.nombre] === 0 ? 'si' : 'no'}>{cantidades[s.nombre]}</output>
                      <button type="button" onClick={() => mover(s.nombre, 1)} aria-label={`Agregar una de ${s.nombre}`}>
                        +
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="resumen">
            <label className="campo">
              <span className="caps">Tu nombre</span>
              <input value={quien} onChange={(e) => setQuien(e.target.value)} placeholder="Cómo te llamas" />
            </label>

            <label className="campo">
              <span className="caps">{m.lugar}</span>
              <input value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder={m.lugarEjemplo} />
            </label>

            {modo === 'evento' && (
              <div className="campo-par">
                <label className="campo">
                  <span className="caps">Fecha</span>
                  <input value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="12 de octubre" />
                </label>
                <label className="campo">
                  <span className="caps">Cuánta gente</span>
                  <input value={gente} onChange={(e) => setGente(e.target.value)} placeholder="Ej. 40" inputMode="numeric" />
                </label>
              </div>
            )}

            <label className="campo">
              <span className="caps">Algo más que debamos saber</span>
              <textarea value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Opcional" />
            </label>

            <div className="cuenta caps">
              <span>{tamano}</span>
              <b>{total}</b>
            </div>

            {faltan > 0 && (
              <p className="minimo caps">
                Faltan {faltan} para el mínimo de {minimo}
              </p>
            )}

            <div className="pedido-envio">
              <a
                className="boton boton-vino"
                href={enlace || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!enlace}
                onClick={(e) => { if (!enlace) e.preventDefault() }}
              >
                {total > 0 ? 'Mandar por WhatsApp' : 'Elige al menos una'}
              </a>
              <p className="pedido-pie">{m.pie}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
