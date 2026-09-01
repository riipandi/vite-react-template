import type { Preview } from '@storybook/react-vite'
import { GlobalDecorator, STORYBOOK_THEME_GLOBAL } from './decorator'
import '../app/assets/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    [STORYBOOK_THEME_GLOBAL]: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'system', title: 'System', icon: 'contrast' },
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    [STORYBOOK_THEME_GLOBAL]: 'system'
  },
  decorators: [
    (Story, context) => (
      <GlobalDecorator context={context}>
        <Story />
      </GlobalDecorator>
    )
  ]
}

export default preview
