import * as stylex from '@stylexjs/stylex'

export const viewport = stylex.defineConsts({
  medium: 660,
  large: 900,
  xlarge: 1280
})

export const breakpoints = stylex.defineConsts({
  small: '@media (max-width: 659px)',
  medium: '@media (min-width: 660px) and (max-width: 899px)',
  large: '@media (min-width: 900px) and (max-width: 1279px)',
  xlarge: '@media (min-width: 1280px)'
})
