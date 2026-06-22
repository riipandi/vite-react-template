import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { useCallback, useState } from 'react'
import { colors, fontSize, fontWeight, radius, shadow, space } from '#/assets/styles/tokens.stylex'
import { useTheme, toggleTheme } from '#/stores/app-store'

interface ThemeSwitcherProps {
  variant?: 'sidebar' | 'compact'
  hideLabel?: boolean
  className?: string
}

const iconSwap = stylex.keyframes({
  '0%': { transform: 'scale(1)', opacity: '1' },
  '50%': { transform: 'scale(0.5)', opacity: '0' },
  '100%': { transform: 'scale(1)', opacity: '1' }
})

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[2],
    borderRadius: radius.full,
    backgroundColor: colors.zinc100,
    color: colors.zinc600,
    cursor: 'pointer',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    fontFamily: 'inherit',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transitionProperty: 'background-color, color, transform, box-shadow',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: colors.zinc200,
      color: colors.zinc900,
      boxShadow: shadow.sm
    },
    ':active': {
      transform: 'scale(0.98)'
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.primary500,
      outlineOffset: 2
    }
  },
  compact: {
    height: '2.25rem',
    paddingLeft: space[2.5],
    paddingRight: space[3]
  },
  compactIconOnly: {
    width: '2.25rem',
    height: '2.25rem',
    padding: 0,
    justifyContent: 'center'
  },
  sidebar: {
    justifyContent: 'flex-start',
    width: '100%',
    height: '2.5rem',
    paddingLeft: space[3],
    paddingRight: space[3],
    borderRadius: radius.lg
  },
  sidebarIconOnly: {
    width: '2.375rem',
    height: '2.375rem',
    padding: 0,
    borderRadius: radius.lg,
    justifyContent: 'center'
  },
  iconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem'
  },
  iconAnimating: {
    animationName: iconSwap,
    animationDuration: '350ms',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both'
  },
  label: {
    userSelect: 'none',
    letterSpacing: '0.01em'
  },
  labelGrow: {
    flex: 1
  }
})

export function ThemeSwitcher({
  variant = 'compact',
  hideLabel = false,
  className
}: ThemeSwitcherProps) {
  const theme = useTheme()
  const [animating, setAnimating] = useState(false)
  const isDark = theme === 'dark'
  const isSidebar = variant === 'sidebar'

  const handleClick = useCallback(() => {
    if (animating) return
    setAnimating(true)
    toggleTheme()
  }, [animating])

  const handleAnimEnd = useCallback(() => setAnimating(false), [])

  const IconComponent = isDark ? Lucide.Sun : Lucide.Moon

  const buttonStyles = hideLabel
    ? isSidebar
      ? styles.sidebarIconOnly
      : styles.compactIconOnly
    : isSidebar
      ? styles.sidebar
      : styles.compact

  return (
    <button
      type='button'
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      {...stylex.props(styles.base, buttonStyles)}
      className={className}
      onClick={handleClick}
    >
      <span
        {...stylex.props(styles.iconWrap, animating && styles.iconAnimating)}
        onAnimationEnd={handleAnimEnd}
      >
        <IconComponent size={isSidebar ? 18 : 16} strokeWidth={1.5} />
      </span>
      {!hideLabel && (
        <span {...stylex.props(styles.label, isSidebar && styles.labelGrow)}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </span>
      )}
    </button>
  )
}
