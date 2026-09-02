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
    // Root vite.config.ts already provides StyleX + tsconfigPaths.
    // Only add StyleX when NOT already present (e.g. addon-vitest runner).
    const hasPlugin = (name: string) =>
      viteConfig.plugins?.some((p) =>
        Array.isArray(p)
          ? p.some((x: Record<string, unknown>) => x?.name === name)
          : (p as Record<string, unknown>)?.name === name
      )

    return mergeConfig(viteConfig, {
      ...(!hasPlugin('stylex')
        ? {
            plugins: [
              stylex({
                useCSSLayers: true,
                aliases: { '#/*': resolve('./app/*') }
              })
            ]
          }
        : {}),
      build: { chunkSizeWarningLimit: 1024 * 4 }
    })
  }
}

export default config
