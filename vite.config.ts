import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig, type ProxyOptions } from 'vite'
import { developmentPlugins } from './vite.plugins.ts'

const apiProxy: Record<string, string | ProxyOptions> = {
  '/api': {
    target: 'https://dummyjson.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, '')
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    stylex({
      aliases: { '#/*': resolve('./app/*') },
      enableDevClassNames: mode === 'development',
      useCSSLayers: { before: ['reset'], prefix: 'stylex' }
    }),
    devtools(),
    tanstackRouter({
      routesDirectory: resolve('./app/routes'),
      generatedRouteTree: resolve('./app/routes.gen.ts'),
      autoCodeSplitting: true,
      target: 'react'
    }),
    // React Compiler (native oxc path, requires `oxc-transform-react`).
    // Defaults: compilationMode 'infer', panicThreshold 'none' (components
    // that violate the Rules of React are skipped, never broken), target 19.
    // Storybook compiles via its own framework plugins — uncompiled reference.
    react({ compiler: true }),
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
    outDir: resolve('.output/build'),
    rolldownOptions: {
      input: { app: resolve('index.html') }
    }
  },
  // Same-origin proxy to the demo auth backend. Required for the HttpOnly
  // cookie session: cookies default to SameSite=Lax, which is not sent on
  // cross-site fetches, and this keeps them first-party.
  server: { port: 3000, strictPort: true, proxy: apiProxy },
  preview: { port: 3000, strictPort: false, proxy: apiProxy }
}))
