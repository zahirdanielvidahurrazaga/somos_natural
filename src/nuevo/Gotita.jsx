// La gotita del logo. `logo` es el dibujo original (public/img/gotita.png);
// las demás poses las generó ChatGPT a partir de ella y de su hoja de
// personaje (2026-10-20, con permiso de Zahir) y viven en public/mundo/.
// No se redibuja ni se tiñe (ver CLAUDE.md, "La gotita").
export default function Gotita({ pose = 'logo', className = '', alt = '' }) {
  const src = pose === 'logo' ? '/img/gotita.png' : `/mundo/gotita-${pose}.webp`
  return <img className={`gotita ${className}`} src={src} alt={alt} loading="lazy" draggable="false" />
}

// La fruta de cada sabor en el mismo estilo de caricatura.
export const frutaDe = (s) => `/mundo/fruta-${s.botella.etq}.webp`
