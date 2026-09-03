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

export const lineHeight = stylex.defineConsts({
  none: '1',
  tight: '1.3',
  snug: '1.4',
  normal: '1.5',
  // Single-line control text (paired with fontSize.sm, like Tailwind's
  // text-sm 14/20). A 20px line box centers on whole pixels inside our
  // control heights — ratio-based heights land on half pixels and make
  // Base UI's align-item-with-trigger text drift by 1px.
  control: '1.25rem'
})

export const z = stylex.defineConsts({
  popup: '50',
  toast: '100'
})

export const duration = stylex.defineConsts({
  fast: '150ms',
  // Modal-tier surfaces (dialog, sheet): big enough to read as deliberate,
  // still under the 300ms ceiling for UI motion.
  normal: '200ms',
  // Larger surface moves (drawer, toast stack, navigation menu morph).
  slow: '350ms'
})

// Easing curves. Built-in CSS keywords are too weak for UI motion; these are
// the house curves — never inline a cubic-bezier in component styles.
export const easing = stylex.defineConsts({
  // Enter/exit and state response: fast start, gentle settle.
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  // On-screen movement between two resting positions (switch thumb,
  // navigation menu morph).
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  // iOS-like drawer curve.
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)'
})

export const stroke = stylex.defineConsts({
  border: '1px',
  focus: '2px',
  // Soft state ring (hover/active halo on slider thumbs etc.), like
  // Tailwind's ring-3.
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
