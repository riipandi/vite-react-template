import { EventEmitter } from 'node:events'
import type { Plugin, ViteDevServer } from 'vite'

/**
 * StyleX starts a dev HMR interval in configureServer and only clears it on
 * httpServer 'close'. Vitest's Vite server often has no httpServer, so the
 * interval keeps the process alive after tests finish.
 */
export function vitestStylexCleanup(): Plugin {
  let server: ViteDevServer | undefined

  const closeHttpServer = () => {
    server?.httpServer?.emit('close')
  }

  return {
    name: 'vitest-stylex-cleanup',
    enforce: 'pre',
    apply: 'serve',
    configureServer(devServer) {
      server = devServer
      if (!devServer.httpServer) {
        devServer.httpServer = new EventEmitter() as ViteDevServer['httpServer']
      }
    },
    buildEnd: closeHttpServer,
    closeWatcher: closeHttpServer
  }
}
