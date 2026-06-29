import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

const isTestOrCI = process.env.CI || process.env.VITEST

export default defineConfig({
  plugins: [
    stylex({
      useCSSLayers: true,
      aliases: { '#/*': resolve('./src/*') }
    }),
    !isTestOrCI && devtools(),
    tanstackRouter({
      routesDirectory: resolve('./src/routes'),
      generatedRouteTree: resolve('./src/routes.gen.ts'),
      autoCodeSplitting: true,
      target: 'react'
    }),
    react(),
    !isTestOrCI && visualizer({ emitFile: true })
  ],
  envPrefix: ['VITE_', 'PUBLIC_'],
  define: { 'import.meta.env.PUBLIC_APP_VERSION': `"${process.env.npm_package_version}"` },
  publicDir: resolve('public'),
  resolve: { tsconfigPaths: true },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    outDir: resolve('dist'),
    rolldownOptions: {
      input: { app: resolve('index.html') }
    }
  },
  server: { port: 3000, strictPort: true }
})
