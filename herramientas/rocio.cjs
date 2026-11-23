// Genera el mapa de CONDENSACIÓN de la botella, una sola vez:
//   node herramientas/rocio.cjs
// Salida en public/marca/: rocio-normal.webp (relieve de las gotas) y
// rocio-datos.webp (R = altura de la gota, G = cobertura con orilla suave,
// B = neblina fina). Repite a lo ancho (da la vuelta a la botella).
//
// v2 (20-nov-2026, copiando la FOTO REAL de sus botellas, formacion.jpg): las gotas
// de condensación en PET son PLANAS e IRREGULARES — manchitas de agua que se juntan,
// alargadas, de muchos tamaños — no bolitas redondas. Cada gota es la unión de 1–4
// manchas elípticas, con perfil de "panqué" (meseta casi plana y orilla empinada):
// el brillo se prende solo en la orilla, como en la foto. La v1 (casquetes
// esféricos parecidos) se veía "como muchas bolitas" (Zahir).
// Escala al generar: 1024 px = 1 unidad de la botella (~9 cm) → 1 mm ≈ 11 px; se
// guarda a la mitad (1024²) para que pese poco en la web.
const path = require('path')
const sharp = require(process.env.SHARP || path.join(process.env.HOME, 'Developer/be-fit-lab/node_modules/sharp'))

const N = 2048
const alto = new Float32Array(N * N)
const neblina = new Float32Array(N * N)
const limpio = new Uint8Array(N * N)
let semilla = 20261120
const r = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647)
const envuelve = (x) => (((Math.round(x) % N) + N) % N)
// la fila también se redondea: con decimales el índice no existe y JS ignoraba la
// escritura en silencio (los escurrimientos nunca marcaban su caminito; revisión de Codex)
const idx = (x, y) => Math.min(N - 1, Math.max(0, Math.round(y))) * N + envuelve(x)

// Una gota irregular: unión de varias manchas elípticas giradas
function gota(cx, cy, rad, { capa = alto, partes = 1 + Math.floor(r() * 3.2), plana = 0.3 } = {}) {
  const manchas = []
  for (let k = 0; k < partes; k++) {
    const a = r() * Math.PI * 2, dist = k === 0 ? 0 : rad * (0.35 + r() * 0.5)
    manchas.push({
      x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist * 1.25,    // se alargan hacia abajo
      rx: rad * (k === 0 ? 1 : 0.45 + r() * 0.45), ry: rad * (k === 0 ? 1 : 0.45 + r() * 0.45) * (1 + r() * 0.35),
      giro: r() * Math.PI,
    })
  }
  const lim = rad * 2.4
  for (let y = Math.max(0, Math.floor(cy - lim)); y <= Math.min(N - 1, Math.ceil(cy + lim)); y++) {
    for (let x = Math.floor(cx - lim); x <= Math.ceil(cx + lim); x++) {
      let d = 9
      for (const m of manchas) {
        const dx0 = x - m.x, dy0 = y - m.y
        const c = Math.cos(m.giro), s = Math.sin(m.giro)
        const dx = (dx0 * c + dy0 * s) / m.rx, dy = (-dx0 * s + dy0 * c) / m.ry
        d = Math.min(d, Math.sqrt(dx * dx + dy * dy))
      }
      if (d >= 1) continue
      // panqué: meseta casi plana y orilla empinada (no casquete esférico)
      const t = 1 - d
      const h = rad * plana * Math.min(1, Math.pow(t / 0.32, 0.7)) * (0.92 + 0.08 * t)
      const i = idx(x, y)
      if (h > capa[i]) capa[i] = h
    }
  }
}
const ocupado = new Uint8Array((N / 8) * (N / 8))
function cabe(cx, cy, rad) {
  const W8 = N / 8
  const c0 = Math.floor((cx - rad) / 8), c1 = Math.floor((cx + rad) / 8)
  const f0 = Math.max(0, Math.floor((cy - rad) / 8)), f1 = Math.min(W8 - 1, Math.floor((cy + rad) / 8))
  for (let f = f0; f <= f1; f++) for (let c = c0; c <= c1; c++) if (ocupado[f * W8 + (((c % W8) + W8) % W8)]) return false
  for (let f = f0; f <= f1; f++) for (let c = c0; c <= c1; c++) ocupado[f * W8 + (((c % W8) + W8) % W8)] = 1
  return true
}

