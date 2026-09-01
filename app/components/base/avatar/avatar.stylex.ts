import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontFamilyVar, fontWeightVar } from '#/styles/core/font.stylex'
import { radius } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Size tokens (Reshaped convention: size * 4 = px)
// ---------------------------------------------------------------------------

const avatarSizes = stylex.create({
  small: { width: '2rem', height: '2rem' }, // 8 * 4
  medium: { width: '2.5rem', height: '2.5rem' }, // 10 * 4
  large: { width: '3rem', height: '3rem' }, // 12 * 4
  xlarge: { width: '4rem', height: '4rem' } // 16 * 4
})

// ---------------------------------------------------------------------------
// Base styles
// ---------------------------------------------------------------------------

const base = stylex.create({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
    aspectRatio: '1 / 1',
    lineHeight: 1,
    overflow: 'hidden',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    userSelect: 'none'
  }
})

// ---------------------------------------------------------------------------
// Shape
// ---------------------------------------------------------------------------

const shape = stylex.create({
  circular: {
    borderRadius: radius.circular
  },
  rounded: {
    borderRadius: radius.small
  }
})

// ---------------------------------------------------------------------------
// Variant styles (solid = colored background, faded = colored text)
// ---------------------------------------------------------------------------

const variants = stylex.create({
  solid: {
    backgroundColor: colors.backgroundNeutral,
    color: colors.foregroundNeutral
  },
  faded: {
    backgroundColor: 'transparent',
    color: colors.foregroundNeutral
  }
})

// ---------------------------------------------------------------------------
// Color palettes
// ---------------------------------------------------------------------------

const colorsSolid = stylex.create({
  neutral: {
    backgroundColor: colors.backgroundNeutral,
    color: colors.onBackgroundNeutral
  },
  critical: {
    backgroundColor: colors.backgroundCritical,
    color: colors.onBackgroundNeutral
  },
  positive: {
    backgroundColor: colors.backgroundPositive,
    color: colors.onBackgroundNeutral
  },
  primary: {
    backgroundColor: colors.backgroundPrimary,
    color: colors.onBackgroundNeutral
  },
  warning: {
    backgroundColor: colors.backgroundWarning,
    color: colors.onBackgroundNeutral
  }
})

const colorsFaded = stylex.create({
  neutral: {
    backgroundColor: colors.backgroundNeutralFaded,
    color: colors.foregroundNeutral
  },
  critical: {
    backgroundColor: colors.backgroundCriticalFaded,
    color: colors.foregroundCritical
  },
  positive: {
    backgroundColor: colors.backgroundPositiveFaded,
    color: colors.foregroundPositive
  },
  primary: {
    backgroundColor: colors.backgroundPrimaryFaded,
    color: colors.foregroundPrimary
  },
  warning: {
    backgroundColor: colors.backgroundWarningFaded,
    color: colors.foregroundWarning
  }
})

// ---------------------------------------------------------------------------
// Image styles
// ---------------------------------------------------------------------------

const image = stylex.create({
  root: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit'
  }
})

// ---------------------------------------------------------------------------
// Fallback styles
// ---------------------------------------------------------------------------

const fallback = stylex.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.semibold,
    textTransform: 'uppercase',
    borderRadius: 'inherit'
  },
  small: {
    fontSize: '0.625rem'
  },
  medium: {
    fontSize: '0.75rem'
  },
  large: {
    fontSize: '0.875rem'
  },
  xlarge: {
    fontSize: '1rem'
  }
})

// ---------------------------------------------------------------------------
// Icon styles
// ---------------------------------------------------------------------------

const icon = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit'
  }
})

const iconSvg = stylex.create({
  small: { width: '0.875rem', height: '0.875rem' },
  medium: { width: '1rem', height: '1rem' },
  large: { width: '1.25rem', height: '1.25rem' },
  xlarge: { width: '1.5rem', height: '1.5rem' }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const avatarStyles = {
  base,
  shape,
  variants,
  colorsSolid,
  colorsFaded,
  sizes: avatarSizes,
  image,
  fallback,
  icon,
  iconSvg
} as const
