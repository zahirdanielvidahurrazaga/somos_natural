// El sello giratorio: texto en aro alrededor del logo, como el timbre redondo
// de la marca. Es el gesto que más se mueve del sitio y el más suyo.
const VUELTA = 'SOMOS NATURAL · AGUAS DE SABOR · SIN CONSERVADORES · '

export default function Sello() {
  return (
    <div className="sello">
      <svg className="sello-aro" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="aro" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text>
          <textPath href="#aro" startOffset="0">{VUELTA}</textPath>
        </text>
      </svg>
      <img className="sello-centro" src="/img/logo.png" alt="" width="72" height="72" />
    </div>
  )
}
