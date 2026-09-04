import { Fragment } from 'react'

// Los textos que van en TODAS sus etiquetas, corriendo despacio.
// Van DOS trenes idénticos pegados: cuando el primero sale de cuadro el
// segundo ya ocupa su lugar, y el ciclo no se nota. El segundo es decorativo,
// así que se esconde de los lectores de pantalla.
const FIJOS = ['Sin conservadores', 'Agítese antes de beber', 'Personaliza la dulzura', 'Hechas el mismo día']

export default function Tira() {
  return (
    <div className="tira">
      {[1, 2].map((n) => (
        <div className="tira-fila caps" key={n} aria-hidden={n === 2 || undefined}>
          {FIJOS.map((t) => (
            <Fragment key={t}>
              <span>{t}</span>
              <i />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
