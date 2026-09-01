/**
 * Design tokens for the StyleX component set.
 *
 * Each token wraps the corresponding CSS custom property defined in the app's
 * global stylesheet (e.g. `--primary`). Theming therefore stays driven by the
 * class-based `.dark` toggle (next-themes) — flipping `.dark` updates the
 * underlying `--*` variables, which propagate through these tokens. Components
 * reference `colors.primary` / `radius.md` instead of stringly-typed
 * `var(--primary)` so token usage is typed and centralized.
 *
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

  /* Background (light defaults; overridden by darkTheme below) */
  bgPage: 'oklch(1 0 0)',
  bgPageFaded: 'oklch(0.983 0.003 265.75)',
  bgNeutral: 'oklch(0.913 0.011 265.75)',
  bgNeutralFaded: 'oklch(0.965 0.003 265.75)',
  bgPrimary: 'oklch(0.55 0.2 250)',
  bgPrimaryFaded: 'oklch(0.94 0.02 250)',
  bgCritical: 'oklch(0.637 0.237 25.331)',
  bgCriticalFaded: 'oklch(0.959 0.017 25.331)',
  bgWarning: 'oklch(0.819 0.128 70.08)',
  bgWarningFaded: 'oklch(0.984 0.023 70.08)',
  bgPositive: 'oklch(0.553 0.13 150)',
  bgPositiveFaded: 'oklch(0.98 0.02 150)',
  bgDisabled: 'oklch(0.949 0.006 265.75)',
  bgDisabledFaded: 'oklch(0.973 0.004 265.75)',
  bgElevationBase: 'oklch(1 0 0)',
  bgElevationRaised: 'oklch(1 0 0)',
  bgElevationOverlay: 'oklch(1 0 0)',

  /* Foreground */
  fgNeutral: 'oklch(0.1435 0.0398 265.75)',
  fgNeutralFaded: 'oklch(0.51 0.041 265.75)',
  fgPrimary: 'oklch(0.5 0.2 250)',
  fgCritical: 'oklch(0.533 0.194 25.331)',
  fgWarning: 'oklch(0.509 0.102 70.08)',
  fgPositive: 'oklch(0.496 0.117 150)',
  fgDisabled: 'oklch(0.845 0.02 265.75)',
  onBgNeutral: 'oklch(0 0 0)',

  /* Brand — inherits primary by default; themeable separately in Reshaped */
  bgBrand: 'oklch(0.55 0.2 250)',
  onBrand: 'oklch(0.9842 0.0034 247.86)',

  /* Highlighted hover surfaces (Reshaped data-highlighted / :hover recipe) */
  bgNeutralHighlightedFaded: 'oklch(0.965 0.003 265.75)',
  bgPrimaryHighlightedFaded: 'oklch(0.94 0.02 250)',

  /* Inverted tooltip surface */
  bgTooltip: 'oklch(0.141 0.005 285.823)',
  fgTooltip: 'oklch(1 0 0)',
  borderTooltip: 'transparent',

  /* Border */
  borderNeutral: 'oklch(0 0 0 / 0.12)',
  borderNeutralFaded: 'oklch(0 0 0 / 0.08)',
  borderPrimary: 'oklch(0.5 0.18 250)',
  borderPrimaryFaded: 'oklch(0.92 0.03 250)',
  borderCritical: 'oklch(0.523 0.19 25.331)',
  borderCriticalFaded: 'oklch(0.908 0.028 25.331)',
  borderWarning: 'oklch(0.748 0.15 70.08)',
  borderWarningFaded: 'oklch(0.913 0.041 70.08)',
  borderPositive: 'oklch(0.475 0.112 150)',
  borderPositiveFaded: 'oklch(0.921 0.037 150)',
  borderDisabled: 'oklch(0.913 0.011 265.75)'
})

