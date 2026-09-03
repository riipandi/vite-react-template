import type { StorybookConfig } from '@storybook/tanstack-react'
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
  framework: '@storybook/tanstack-react',
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
        }),
        {
          // Mirror the `@layer reset;` prelude from index.html: the StyleX dev middleware
          // injects its priority layers into <head> before globals.css runs, so without
          // this the reset layer would outrank every StyleX style in the preview iframe.
          name: 'storybook-stylex-layer-order',
          transformIndexHtml(html: string) {
            return html.replace(/<head([^>]*)>/, `<head$1>\n<style>@layer reset;</style>`)
          }
        }
      ],
      resolve: { tsconfigPaths: true },
      build: { chunkSizeWarningLimit: 1024 * 4 }
    })
  }
}

export default config
