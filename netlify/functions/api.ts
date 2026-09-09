// Same-origin API shim for the demo backend (dummyjson.com).
//
// Cookie auth needs a same-origin API: this function transparently proxies
// every /api/* request (all HTTP methods) so the HttpOnly session cookies
// land on the site's own domain. Redirect-rule proxies cannot be relied on
// for POST, and a public/_redirects splat would hijack the routing — hence
// native v2 routing via config.path below.
//
// Demo contract: session is a cookie presence check only (the proxied
// backend validates the JWT on every authenticated call anyway); dummyjson
// has no logout endpoint, so logout just expires the cookies. A production
// backend must validate the session server-side and invalidate it on logout.

const BACKEND = 'https://dummyjson.com'
const FUNCTION_BASE = '/.netlify/functions/api'

export const config = { path: '/api/*' }

export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const path = url.pathname
    .replace(FUNCTION_BASE, '') // direct invocation
    .replace(/^\/api/, '') // routed via config.path

  if (path === '/auth/session') {
    const authenticated = /(?:^|;\s*)accessToken=/.test(request.headers.get('cookie') ?? '')
    return Response.json({ authenticated }, { headers: { 'cache-control': 'no-store' } })
  }

  // Function health check.
  if (path === '/hello') {
    return Response.json({
      message: 'Hello from Netlify Functions!',
      timestamp: new Date().toISOString()
    })
  }

  if (path === '/auth/logout') {
    const headers = new Headers()
    headers.append('Set-Cookie', 'accessToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax')
    headers.append('Set-Cookie', 'refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax')
    return new Response(null, { status: 204, headers })
  }

  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('content-length')
  headers.delete('connection')
  headers.delete('accept-encoding')

  const upstream = await fetch(BACKEND + path + url.search, {
    method: request.method,
    headers,
    body:
      request.method === 'GET' || request.method === 'HEAD'
        ? undefined
        : await request.arrayBuffer(),
    redirect: 'manual'
  })

  const responseHeaders = new Headers()
  for (const [key, value] of upstream.headers) {
    if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key)) {
      responseHeaders.append(key, value)
    }
  }
  for (const cookie of upstream.headers.getSetCookie()) {
    responseHeaders.append('set-cookie', cookie)
  }

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders })
}
