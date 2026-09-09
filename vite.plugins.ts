import type { Connect, Plugin } from 'vite'

// Local-serving-only concerns (not needed on Netlify or in CI builds):
//
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
    // Registered before Vite's internal middlewares, so these win over the `/api` proxy in vite.config.ts.
    server.middlewares.use('/api/auth/logout', logoutHandler)
    server.middlewares.use('/api/auth/session', sessionHandler)
  }

  return {
    name: 'demo-auth-backend',
    configureServer: register,
    configurePreviewServer: register
  }
}

// vite preview does not redirect directory paths, so `/storybook` would 404
// even though `/storybook/` serves the built Storybook. Netlify handles this
// itself (Pretty URLs), so only the preview server needs it.
const storybookSubpathHandler: Connect.NextHandleFunction = (req, res, next) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  if (url.pathname === '/storybook') {
    res.statusCode = 301
    res.setHeader('Location', `/storybook/${url.search}`)
    return res.end()
  }
  next()
}

function storybookPreviewRedirect(): Plugin {
  return {
    name: 'storybook-preview-redirect',
    configurePreviewServer: (server) => {
      server.middlewares.use(storybookSubpathHandler)
    }
  }
}

export const developmentPlugins: Plugin[] = [demoAuthBackend(), storybookPreviewRedirect()]
