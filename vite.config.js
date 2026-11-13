import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Solo en desarrollo (rama `referencias`): el estudio de fotos
// (referencias/estudio.html) dibuja cada botella en 3D y la manda aquí para
// guardarla como PNG en public/referencias/botellas/. No existe en el build.
const guardarFotos = {
  name: 'guardar-fotos',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__guardar', (req, res) => {
      const params = new URL(req.url, 'http://x').searchParams
      const nombre = params.get('nombre') || ''
      const carpeta = params.get('carpeta') || 'botellas'
      if (req.method !== 'POST' || !/^[a-z0-9-]+$/.test(nombre) || !/^[a-z-]+$/.test(carpeta)) { res.statusCode = 400; return res.end() }
      const partes = []
      req.on('data', (p) => partes.push(p))
      req.on('end', () => {
        const dir = resolve('public/referencias', carpeta)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, `${nombre}.png`), Buffer.concat(partes))
        res.end('ok')
      })
    })
  },
}

export default defineConfig({
  plugins: [react(), guardarFotos],
})
