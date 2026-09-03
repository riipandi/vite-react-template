import type { StoryContext } from '@storybook/tanstack-react'
import { ThemeProvider, type ThemeStorage } from '#/components/theme'

export const STORYBOOK_THEME_GLOBAL = 'theme' as const

export type StorybookTheme = 'light' | 'dark' | 'system'

interface GlobalDecoratorProps {
  context: StoryContext
  children: React.ReactNode
}

const ephemeralStorage: ThemeStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
}

const pageBackgroundColor = {
  light: 'oklch(1 0 0)',
  dark: 'oklch(0.15 0.02 17.58)'
} as const

const canvasBackgroundCss = `
html[data-theme='light'],
html[data-theme='light'] body,
html[data-theme='light'] #storybook-root,
html[data-theme='light'] #storybook-docs { background-color: ${pageBackgroundColor.light}; }
html[data-theme='dark'],
html[data-theme='dark'] body,
html[data-theme='dark'] #storybook-root,
html[data-theme='dark'] #storybook-docs { background-color: ${pageBackgroundColor.dark}; }
`

export function GlobalDecorator({ context, children }: GlobalDecoratorProps) {
  const globalTheme = (context.globals[STORYBOOK_THEME_GLOBAL] ?? 'system') as StorybookTheme
  const forcedTheme = globalTheme === 'system' ? undefined : globalTheme

  return (
    <ThemeProvider
      attribute='data-theme'
      defaultTheme='system'
      forcedTheme={forcedTheme}
      storage={ephemeralStorage}
    >
      <style dangerouslySetInnerHTML={{ __html: canvasBackgroundCss }} />
      {children}
    </ThemeProvider>
  )
}
