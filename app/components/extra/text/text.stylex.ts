import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import {
  fontFamily,
  fontFamilyVar,
  fontWeight,
  fontWeightVar,
  fontSize,
  fontLineHeight
} from '#/styles/core/font.stylex'

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

const variants = stylex.create({
  'headline-1': {
    fontFamily: fontFamily.headline1,
    fontSize: fontSize.headline1,
    lineHeight: fontLineHeight.headline1,
    fontWeight: fontWeight.headline1
  },
  'headline-2': {
    fontFamily: fontFamily.headline2,
    fontSize: fontSize.headline2,
    lineHeight: fontLineHeight.headline2,
    fontWeight: fontWeight.headline2
  },
  'headline-3': {
    fontFamily: fontFamily.headline3,
    fontSize: fontSize.headline3,
    lineHeight: fontLineHeight.headline3,
    fontWeight: fontWeight.headline3
  },
  'featured-1': {
    fontFamily: fontFamily.featured1,
    fontSize: fontSize.featured1,
    lineHeight: fontLineHeight.featured1,
    fontWeight: fontWeight.featured1
  },
  'featured-2': {
    fontFamily: fontFamily.featured2,
    fontSize: fontSize.featured2,
    lineHeight: fontLineHeight.featured2,
    fontWeight: fontWeight.featured2
  },
  'featured-3': {
    fontFamily: fontFamily.featured3,
    fontSize: fontSize.featured3,
    lineHeight: fontLineHeight.featured3,
    fontWeight: fontWeight.featured3
  },
  'featured-4': {
    fontFamily: fontFamily.featured4,
    fontSize: fontSize.featured4,
    lineHeight: fontLineHeight.featured4,
    fontWeight: fontWeight.featured4
  },
  'featured-5': {
    fontFamily: fontFamily.featured5,
    fontSize: fontSize.featured5,
    lineHeight: fontLineHeight.featured5,
    fontWeight: fontWeight.featured5
  },
  'featured-6': {
    fontFamily: fontFamily.featured6,
    fontSize: fontSize.featured6,
    lineHeight: fontLineHeight.featured6,
    fontWeight: fontWeight.featured6
  },
  'body-1': {
    fontFamily: fontFamily.body1,
    fontSize: fontSize.body1,
    lineHeight: fontLineHeight.body1,
    fontWeight: fontWeight.body1
  },
  'body-2': {
    fontFamily: fontFamily.body2,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    fontWeight: fontWeight.body2
  },
  'caption-1': {
    fontFamily: fontFamily.caption1,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    fontWeight: fontWeight.caption1
  },
  'caption-2': {
    fontFamily: fontFamily.caption2,
    fontSize: fontSize.caption2,
    lineHeight: fontLineHeight.caption2,
    fontWeight: fontWeight.caption2
  }
})

// ---------------------------------------------------------------------------
// Font weight overrides
// ---------------------------------------------------------------------------

const weights = stylex.create({
  regular: { fontWeight: fontWeightVar.regular },
  medium: { fontWeight: fontWeightVar.medium },
  semibold: { fontWeight: fontWeightVar.semibold },
  bold: { fontWeight: fontWeightVar.bold },
  extrabold: { fontWeight: fontWeightVar.extrabold }
})

// ---------------------------------------------------------------------------
// Color styles
// ---------------------------------------------------------------------------

const colorStyles = stylex.create({
  neutral: { color: colors.foregroundNeutral },
  'neutral-faded': { color: colors.foregroundNeutralFaded },
  critical: { color: colors.foregroundCritical },
  warning: { color: colors.foregroundWarning },
  positive: { color: colors.foregroundPositive },
  primary: { color: colors.foregroundPrimary },
  disabled: { color: colors.foregroundDisabled }
})

// ---------------------------------------------------------------------------
// Text alignment
// ---------------------------------------------------------------------------

const alignment = stylex.create({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' }
})

// ---------------------------------------------------------------------------
// Truncation
// ---------------------------------------------------------------------------

const truncation = stylex.create({
  clamp: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  breakAll: {
    wordBreak: 'break-all'
  }
})

// ---------------------------------------------------------------------------
// Decoration
// ---------------------------------------------------------------------------

const decoration = stylex.create({
  'line-through': { textDecoration: 'line-through' }
})

// ---------------------------------------------------------------------------
// Wrap
// ---------------------------------------------------------------------------

const wrap = stylex.create({
  balance: { textWrap: 'balance' }
})

// ---------------------------------------------------------------------------
// Monospace
// ---------------------------------------------------------------------------

const monospace = stylex.create({
  root: { fontFamily: fontFamilyVar.monospace }
})

// ---------------------------------------------------------------------------
// Numeric
// ---------------------------------------------------------------------------

const numeric = stylex.create({
  root: { fontVariantNumeric: 'tabular-nums' }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const textStyles = {
  variants,
  weights,
  colorStyles,
  alignment,
  truncation,
  decoration,
  wrap,
  monospace,
  numeric
} as const