/**
 * Dark-mode theme for colorVar.
 *
 * Applied as a class on <html> (see the theme provider / theme script) so the
 * dark token values override the :root light defaults for the whole subtree.
 * This is the canonical StyleX theming pattern and avoids the broken
 * `[data-theme=dark] :root` descendant selector that attribute-based
 * defineVars conditions generate (an attribute on :root can never match a
 * `:root` descendant).
 */
export const darkTheme = stylex.createTheme(colorVar, {
  black: 'oklch(0 0 0)',
  white: 'oklch(1 0 0)',
  transparent: 'transparent',

  onPrimary: 'oklch(0.9842 0.0034 247.86)',
  onBgPrimary: 'oklch(0.9842 0.0034 247.86)',
  onBgCritical: 'oklch(1 0 0)',
  onBgWarning: 'oklch(1 0 0)',
  onBgPositive: 'oklch(1 0 0)',

  bgPage: 'oklch(0.15 0.02 17.58)',
  bgPageFaded: 'oklch(0.17 0.02 17.58)',
  bgNeutral: 'oklch(0.22 0.02 265.75)',
  bgNeutralFaded: 'oklch(0.25 0.02 265.75)',
  bgPrimary: 'oklch(0.55 0.2 250)',
  bgPrimaryFaded: 'oklch(0.25 0.05 250)',
  bgCritical: 'oklch(0.555 0.204 25.331)',
  bgCriticalFaded: 'oklch(0.282 0.048 25.331)',
  bgWarning: 'oklch(0.838 0.169 70.08)',
  bgWarningFaded: 'oklch(0.276 0.016 70.08)',
  bgPositive: 'oklch(0.507 0.114 150)',
  bgPositiveFaded: 'oklch(0.272 0.02 150)',
  bgDisabled: 'oklch(0.18 0.015 265.75)',
  bgDisabledFaded: 'oklch(0.15 0.015 265.75)',
  bgElevationBase: 'oklch(0.18 0.02 17.58)',
  bgElevationRaised: 'oklch(0.2 0.02 17.58)',
  bgElevationOverlay: 'oklch(0.22 0.02 17.58)',

  fgNeutral: 'oklch(0.95 0.01 265.75)',
  fgNeutralFaded: 'oklch(0.7 0.02 265.75)',
  fgPrimary: 'oklch(0.7 0.15 250)',
  fgCritical: 'oklch(0.693 0.169 25.331)',
  fgWarning: 'oklch(0.672 0.135 70.08)',
  fgPositive: 'oklch(0.654 0.154 150)',
  fgDisabled: 'oklch(0.406 0.028 265.75)',
  onBgNeutral: 'oklch(0.95 0.01 265.75)',

  bgBrand: 'oklch(0.55 0.2 250)',
  onBrand: 'oklch(0.9842 0.0034 247.86)',

  bgNeutralHighlightedFaded: 'oklch(0.25 0.02 265.75)',
  bgPrimaryHighlightedFaded: 'oklch(0.25 0.05 250)',

  bgTooltip: 'oklch(0.84 0.005 286.286)',
  fgTooltip: 'oklch(0 0 0)',
  borderTooltip: 'oklch(1 0 0 / 0.12)',

  borderNeutral: 'oklch(1 0 0 / 0.12)',
  borderNeutralFaded: 'oklch(1 0 0 / 0.06)',
  borderPrimary: 'oklch(0.7 0.15 250)',
  borderPrimaryFaded: 'oklch(0.35 0.07 250)',
  borderCritical: 'oklch(0.693 0.172 25.331)',
  borderCriticalFaded: 'oklch(0.357 0.065 25.331)',
  borderWarning: 'oklch(0.672 0.136 70.08)',
  borderWarningFaded: 'oklch(0.358 0.047 70.08)',
  borderPositive: 'oklch(0.656 0.148 150)',
  borderPositiveFaded: 'oklch(0.357 0.049 150)',
  borderDisabled: 'oklch(0.285 0.019 265.75)'
})

