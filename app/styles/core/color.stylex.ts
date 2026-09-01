import * as stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

const colorLightVar = stylex.defineVars({
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

const colorDarkVar = stylex.defineVars({
  backgroundCriticalFaded: 'oklch(0.24 0.0167 20.28)',
  backgroundCriticalHighlightedFaded: 'oklch(0.5842 0.164 20.28 / 0.08)',
  backgroundCriticalHighlighted: 'oklch(0.6258 0.164 20.28)',
  backgroundCritical: 'oklch(0.5842 0.164 20.28)',
  backgroundDisabledFaded: 'oklch(0.225 0 89.88)',
  backgroundDisabled: 'oklch(0.28 0 89.88)',
  backgroundElevationBase: 'oklch(0.2 0 89.88)',
  backgroundElevationOverlay: 'oklch(0.24 0 89.88)',
  backgroundElevationRaised: 'oklch(0.22 0 89.88)',
  backgroundNeutralFaded: 'oklch(1 0 89.88 / 0.04)',
  backgroundNeutralHighlightedFaded: 'oklch(1 0 0 / 0.05)',
  backgroundNeutralHighlighted: 'oklch(0.3608 0 89.88)',
  backgroundNeutral: 'oklch(0.32 0 89.88)',
  backgroundPageFaded: 'oklch(0.18 0 89.88)',
  backgroundPage: 'oklch(0.16 0 89.88)',
  backgroundPositiveFaded: 'oklch(0.24 0.0106 151.8)',
  backgroundPositiveHighlightedFaded: 'oklch(0.527 0.104 151.8 / 0.08)',
  backgroundPositiveHighlighted: 'oklch(0.5743 0.104 151.8)',
  backgroundPositive: 'oklch(0.527 0.104 151.8)',
  backgroundPrimaryFaded: 'oklch(0.24 0.0196 262.67)',
  backgroundPrimaryHighlightedFaded: 'oklch(0.5498 0.192 262.67 / 0.08)',
  backgroundPrimaryHighlighted: 'oklch(0.5949 0.192 262.67)',
  backgroundPrimary: 'oklch(0.5498 0.192 262.67)',
  backgroundWarningFaded: 'oklch(0.24 0.018 80)',
  backgroundWarningHighlightedFaded: 'oklch(0.8108 0.176 80 / 0.08)',
  backgroundWarningHighlighted: 'oklch(0.7297 0.176 80)',
  backgroundWarning: 'oklch(0.8108 0.176 80)',
  borderCriticalFaded: 'oklch(0.3 0.0167 20.28)',
  borderCritical: 'oklch(0.6842 0.164 20.28)',
  borderDisabled: 'oklch(1 0 89.88 / 0.06)',
  borderNeutralFaded: 'oklch(1 0 89.88 / 0.08)',
  borderNeutral: 'oklch(1 0 89.88 / 0.11)',
  borderPositiveFaded: 'oklch(0.3 0.0106 151.8)',
  borderPositive: 'oklch(0.627 0.104 151.8)',
  borderPrimaryFaded: 'oklch(0.3 0.0196 262.67)',
  borderPrimary: 'oklch(0.6498 0.192 262.67)',
  borderWarningFaded: 'oklch(0.3 0.018 80)',
  borderWarning: 'oklch(0.9108 0.176 80)',
  foregroundCritical: 'oklch(0.75 0.1742 20.28)',
  foregroundDisabled: 'oklch(0.45 0 89.88)',
  foregroundNeutralFaded: 'oklch(0.74 0 89.88)',
  foregroundNeutral: 'oklch(0.96 0 89.88)',
  foregroundPositive: 'oklch(0.75 0.1105 151.8)',
  foregroundPrimary: 'oklch(0.75 0.204 262.67)',
  foregroundWarning: 'oklch(0.75 0.187 80)',
  onBackgroundNeutral: 'oklch(1 0 0)'
})

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

  // Themed color variables
  backgroundCriticalFaded: {
    default: colorLightVar.backgroundCriticalFaded,
    [DARK]: colorDarkVar.backgroundCriticalFaded
  },
  backgroundCriticalHighlightedFaded: {
    default: colorLightVar.backgroundCriticalHighlightedFaded,
    [DARK]: colorDarkVar.backgroundCriticalHighlightedFaded
  },
  backgroundCriticalHighlighted: {
    default: colorLightVar.backgroundCriticalHighlighted,
    [DARK]: colorDarkVar.backgroundCriticalHighlighted
  },
  backgroundCritical: {
    default: colorLightVar.backgroundCritical,
    [DARK]: colorDarkVar.backgroundCritical
  },
  backgroundDisabledFaded: {
    default: colorLightVar.backgroundDisabledFaded,
    [DARK]: colorDarkVar.backgroundDisabledFaded
  },
  backgroundDisabled: {
    default: colorLightVar.backgroundDisabled,
    [DARK]: colorDarkVar.backgroundDisabled
  },
  backgroundElevationBase: {
    default: colorLightVar.backgroundElevationBase,
    [DARK]: colorDarkVar.backgroundElevationBase
  },
  backgroundElevationOverlay: {
    default: colorLightVar.backgroundElevationOverlay,
    [DARK]: colorDarkVar.backgroundElevationOverlay
  },
  backgroundElevationRaised: {
    default: colorLightVar.backgroundElevationRaised,
    [DARK]: colorDarkVar.backgroundElevationRaised
  },
  backgroundNeutralFaded: {
    default: colorLightVar.backgroundNeutralFaded,
    [DARK]: colorDarkVar.backgroundNeutralFaded
  },
  backgroundNeutralHighlightedFaded: {
    default: colorLightVar.backgroundNeutralHighlightedFaded,
    [DARK]: colorDarkVar.backgroundNeutralHighlightedFaded
  },
  backgroundNeutralHighlighted: {
    default: colorLightVar.backgroundNeutralHighlighted,
    [DARK]: colorDarkVar.backgroundNeutralHighlighted
  },
  backgroundNeutral: {
    default: colorLightVar.backgroundNeutral,
    [DARK]: colorDarkVar.backgroundNeutral
  },
  backgroundPageFaded: {
    default: colorLightVar.backgroundPageFaded,
    [DARK]: colorDarkVar.backgroundPageFaded
  },
  backgroundPage: { default: colorLightVar.backgroundPage, [DARK]: colorDarkVar.backgroundPage },
  backgroundPositiveFaded: {
    default: colorLightVar.backgroundPositiveFaded,
    [DARK]: colorDarkVar.backgroundPositiveFaded
  },
  backgroundPositiveHighlightedFaded: {
    default: colorLightVar.backgroundPositiveHighlightedFaded,
    [DARK]: colorDarkVar.backgroundPositiveHighlightedFaded
  },
  backgroundPositiveHighlighted: {
    default: colorLightVar.backgroundPositiveHighlighted,
    [DARK]: colorDarkVar.backgroundPositiveHighlighted
  },
  backgroundPositive: {
    default: colorLightVar.backgroundPositive,
    [DARK]: colorDarkVar.backgroundPositive
  },
  backgroundPrimaryFaded: {
    default: colorLightVar.backgroundPrimaryFaded,
    [DARK]: colorDarkVar.backgroundPrimaryFaded
  },
  backgroundPrimaryHighlightedFaded: {
    default: colorLightVar.backgroundPrimaryHighlightedFaded,
    [DARK]: colorDarkVar.backgroundPrimaryHighlightedFaded
  },
  backgroundPrimaryHighlighted: {
    default: colorLightVar.backgroundPrimaryHighlighted,
    [DARK]: colorDarkVar.backgroundPrimaryHighlighted
  },
  backgroundPrimary: {
    default: colorLightVar.backgroundPrimary,
    [DARK]: colorDarkVar.backgroundPrimary
  },
  backgroundWarningFaded: {
    default: colorLightVar.backgroundWarningFaded,
    [DARK]: colorDarkVar.backgroundWarningFaded
  },
  backgroundWarningHighlightedFaded: {
    default: colorLightVar.backgroundWarningHighlightedFaded,
    [DARK]: colorDarkVar.backgroundWarningHighlightedFaded
  },
  backgroundWarningHighlighted: {
    default: colorLightVar.backgroundWarningHighlighted,
    [DARK]: colorDarkVar.backgroundWarningHighlighted
  },
  backgroundWarning: {
    default: colorLightVar.backgroundWarning,
    [DARK]: colorDarkVar.backgroundWarning
  },
  borderCriticalFaded: {
    default: colorLightVar.borderCriticalFaded,
    [DARK]: colorDarkVar.borderCriticalFaded
  },
  borderCritical: { default: colorLightVar.borderCritical, [DARK]: colorDarkVar.borderCritical },
  borderDisabled: { default: colorLightVar.borderDisabled, [DARK]: colorDarkVar.borderDisabled },
  borderNeutralFaded: {
    default: colorLightVar.borderNeutralFaded,
    [DARK]: colorDarkVar.borderNeutralFaded
  },
  borderNeutral: { default: colorLightVar.borderNeutral, [DARK]: colorDarkVar.borderNeutral },
  borderPositiveFaded: {
    default: colorLightVar.borderPositiveFaded,
    [DARK]: colorDarkVar.borderPositiveFaded
  },
  borderPositive: { default: colorLightVar.borderPositive, [DARK]: colorDarkVar.borderPositive },
  borderPrimaryFaded: {
    default: colorLightVar.borderPrimaryFaded,
    [DARK]: colorDarkVar.borderPrimaryFaded
  },
  borderPrimary: { default: colorLightVar.borderPrimary, [DARK]: colorDarkVar.borderPrimary },
  borderWarningFaded: {
    default: colorLightVar.borderWarningFaded,
    [DARK]: colorDarkVar.borderWarningFaded
  },
  borderWarning: { default: colorLightVar.borderWarning, [DARK]: colorDarkVar.borderWarning },
  foregroundCritical: {
    default: colorLightVar.foregroundCritical,
    [DARK]: colorDarkVar.foregroundCritical
  },
  foregroundDisabled: {
    default: colorLightVar.foregroundDisabled,
    [DARK]: colorDarkVar.foregroundDisabled
  },
  foregroundNeutralFaded: {
    default: colorLightVar.foregroundNeutralFaded,
    [DARK]: colorDarkVar.foregroundNeutralFaded
  },
  foregroundNeutral: {
    default: colorLightVar.foregroundNeutral,
    [DARK]: colorDarkVar.foregroundNeutral
  },
  foregroundPositive: {
    default: colorLightVar.foregroundPositive,
    [DARK]: colorDarkVar.foregroundPositive
  },
  foregroundPrimary: {
    default: colorLightVar.foregroundPrimary,
    [DARK]: colorDarkVar.foregroundPrimary
  },
  foregroundWarning: {
    default: colorLightVar.foregroundWarning,
    [DARK]: colorDarkVar.foregroundWarning
  },
  onBackgroundNeutral: {
    default: colorLightVar.onBackgroundNeutral,
    [DARK]: colorDarkVar.onBackgroundNeutral
  }
})
