import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'

import { useTheme } from '#/stores/app-store'
import { toggleTheme } from '#/stores/app-store'

import { radius, space } from '../assets/styles/tokens.stylex'

interface ThemeSwitcherProps {
  className?: string
}

const styles = stylex.create({
  button: {
    borderRadius: radius.md,
    padding: space[2],
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: 'currentColor',
      outlineOffset: 2,
    },
  },
})

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const theme = useTheme()
  const IconComponent = theme === 'dark' ? Lucide.Sun : Lucide.Moon

  return (
    <button
      type="button"
      {...stylex.props(
        x.display['inline-flex'],
        x.alignItems.center,
        x.justifyContent.center,
        x.cursor.pointer,
        x.borderWidth['0'],
        x.backgroundColor.transparent,
        x.color.inherit,
        x.transitionProperty['background-color'],
        x.transitionDuration['150ms'],
        styles.button
      )}
      className={className}
      onClick={toggleTheme}
    >
      <IconComponent {...stylex.props(x.height['1.25rem'], x.width['1.25rem'])} />
    </button>
  )
}
