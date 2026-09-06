import { mapa, marcas, calles } from '../datos/mapa'

// El mapa dibujado. Recibe cuál punto está señalado para resaltarlo, y avisa
// cuando el dedo o el ratón pasan por uno.
//
// Los pines NO son enlaces: el nombre vive en la lista de al lado, y repetir
// aquí dieciocho etiquetas de texto sobre las calles ensuciaría el trazo. Tocar
// un pin señala su renglón; el enlace a Google Maps se abre desde la lista.
export default function Mapa({ puntos, activo, onSenalar }) {
  return (
    <figure className="mapa" data-revelar>
      <svg viewBox={mapa.viewBox} role="img" aria-label="Mapa de la zona con los puntos de venta marcados">
        <g className="mapa-chicas">
          {mapa.chicas.map((d, i) => <path d={d} key={i} />)}
        </g>
        <g className="mapa-grandes">
          {mapa.grandes.map((d, i) => <path d={d} key={i} />)}
        </g>

        {/* Los nombres van encima del trazo pero debajo de los puntos, y llevan
            un halo del color del papel (paint-order) para leerse sobre las
            calles sin taparlas con una caja. */}
        <g className="mapa-calles">
          {calles.map((c) => (
            <text key={c.texto} x={c.x} y={c.y} transform={`rotate(${c.rot} ${c.x} ${c.y})`}>
              {c.texto}
            </text>
          ))}
        </g>

        {/* Igual que en la lista: el apagado va en el grupo, no en cada pin. */}
        <g className="mapa-marcas" onMouseLeave={() => onSenalar(null)}>
          {puntos.map((p) => {
            const m = marcas[p.nombre]
            if (!m) return null
            return (
              <circle
                key={p.nombre}
                cx={m[0]}
                cy={m[1]}
                r="9"
                data-activo={activo === p.nombre ? 'si' : undefined}
                onMouseEnter={() => onSenalar(p.nombre)}
              >
                <title>{p.nombre}</title>
              </circle>
            )
          })}
        </g>
      </svg>

      <figcaption className="caps">Trazo de calles de OpenStreetMap</figcaption>
    </figure>
  )
}
