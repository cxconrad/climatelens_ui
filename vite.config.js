import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 4173,
    proxy: {
      '/stations-query': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Falls der Proxy-Request einen Fehler wirft, fange diesen ab
          proxy.on('error', (err, req, res) => {
            if (res.writeHead && !res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
            }
            res.end(JSON.stringify({ error: 'Backend nicht verfügbar' }))
          })
        }
      },
      '/station/data': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
