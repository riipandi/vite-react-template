import * as stylex from '@stylexjs/stylex'

export const duration = stylex.defineVars({
  rapid: '100ms',
  fast: '150ms',
  medium: '200ms',
  slow: '300ms'
})

export const easing = stylex.defineVars({
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)'
})
