import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'

import { useTheme } from '#/stores/app-store'
import { toggleTheme } from '#/stores/app-store'

interface ThemeSwitcherProps {
  className?: string
}

const styles = stylex.create({
  icon: {
    height: '1.25rem',
    width: '1.25rem',
  },
})

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const theme = useTheme()
  const IconComponent = theme === 'dark' ? Lucide.Sun : Lucide.Moon

  return (
    <button type="button" className={className} onClick={toggleTheme}>
      <IconComponent {...stylex.props(styles.icon)} />
    </button>
  )
}
