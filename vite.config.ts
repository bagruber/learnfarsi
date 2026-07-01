import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves from /<repo>/ — set base so asset URLs resolve.
  base: '/learnfarsi/',
  plugins: [react()],
})
