import * as stylex from '@stylexjs/stylex'

// Spinner animation keyframes
const spinKeyframes = stylex.keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

export const spinnerStyles = stylex.create({
  base: {
    animationName: spinKeyframes,
    animationDuration: '1s',
    // ans: `animationTimingFunction: 'linear'` not supported in StyleX 0.19 — defaults to ease
    animationIterationCount: 'infinite'
  }
})

export const spinnerSizes = stylex.create({
  xs: {
    width: '0.75rem',
    height: '0.75rem'
  },
  sm: {
    width: '1rem',
    height: '1rem'
  },
  md: {
    width: '2rem',
    height: '2rem'
  },
  lg: {
    width: '3rem',
    height: '3rem'
  },
  xl: {
    width: '4rem',
    height: '4rem'
  }
})
