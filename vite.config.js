import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'd4a2-36-66-204-109.ngrok-free.app' // ganti dengan domain ngrok kamu saat ini
    ]
  }
})
