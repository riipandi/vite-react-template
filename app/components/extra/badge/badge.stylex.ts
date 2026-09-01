import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontFamilyVar, fontWeightVar, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { radius, unit } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Base styles
// ---------------------------------------------------------------------------

const base = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    backfaceVisibility: 'hidden',
    transitionProperty: 'transform, opacity, box-shadow, background-color',
    transitionDuration: duration.medium,
    transitionTimingFunction: easing.standard,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.semibold,
    lineHeight: fontLineHeight.caption1
  }
})

// ---------------------------------------------------------------------------
// Size variants
// ---------------------------------------------------------------------------

const sizes = stylex.create({
  small: {
    paddingBlock: unit['x0.5'],
    paddingInline: unit['x1.5'],
    fontSize: fontSize.caption1,
    minWidth: `calc(${unit.x2} + ${unit['x0.5']} * 2)`,
    minHeight: `calc(${unit.x2} + ${unit['x0.5']} * 2)`
  },
  medium: {
    paddingBlock: unit.x1,
    paddingInline: unit.x2,
    fontSize: fontSize.caption1,
    minWidth: `calc(${unit.x2} + ${unit.x1} * 2)`,
    minHeight: `calc(${unit.x2} + ${unit.x1} * 2)`
  },
  large: {
    paddingBlock: unit.x1,
    paddingInline: `calc(${unit['x0.5']} * 5)`,
    fontSize: fontSize.body2,
    minWidth: `calc(${unit.x3} + ${unit.x1} * 2)`,
    minHeight: `calc(${unit.x3} + ${unit.x1} * 2)`
  }
})

// ---------------------------------------------------------------------------
// Empty (no children)
// ---------------------------------------------------------------------------

const empty = stylex.create({
  small: {
    width: unit.x2,
    height: unit.x2,
    minWidth: 'auto',
    minHeight: 'auto',
    padding: 0
  },
  medium: {
    width: unit.x3,
    height: unit.x3,
    minWidth: 'auto',
    minHeight: 'auto',
    padding: 0
  },
  large: {
    width: unit.x4,
    height: unit.x4,
    minWidth: 'auto',
    minHeight: 'auto',
    padding: 0
  }
})

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

const variants = stylex.create({
  solid: {
    backgroundColor: colors.backgroundNeutral,
    color: colors.onBackgroundNeutral,
    boxShadow: `0 0 0 1px transparent inset`
  },
  faded: {
    backgroundColor: colors.backgroundNeutralFaded,
    color: colors.foregroundNeutralFaded,
    boxShadow: `0 0 0 1px ${colors.borderNeutralFaded} inset`
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
    color: colors.foregroundNeutralFaded,
    boxShadow: `0 0 0 1px ${colors.borderNeutralFaded} inset`
  },
  critical: {
    backgroundColor: colors.backgroundCriticalFaded,
    color: colors.foregroundCritical,
    boxShadow: `0 0 0 1px ${colors.borderCriticalFaded} inset`
  },
  positive: {
    backgroundColor: colors.backgroundPositiveFaded,
    color: colors.foregroundPositive,
    boxShadow: `0 0 0 1px ${colors.borderPositiveFaded} inset`
  },
  primary: {
    backgroundColor: colors.backgroundPrimaryFaded,
    color: colors.foregroundPrimary,
    boxShadow: `0 0 0 1px ${colors.borderPrimaryFaded} inset`
  },
  warning: {
    backgroundColor: colors.backgroundWarningFaded,
    color: colors.foregroundWarning,
    boxShadow: `0 0 0 1px ${colors.borderWarningFaded} inset`
  }
})

// ---------------------------------------------------------------------------
// Rounded
// ---------------------------------------------------------------------------

const rounded = stylex.create({
  root: {
    borderRadius: radius.circular
  }
})

// ---------------------------------------------------------------------------
// Highlighted (active state)
// ---------------------------------------------------------------------------

const highlighted = stylex.create({
  root: {
    opacity: 0.8
  }
})

// ---------------------------------------------------------------------------
// Hidden (transition to hidden)
// ---------------------------------------------------------------------------

const hidden = stylex.create({
  root: {
    transform: 'scale(0.2)',
    opacity: 0
  }
})

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const content = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: unit.x1
  }
})

// ---------------------------------------------------------------------------
// Icon
// ---------------------------------------------------------------------------

const icon = stylex.create({
  small: {
    ':first-child': { marginInlineStart: `-${unit['x0.5']}` },
    ':last-child': { marginInlineEnd: `-${unit['x0.5']}` },
    ':only-child': { marginInline: `-${unit.x1}` }
  },
  medium: {
    ':first-child': { marginInlineStart: `-${unit['x0.5']}` },
    ':last-child': { marginInlineEnd: `-${unit['x0.5']}` },
    ':only-child': { marginInline: `-${unit.x1}` }
  },
  large: {
    ':first-child': { marginInlineStart: `-${unit['x0.5']}` },
    ':last-child': { marginInlineEnd: `-${unit['x0.5']}` },
    ':only-child': { marginInline: `-${unit.x1}` }
  }
})

const iconSvg = stylex.create({
  small: { width: '0.75rem', height: '0.75rem' },
  medium: { width: '0.875rem', height: '0.875rem' },
  large: { width: '1rem', height: '1rem' }
})

// ---------------------------------------------------------------------------
// Dismiss button
// ---------------------------------------------------------------------------

const dismiss = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.small,
    transitionProperty: 'opacity',
    transitionDuration: duration.fast,
    transitionTimingFunction: easing.standard,
    ':last-child': { marginInlineEnd: `-${unit['x0.5']}` },
    ':hover': { opacity: 0.8 }
  },
  small: {
    width: '0.875rem',
    height: '0.875rem'
  },
  medium: {
    width: '1rem',
    height: '1rem'
  },
  large: {
    width: '1.25rem',
    height: '1.25rem'
  }
})

// ---------------------------------------------------------------------------
// Container (for positioned badge)
// ---------------------------------------------------------------------------

const container = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top'
  },
  'top-end': {},
  'bottom-end': {},
  overlap: {}
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const badgeStyles = {
  base,
  sizes,
  empty,
  variants,
  colorsSolid,
  colorsFaded,
  rounded,
  highlighted,
  hidden,
  content,
  icon,
  iconSvg,
  dismiss,
  container
} as const
