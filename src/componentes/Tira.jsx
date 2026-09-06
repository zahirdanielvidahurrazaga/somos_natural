import { Fragment } from 'react'
import { negocio } from '../datos/negocio'

// La línea fija, como el pie de una etiqueta: lo que aplica a TODAS las aguas.
// Antes corría como marquesina. Se detuvo el 2026-09-06: la marquesina es la
// firma del "retro de hamburguesería" que está de moda, y el retro de esta
// marca es el de una etiqueta de imprenta, que no se mueve. "Agítese antes de
// beber" no va por la misma razón que en las etiquetas del sitio: es una
// instrucción para quien ya trae la botella en la mano, no para quien pide.
const FIJOS = ['Sin conservadores', `Reparto en ${negocio.zona}`, 'Personaliza la dulzura', 'Hechas el mismo día']

export default function Tira() {
  return (
    <div className="tira">
      <div className="tira-fila caps">
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
