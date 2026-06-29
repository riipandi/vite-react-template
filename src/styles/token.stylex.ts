import * as stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

// ─── Design Token Variables ─────────────────────────────────

export const colors = stylex.defineVars({
  // Base
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',

  // Surface
  surface: { default: '#ffffff', [DARK]: '#1a1a1a' },
  surfaceHover: { default: '#fafafa', [DARK]: '#27272a' },

  // Zinc scale
  zinc50: { default: '#fafafa', [DARK]: '#18181b' },
  zinc100: { default: '#f4f4f5', [DARK]: '#27272a' },
  zinc200: { default: '#e4e4e7', [DARK]: '#3f3f46' },
  zinc300: { default: '#d4d4d8', [DARK]: '#52525b' },
  zinc400: { default: '#a1a1aa', [DARK]: '#71717a' },
  zinc500: { default: '#71717a', [DARK]: '#a1a1aa' },
  zinc600: { default: '#52525b', [DARK]: '#d4d4d8' },
  zinc700: { default: '#3f3f46', [DARK]: '#e4e4e7' },
  zinc800: { default: '#27272a', [DARK]: '#f4f4f5' },
  zinc900: { default: '#18181b', [DARK]: '#fafafa' },
  zinc950: { default: '#09090b', [DARK]: '#ffffff' },

  // Primary blue
  primary50: { default: '#eff6ff', [DARK]: '#172554' },
  primary100: { default: '#dbeafe', [DARK]: '#1e3a8a' },
  primary200: { default: '#bfdbfe', [DARK]: '#1e40af' },
  primary300: { default: '#93c5fd', [DARK]: '#1d4ed8' },
  primary400: { default: '#60a5fa', [DARK]: '#2563eb' },
  primary500: '#3b82f6',
  primary600: { default: '#2563eb', [DARK]: '#60a5fa' },
  primary700: { default: '#1d4ed8', [DARK]: '#93c5fd' },
  primary800: { default: '#1e40af', [DARK]: '#bfdbfe' },
  primary900: { default: '#1e3a8a', [DARK]: '#dbeafe' },
  primary950: { default: '#172554', [DARK]: '#eff6ff' },

  // Destructive red
  destructive50: { default: '#fef2f2', [DARK]: '#450a0a' },
  destructive100: { default: '#fee2e2', [DARK]: '#7f1d1d' },
  destructive200: { default: '#fecaca', [DARK]: '#991b1b' },
  destructive300: { default: '#fca5a5', [DARK]: '#b91c1c' },
  destructive400: { default: '#f87171', [DARK]: '#dc2626' },
  destructive500: '#ef4444',
  destructive600: { default: '#dc2626', [DARK]: '#f87171' },
  destructive700: { default: '#b91c1c', [DARK]: '#fca5a5' },
  destructive800: { default: '#991b1b', [DARK]: '#fecaca' },
  destructive900: { default: '#7f1d1d', [DARK]: '#fee2e2' },
  destructive950: { default: '#450a0a', [DARK]: '#fef2f2' },

  // Green
  green50: { default: '#f0fdf4', [DARK]: '#052e16' },
  green200: { default: '#bbf7d0', [DARK]: '#166534' },
  green700: { default: '#15803d', [DARK]: '#bbf7d0' },
  green950: { default: '#052e16', [DARK]: '#f0fdf4' },

  // Orange
  orange50: { default: '#fff7ed', [DARK]: '#431407' },
  orange200: { default: '#fed7aa', [DARK]: '#9a3412' },
  orange700: { default: '#c2410c', [DARK]: '#fed7aa' },
  orange950: { default: '#431407', [DARK]: '#fff7ed' }
})

// ─── Dark Theme Override ───────────────────────────────────
// Manual toggle via @lonik/themer — applied as a CSS class that
// takes precedence over the @media (prefers-color-scheme) defaults.
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

// ─── Non-themed Tokens ────────────────────────────────────

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
