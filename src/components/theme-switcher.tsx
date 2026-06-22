import { useState } from 'react'
import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'

import { useTheme, toggleTheme } from '#/stores/app-store'
import { colors, fontSize, fontWeight, radius, space } from '../assets/styles/tokens.stylex'

interface ThemeSwitcherProps {
  /** When true, renders a full-width sidebar-style row button. Default: compact pill. */
  variant?: 'sidebar' | 'compact'
  className?: string
}

// ── Keyframes ─────────────────────────────────────────────────────────────────

const iconSwap = stylex.keyframes({
  '0%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
  '30%': { transform: 'rotate(-90deg) scale(0.5)', opacity: '0' },
  '70%': { transform: 'rotate(90deg) scale(0.5)', opacity: '0' },
  '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
})

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = stylex.create({
  // Shared base
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    borderRadius: radius.lg,
    backgroundColor: colors.zinc50,
    color: colors.zinc600,
    cursor: 'pointer',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    fontFamily: 'inherit',
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: '200ms',
    ':hover': {
      backgroundColor: colors.zinc100,
      borderColor: colors.zinc300,
      color: colors.zinc800,
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.primary500,
      outlineOffset: 2,
    },
  },

  // Compact pill — homepage header
  compact: {
    height: '2rem',
    paddingLeft: space[2],
    paddingRight: space[2],
    borderRadius: radius.full,
  },

  // Full-width row — sidebar bottom
  sidebar: {
    justifyContent: 'flex-start',
    width: '100%',
    height: '2.25rem',
    paddingLeft: space[3],
    paddingRight: space[3],
  },

  // Icon badge
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.375rem',
    height: '1.375rem',
    borderRadius: radius.md,
    backgroundColor: colors.primary100,
    color: colors.primary600,
    flexShrink: 0,
    transitionProperty: 'background-color, color',
    transitionDuration: '200ms',
  },

  iconWrapCompact: {
    width: '1.25rem',
    height: '1.25rem',
    borderRadius: radius.sm,
    backgroundColor: 'transparent',
    color: 'inherit',
  },

  iconAnimating: {
    animationName: iconSwap,
    animationDuration: '400ms',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both',
  },

  label: {
    userSelect: 'none',
  },

  labelGrow: {
    flex: 1,
  },
})

// ── Component ─────────────────────────────────────────────────────────────────

export function ThemeSwitcher({ variant = 'compact', className }: ThemeSwitcherProps) {
  const theme = useTheme()
  const [animating, setAnimating] = useState(false)
  const isDark = theme === 'dark'

  const handleClick = () => {
    if (animating) return
    setAnimating(true)
    toggleTheme()
    setTimeout(() => setAnimating(false), 450)
  }

  const IconComponent = isDark ? Lucide.Sun : Lucide.Moon
  const isSidebar = variant === 'sidebar'

  return (
    <button
      type="button"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      {...stylex.props(styles.base, isSidebar ? styles.sidebar : styles.compact)}
      className={className}
      onClick={handleClick}
    >
      <span
        {...stylex.props(
          styles.iconWrap,
          !isSidebar && styles.iconWrapCompact,
          animating && styles.iconAnimating
        )}
      >
        <IconComponent size={isSidebar ? 13 : 14} />
      </span>
      <span {...stylex.props(styles.label, isSidebar && styles.labelGrow)}>
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  )
}
