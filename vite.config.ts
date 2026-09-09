import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'

const isTestOrCI = process.env.CI || process.env.VITEST
const isStorybook = process.env.STORYBOOK === 'true'

// dummyjson.com has no logout endpoint, and its session cookies are HttpOnly —
// only the server can clear them. This tiny dev middleware stands in for the
// real backend's `POST /auth/logout` (which must invalidate the session AND
// expire the cookies).
function demoCookieLogout(): Plugin {
  return {
    name: 'demo-cookie-logout',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/auth/logout', (_req, res) => {
        res.statusCode = 204
        res.setHeader('Set-Cookie', [
          'accessToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax',
          'refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax'
        ])
        res.end()
      })
    }
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
    // Registered before Vite's internal middlewares, so it wins over the
    // `/api` proxy below.
    demoCookieLogout()
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
  server: isStorybook
    ? undefined
    : {
        port: 3000,
        strictPort: true,
        // Same-origin proxy to the demo auth backend. Required for the
        // HttpOnly cookie session: cookies default to SameSite=Lax, which is
        // not sent on cross-site fetches, and this keeps them first-party
        // (works in every browser, no CORS involved).
        proxy: {
          '/api': {
            target: 'https://dummyjson.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
})
