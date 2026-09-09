import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { developmentPlugins } from './vite.plugins.ts'

const isTestOrCI = process.env.CI || process.env.VITEST
const isStorybook = process.env.STORYBOOK === 'true'

const apiProxy = {
  '/api': {
    target: 'https://dummyjson.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, '')
  }
}

export default defineConfig({
  plugins: [
    stylex({
      useCSSLayers: true,
      aliases: { '#/*': resolve('./app/*') }
    }),
    !isTestOrCI && !isStorybook && devtools(),
    !isTestOrCI &&
      !isStorybook &&
      tanstackRouter({
        routesDirectory: resolve('./app/routes'),
        generatedRouteTree: resolve('./app/routes.gen.ts'),
        autoCodeSplitting: true,
        target: 'react'
      }),
    react(),
    ...developmentPlugins
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
  // Same-origin proxy to the demo auth backend. Required for the HttpOnly
  // cookie session: cookies default to SameSite=Lax, which is not sent on
  // cross-site fetches, and this keeps them first-party.
  server: isStorybook ? undefined : { port: 3000, strictPort: true, proxy: apiProxy },
  preview: { proxy: apiProxy }
})
