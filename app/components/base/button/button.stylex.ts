import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { stroke } from '#/styles/core/size.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

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
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
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
      default: colors.primary,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.primary} 90%, transparent)`
    },
    color: colors.primaryForeground
  },
  secondary: {
    backgroundColor: {
      default: colors.secondary,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.secondary} 80%, ${colors.foreground} 4%)`
    },
    color: colors.secondaryForeground
  },
  outline: {
    backgroundColor: {
      default: colors.background,
      ':hover:not(:disabled)': colors.accent
    },
    borderColor: colors.border,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: {
      default: colors.foreground,
      ':hover:not(:disabled)': colors.accentForeground
    }
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.accent
    },
    color: {
      default: colors.foreground,
      ':hover:not(:disabled)': colors.accentForeground
    }
  },
  destructive: {
    backgroundColor: {
      default: colors.destructive,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.destructive} 90%, transparent)`
    },
    color: colors.destructiveForeground
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
