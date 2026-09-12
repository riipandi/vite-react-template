import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import stylex from '@stylexjs/unplugin/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { EventEmitter } from 'node:events'
import { resolve } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

/**
 * StyleX starts a dev HMR interval in configureServer and only clears it on
 * httpServer 'close'. Vitest's Vite server often has no httpServer, so the
 * interval keeps the process alive after tests finish.
 */
function vitestStylexCleanup(): Plugin {
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

export default defineConfig({
  test: {
    // Root-level reporters and coverage apply to the whole run.
    reporters: process.env.CI
      ? [
          ['github-actions'],
          ['json', { outputFile: './.output/tests-results/vitest-results.json' }],
          ['html', { outputDir: './.output/tests-results' }]
        ]
      : [
          ['default'],
          ['json', { outputFile: './.output/tests-results/vitest-results.json' }],
          ['html', { outputDir: './.output/tests-results' }]
        ],
    browser: { traceView: true },
    coverage: {
      provider: 'v8',
      reporter: ['html-spa', 'text-summary'],
      reportsDirectory: './.output/tests-results/coverage',
      include: ['./app/**/*.{js,jsx,ts,tsx}'],
      cleanOnRerun: true,
      clean: true,
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 75,
          lines: 80
        }
      }
    },
    projects: [
      {
        // Unit project (happy-dom, fast, no browser).
        plugins: [
          vitestStylexCleanup(),
          stylex({ useCSSLayers: true, aliases: { '#/*': resolve('./app/*') } }),
          react()
        ],
        resolve: { tsconfigPaths: true },
        envPrefix: ['VITE_', 'PUBLIC_'],
        define: { 'import.meta.env.PUBLIC_APP_VERSION': '"test"' },
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          env: loadEnv('test', process.cwd(), ''),
          environmentOptions: { happyDOM: { url: 'http://localhost:3000/' } },
          setupFiles: ['./tests/setup-test.ts'],
          include: ['./**/*.{test,spec}.{ts,tsx}'],
          exclude: ['node_modules', 'tests-e2e'],
          globals: true
        }
      },
      {
        // Storybook test project: renders stories in a real browser (Playwright) and
        // runs a11y checks via @storybook/addon-a11y. The Storybook vite config
        // (incl. StyleX/React plugins from .storybook/main.ts viteFinal) is provided by
        // the storybookTest plugin, so we don't re-apply the unit setup here. The
        // story files are indexed from the `stories` glob in .storybook/main.ts.
        plugins: await storybookTest({ configDir: resolve('./.storybook') }),
        test: {
          name: 'storybook',
          exclude: ['./**/*.{test,spec}.{ts,tsx}', 'node_modules', 'tests-e2e'],
          browser: {
            enabled: true,
            headless: true,
            traceView: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
})
