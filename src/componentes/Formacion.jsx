import { fotos, sabores } from '../datos/negocio'

// La foto sale por el borde izquierdo de la pantalla en vez de flotar dentro
// de una caja con márgenes. Por eso esta sección NO va dentro de .marco.
export default function Formacion() {
  return (
    <section className="seccion">
      <div className="retrato">
        <figure className="foto">
          <img
            src={fotos.formacion.src}
            alt={fotos.formacion.alt}
            width={fotos.formacion.ancho}
            height={fotos.formacion.alto}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="retrato-texto" data-revelar>
          <span className="rotulo caps">La formación de un día</span>
          <h2>Así salen, cada mañana.</h2>
          <p className="entrada">
            Ninguna lleva más de un día hecha. Lo que ves aquí se preparó la tarde
            anterior y esa misma mañana se repartió, botella por botella.
          </p>
          <div className="portada-fija caps">
            <span>{sabores.length} sabores</span>
            <span>Sin conservadores</span>
          </div>
        </div>
      </div>
    </section>
  )
}
