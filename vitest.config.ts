import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import stylex from '@stylexjs/unplugin/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { vitestStylexCleanup } from './tests/stylex-cleanup.ts'

// Storybook test project: renders stories in a real browser (Playwright) and
// runs a11y checks via @storybook/addon-a11y. The Storybook vite config
// (incl. StyleX/React plugins from .storybook/main.ts viteFinal) is provided by
// the storybookTest plugin, so we don't re-apply the unit setup here. The
// story files are indexed from the `stories` glob in .storybook/main.ts.
const storybookPlugins = await storybookTest({ configDir: resolve('./.storybook') })

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
        plugins: storybookPlugins,
        test: {
          name: 'storybook',
          exclude: ['./**/*.{test,spec}.{ts,tsx}', 'node_modules', 'tests-e2e'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
})
