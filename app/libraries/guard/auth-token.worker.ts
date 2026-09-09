import * as Comlink from 'comlink'
import { createAuthEngine } from './auth-engine'

/**
 * Auth token worker — hosts the {@link createAuthEngine auth engine} off the
 * main thread. Refresh orchestration (single-flight, proactive timer) runs here;
 * the session itself lives in HttpOnly cookies handled by the browser.
 */
Comlink.expose(createAuthEngine())
