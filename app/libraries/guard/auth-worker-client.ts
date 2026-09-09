import * as Comlink from 'comlink'
import { API_BASE_URL, createAuthEngine, type AuthEngineApi } from './auth-engine'

/** Comlink-backed handle to the auth engine. */
export type AuthWorkerClient = Comlink.Remote<AuthEngineApi>

let client: AuthWorkerClient | null = null

/**
 * Lazily create (once) the auth worker and return its typed proxy.
 *
 * Falls back to a main-thread engine when workers are unavailable —
 * non-browser environments (SSR, unit tests) or worker construction
 * failures (e.g. a restrictive CSP).
 */
export function authWorker(): AuthWorkerClient {
  if (client) return client

  // Skip workers under Vitest: happy-dom/node have no Worker implementation
  // and tests stub the network instead.
  const workerSupported = typeof Worker !== 'undefined' && !import.meta.env.VITEST

  if (workerSupported) {
    try {
      // Vite bundles this into a real worker file (CSP `worker-src 'self'`
      // compliant — no blob URLs).
      const worker = new Worker(new URL('./auth-token.worker.ts', import.meta.url), {
        type: 'module'
      })
      client = Comlink.wrap<AuthEngineApi>(worker)
      return client
    } catch {
      // Worker construction failed — fall through to the main-thread engine.
    }
  }

  // The engine methods are already async, so the plain object is structurally
  // compatible with its Comlink remote proxy type.
  client = createAuthEngine(API_BASE_URL) as unknown as AuthWorkerClient
  return client
}
