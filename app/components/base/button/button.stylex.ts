import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

export const buttonStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.medium,
    borderStyle: 'none',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    justifyContent: 'center',
    lineHeight: fontLineHeight.body2,
    opacity: { default: 1, ':disabled': 0.5 },
    textDecoration: 'none',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.focus,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color, color, opacity',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  }
})

export const buttonVariants = stylex.create({
  primary: {
    backgroundColor: {
      default: colors.backgroundPrimary,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.backgroundPrimary} 90%, transparent)`
    },
    color: colors.onBrand
  },
  secondary: {
    backgroundColor: {
      default: colors.backgroundNeutral,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.backgroundNeutral} 80%, ${colors.foregroundNeutral} 4%)`
    },
    color: colors.foregroundNeutral
  },
  outline: {
    backgroundColor: {
      default: colors.backgroundPage,
      ':hover:not(:disabled)': colors.backgroundNeutralFaded
    },
    borderColor: colors.borderNeutralFaded,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: {
      default: colors.foregroundNeutral,
      ':hover:not(:disabled)': colors.foregroundNeutral
    }
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.backgroundNeutralFaded
    },
    color: {
      default: colors.foregroundNeutral,
      ':hover:not(:disabled)': colors.foregroundNeutral
    }
  },
  destructive: {
    backgroundColor: {
      default: colors.backgroundCritical,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.backgroundCritical} 90%, transparent)`
    },
    color: colors.onBackgroundCritical
  }
})

export const buttonSizes = stylex.create({
  xs: { fontSize: fontSize.caption1, gap: unit.x1, height: unit.x7, paddingInline: unit.x2 },
  sm: { height: unit.x8, paddingInline: unit.x3 },
  md: { height: unit.x9, paddingInline: unit.x4 },
  lg: { fontSize: fontSize.body1, height: unit.x10, paddingInline: unit.x6 },
  icon: { height: unit.x9, paddingInline: 0, width: unit.x9 },
  iconXs: { height: unit.x7, paddingInline: 0, width: unit.x7 },
  iconSm: { height: unit.x8, paddingInline: 0, width: unit.x8 },
  iconLg: { height: unit.x10, paddingInline: 0, width: unit.x10 }
})
