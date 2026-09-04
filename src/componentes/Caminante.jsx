// La gotita cruza la página caminando por la línea que separa dos secciones.
// Van dos animaciones separadas —una avanza, la otra brinca— porque las dos
// usan transform y en el mismo elemento se pisarían.
export default function Caminante() {
  return (
    <div className="caminante" aria-hidden="true">
      <span className="caminante-paso">
        <img src="/img/gotita.png" alt="" width="454" height="550" loading="lazy" decoding="async" />
      </span>
    </div>
  )
}
