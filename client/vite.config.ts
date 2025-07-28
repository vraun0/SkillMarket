import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    outDir: '../server/frontend/dist', // <-- your custom output directory (relative to frontend root)
    emptyOutDir: true,
  },
  resolve: {
    alias: {
     '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api' : 'http://localhost:3001',
    },
  },
})
