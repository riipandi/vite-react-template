/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  envDir: join(__dirname),
  envPrefix: ['API_', 'APP_', 'VITE_'],
  test: { globals: true, environment: 'jsdom' },
  publicDir: resolve(__dirname, 'public'),
  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'src/index.html'),
      },
    },
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
    base: '/',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8053',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''),
      },
      '/static': {
        target: 'http://127.0.0.1:8053',
        changeOrigin: true,
      },
      '/metrics': {
        target: 'http://127.0.0.1:8053',
        changeOrigin: true,
      },
      '/twirp': {
        target: 'http://127.0.0.1:5053',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''),
      },
    },
  },
})
