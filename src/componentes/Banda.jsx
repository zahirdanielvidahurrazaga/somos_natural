// Banda ancha, de borde a borde, con una frase encima. Acepta foto o video.
// El velo va SIEMPRE, no solo donde la imagen es clara: así el texto se lee
// sin depender de cómo salió la toma.
export default function Banda({ foto, video, cartel, alt, rotulo, frase }) {
  return (
    <figure className="banda" data-revelar>
      {video ? (
        <video
          src={video}
          poster={cartel}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        <img
          src={foto.src}
          alt={foto.alt}
          width={foto.ancho}
          height={foto.alto}
          loading="lazy"
          decoding="async"
        />
      )}
      <figcaption>
        <span className="caps">{rotulo}</span>
        <p className="banda-frase">{frase}</p>
      </figcaption>
    </figure>
  )
}
