import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
  typescript: { reactDocgen: 'react-docgen-typescript' },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      build: {
        chunkSizeWarningLimit: 1024 * 2,
        rolldownOptions: {
          output: { codeSplitting: true }
        }
      }
    })
  }
}

export default config
