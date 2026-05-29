import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/met': {
        target: 'https://collectionapi.metmuseum.org/public/collection/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/met/, ''),
      },
    },
  },
})
