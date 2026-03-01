import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import { cpSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    pages(),
    {
      name: 'copy-static',
      closeBundle() {
        // Copy static files after build
        const src = resolve(__dirname, 'public/static')
        const dest = resolve(__dirname, 'dist/static')
        cpSync(src, dest, { recursive: true })
        console.log('✅ Static files copied to dist/static/')
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  publicDir: false // Disable automatic public dir copy
})
