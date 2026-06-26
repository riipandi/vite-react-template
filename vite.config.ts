import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

const isTestOrCI = process.env.CI || process.env.VITEST

export default defineConfig({
  plugins: [
    stylex({
      useCSSLayers: true,
      aliases: { '#/*': join(__dirname, './src/*') }
    }),
    devtools(),
    tanstackRouter({
      routesDirectory: resolve('./src/routes'),
      generatedRouteTree: resolve('./src/routes.gen.ts'),
      autoCodeSplitting: true,
      target: 'react'
    }),
    react(),
    !isTestOrCI && visualizer({ emitFile: true })
  ],
  resolve: { tsconfigPaths: true },
  envDir: join(__dirname),
  envPrefix: ['VITE_', 'PUBLIC_'],
  define: { 'import.meta.env.PUBLIC_APP_VERSION': `"${process.env.npm_package_version}"` },
  publicDir: resolve(__dirname, 'public'),
  root: resolve(__dirname),
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: { app: resolve(__dirname, 'index.html') }
    }
  },
  server: { port: 3000, strictPort: true }
})
