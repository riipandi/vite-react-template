import * as stylex from '@stylexjs/stylex'

// Non-themed scales (compile-time constants — see STYLEX.md). Themable tokens
// (colors, radius, fonts, shadows) live in tokens.stylex.ts as defineVars.

// Spacing scale in 0.25rem (4px) steps; sNN = NN * 0.25rem.
export const space = stylex.defineConsts({
  s05: '0.125rem',
  s1: '0.25rem',
  s15: '0.375rem',
  s2: '0.5rem',
  s25: '0.625rem',
  s3: '0.75rem',
  s4: '1rem',
  s5: '1.25rem',
  s6: '1.5rem',
  s7: '1.75rem',
  s8: '2rem',
  s9: '2.25rem',
  s10: '2.5rem',
  s12: '3rem',
  s16: '4rem'
})

export const stroke = stylex.defineConsts({
  border: '1px',
  focus: '2px',
  // Soft state ring (hover/active halo on slider thumbs etc.), like Tailwind's ring-3.
  halo: '3px'
})

// Container widths for popups, panels, and example layouts.
export const container = stylex.defineConsts({
  xs: '10rem',
  card: '16rem',
  sm: '18rem',
  md: '20rem',
  lg: '24rem',
  xl: '28rem',
  xxl: '32rem'
})
