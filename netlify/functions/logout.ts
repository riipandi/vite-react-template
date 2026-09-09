// Clear the HttpOnly session cookies. dummyjson.com has no logout endpoint;
// the real backend must ALSO invalidate the session server-side before
// expiring the cookies.

export default async (): Promise<Response> => {
  const headers = new Headers()
  headers.append('Set-Cookie', 'accessToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax')
  headers.append('Set-Cookie', 'refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax')

  return new Response(null, { status: 204, headers })
}
