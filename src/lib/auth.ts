import GoTrue from 'gotrue-js'

/** GoTrue auth client — single shared instance used by routes and providers */
export const auth = new GoTrue({
  APIUrl: import.meta.env.VITE_GOTRUE_URL,
  audience: 'vite-react-template',
  setCookie: true,
})

/** Synchronous check — safe to call inside router beforeLoad / loaders */
export function isAuthenticated(): boolean {
  return auth.currentUser() !== null
}
