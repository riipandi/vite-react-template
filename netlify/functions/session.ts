// Session presence probe — always responds 200 so anonymous visitors never
// trigger a 401 console error.
//
// Demo contract: cookie presence check only (the proxied backend validates
// the JWT on every authenticated call anyway). Production backend must
// validate the session server-side here.

export default async (request: Request): Promise<Response> => {
  const cookies = request.headers.get('cookie') ?? ''
  const authenticated = /(?:^|;\s*)accessToken=/.test(cookies)

  return Response.json({ authenticated }, { headers: { 'cache-control': 'no-store' } })
}
