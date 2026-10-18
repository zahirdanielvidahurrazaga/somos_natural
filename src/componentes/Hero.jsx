import { sabores, tamanos } from '../datos/negocio'

// La portada, a la manera del video de la lata de mango que eligió Zahir: el
// título aparece letra por letra y la botella cae girando a la derecha,
// inclinada. La botella no vive aquí: este div vacío (`data-botella`) solo
// le dice dónde ponerse (ver botella/escenario.js).
//
// Revisión de diseño con ChatGPT (2026-10-18): la portada prometía rapidez pero
// no decía qué venden, a quién ni dónde. Por eso la línea de arriba nombra al
// cliente fuerte y la zona, y abajo van los datos que un dueño de tienda busca.
// (Se pidió "botellas de 500 ml" y se dejó "tamaños": manejan cuatro.)
const LINEAS = [['Se', 'hacen', 'hoy.'], ['Te', 'llegan', 'mañana.']]
const HECHOS = [`${sabores.length} sabores`, `${tamanos.length} tamaños`, 'Sin conservadores', 'Pedidos por WhatsApp']

export default function Hero() {
  return (
    <section className="hero" id="arriba">
      <div className="marco hero-caja">
        <div className="hero-texto">
          <p className="hero-quien hero-entra">Aguas naturales para tiendas, torterías y restaurantes · Zona sur de Puebla</p>
          {/* Cada letra en su caja para que suba sola; el lector de pantalla
              lee el título entero desde aria-label. */}
          <h1 aria-label="Se hacen hoy. Te llegan mañana.">
            {LINEAS.map((palabras, l) => (
              <span className="hero-linea" key={l} aria-hidden="true">
                {palabras.map((p, w) => (
                  <span className={p === 'mañana.' ? 'hero-palabra hero-acento' : 'hero-palabra'} key={w}>
                    {[...p].map((c, i) => <span className="hero-letra" key={i}>{c}</span>)}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="entrada hero-entra">
            Catorce sabores, hechos la tarde anterior y repartidos frescos a la
            mañana siguiente.
          </p>
          <div className="portada-botones hero-entra">
            <a className="boton boton-vino" href="#negocios">Para mi negocio</a>
            <a className="boton" href="#eventos">Para mi fiesta</a>
            <a className="boton" href="#pedido">Para mí</a>
          </div>
          <ul className="hero-hechos caps hero-entra">
            {HECHOS.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className="hero-hueco" data-botella="" data-inclina="-0.32" aria-hidden="true" />
      </div>
    </section>
  )
}
