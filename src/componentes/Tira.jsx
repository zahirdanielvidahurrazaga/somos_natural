import { Fragment } from 'react'

// Los tres textos que van en TODAS sus etiquetas. Aquí sustituyen a la cinta
// que corría: mismo papel, sin movimiento.
const FIJOS = ['Sin conservadores', 'Agítese antes de beber', 'Personaliza la dulzura', 'Hechas el mismo día']

export default function Tira() {
  return (
    <div className="tira">
      <div className="marco tira-fila caps">
        {FIJOS.map((t, i) => (
          <Fragment key={t}>
            {i > 0 && <i />}
            <span>{t}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
