import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      dir: resolve('./tests'),
      env: loadEnv('test', process.cwd(), ''),
      environmentOptions: { happyDOM: { url: 'http://localhost:3000/' } },
      setupFiles: ['./tests/setup-test.ts'],
      include: ['./**/*.{test,spec}.{ts,tsx}'],
      exclude: ['node_modules', 'tests-e2e'],
      reporters: process.env.CI ? ['html', 'github-actions'] : ['html', 'default'],
      outputFile: {
        json: './.output/tests-results/vitest-results.json',
        html: './.output/tests-results/index.html'
      },
      coverage: {
        provider: 'v8',
        reporter: ['html-spa', 'text-summary'],
        reportsDirectory: './.output/tests-results/coverage',
        include: ['./src/**/*.{js,jsx,ts,tsx}'],
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
      teardownTimeout: 5000,
      globals: true
    }
  })
)
