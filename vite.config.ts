/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  envDir: join(__dirname),
  envPrefix: ['VITE_'],
  define: { 'import.meta.env.APP_VERSION': `"${process.env.npm_package_version}"` },
  publicDir: resolve(__dirname, 'public'),
  root: resolve(__dirname),
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    cache: { dir: './node_modules/.vitest' },
    include: ['./**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '~', replacement: resolve(__dirname, 'public') },
    ],
  },
  base: '/',
  server: {
    port: 3000,
    strictPort: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\//, ''),
    //   },
    // },
  },
})
