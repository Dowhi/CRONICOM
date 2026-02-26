import { defineConfig } from 'vite'

export default defineConfig({
  base: '/CRONICOM/',
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
  }
})
