import { ThemeProvider as LonikThemer, useTheme } from '@lonik/themer'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { ui, radius, space } from '#/styles/token.stylex'

export function ThemeProvider(props: React.PropsWithChildren) {
  return (
    <LonikThemer
      themes={['light', 'dark']}
      attribute='data-theme'
      defaultTheme='system'
      disableTransitionOnChange={true}
      enableColorScheme={true}
      enableSystem={true}
      storage='localStorage'
    >
      {props.children}
    </LonikThemer>
  )
}

const cycle: Record<string, string> = { light: 'dark', dark: 'system', system: 'light' }

const labels: Record<string, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to system mode',
  system: 'Switch to light mode'
}

const styles = stylex.create({
  wrapper: {
    display: 'inline-flex'
  },
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    padding: space[2],
    color: {
      default: ui.fgFaded,
      ':hover': ui.fg
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': ui.bgNeutralFaded
    },
    borderWidth: 0,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms'
  },
  icon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor'
  }
})

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const current = theme ?? 'system'

  return (
    <div {...stylex.props(styles.wrapper)}>
      <button
        type='button'
        onClick={() => setTheme(cycle[current] ?? 'light')}
        {...stylex.props(styles.base)}
        aria-label={labels[current]}
      >
        {current === 'light' && <Lucide.Sun {...stylex.props(styles.icon)} />}
        {current === 'dark' && <Lucide.Moon {...stylex.props(styles.icon)} />}
        {current === 'system' && <Lucide.Monitor {...stylex.props(styles.icon)} />}
      </button>
    </div>
  )
}
