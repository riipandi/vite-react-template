import { useState } from 'react'
import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'

import { useTheme, toggleTheme } from '#/stores/app-store'
import { colors, radius, space } from '../assets/styles/tokens.stylex'

interface ThemeSwitcherProps {
  className?: string
}

const styles = stylex.create({
  button: {
    borderRadius: radius.md,
    padding: space[2],
    color: colors.zinc500,
    transitionProperty: 'background-color, color',
    transitionDuration: '200ms',
    ':hover': {
      backgroundColor: colors.surfaceHover,
      color: colors.zinc700,
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
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    setAnimating(true)
    toggleTheme()
    setTimeout(() => setAnimating(false), 200)
  }

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
        x.outlineStyle.none,
        styles.button
      )}
      className={className}
      onClick={handleClick}
    >
      <IconComponent
        {...stylex.props(x.height['1.25rem'], x.width['1.25rem'], animating && x.rotate['180deg'])}
      />
    </button>
  )
}
