import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

const shimmer = stylex.keyframes({
  '0%': { backgroundPosition: '150% 0' },
  '50%': { backgroundPosition: '0 0' },
  '100%': { backgroundPosition: '0 0' }
})

export const loaderTextStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    // Scales with the text, snapped down to the 4px unit grid.
    gap: 'round(down, calc(1em / 2.5), 4px)'
  },
  icon: {
    flexShrink: 0
  },
  container: {
    display: 'inline-grid'
  },
  text: {
    backgroundClip: 'text',
    backgroundImage: `linear-gradient(100deg, ${colors.foregroundNeutralFaded} 0 40%, ${colors.white} 50%, ${colors.foregroundNeutralFaded} 60% 100%)`,
    backgroundSize: '300% 100%',
    color: 'transparent',
    gridArea: '1 / 1',
    transitionDuration: duration.medium,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: easing.standard,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  textShimmer: {
    animationDuration: '2.5s',
    animationIterationCount: 'infinite',
    animationName: shimmer,
    animationTimingFunction: 'linear',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: null
    }
  },
  textExit: {
    opacity: 0,
    transform: 'translateY(100%)'
  },
  completedText: {
    gridArea: '1 / 1',
    opacity: 0,
    transform: 'translateY(-100%)',
    transitionDuration: duration.medium,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: easing.standard
  },
  completedTextEnter: {
    opacity: 1,
    transform: 'translateY(0)'
  }
})
