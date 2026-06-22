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
  '40%': { transform: 'rotate(-15deg) scale(0.7)', opacity: '0.4' },
  '100%': { transform: 'rotate(180deg) scale(1)', opacity: '1' },
})

const pulseGlow = stylex.keyframes({
  '0%': { boxShadow: '0 0 0 0 rgb(99 102 241 / 0.45)' },
  '70%': { boxShadow: '0 0 0 8px rgb(99 102 241 / 0)' },
  '100%': { boxShadow: '0 0 0 0 rgb(99 102 241 / 0)' },
})

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = stylex.create({
  button: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    borderRadius: radius.lg,
    paddingLeft: space[2],
    paddingRight: space[2],
    paddingTop: space[1.5],
    paddingBottom: space[1.5],
    color: colors.zinc600,
    backgroundColor: colors.zinc100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: '200ms',
    ':hover': {
      backgroundColor: colors.zinc200,
      color: colors.zinc900,
      borderColor: colors.zinc300,
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
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    animationFillMode: 'both',
  },
  pulse: {
    animationName: pulseGlow,
    animationDuration: '500ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
  },
  // Indicator showing current theme
  indicator: {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '9999px',
    backgroundColor: colors.zinc400,
    flexShrink: 0,
  },
  indicatorDark: {
    backgroundColor: colors.primary400,
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
    setTimeout(() => setAnimating(false), 450)
  }

  const isDark = theme === 'dark'
  const IconComponent = isDark ? Lucide.Sun : Lucide.Moon

  return (
    <button
      type="button"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      {...stylex.props(
        x.cursor.pointer,
        x.borderWidth['0'],
        x.outlineStyle.none,
        styles.button,
        animating && styles.pulse
      )}
      className={className}
      onClick={handleClick}
    >
      <span {...stylex.props(styles.indicator, isDark && styles.indicatorDark)} />
      <IconComponent size={14} {...stylex.props(styles.icon, animating && styles.iconAnimating)} />
    </button>
  )
}
