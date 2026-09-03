import * as stylex from '@stylexjs/stylex'

/**
 * Color tokens — values are the light theme. `themes.ts` overrides them for
 * dark mode with a single `stylex.createTheme`; components never branch on
 * the color scheme.
 *
 * Colors that are identical in both themes (black, white, brand ramp) stay
 * here as plain constants.
 */
export const colors = stylex.defineVars({
  // Colors that available on light and dark mode
  black: 'oklch(0 0 0)',
  white: 'oklch(1 0 0)',
  brand: 'oklch(0.55 0.24 262.67)',
  onBackgroundCritical: 'oklch(1 0 0)',
  onBackgroundPositive: 'oklch(1 0 0)',
  onBackgroundPrimary: 'oklch(1 0 0)',
  onBackgroundWarning: 'oklch(0 0 0)',
  onBrand: 'oklch(1 0 0)',

  // Themed color variables (light values; dark values live in themes.ts)
  backgroundCriticalFaded: 'oklch(0.98 0.02 20.28)',
  backgroundCriticalHighlightedFaded: 'oklch(0.59 0.205 20.28 / 0.06)',
  backgroundCriticalHighlighted: 'oklch(0.531 0.205 20.28)',
  backgroundCritical: 'oklch(0.59 0.205 20.28)',
  backgroundDisabledFaded: 'oklch(0.98 0 89.88)',
  backgroundDisabled: 'oklch(0.95 0 89.88)',
  backgroundElevationBase: 'oklch(1 0 89.88)',
  backgroundElevationOverlay: 'oklch(1 0 89.88)',
  backgroundElevationRaised: 'oklch(1 0 89.88)',
  backgroundNeutralFaded: 'oklch(0 0 89.88 / 0.03)',
  backgroundNeutralHighlightedFaded: 'oklch(0 0 0 / 0.03)',
  backgroundNeutralHighlighted: 'oklch(0.9118 0 89.88)',
  backgroundNeutral: 'oklch(0.94 0 89.88)',
  backgroundPageFaded: 'oklch(0.98 0 89.88)',
  backgroundPage: 'oklch(1 0 89.88)',
  backgroundPositiveFaded: 'oklch(0.98 0.02 151.8)',
  backgroundPositiveHighlightedFaded: 'oklch(0.55 0.13 151.8 / 0.06)',
  backgroundPositiveHighlighted: 'oklch(0.495 0.13 151.8)',
  backgroundPositive: 'oklch(0.55 0.13 151.8)',
  backgroundPrimaryFaded: 'oklch(0.98 0.02 262.67)',
  backgroundPrimaryHighlightedFaded: 'oklch(0.55 0.24 262.67 / 0.06)',
  backgroundPrimaryHighlighted: 'oklch(0.495 0.24 262.67)',
  backgroundPrimary: 'oklch(0.55 0.24 262.67)',
  backgroundWarningFaded: 'oklch(0.98 0.04 80)',
  backgroundWarningHighlightedFaded: 'oklch(0.82 0.22 80 / 0.06)',
  backgroundWarningHighlighted: 'oklch(0.738 0.22 80)',
  backgroundWarning: 'oklch(0.82 0.22 80)',
  borderCriticalFaded: 'oklch(0.94 0.02 20.28)',
  borderCritical: 'oklch(0.55 0.205 20.28)',
  borderDisabled: 'oklch(0 0 89.88 / 0.06)',
  borderNeutralFaded: 'oklch(0 0 89.88 / 0.08)',
  borderNeutral: 'oklch(0 0 89.88 / 0.12)',
  borderPositiveFaded: 'oklch(0.94 0.02 151.8)',
  borderPositive: 'oklch(0.51 0.13 151.8)',
  borderPrimaryFaded: 'oklch(0.94 0.02 262.67)',
  borderPrimary: 'oklch(0.51 0.24 262.67)',
  borderWarningFaded: 'oklch(0.94 0.04 80)',
  borderWarning: 'oklch(0.78 0.22 80)',
  foregroundCritical: 'oklch(0.52 0.205 20.28)',
  foregroundDisabled: 'oklch(0.65 0 89.88)',
  foregroundNeutralFaded: 'oklch(0.54 0 89.88)',
  foregroundNeutral: 'oklch(0.24 0 89.88)',
  foregroundPositive: 'oklch(0.52 0.13 151.8)',
  foregroundPrimary: 'oklch(0.52 0.24 262.67)',
  foregroundWarning: 'oklch(0.52 0.22 80)',
  onBackgroundNeutral: 'oklch(0 0 0)'
})

// -----------------------------------------------------------------------------
// Shadow variables
// -----------------------------------------------------------------------------

/**
 * Shadow tokens — values are the light theme. Kept hex-alpha (not oklch) so
 * the shadcn-style registry transform can parse the shorthands.
 */
export const shadow = stylex.defineVars({
  outline: '0px 1px 2px -0.5px rgba(0, 0, 0, 0.06), 0px 2px 3px -1px rgba(0, 0, 0, 0.06)',
  'outline-intense': '0px 1px 2px -0.5px rgba(0, 0, 0, 0.12), 0px 2px 3px -1px rgba(0, 0, 0, 0.12)',
  raised: '0px 8px 12px -4px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
  'raised-intense': '0px 8px 12px -4px rgba(0, 0, 0, 0.16), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
  overlay:
    '0px 16px 24px -4px rgba(0, 0, 0, 0.06), 0px 8px 12px -4px rgba(0, 0, 0, 0.06), 0px 4px 6px -2px rgba(0, 0, 0, 0.06)',
  'overlay-intense':
    '0px 16px 24px -4px rgba(0, 0, 0, 0.12), 0px 8px 12px -4px rgba(0, 0, 0, 0.12), 0px 4px 6px -2px rgba(0, 0, 0, 0.12)'
})
