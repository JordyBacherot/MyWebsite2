import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://jordy-bacherot.vercel.app',
      generateRobotsTxt: false
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