/** Modal/drawer scrim overlays — Reshaped static black with alpha (non-themable). */
export const scrimVar = stylex.defineConsts({
  heavy: 'rgba(0, 0, 0, 0.7)',
  medium: 'rgba(0, 0, 0, 0.2)',
  light: 'rgba(0, 0, 0, 0.05)'
})

/** Inset shadows for recessed tracks (switch, tabs) — non-themable constants. */
export const insetShadowVar = stylex.defineConsts({
  track: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  subtle: 'inset 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 0 1px rgba(0, 0, 0, 0.06)',
  highlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
})

export const shadowVar = stylex.defineConsts({
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
  '4.5': '1.125rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '6.5': '1.625rem',
  '7': '1.75rem',
  '7.5': '1.875rem',
  '8.5': '2.125rem',
  '10.5': '2.625rem',
  '12.5': '3.125rem',
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

/** Opacity tokens for StyleX create() — non-themable constants inlined at build time. */
export const opacityVar = stylex.defineConsts({
  disabledControl: 0.7,
  placeholderText: 0.8,
  hoverFade: 0.8,
  subdued: 0.6
})

/** Hover/active overlay gradients as StyleX constants for use in stylex.create(). */
export const overlayVar = stylex.defineConsts({
  hover: 'linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08))',
  active: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))'
})

/** Unified disabled opacity for interactive controls (button, input, select, toggle, etc.). */
export const disabledControlOpacity = 0.7

/** Placeholder text fade — consistent across input-like controls. */
export const placeholderTextOpacity = 0.8

/** Shared focus-visible ring recipe for keyboard navigation. */
export const focusVisibleRing = {
  outlineWidth: 2,
  outlineStyle: 'solid' as const,
  outlineOffset: 2,
  outlineColor: colorVar.fgPrimary
}

/** Focus-within ring for compound controls (combobox, number-field group). */
export const focusWithinRing = {
  outlineWidth: 2,
  outlineStyle: 'solid' as const,
  outlineOffset: 2,
  outlineColor: colorVar.borderPrimary
}

/** Plain-string mirrors of insetShadowVar for StyleDefs parity tests (not passed to stylex.create). */
export const insetShadowDefs = {
  track: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  subtle: 'inset 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 0 1px rgba(0, 0, 0, 0.06)',
  highlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
} as const

/** Plain-string mirrors of scrimVar for StyleDefs parity tests (not passed to stylex.create). */
export const scrimDefs = {
  heavy: 'rgba(0, 0, 0, 0.7)',
  medium: 'rgba(0, 0, 0, 0.2)',
  light: 'rgba(0, 0, 0, 0.05)'
} as const

/** Plain-string mirrors of overlayVar for StyleDefs parity tests (not passed to stylex.create). */
export const overlayGradientDefs = {
  hover: 'linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08))',
  active: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))'
} as const

/** Disabled state block — spread values individually inside stylex.create(). */
export const disabledControlState = {
  cursor: 'not-allowed' as const,
  opacity: disabledControlOpacity
}

/**
 * Proportional control size scale (xs–xl).
 * md height (2.25rem) aligns button, input, select, and toggle at the same band.
 */
export const controlScale = {
  xs: {
    height: spaceVar['6.5'],
    paddingInline: spaceVar[2],
    gap: spaceVar[1],
    fontSize: fontSizeVar.xs,
    borderRadius: radiusVar.xs
  },
  sm: {
    height: spaceVar[8],
    paddingInline: spaceVar['2.5'],
    gap: spaceVar[1],
    fontSize: fontSizeVar.sm,
    borderRadius: radiusVar.xs
  },
  md: {
    height: spaceVar[9],
    paddingInline: spaceVar[3],
    gap: spaceVar[2],
    fontSize: fontSizeVar.sm,
    borderRadius: radiusVar.xs
  },
  lg: {
    height: spaceVar[11],
    paddingInline: spaceVar[4],
    gap: spaceVar[2],
    fontSize: fontSizeVar.md,
    borderRadius: radiusVar.sm
  },
  xl: {
    height: spaceVar[12],
    paddingInline: spaceVar[5],
    gap: spaceVar[2],
    fontSize: fontSizeVar.md,
    borderRadius: radiusVar.sm
  }
} as const

