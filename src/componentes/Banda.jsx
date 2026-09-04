// Foto ancha con una frase encima. El velo va siempre, no solo donde la foto
// es clara: así el texto se lee sin depender de cómo salió la imagen.
export default function Banda({ foto, rotulo, frase }) {
  return (
    <figure className="banda" data-revelar>
      <img
        src={foto.src}
        alt={foto.alt}
        width={foto.ancho}
        height={foto.alto}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        <span className="caps">{rotulo}</span>
        <p className="banda-frase">{frase}</p>
      </figcaption>
    </figure>
  )
}
