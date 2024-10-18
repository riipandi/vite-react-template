import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../src/assets/styles/tailwind.css'

const preview: Preview = {
  // Optional parameter to center the component in the Canvas.
  // More info: https://storybook.js.org/docs/configure/story-layout
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light,
    },
  },
}

export default preview
