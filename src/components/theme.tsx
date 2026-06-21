import { useState } from 'react'
import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'

import { useTheme, toggleTheme } from '#/stores/app-store'
import { colors, radius, space } from '../assets/styles/tokens.stylex'

interface ThemeSwitcherProps {
  className?: string
}

// ── Keyframes ─────────────────────────────────────────────────────────────────

const spinOut = stylex.keyframes({
  '0%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
  '50%': { transform: 'rotate(90deg) scale(0.6)', opacity: '0' },
  '100%': { transform: 'rotate(180deg) scale(1)', opacity: '1' },
})

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = stylex.create({
  button: {
    position: 'relative',
    borderRadius: radius.lg,
    padding: space[2],
    color: colors.zinc500,
    transitionProperty: 'background-color, color, box-shadow',
    transitionDuration: '200ms',
    ':hover': {
      backgroundColor: colors.zinc100,
      color: colors.zinc800,
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.primary500,
      outlineOffset: 2,
    },
  },
  icon: {
    display: 'block',
    transitionProperty: 'transform, opacity',
    transitionDuration: '200ms',
  },
  iconAnimating: {
    animationName: spinOut,
    animationDuration: '350ms',
    animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    animationFillMode: 'both',
  },
})

// ── Component ─────────────────────────────────────────────────────────────────

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const theme = useTheme()
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    if (animating) return
    setAnimating(true)
    toggleTheme()
    setTimeout(() => setAnimating(false), 400)
  }

  const IconComponent = theme === 'dark' ? Lucide.Sun : Lucide.Moon

  return (
    <button
      type="button"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
        size={16}
        {...stylex.props(styles.icon, animating && styles.iconAnimating)}
      />
    </button>
  )
}
