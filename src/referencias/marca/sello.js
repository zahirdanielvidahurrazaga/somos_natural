// El sello nuevo (2026-11-12), en SVG en línea para que use Rubik (de la
// página). Para archivo final hay que convertir el texto a curvas.
let nSello = 0
export function sello(tipo = 'a', { anillo = '#8C66BB', papel = '#FFFDF2', tinta = '#8C66BB' } = {}) {
  const id = `s${nSello++}`
  const arcoArriba = `M 40 150 A 110 110 0 0 1 260 150`
  const arcoAbajo = `M 36 150 A 114 114 0 0 0 264 150`
  if (tipo === 'a') return `<svg class="sello-svg" viewBox="0 0 300 300" role="img" aria-label="Somos Natural · Aguas de sabor">
    <defs><path id="${id}a" d="${arcoArriba}" /><path id="${id}b" d="${arcoAbajo}" /></defs>
    <circle cx="150" cy="150" r="146" fill="${anillo}" /><circle cx="150" cy="150" r="104" fill="${papel}" />
    <circle cx="150" cy="150" r="140" fill="none" stroke="${papel}" stroke-width="2" opacity=".5" />
    <text class="sello-txt" fill="${papel}"><textPath href="#${id}a" startOffset="50%" text-anchor="middle">SOMOS NATURAL</textPath></text>
    <text class="sello-txt" fill="${papel}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">AGUAS DE SABOR</textPath></text>
    <text x="22" y="158" class="sello-estrella" fill="${papel}">✦</text><text x="262" y="158" class="sello-estrella" fill="${papel}">✦</text>
    <image href="/marca/gotita.svg" x="72" y="62" width="156" height="156" />
  </svg>`
  return `<svg class="sello-svg" viewBox="0 0 300 300" role="img" aria-label="Natural · Aguas de sabor · Puebla">
    <defs><path id="${id}b" d="M 48 150 A 102 102 0 0 0 252 150" /></defs>
    <circle cx="150" cy="150" r="146" fill="${papel}" stroke="${anillo}" stroke-width="8" />
    <circle cx="150" cy="150" r="132" fill="none" stroke="${anillo}" stroke-width="1.5" stroke-dasharray="2 5" />
    <image href="/marca/gotita.svg" x="102" y="28" width="96" height="96" />
    <image href="/marca/natural-${tinta === '#8C66BB' ? 'lavanda' : 'tinta'}.svg" x="44" y="118" width="212" height="50" />
    <text class="sello-txt chico" fill="${tinta}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">AGUAS DE SABOR · PUEBLA</textPath></text>
  </svg>`
}
