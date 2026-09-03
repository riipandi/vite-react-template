import * as stylex from '@stylexjs/stylex'

// Design tokens — the single file users edit to retheme their app.
// Familiar semantic names (background, foreground, muted, accent, ...).
// Values are the light theme; `themes.ts` overrides them per theme.
//
// Colors use oklch (perceptually uniform; easy to shift lightness/chroma).
// Avoid legacy comma syntax like `rgba(0, 0, 0, 0.5)` — the shadcn CLI's
// transformer mangles comma number lists; `oklch(0% 0 0deg / 50%)` is safe.

export const colors = stylex.defineVars({
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.145 0 0)',
  card: 'oklch(1 0 0)',
  cardForeground: 'oklch(0.145 0 0)',
  popover: 'oklch(1 0 0)',
  popoverForeground: 'oklch(0.145 0 0)',
  primary: 'oklch(0.205 0 0)',
  primaryForeground: 'oklch(0.985 0 0)',
  secondary: 'oklch(0.97 0 0)',
  secondaryForeground: 'oklch(0.205 0 0)',
  muted: 'oklch(0.97 0 0)',
  mutedForeground: 'oklch(0.556 0 0)',
  accent: 'oklch(0.97 0 0)',
  accentForeground: 'oklch(0.205 0 0)',
  destructive: 'oklch(0.577 0.245 27.325)',
  destructiveForeground: 'oklch(0.985 0 0)',
  border: 'oklch(0.922 0 0)',
  input: 'oklch(0.922 0 0)',
  ring: 'oklch(0.708 0 0)',
  overlay: 'oklch(0% 0 0deg / 50%)'
})

export const radius = stylex.defineVars({
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.625rem',
  xl: '0.75rem',
  full: '9999px'
})

export const font = stylex.defineVars({
  sans: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"
})

// Shadows stay hex-alpha: the CLI parses shadow shorthands separately
// and mangles oklch() inside them.
export const shadow = stylex.defineVars({
  sm: '0 1px 2px #0000000d',
  md: '0 4px 8px -2px #0000001a',
  lg: '0 10px 20px -5px #00000026'
})
