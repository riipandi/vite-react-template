import * as stylex from '@stylexjs/stylex'
import { IconComputerMonitor, IconMoon, IconSun } from 'obra-icons-react'
import { radiusVar, colorVar } from '#/styles/core/tokens.stylex'
import { useTheme } from './theme'

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
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radiusVar.lg,
    color: { default: colorVar.fgNeutralFaded, ':hover': colorVar.fgNeutral },
    backgroundColor: { default: 'transparent', ':hover': colorVar.bgNeutralFaded },
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
        {current === 'light' && <IconSun {...stylex.props(styles.icon)} />}
        {current === 'dark' && <IconMoon {...stylex.props(styles.icon)} />}
        {current === 'system' && <IconComputerMonitor {...stylex.props(styles.icon)} />}
      </button>
    </div>
  )
}
