// Un dibujo de línea por sabor. Todos en el mismo lienzo de 100×100, con el
// mismo grosor de trazo y sin relleno: así 14 frutas distintas se ven como una
// sola familia. El color lo pone la etiqueta con currentColor.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const D = {
  // Cáliz de jamaica: la flor seca que se hierve, con sus sépalos abiertos.
  jamaica: (
    <>
      <path pathLength="1" d="M50 78c-9 0-16-8-16-19 0-9 5-17 16-25 11 8 16 16 16 25 0 11-7 19-16 19z" />
      <path pathLength="1" d="M50 34c-7-5-11-11-12-19 8 2 13 7 15 14" />
      <path pathLength="1" d="M50 34c7-5 11-11 12-19-8 2-13 7-15 14" />
      <path pathLength="1" d="M34 52c-8-2-14-6-18-13 8-1 15 2 19 8" />
      <path pathLength="1" d="M66 52c8-2 14-6 18-13-8-1-15 2-19 8" />
      <path pathLength="1" d="M38 68c-7 3-13 8-16 15 8 1 15-2 19-8" />
      <path pathLength="1" d="M62 68c7 3 13 8 16 15-8 1-15-2-19-8" />
      <path pathLength="1" d="M50 44v30" />
      <path pathLength="1" d="M50 15V6" />
    </>
  ),

  // Rama de jamaica: la línea fina que va en las cuatro esquinas de su etiqueta.
  'jamaica-rama': (
    <>
      <path pathLength="1" d="M6 6c14 10 26 24 34 40s12 34 12 50" />
      <path pathLength="1" d="M18 18c10-4 20-2 27 5-9 6-20 5-27-5z" />
      <path pathLength="1" d="M30 36c11-3 21 0 27 8-10 5-21 3-27-8z" />
      <path pathLength="1" d="M42 58c11-2 21 2 26 10-10 4-21 1-26-10z" />
      <path pathLength="1" d="M14 30c-6 8-8 17-5 26 8-6 11-16 5-26z" />
      <path pathLength="1" d="M28 54c-6 9-7 18-3 27 8-7 10-17 3-27z" />
    </>
  ),

  // Vaso de horchata con su raja de canela.
  horchata: (
    <>
      <path pathLength="1" d="M32 34h36l-4 40a6 6 0 0 1-6 5H42a6 6 0 0 1-6-5z" />
      <path pathLength="1" d="M33 46h34" />
      <path pathLength="1" d="M56 20l8 4-9 22-8-4z" />
      <path pathLength="1" d="M56 20l-3 3 8 22" />
      <path pathLength="1" d="M42 58c3 2 6 2 9 0s6-2 9 0" />
      <path pathLength="1" d="M43 68c3 2 6 2 9 0" />
    </>
  ),

  // Grano de café con su surco.
  cafe: (
    <>
      <ellipse pathLength="1" cx="50" cy="50" rx="20" ry="27" transform="rotate(-24 50 50)" />
      <path pathLength="1" d="M39 66c5-6 7-12 7-17s-2-11-6-16" />
      <path pathLength="1" d="M30 34c4 3 7 5 11 6" />
      <path pathLength="1" d="M70 66c-4-3-7-5-11-6" />
    </>
  ),

  // Vainas de tamarindo.
  tamarindo: (
    <>
      <path pathLength="1" d="M28 30c10 2 18 10 22 20s10 18 20 22" />
      <path pathLength="1" d="M28 30c-2 10 2 20 10 26s16 12 20 22" />
      <path pathLength="1" d="M36 40c2 3 5 5 8 6" />
      <path pathLength="1" d="M44 52c2 3 5 5 8 6" />
      <path pathLength="1" d="M53 64c2 3 5 5 8 6" />
      <path pathLength="1" d="M70 30c4 6 4 13 0 18" />
      <path pathLength="1" d="M70 30c-5 4-7 11-5 18" />
    </>
  ),

  // Maracuyá partida a la mitad, con sus semillas.
  maracuya: (
    <>
      <circle pathLength="1" cx="50" cy="52" r="26" />
      <circle pathLength="1" cx="50" cy="52" r="17" />
      <circle pathLength="1" cx="44" cy="46" r="2.4" />
      <circle pathLength="1" cx="55" cy="45" r="2.4" />
      <circle pathLength="1" cx="42" cy="56" r="2.4" />
      <circle pathLength="1" cx="52" cy="54" r="2.4" />
      <circle pathLength="1" cx="58" cy="58" r="2.4" />
      <circle pathLength="1" cx="47" cy="62" r="2.4" />
      <path pathLength="1" d="M50 26c1-5 4-8 8-10" />
      <path pathLength="1" d="M62 20c6-2 12 0 16 5-5 5-12 6-17 2" />
    </>
  ),

  // Media rodaja de naranja.
  naranja: (
    <>
      <path pathLength="1" d="M20 62a30 30 0 0 1 60 0z" />
      <path pathLength="1" d="M26 62a24 24 0 0 1 48 0" />
      <path pathLength="1" d="M50 62V38" />
      <path pathLength="1" d="M50 62 33 45" />
      <path pathLength="1" d="M50 62 67 45" />
      <path pathLength="1" d="M50 62 40 40" />
      <path pathLength="1" d="M50 62 60 40" />
      <path pathLength="1" d="M50 62H20" />
      <path pathLength="1" d="M50 62h30" />
    </>
  ),

  // Limón partido, rodaja de pepino y los puntos de la chía.
  limon: (
    <>
      <circle pathLength="1" cx="38" cy="48" r="17" />
      <circle pathLength="1" cx="38" cy="48" r="11" />
      <path pathLength="1" d="M38 37v22M27 48h22M31 41l14 14M45 41 31 55" />
      <circle pathLength="1" cx="68" cy="60" r="13" />
      <circle pathLength="1" cx="68" cy="60" r="7" />
      <path pathLength="1" d="M64 56c1 2 3 3 5 2" />
      <circle pathLength="1" cx="47" cy="74" r="1.6" />
      <circle pathLength="1" cx="54" cy="79" r="1.6" />
      <circle pathLength="1" cx="41" cy="80" r="1.6" />
      <path pathLength="1" d="M46 28c6-6 14-8 22-6" />
    </>
  ),

  // Barra de chocolate.
  chocolate: (
    <>
      <path pathLength="1" d="M28 30h44v40H28z" />
      <path pathLength="1" d="M28 43h44M28 57h44M42 30v40M58 30v40" />
      <path pathLength="1" d="M72 30l8-8v40l-8 8" />
      <path pathLength="1" d="M28 30l8-8h44" />
    </>
  ),

  // Racimo de frutos rojos con su hoja.
  'frutos-rojos': (
    <>
      <circle pathLength="1" cx="42" cy="58" r="4" />
      <circle pathLength="1" cx="50" cy="55" r="4" />
      <circle pathLength="1" cx="46" cy="65" r="4" />
      <circle pathLength="1" cx="54" cy="63" r="4" />
      <circle pathLength="1" cx="38" cy="66" r="4" />
      <circle pathLength="1" cx="50" cy="71" r="4" />
      <circle pathLength="1" cx="68" cy="60" r="9" />
      <path pathLength="1" d="M46 48c0-6 2-11 6-14" />
      <path pathLength="1" d="M52 34c7-4 14-3 19 2-5 6-13 7-19 2" />
      <path pathLength="1" d="M52 34c-6-3-12-2-16 3 5 4 11 4 16 0" />
    </>
  ),

  // Vaina de vainilla con su flor.
  vainilla: (
    <>
      <path pathLength="1" d="M34 22c6 14 8 30 6 48-1 6-4 9-8 9s-6-4-6-10c1-18 3-33 8-47z" />
      <path pathLength="1" d="M32 32c2 12 3 25 2 36" />
      <path pathLength="1" d="M66 44a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      <path pathLength="1" d="M57 35c2-8 8-12 15-11-1 8-7 13-15 11z" />
      <path pathLength="1" d="M66 44c8-2 14 1 17 8-8 3-15 0-17-8z" />
      <path pathLength="1" d="M57 53c-2 8-8 12-15 11 1-8 7-13 15-11z" />
    </>
  ),

  // Rebanada de melón.
  melon: (
    <>
      <path pathLength="1" d="M22 66a34 34 0 0 1 56 0z" />
      <path pathLength="1" d="M28 66a28 28 0 0 1 44 0" />
      <path pathLength="1" d="M36 66a20 20 0 0 1 28 0" />
      <path pathLength="1" d="M22 66h56" />
      <ellipse pathLength="1" cx="44" cy="58" rx="2" ry="3" />
      <ellipse pathLength="1" cx="52" cy="56" rx="2" ry="3" />
      <ellipse pathLength="1" cx="59" cy="59" rx="2" ry="3" />
    </>
  ),

  // Piña con su corona.
  pina: (
    <>
      <path pathLength="1" d="M36 44c0-6 6-10 14-10s14 4 14 10c0 18-4 32-14 32s-14-14-14-32z" />
      <path pathLength="1" d="M38 52 62 62M38 62l24-10M40 42l22 8M40 70l20-8" />
      <path pathLength="1" d="M50 34c-2-8-6-13-12-16 1 7 4 13 8 16" />
      <path pathLength="1" d="M50 34c2-8 6-13 12-16-1 7-4 13-8 16" />
      <path pathLength="1" d="M50 34c0-8-1-14-4-19-2 6-2 13 0 19" />
    </>
  ),

  // Rebanada de sandía.
  sandia: (
    <>
      <path pathLength="1" d="M20 34a34 34 0 0 0 60 0z" />
      <path pathLength="1" d="M26 36a28 28 0 0 0 48 0" />
      <path pathLength="1" d="M20 34h60" />
      <ellipse pathLength="1" cx="42" cy="44" rx="2" ry="3" />
      <ellipse pathLength="1" cx="52" cy="48" rx="2" ry="3" />
      <ellipse pathLength="1" cx="61" cy="43" rx="2" ry="3" />
      <ellipse pathLength="1" cx="50" cy="38" rx="2" ry="3" />
    </>
  ),

  // Guanábana con sus espinitas.
  guanabana: (
    <>
      <path pathLength="1" d="M50 26c14 0 26 12 26 27 0 17-13 29-27 29-13 0-25-11-25-26 0-17 12-30 26-30z" />
      <path pathLength="1" d="M50 26c1-6 3-11 6-16" />
      <path pathLength="1" d="M40 40l-5-5M52 38l-4-6M64 46l6-4M38 56l-6-3M50 56l-3-6M62 60l6-3M42 70l-5 4M56 72l5 4M50 84v6" />
    </>
  ),

  // Mango con su hoja.
  mango: (
    <>
      <path pathLength="1" d="M62 30c10 4 15 15 13 27-2 13-13 22-25 21-10-1-17-9-17-19 0-15 14-33 29-29z" />
      <path pathLength="1" d="M45 44c5-4 11-5 16-3" />
      <path pathLength="1" d="M62 30c2-6 7-10 14-11-1 7-6 12-14 11z" />
      <path pathLength="1" d="M62 30c-4-4-5-9-3-14 5 3 7 9 3 14z" />
    </>
  ),
}

export default function Motivo({ nombre, className }) {
  const trazo = D[nombre]
  if (!trazo) return null
  return (
    <svg viewBox="0 0 100 100" className={className} {...base} aria-hidden="true">
      {trazo}
    </svg>
  )
}
