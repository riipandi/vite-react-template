/**
 * Common props for component: color, variant, shape, size
 * Colors (default: neutral): primary|neutral|positive|warning|critical
 * Variants: solid|faded|outline|ghost
 * Shape: pill|rectangle|rounded
 * Size: xs|sm|md|lg|xl
 *
 * @ref: https://www.reshaped.so/docs/getting-started/overview
 * @ref: https://www.olyxui.com/docs/handbook/styling
 */

import * as stylex from '@stylexjs/stylex'

const DARK = '[data-theme=dark]'

export const colorVar = stylex.defineVars({
  /* Both light mode and dark mode */
  black: 'oklch(0 0 0)',
  white: 'oklch(1 0 0)',
  transparent: 'transparent',

  onPrimary: 'oklch(0.9842 0.0034 247.86)',
  onBgPrimary: 'oklch(0.9842 0.0034 247.86)',
  onBgCritical: 'oklch(1 0 0)',
  onBgWarning: 'oklch(1 0 0)',
  onBgPositive: 'oklch(1 0 0)',

  /* Background */
  bgPage: { default: 'oklch(1 0 0)', [DARK]: 'oklch(0.15 0.02 17.58)' },
  bgPageFaded: { default: 'oklch(0.983 0.003 265.75)', [DARK]: 'oklch(0.17 0.02 17.58)' },
  bgNeutral: { default: 'oklch(0.913 0.011 265.75)', [DARK]: 'oklch(0.22 0.02 265.75)' },
  bgNeutralFaded: { default: 'oklch(0.965 0.003 265.75)', [DARK]: 'oklch(0.25 0.02 265.75)' },
  bgPrimary: { default: 'oklch(0.5858 0.222 17.58)', [DARK]: 'oklch(0.5858 0.222 17.58)' },
  bgPrimaryFaded: { default: 'oklch(0.953 0.019 17.58)', [DARK]: 'oklch(0.251 0.052 17.58)' },
  bgCritical: { default: 'oklch(0.637 0.237 25.331)', [DARK]: 'oklch(0.555 0.204 25.331)' },
  bgCriticalFaded: { default: 'oklch(0.959 0.017 25.331)', [DARK]: 'oklch(0.282 0.048 25.331)' },
  bgWarning: { default: 'oklch(0.819 0.128 70.08)', [DARK]: 'oklch(0.838 0.169 70.08)' },
  bgWarningFaded: { default: 'oklch(0.984 0.023 70.08)', [DARK]: 'oklch(0.276 0.016 70.08)' },
  bgPositive: { default: 'oklch(0.553 0.13 150)', [DARK]: 'oklch(0.507 0.114 150)' },
  bgPositiveFaded: { default: 'oklch(0.98 0.02 150)', [DARK]: 'oklch(0.272 0.02 150)' },
  bgDisabled: { default: 'oklch(0.949 0.006 265.75)', [DARK]: 'oklch(0.18 0.015 265.75)' },
  bgDisabledFaded: { default: 'oklch(0.973 0.004 265.75)', [DARK]: 'oklch(0.15 0.015 265.75)' },
  bgElevationBase: { default: 'oklch(1 0 0)', [DARK]: 'oklch(0.18 0.02 17.58)' },
  bgElevationRaised: { default: 'oklch(1 0 0)', [DARK]: 'oklch(0.2 0.02 17.58)' },
  bgElevationOverlay: { default: 'oklch(1 0 0)', [DARK]: 'oklch(0.22 0.02 17.58)' },

  /* Foreground */
  fgNeutral: { default: 'oklch(0.1435 0.0398 265.75)', [DARK]: 'oklch(0.95 0.01 265.75)' },
  fgNeutralFaded: { default: 'oklch(0.51 0.041 265.75)', [DARK]: 'oklch(0.7 0.02 265.75)' },
  fgPrimary: { default: 'oklch(0.5 0.222 17.58)', [DARK]: 'oklch(0.714 0.143 17.58)' },
  fgCritical: { default: 'oklch(0.533 0.194 25.331)', [DARK]: 'oklch(0.693 0.169 25.331)' },
  fgWarning: { default: 'oklch(0.509 0.102 70.08)', [DARK]: 'oklch(0.672 0.135 70.08)' },
  fgPositive: { default: 'oklch(0.496 0.117 150)', [DARK]: 'oklch(0.654 0.154 150)' },
  fgDisabled: { default: 'oklch(0.845 0.02 265.75)', [DARK]: 'oklch(0.406 0.028 265.75)' },
  onBgNeutral: { default: 'oklch(0 0 0)', [DARK]: 'oklch(0 0 0)' },

  /* Border */
  borderNeutral: { default: 'oklch(0 0 0 / 0.12)', [DARK]: 'oklch(1 0 0 / 0.12)' },
  borderNeutralFaded: { default: 'oklch(0 0 0 / 0.08)', [DARK]: 'oklch(1 0 0 / 0.06)' },
  borderPrimary: { default: 'oklch(0.546 0.196 17.58)', [DARK]: 'oklch(0.714 0.143 17.58)' },
  borderPrimaryFaded: { default: 'oklch(0.932 0.029 17.58)', [DARK]: 'oklch(0.346 0.074 17.58)' },
  borderCritical: { default: 'oklch(0.523 0.19 25.331)', [DARK]: 'oklch(0.693 0.172 25.331)' },
  borderCriticalFaded: {
    default: 'oklch(0.908 0.028 25.331)',
    [DARK]: 'oklch(0.357 0.065 25.331)'
  },
  borderWarning: { default: 'oklch(0.748 0.15 70.08)', [DARK]: 'oklch(0.672 0.136 70.08)' },
  borderWarningFaded: { default: 'oklch(0.913 0.041 70.08)', [DARK]: 'oklch(0.358 0.047 70.08)' },
  borderPositive: { default: 'oklch(0.475 0.112 150)', [DARK]: 'oklch(0.656 0.148 150)' },
  borderPositiveFaded: { default: 'oklch(0.921 0.037 150)', [DARK]: 'oklch(0.357 0.049 150)' },
  borderDisabled: { default: 'oklch(0.913 0.011 265.75)', [DARK]: 'oklch(0.285 0.019 265.75)' }
})

