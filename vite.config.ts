import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Configuration du sitemap
    Sitemap({
      hostname: 'https://jordy-bacherot.vercel.app',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
