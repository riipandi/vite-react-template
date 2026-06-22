import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

const isTestOrCI = process.env.CI || process.env.VITEST

export default defineConfig({
  plugins: [
    devtools(),
    stylex({
      useCSSLayers: true,
      aliases: { '#/*': join(__dirname, './src/*') }
    }),
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
  define: { 'import.meta.env.APP_VERSION': `"${process.env.npm_package_version}"` },
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
  server: { port: 3000, strictPort: true },
  test: {
    environment: 'happy-dom',
    env: loadEnv('test', process.cwd(), ''),
    environmentOptions: {
      happyDOM: { url: 'http://localhost:3000/' }
    },
    setupFiles: ['./tests/setup-test.ts'],
    include: ['./**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'tests-e2e'],
    reporters: process.env.CI ? ['html', 'github-actions'] : ['html', 'default'],
    outputFile: {
      json: './.output/tests-results/vitest-results.json',
      html: './.output/tests-results/index.html'
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['html-spa', 'text-summary'],
      reportsDirectory: './.output/tests-results/coverage',
      include: ['./src/**/*.{js,jsx,ts,tsx}'],
      cleanOnRerun: true,
      clean: true,
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 75,
          lines: 80
        }
      }
    },
    dir: './tests',
    globals: true,
    teardownTimeout: 0
  }
})
