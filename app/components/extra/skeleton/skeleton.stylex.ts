import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { radius } from '#/styles/core/tokens.stylex'

export const skeletonPulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 }
})

export const skeletonStyles = stylex.create({
  root: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: skeletonPulse,
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.medium
  }
})
