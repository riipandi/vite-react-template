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
  small: '4px',
  medium: '6px',
  large: '10px',
  circular: '999px',
  none: '0px'
})

export const zIndex = stylex.defineVars({
  relative: 10,
  absolute: 100,
  fixed: 200
})
