import type { StorybookConfig } from '@storybook/react-vite'
import stylex from '@stylexjs/unplugin/vite'
import { resolve } from 'node:path'
import remarkGfm from 'remark-gfm'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['./stories/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
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
    return mergeConfig(viteConfig, {
      plugins: [
        stylex({
          useCSSLayers: true,
          aliases: { '#/*': resolve('./app/*') }
        })
      ],
      resolve: { tsconfigPaths: true },
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
