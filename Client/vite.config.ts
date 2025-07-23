import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginRewriteAll from 'vite-plugin-rewrite-all'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Replace 'my-vite-app' with your repository name
  plugins: [react(), VitePluginRewriteAll()],
})
