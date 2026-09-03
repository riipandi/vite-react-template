import * as stylex from '@stylexjs/stylex'

export const spinnerSpin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

export const spinnerStyles = stylex.create({
  root: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: spinnerSpin,
    animationTimingFunction: 'linear',
    flexShrink: 0
  }
})
