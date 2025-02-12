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
        secure: false
      },
      '/station/data': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
