import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar } from '#/styles/tokens.stylex'

/**
 * CSS custom properties that bridge color × variant compound styling.
 * Each color sets ALL variables via createTheme; each variant uses
 * the subset it needs.
 */
export const buttonVars = stylex.defineVars({
  bg: 'transparent',
  fg: 'inherit',
  fadedBg: 'transparent',
  fadedFg: 'inherit',
  border: 'transparent'
})

/**
 * Structural styles.
 */
export const buttonStyles = stylex.create({
  base: {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[2],
    userSelect: 'none',
    textDecoration: 'none',
    fontFamily: 'inherit',
    lineHeight: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    outline: 'none',
    backgroundColor: buttonVars.bg,
    color: buttonVars.fg,
    transitionProperty: 'color, background-color, border-color, opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineOffset: 2,
      outlineColor: colorVar.fgPrimary
    }
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.7,
    ':hover': {
      opacity: 0.7
    }
  },
  asIcon: {
    aspectRatio: '1',
    padding: spaceVar[2]
  },
  pill: {
    borderRadius: radiusVar.full
  },
  block: {
    width: '100%'
  }
})

/* Hover overlay – subtle darken regardless of background color */
const hoverOverlay = 'linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08))'
const activeOverlay = 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))'

/**
 * Variant structural patterns.
 * Color-specific values come from buttonVars CSS variables.
 * Hover/active use background-image overlay to darken the base color
 * instead of swapping to a different color variable.
 */
export const buttonVariants = stylex.create({
  solid: {
    backgroundColor: buttonVars.bg,
    color: buttonVars.fg,
    ':hover': { backgroundImage: hoverOverlay },
    ':active': { backgroundImage: activeOverlay }
  },
  faded: {
    backgroundColor: buttonVars.fadedBg,
    color: buttonVars.fadedFg,
    ':hover': { backgroundImage: hoverOverlay },
    ':active': { backgroundImage: activeOverlay }
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: buttonVars.border,
    color: buttonVars.fadedFg,
    ':hover': {
      backgroundColor: buttonVars.fadedBg,
      backgroundImage: hoverOverlay
    },
    ':active': {
      backgroundColor: buttonVars.fadedBg,
      backgroundImage: activeOverlay
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    color: buttonVars.fadedFg,
    ':hover': {
      backgroundColor: buttonVars.fadedBg,
      backgroundImage: hoverOverlay
    },
    ':active': {
      backgroundColor: buttonVars.fadedBg,
      backgroundImage: activeOverlay
    }
  }
})

/**
 * Color themes — each sets buttonVars for all variants.
 * Individual exports required: StyleX Babel plugin requires
 * createTheme() calls bound to bare variables.
 */
export const primaryTheme = stylex.createTheme(buttonVars, {
  bg: colorVar.bgPrimary,
  fg: colorVar.onPrimary,
  fadedBg: colorVar.bgPrimaryFaded,
  fadedFg: colorVar.fgPrimary,
  border: colorVar.borderPrimary
})

export const neutralTheme = stylex.createTheme(buttonVars, {
  bg: colorVar.bgNeutral,
  fg: colorVar.onBgNeutral,
  fadedBg: colorVar.bgNeutralFaded,
  fadedFg: colorVar.fgNeutral,
  border: colorVar.borderNeutral
})

export const positiveTheme = stylex.createTheme(buttonVars, {
  bg: colorVar.bgPositive,
  fg: colorVar.onBgPositive,
  fadedBg: colorVar.bgPositiveFaded,
  fadedFg: colorVar.fgPositive,
  border: colorVar.borderPositive
})

export const warningTheme = stylex.createTheme(buttonVars, {
  bg: colorVar.bgWarning,
  fg: colorVar.onBgWarning,
  fadedBg: colorVar.bgWarningFaded,
  fadedFg: colorVar.fgWarning,
  border: colorVar.borderWarning
})

export const criticalTheme = stylex.createTheme(buttonVars, {
  bg: colorVar.bgCritical,
  fg: colorVar.onBgCritical,
  fadedBg: colorVar.bgCriticalFaded,
  fadedFg: colorVar.fgCritical,
  border: colorVar.borderCritical
})

/** Lookup map for dynamic color access. */
export const buttonColors = {
  primary: primaryTheme,
  neutral: neutralTheme,
  positive: positiveTheme,
  warning: warningTheme,
  critical: criticalTheme
} as const

/**
 * Size dimensions mapped from origin Tailwind classes.
 */
export const buttonSizes = stylex.create({
  xs: {
    height: '1.625rem',
    paddingInline: spaceVar[2],
    gap: spaceVar[1],
    fontSize: fontSizeVar.xs,
    borderRadius: radiusVar.xs
  },
  sm: {
    height: '2rem',
    paddingInline: spaceVar['2.5'],
    gap: spaceVar[1],
    fontSize: fontSizeVar.sm,
    borderRadius: radiusVar.xs
  },
  md: {
    height: '2.25rem',
    paddingInline: spaceVar[3],
    gap: spaceVar[2],
    fontSize: fontSizeVar.sm,
    borderRadius: radiusVar.xs
  },
  lg: {
    height: '2.75rem',
    paddingInline: spaceVar[4],
    gap: spaceVar[2],
    fontSize: fontSizeVar.md,
    borderRadius: radiusVar.sm
  },
  xl: {
    height: '3rem',
    paddingInline: spaceVar[5],
    gap: spaceVar[2],
    fontSize: fontSizeVar.md,
    borderRadius: radiusVar.sm
  }
})

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonColor = keyof typeof buttonColors
export type ButtonSize = keyof typeof buttonSizes
