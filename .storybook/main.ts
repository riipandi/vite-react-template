import type { StorybookConfig } from '@storybook/react-vite'
import stylex from '@stylexjs/unplugin/vite'
import { resolve } from 'node:path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['./stories/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-mcp',
    '@storybook/addon-vitest',
    '@github-ui/storybook-addon-performance-panel'
  ],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    enableCrashReports: false
  },
  features: { backgrounds: false },
  typescript: {
    reactDocgen: 'react-docgen'
  },
  async viteFinal(viteConfig) {
    // Storybook's dev/build merges the root vite.config.ts (which already wires
    // the StyleX plugin + tsconfigPaths). The addon-vitest test runner does NOT
    // load that root config, so StyleX stays uncompiled (runtime defineVars
    // error) and the `#/*` alias is unresolved. Add them here, but only under
    // Vitest, to avoid applying the StyleX plugin twice in dev/build.
    const isVitest = Boolean(process.env.VITEST)
    return mergeConfig(viteConfig, {
      ...(isVitest
        ? {
            plugins: [
              stylex({
                useCSSLayers: true,
                aliases: { '#/*': resolve('./app/*') }
              })
            ],
            resolve: { tsconfigPaths: true }
          }
        : {}),
      build: {
        chunkSizeWarningLimit: 1024 * 2,
        rolldownOptions: {
          checks: { pluginTimings: false },
          output: { codeSplitting: true }
        }
      }
    })
  }
}

export default config
