/**
 * Base URL for API requests, defaults to `/api`. Same-origin Vite
 * dev proxy (see `vite.config.ts`) which forwards to the backend.
 * In production, point `PUBLIC_API_URL` at the real backend
 * (same parent domain so the HttpOnly session cookies are first-party).
 */
export const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? '/api'
