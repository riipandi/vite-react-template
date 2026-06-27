import * as stylex from '@stylexjs/stylex'

// ─── Design Token Variables ─────────────────────────────────
// Light mode values are the defaults.
// Dark mode is handled via `createTheme` applied at the root.
//
// Use defineVars for all tokens — even non-themed ones — because
// the current @stylexjs/stylex 0.19.0 doesn't expose defineConsts
// in its public type declarations.

export const colors = stylex.defineVars({
  // Base
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
  surface: '#ffffff',
  surfaceHover: '#fafafa',

  // Zinc scale
  zinc50: '#fafafa',
  zinc100: '#f4f4f5',
  zinc200: '#e4e4e7',
  zinc300: '#d4d4d8',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc600: '#52525b',
  zinc700: '#3f3f46',
  zinc800: '#27272a',
  zinc900: '#18181b',
  zinc950: '#09090b',

  // Primary (Professional Blue)
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary200: '#bfdbfe',
  primary300: '#93c5fd',
  primary400: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',
  primary800: '#1e40af',
  primary900: '#1e3a8a',
  primary950: '#172554',

  // Destructive (Red)
  destructive50: '#fef2f2',
  destructive100: '#fee2e2',
  destructive200: '#fecaca',
  destructive300: '#fca5a5',
  destructive400: '#f87171',
  destructive500: '#ef4444',
  destructive600: '#dc2626',
  destructive700: '#b91c1c',
  destructive800: '#991b1b',
  destructive900: '#7f1d1d',
  destructive950: '#450a0a',

  // Alert colors
  green50: '#f0fdf4',
  green200: '#bbf7d0',
  green700: '#15803d',
  green950: '#052e16',

  orange50: '#fff7ed',
  orange200: '#fed7aa',
  orange700: '#c2410c',
  orange950: '#431407'
})

// ─── Dark Theme ──────────────────────────────────────────────
// Override color tokens for dark mode.
export const darkTheme = stylex.createTheme(colors, {
  surface: '#1a1a1a',
  surfaceHover: '#27272a',

  zinc50: '#18181b',
  zinc100: '#27272a',
  zinc200: '#3f3f46',
  zinc300: '#52525b',
  zinc400: '#71717a',
  zinc500: '#a1a1aa',
  zinc600: '#d4d4d8',
  zinc700: '#e4e4e7',
  zinc800: '#f4f4f5',
  zinc900: '#fafafa',
  zinc950: '#ffffff',

  primary50: '#172554',
  primary100: '#1e3a8a',
  primary200: '#1e40af',
  primary300: '#1d4ed8',
  primary400: '#2563eb',
  primary500: '#3b82f6',
  primary600: '#60a5fa',
  primary700: '#93c5fd',
  primary800: '#bfdbfe',
  primary900: '#dbeafe',
  primary950: '#eff6ff',

  destructive50: '#450a0a',
  destructive100: '#7f1d1d',
  destructive200: '#991b1b',
  destructive300: '#b91c1c',
  destructive400: '#dc2626',
  destructive500: '#ef4444',
  destructive600: '#f87171',
  destructive700: '#fca5a5',
  destructive800: '#fecaca',
  destructive900: '#fee2e2',
  destructive950: '#fef2f2',

  green50: '#052e16',
  green200: '#166534',
  green700: '#bbf7d0',
  green950: '#f0fdf4',

  orange50: '#431407',
  orange200: '#9a3412',
  orange700: '#fed7aa',
  orange950: '#fff7ed'
})

// ─── Non-themed Tokens ──────────────────────────────────────
// These don't need runtime theming but use defineVars for TS compat.

export const font = stylex.defineVars({
  sans: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, monospace'
})

export const space = stylex.defineVars({
  px: '1px',
  '0': '0px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem'
})

export const radius = stylex.defineVars({
  none: '0px',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
})

export const shadow = stylex.defineVars({
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
})

export const fontSize = stylex.defineVars({
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem'
})

export const fontWeight = stylex.defineVars({
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
})
