import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(viteConfig) {
    viteConfig.build = {
      ...viteConfig.build,
      chunkSizeWarningLimit: 1200,
      // Vite 8 uses Rolldown — enable automatic code splitting
      // to break large chunks (particularly the storybook iframe bundle).
      // @ref: https://rolldown.rs/reference/OutputOptions.codeSplitting
      rolldownOptions: {
        output: {
          codeSplitting: true,
        },
      },
    }
    return viteConfig
  },
}

export default config