export type ControlSize = keyof typeof controlScale

/** Compact chip/badge scale — proportional but smaller than form controls. */
export const chipScale = {
  sm: {
    height: spaceVar['4.5'],
    gap: spaceVar[2],
    borderRadius: radiusVar.sm,
    paddingInline: spaceVar['1.5'],
    fontSize: fontSizeVar.xs
  },
  md: {
    height: spaceVar[6],
    gap: spaceVar[2],
    borderRadius: radiusVar.sm,
    paddingInline: spaceVar[2],
    fontSize: fontSizeVar.sm
  },
  lg: {
    height: spaceVar[7],
    gap: spaceVar[2],
    borderRadius: radiusVar.sm,
    paddingInline: spaceVar['2.5'],
    fontSize: fontSizeVar.sm
  }
} as const

export type ChipSize = keyof typeof chipScale

/**
 * OTP cell scale — square digit cells; md height aligns with controlScale.md band.
 * Width stays wider than height for multi-digit readability.
 */
export const otpCellScale = {
  sm: {
    height: controlScale.sm.height,
    width: spaceVar[10],
    fontSize: fontSizeVar.md
  },
  md: {
    height: controlScale.md.height,
    width: spaceVar[12],
    fontSize: fontSizeVar.lg
  },
  lg: {
    height: spaceVar[12],
    width: spaceVar[14],
    fontSize: fontSizeVar['2xl']
  },
  xl: {
    height: spaceVar[14],
    width: spaceVar[16],
    fontSize: fontSizeVar['2xl']
  }
} as const

export type OtpCellSize = keyof typeof otpCellScale

/** Avatar profile image scale — proportional circles for sm/md/lg. */
export const avatarScale = {
  sm: { width: spaceVar['7.5'], height: spaceVar['7.5'] },
  md: { width: spaceVar['10.5'], height: spaceVar['10.5'] },
  lg: { width: spaceVar['12.5'], height: spaceVar['12.5'] }
} as const

export type AvatarSize = keyof typeof avatarScale

/** Icon box container scale — decorative icon badges with matching content sizes. */
export const iconBoxScale = {
  sm: {
    width: spaceVar['6.5'],
    height: spaceVar['6.5'],
    borderRadius: radiusVar.xs,
    contentSize: spaceVar['3.5']
  },
  md: {
    width: spaceVar['8.5'],
    height: spaceVar['8.5'],
    borderRadius: radiusVar.sm,
    contentSize: spaceVar[4]
  },
  lg: {
    width: spaceVar[12],
    height: spaceVar[12],
    borderRadius: radiusVar.lg,
    contentSize: spaceVar[5]
  }
} as const

export type IconBoxSize = keyof typeof iconBoxScale

/** Inline decorative icon sizes — chips, links, items, hotkeys. */
export const iconSizeScale = {
  xs: { width: spaceVar[3], height: spaceVar[3] },
  sm: { width: spaceVar['3.5'], height: spaceVar['3.5'] },
  md: { width: spaceVar[4], height: spaceVar[4] },
  lg: { width: spaceVar[5], height: spaceVar[5] }
} as const

export type IconSize = keyof typeof iconSizeScale

/** Keyboard shortcut badge dimensions. */
export const hotkeyScale = {
  height: spaceVar[5],
  minWidth: spaceVar[5],
  iconSize: spaceVar[3]
} as const

/** Loading spinner scale — larger than inline icons for visibility. */
export const spinnerScale = {
  xs: { width: spaceVar[3], height: spaceVar[3] },
  sm: { width: spaceVar[4], height: spaceVar[4] },
  md: { width: spaceVar[8], height: spaceVar[8] },
  lg: { width: spaceVar[12], height: spaceVar[12] },
  xl: { width: spaceVar[16], height: spaceVar[16] }
} as const

export type SpinnerSize = keyof typeof spinnerScale
