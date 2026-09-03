import * as stylex from '@stylexjs/stylex'

export const unit = stylex.defineVars({
  'x0.5': '2px',
  x1: '4px',
  'x1.5': '6px',
  x2: '8px',
  x3: '12px',
  x4: '16px',
  x5: '20px',
  x6: '24px',
  x7: '28px',
  x8: '32px',
  x9: '36px',
  x10: '40px',
  x12: '48px',
  x14: '56px',
  x16: '64px',
  x18: '72px',
  x20: '80px'
})

export const radius = stylex.defineVars({
  xsmall: '4px',
  small: '6px',
  medium: '8px',
  large: '10px',
  xlarge: '12px',
  circular: '999px',
  none: '0px'
})

export const zIndex = stylex.defineConsts({
  relative: 10,
  absolute: 100,
  fixed: 200
})

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
