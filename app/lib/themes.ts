import * as stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'

// Apply to <html> (not a wrapper): dialogs/popovers portal to <body> and
// would escape a subtree theme. <html {...stylex.props(darkTheme)}>.
export const darkTheme = stylex.createTheme(colors, {
  background: 'oklch(0.145 0 0)',
  foreground: 'oklch(0.985 0 0)',
  card: 'oklch(0.205 0 0)',
  cardForeground: 'oklch(0.985 0 0)',
  popover: 'oklch(0.205 0 0)',
  popoverForeground: 'oklch(0.985 0 0)',
  primary: 'oklch(0.922 0 0)',
  primaryForeground: 'oklch(0.205 0 0)',
  secondary: 'oklch(0.269 0 0)',
  secondaryForeground: 'oklch(0.985 0 0)',
  muted: 'oklch(0.269 0 0)',
  mutedForeground: 'oklch(0.708 0 0)',
  accent: 'oklch(0.269 0 0)',
  accentForeground: 'oklch(0.985 0 0)',
  destructive: 'oklch(0.704 0.191 22.216)',
  destructiveForeground: 'oklch(0.205 0 0)',
  border: 'oklch(0.269 0 0)',
  input: 'oklch(0.325 0 0)',
  ring: 'oklch(0.556 0 0)',
  overlay: 'oklch(0% 0 0deg / 70%)'
})

// Themes are static by design — StyleX resolves `createTheme` at compile
// time, so add variations by writing more `createTheme` calls here, not by
// computing them at runtime. A theme need not override every token: a partial
// one composes with a full one and the later theme wins per token, e.g.
// `stylex.props(darkTheme, brandTheme)`.
