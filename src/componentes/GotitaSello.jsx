// El personaje CON su aro de texto girando alrededor.
//
// Antes eran dos cosas distintas en la misma portada: el timbre redondo —que
// ya traía la gotita chiquita dentro del logo— y la gotita de cuerpo entero.
// Era el mismo personaje dos veces. Ahora es uno solo: el aro gira, la gotita
// respira, y la cabeza y los pies se salen del aro para que no parezca sello.

const VUELTA = 'SOMOS NATURAL · AGUAS DE SABOR · SIN CONSERVADORES · '

export default function GotitaSello() {
  return (
    <div className="gotita-sello">
      <svg className="gotita-aro" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="aroGotita" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text>
          <textPath href="#aroGotita" startOffset="0">{VUELTA}</textPath>
        </text>
      </svg>
      <img
        className="gotita-figura"
        src="/img/gotita.png"
        alt="La gotita de Somos Natural"
        width="454"
        height="550"
      />
    </div>
  )
}