export const shadowVar = stylex.defineVars({
  raised: '0px 1px 5px -4px rgba(0,0,0,0.5), 0px 4px 8px 0px rgba(0,0,0,0.05)',
  overlay: '0px 5px 10px 0px rgba(0,0,0,0.05), 0px 15px 25px 0px rgba(0,0,0,0.07)',
  xs: '0px 1px 2px 0px rgba(0,0,0,0.02), 0px 0px 1px 0px rgba(0,0,0,0.06)',
  sm: '0px 1px 2px 0px rgba(0,0,0,0.04), 0px 1px 3px 0px rgba(0,0,0,0.08)',
  md: '0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 6px -1px rgba(0,0,0,0.07)',
  lg: '0px 4px 6px -2px rgba(0,0,0,0.05), 0px 8px 12px -2px rgba(0,0,0,0.06)',
  xl: '0px 6px 10px -2px rgba(0,0,0,0.05), 0px 12px 20px -2px rgba(0,0,0,0.08)'
})

export const radiusVar = stylex.defineVars({
  xs: '0.375rem',
  sm: '0.45rem',
  md: '0.55rem',
  lg: '0.7rem',
  xl: '0.9rem',
  full: '9999px'
})

export const spaceVar = stylex.defineVars({
  none: '0px',
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

export const fontSizeVar = stylex.defineVars({
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.375rem',
  '3xl': '1.75rem',
  '4xl': '2.25rem',
  '5xl': '2.75rem',
  '6xl': '3.25rem',
  '7xl': '3.75rem',
  '8xl': '5.5rem',
  '9xl': '6.5rem'
})

export const fontWeightVar = stylex.defineVars({
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
})

export const fontFamilyVar = stylex.defineVars({
  sans: "'Mona Sans Variable', system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif",
  mono: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
})