// 1 · Escurrimientos: pocos, zigzaguean, limpian y acaban en una gota gorda alargada
for (let k = 0; k < 7; k++) {
  let x = r() * N, y = r() * N * 0.55
  const largo = (0.12 + r() * 0.3) * N, ancho = 5 + r() * 4
  for (let p = 0; p < largo && y < N - 40; p++) {
    x += (r() - 0.5) * 1.3; y += 1
    for (let dx = -ancho; dx <= ancho; dx++) limpio[idx(x + dx, y)] = 1
  }
  gota(x, y, 20 + r() * 10, { partes: 2 })
}
// 2 · Gotas grandes y medianas irregulares (pocas grandes, más medianas)
let puestas = 0
// v6 (22-nov, "muchas bolitas"): menos medianas parecidas; casi todas chicas y pocas grandes
for (let k = 0; k < 80000 && puestas < 1150; k++) {
  const rad = 5 + 30 * Math.pow(r(), 3.2)
  const x = r() * N, y = r() * N
  if (limpio[idx(x, y)]) continue
  if (!cabe(x, y, rad * 1.05)) continue
  gota(x, y, rad); puestas++
}
// 3 · Gotitas chicas entre las grandes (también irregulares, menos que antes)
for (let k = 0; k < 4000; k++) {   // v6: más, pero diminutas (solo destellan)
  const x = r() * N, y = r() * N
  if (limpio[idx(x, y)] || alto[idx(x, y)] > 0) continue
  gota(x, y, 1.8 + r() * 2.4, { partes: 1 + Math.floor(r() * 2) })
}
// 4 · Neblina finísima (casi no se ve; da la piel empañada)
for (let k = 0; k < 45000; k++) {   // v6: el velo pareja (es lo que da lo mate)
  const x = r() * N, y = r() * N
  if (limpio[idx(x, y)] || alto[idx(x, y)] > 0) continue
  gota(x, y, 1.2 + r() * 1.4, { capa: neblina, partes: 1, plana: 0.5 })
}

const normal = Buffer.alloc(N * N * 4), datos = Buffer.alloc(N * N * 4)
let maxH = 0
for (let i = 0; i < N * N; i++) maxH = Math.max(maxH, alto[i])
const h = (xx, yy) => alto[yy * N + envuelve(xx)] + neblina[yy * N + envuelve(xx)] * 0.3
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const i = y * N + x, o = i * 4
  const yA = Math.max(0, y - 1), yB = Math.min(N - 1, y + 1)
  const gx = (h(x + 1, y) - h(x - 1, y)) * 0.5, gy = (h(x, yA) - h(x, yB)) * 0.5   // fila 0 = arriba
  let nx = -gx * 1.1, ny = -gy * 1.1, nz = 1
  const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l
  normal[o] = Math.round((nx * 0.5 + 0.5) * 255)
  normal[o + 1] = Math.round((ny * 0.5 + 0.5) * 255)
  normal[o + 2] = Math.round((nz * 0.5 + 0.5) * 255)
  normal[o + 3] = 255
  const a = alto[i]
  datos[o] = Math.round(Math.min(1, a / maxH) * 255)
  datos[o + 1] = a > 0 ? Math.round(Math.min(1, a / 1.2) * 255) : 0
  datos[o + 2] = Math.round(Math.min(1, neblina[i] / 1.0) * 255)
  datos[o + 3] = 255
}
const out = path.join(__dirname, '..', 'public', 'marca')
Promise.all([
  sharp(normal, { raw: { width: N, height: N, channels: 4 } }).removeAlpha().resize(1024, 1024, { kernel: 'lanczos3' }).webp({ quality: 85 }).toFile(path.join(out, 'rocio-normal.webp')),
  sharp(datos, { raw: { width: N, height: N, channels: 4 } }).removeAlpha().resize(1024, 1024, { kernel: 'lanczos3' }).webp({ quality: 90 }).toFile(path.join(out, 'rocio-datos.webp')),
]).then(() => console.log(`listo: ${puestas} gotas`))
