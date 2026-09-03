import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontFamilyVar } from '#/styles/core/tokens.stylex'
import { fontWeight, fontWeightVar, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

// Mirror of `breakpoints` from `#/styles/core/tokens.stylex` (medium/large/
// xlarge). @stylexjs/babel-plugin 0.19 only inlines `defineConsts` media keys
// declared in the SAME file, so these cannot be imported cross-file yet —
// keep the values in sync.
export const breakpoints = stylex.defineConsts({
  medium: '@media (min-width: 660px) and (max-width: 899px)',
  large: '@media (min-width: 900px) and (max-width: 1279px)',
  xlarge: '@media (min-width: 1280px)'
})

const headline1 = {
  fontFamily: fontFamilyVar.headline1,
  fontSize: fontSize.headline1,
  fontWeight: fontWeightVar.headline1,
  lineHeight: fontLineHeight.headline1
}
const headline2 = {
  fontFamily: fontFamilyVar.headline2,
  fontSize: fontSize.headline2,
  fontWeight: fontWeightVar.headline2,
  lineHeight: fontLineHeight.headline2
}
const headline3 = {
  fontFamily: fontFamilyVar.headline3,
  fontSize: fontSize.headline3,
  fontWeight: fontWeightVar.headline3,
  lineHeight: fontLineHeight.headline3
}
const featured1 = {
  fontFamily: fontFamilyVar.featured1,
  fontSize: fontSize.featured1,
  fontWeight: fontWeightVar.featured1,
  lineHeight: fontLineHeight.featured1
}
const featured2 = {
  fontFamily: fontFamilyVar.featured2,
  fontSize: fontSize.featured2,
  fontWeight: fontWeightVar.featured2,
  lineHeight: fontLineHeight.featured2
}
const featured3 = {
  fontFamily: fontFamilyVar.featured3,
  fontSize: fontSize.featured3,
  fontWeight: fontWeightVar.featured3,
  lineHeight: fontLineHeight.featured3
}
const featured4 = {
  fontFamily: fontFamilyVar.featured4,
  fontSize: fontSize.featured4,
  fontWeight: fontWeightVar.featured4,
  lineHeight: fontLineHeight.featured4
}
const featured5 = {
  fontFamily: fontFamilyVar.featured5,
  fontSize: fontSize.featured5,
  fontWeight: fontWeightVar.featured5,
  lineHeight: fontLineHeight.featured5
}
const featured6 = {
  fontFamily: fontFamilyVar.featured6,
  fontSize: fontSize.featured6,
  fontWeight: fontWeightVar.featured6,
  lineHeight: fontLineHeight.featured6
}
const body1 = {
  fontFamily: fontFamilyVar.body1,
  fontSize: fontSize.body1,
  fontWeight: fontWeightVar.body1,
  lineHeight: fontLineHeight.body1
}
const body2 = {
  fontFamily: fontFamilyVar.body2,
  fontSize: fontSize.body2,
  fontWeight: fontWeightVar.body2,
  lineHeight: fontLineHeight.body2
}
const caption1 = {
  fontFamily: fontFamilyVar.caption1,
  fontSize: fontSize.caption1,
  fontWeight: fontWeightVar.caption1,
  lineHeight: fontLineHeight.caption1
}
const caption2 = {
  fontFamily: fontFamilyVar.caption2,
  fontSize: fontSize.caption2,
  fontWeight: fontWeightVar.caption2,
  lineHeight: fontLineHeight.caption2
}

export const textVariantStyles = stylex.create({
  'headline-1': headline1,
  'headline-2': headline2,
  'headline-3': headline3,
  'featured-1': featured1,
  'featured-2': featured2,
  'featured-3': featured3,
  'featured-4': featured4,
  'featured-5': featured5,
  'featured-6': featured6,
  'body-1': body1,
  'body-2': body2,
  'caption-1': caption1,
  'caption-2': caption2
})

export const textVariantStylesMedium = stylex.create({
  'headline-1': { [breakpoints.medium]: headline1 },
  'headline-2': { [breakpoints.medium]: headline2 },
  'headline-3': { [breakpoints.medium]: headline3 },
  'featured-1': { [breakpoints.medium]: featured1 },
  'featured-2': { [breakpoints.medium]: featured2 },
  'featured-3': { [breakpoints.medium]: featured3 },
  'featured-4': { [breakpoints.medium]: featured4 },
  'featured-5': { [breakpoints.medium]: featured5 },
  'featured-6': { [breakpoints.medium]: featured6 },
  'body-1': { [breakpoints.medium]: body1 },
  'body-2': { [breakpoints.medium]: body2 },
  'caption-1': { [breakpoints.medium]: caption1 },
  'caption-2': { [breakpoints.medium]: caption2 }
})

export const textVariantStylesLarge = stylex.create({
  'headline-1': { [breakpoints.large]: headline1 },
  'headline-2': { [breakpoints.large]: headline2 },
  'headline-3': { [breakpoints.large]: headline3 },
  'featured-1': { [breakpoints.large]: featured1 },
  'featured-2': { [breakpoints.large]: featured2 },
  'featured-3': { [breakpoints.large]: featured3 },
  'featured-4': { [breakpoints.large]: featured4 },
  'featured-5': { [breakpoints.large]: featured5 },
  'featured-6': { [breakpoints.large]: featured6 },
  'body-1': { [breakpoints.large]: body1 },
  'body-2': { [breakpoints.large]: body2 },
  'caption-1': { [breakpoints.large]: caption1 },
  'caption-2': { [breakpoints.large]: caption2 }
})

export const textVariantStylesXLarge = stylex.create({
  'headline-1': { [breakpoints.xlarge]: headline1 },
  'headline-2': { [breakpoints.xlarge]: headline2 },
  'headline-3': { [breakpoints.xlarge]: headline3 },
  'featured-1': { [breakpoints.xlarge]: featured1 },
  'featured-2': { [breakpoints.xlarge]: featured2 },
  'featured-3': { [breakpoints.xlarge]: featured3 },
  'featured-4': { [breakpoints.xlarge]: featured4 },
  'featured-5': { [breakpoints.xlarge]: featured5 },
  'featured-6': { [breakpoints.xlarge]: featured6 },
  'body-1': { [breakpoints.xlarge]: body1 },
  'body-2': { [breakpoints.xlarge]: body2 },
  'caption-1': { [breakpoints.xlarge]: caption1 },
  'caption-2': { [breakpoints.xlarge]: caption2 }
})

export const textColorStyles = stylex.create({
  neutral: { color: colors.foregroundNeutral },
  'neutral-faded': { color: colors.foregroundNeutralFaded },
  positive: { color: colors.foregroundPositive },
  warning: { color: colors.foregroundWarning },
  critical: { color: colors.foregroundCritical },
  primary: { color: colors.foregroundPrimary },
  disabled: { color: colors.foregroundDisabled }
})

export const textWeightStyles = stylex.create({
  light: { fontWeight: fontWeight.light },
  regular: { fontWeight: fontWeight.regular },
  medium: { fontWeight: fontWeight.medium },
  semibold: { fontWeight: fontWeight.semibold },
  bold: { fontWeight: fontWeight.bold },
  extrabold: { fontWeight: fontWeight.extrabold },
  black: { fontWeight: fontWeight.black }
})

export const textWeightStylesMedium = stylex.create({
  light: { [breakpoints.medium]: { fontWeight: fontWeight.light } },
  regular: { [breakpoints.medium]: { fontWeight: fontWeight.regular } },
  medium: { [breakpoints.medium]: { fontWeight: fontWeight.medium } },
  semibold: { [breakpoints.medium]: { fontWeight: fontWeight.semibold } },
  bold: { [breakpoints.medium]: { fontWeight: fontWeight.bold } },
  extrabold: { [breakpoints.medium]: { fontWeight: fontWeight.extrabold } },
  black: { [breakpoints.medium]: { fontWeight: fontWeight.black } }
})

export const textWeightStylesLarge = stylex.create({
  light: { [breakpoints.large]: { fontWeight: fontWeight.light } },
  regular: { [breakpoints.large]: { fontWeight: fontWeight.regular } },
  medium: { [breakpoints.large]: { fontWeight: fontWeight.medium } },
  semibold: { [breakpoints.large]: { fontWeight: fontWeight.semibold } },
  bold: { [breakpoints.large]: { fontWeight: fontWeight.bold } },
  extrabold: { [breakpoints.large]: { fontWeight: fontWeight.extrabold } },
  black: { [breakpoints.large]: { fontWeight: fontWeight.black } }
})

export const textWeightStylesXLarge = stylex.create({
  light: { [breakpoints.xlarge]: { fontWeight: fontWeight.light } },
  regular: { [breakpoints.xlarge]: { fontWeight: fontWeight.regular } },
  medium: { [breakpoints.xlarge]: { fontWeight: fontWeight.medium } },
  semibold: { [breakpoints.xlarge]: { fontWeight: fontWeight.semibold } },
  bold: { [breakpoints.xlarge]: { fontWeight: fontWeight.bold } },
  extrabold: { [breakpoints.xlarge]: { fontWeight: fontWeight.extrabold } },
  black: { [breakpoints.xlarge]: { fontWeight: fontWeight.black } }
})

export const textAlignStyles = stylex.create({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' }
})

export const textAlignStylesMedium = stylex.create({
  start: { [breakpoints.medium]: { textAlign: 'start' } },
  center: { [breakpoints.medium]: { textAlign: 'center' } },
  end: { [breakpoints.medium]: { textAlign: 'end' } }
})

export const textAlignStylesLarge = stylex.create({
  start: { [breakpoints.large]: { textAlign: 'start' } },
  center: { [breakpoints.large]: { textAlign: 'center' } },
  end: { [breakpoints.large]: { textAlign: 'end' } }
})

export const textAlignStylesXLarge = stylex.create({
  start: { [breakpoints.xlarge]: { textAlign: 'start' } },
  center: { [breakpoints.xlarge]: { textAlign: 'center' } },
  end: { [breakpoints.xlarge]: { textAlign: 'end' } }
})

export const textStyles = stylex.create({
  decorationUnderline: { textDecorationLine: 'underline' },
  decorationLineThrough: { textDecorationLine: 'line-through' },
  wrapBalance: { textWrap: 'balance' },
  wrapNowrap: { whiteSpace: 'nowrap' },
  monospace: { fontFamily: fontFamily.monospace },
  numeric: { fontVariantNumeric: 'tabular-nums' },
  clamp: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    // Line count comes from the runtime `--text-lines` custom property.
    WebkitLineClamp: 'var(--text-lines)'
  },
  breakAll: { wordBreak: 'break-all' }
})
