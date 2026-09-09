import stylex from '@stylexjs/unplugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'

const isTestOrCI = process.env.CI || process.env.VITEST
const isStorybook = process.env.STORYBOOK === 'true'

// Demo backend stand-ins. dummyjson.com lacks a logout endpoint and a silent
// session probe, and its session cookies are HttpOnly — only the server can
// clear them. These middlewares stand in for what the real backend must
// implement:
//
// - `POST /api/auth/logout` — invalidate the session AND expire the cookies.
// - `GET  /api/auth/session` — always 200; reports cookie presence so the SPA
//   can skip authenticated probes for anonymous visitors (no 401 console
//   noise). In production this must validate the session server-side.
const logoutHandler: Connect.NextHandleFunction = (_req, res) => {
  res.statusCode = 204
  res.setHeader('Set-Cookie', [
    'accessToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax',
    'refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax'
  ])
  res.end()
}

const sessionHandler: Connect.NextHandleFunction = (req, res) => {
  // Presence check only — the proxied backend validates the JWT later.
  const cookies = req.headers.cookie ?? ''
  const authenticated = /(?:^|;\s*)accessToken=/.test(cookies)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ authenticated }))
}

function demoAuthBackend(): Plugin {
  function register(server: { middlewares: Connect.Server }) {
    // Registered before Vite's internal middlewares, so these win over the
    // `/api` proxy below.
    server.middlewares.use('/api/auth/logout', logoutHandler)
    server.middlewares.use('/api/auth/session', sessionHandler)
  }

  return {
    name: 'demo-auth-backend',
    configureServer: register,
    configurePreviewServer: register
  }
}

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
    demoAuthBackend()
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
        proxy: apiProxy
      },
  preview: { proxy: apiProxy }
})
