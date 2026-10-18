import { negocio } from '../datos/negocio'

// La portada, a la manera del video de la lata de mango que eligió Zahir: el
// título aparece letra por letra y la botella cae girando a la derecha,
// inclinada. La botella no vive aquí: este div vacío (`data-botella`) solo
// le dice dónde ponerse (ver botella/escenario.js).
//
// Lo que antes decía la tira (sin conservadores, reparto, dulzura) va abajo
// del texto, como datos sueltos.
const LINEAS = [['Se', 'hacen', 'hoy.'], ['Te', 'llegan', 'mañana.']]
const HECHOS = ['Sin conservadores', `Reparto en ${negocio.zona}`, 'Personaliza la dulzura']

export default function Hero() {
  return (
    <section className="hero" id="arriba">
      <div className="marco hero-caja">
        <div className="hero-texto">
          <span className="rotulo caps hero-entra">Aguas de sabor · Hechas por una familia</span>
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
