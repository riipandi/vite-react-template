import * as stylex from '@stylexjs/stylex'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { colors } from '#/styles/core/colors.stylex'
import { radius } from '#/styles/core/tokens.stylex'
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
    borderRadius: radius.large,
    color: { default: colors.foregroundNeutralFaded, ':hover': colors.foregroundNeutral },
    backgroundColor: { default: 'transparent', ':hover': colors.backgroundNeutralFaded },
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
        {current === 'light' && <SunIcon {...stylex.props(styles.icon)} />}
        {current === 'dark' && <MoonIcon {...stylex.props(styles.icon)} />}
        {current === 'system' && <MonitorIcon {...stylex.props(styles.icon)} />}
      </button>
    </div>
  )
}
