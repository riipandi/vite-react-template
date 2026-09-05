import type { StoryContext } from '@storybook/tanstack-react'
import * as React from 'react'
import { UIProvider } from '#/components/base/provider'
import { ThemeProvider, type ThemeStorage } from '#/components/theme'

export const STORYBOOK_THEME_GLOBAL = 'theme' as const

export type StorybookTheme = 'light' | 'dark' | 'system'
type Direction = 'ltr' | 'rtl'

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

/** Breakpoint names mirror the design tokens (660 / 900 / 1280). */
const breakpoints = [
  { label: 'S', max: 660 },
  { label: 'M', max: 900 },
  { label: 'L', max: 1280 },
  { label: 'XL', max: Number.POSITIVE_INFINITY }
] as const

function useCurrentBreakpoint() {
  const [width, setWidth] = React.useState(() => document.documentElement.clientWidth)

  React.useEffect(() => {
    const onResize = () => setWidth(document.documentElement.clientWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const index = breakpoints.findIndex((breakpoint) => width < breakpoint.max)
  return breakpoints[index === -1 ? breakpoints.length - 1 : index]?.label
}

const barCss: React.CSSProperties = {
  // Pin the layout direction so the RTL toggle never flips the bar's own
  // flex order when the document direction switches.
  direction: 'ltr',
  position: 'fixed',
  bottom: 12,
  right: 12,
  zIndex: 30,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  pointerEvents: 'none',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 11,
  lineHeight: 1,
  userSelect: 'none'
}

const groupCss: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  backdropFilter: 'blur(4px)',
  borderRadius: 999,
  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
  color: '#fff',
  display: 'flex',
  gap: 2,
  padding: 3
}

const pillCss = (active: boolean): React.CSSProperties => ({
  alignItems: 'center',
  borderRadius: 999,
  display: 'flex',
  justifyContent: 'center',
  minHeight: 18,
  minWidth: 22,
  opacity: active ? 1 : 0.45,
  padding: '3px 6px',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
  color: active ? 'rgba(0, 0, 0, 0.9)' : '#fff',
  fontWeight: active ? 700 : 400
})

const buttonCss: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  backdropFilter: 'blur(4px)',
  border: 0,
  borderRadius: 999,
  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 11,
  lineHeight: 1,
  padding: '7px 10px',
  pointerEvents: 'auto'
}

/** Floating canvas overlay (like Reshaped's): live breakpoint indicator and
 * direction toggle. Passive elements keep `pointer-events: none` so stories
 * receive every pointer interaction. */
function CanvasControls({
  direction,
  onToggleDirection
}: {
  direction: Direction
  onToggleDirection: () => void
}) {
  const breakpoint = useCurrentBreakpoint()

  return (
    <div style={barCss}>
      <div style={groupCss} aria-hidden>
        {breakpoints.map((bp) => (
          <span key={bp.label} style={pillCss(bp.label === breakpoint)}>
            {bp.label}
          </span>
        ))}
      </div>
      <button
        type='button'
        onClick={onToggleDirection}
        style={buttonCss}
        aria-label={`Toggle direction, currently ${direction}`}
      >
        {direction.toUpperCase()}
      </button>
    </div>
  )
}

export function GlobalDecorator({ context, children }: GlobalDecoratorProps) {
  const globalTheme = (context.globals[STORYBOOK_THEME_GLOBAL] ?? 'system') as StorybookTheme
  const forcedTheme = globalTheme === 'system' ? undefined : globalTheme

  const [direction, setDirection] = React.useState<Direction>('ltr')

  // StyleX logical properties follow the document direction, while Base UI
  // providers read it from the DirectionProvider context.
  React.useEffect(() => {
    document.documentElement.dir = direction
    return () => {
      document.documentElement.dir = 'ltr'
    }
  }, [direction])

  return (
    <UIProvider direction={direction}>
      <ThemeProvider
        attribute='data-theme'
        defaultTheme='system'
        forcedTheme={forcedTheme}
        storage={ephemeralStorage}
      >
        <style dangerouslySetInnerHTML={{ __html: canvasBackgroundCss }} />
        {children}
        <CanvasControls
          direction={direction}
          onToggleDirection={() => setDirection((current) => (current === 'ltr' ? 'rtl' : 'ltr'))}
        />
      </ThemeProvider>
    </UIProvider>
  )
}
