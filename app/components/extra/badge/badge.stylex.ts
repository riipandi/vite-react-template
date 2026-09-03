import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const badgeStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.circular,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    gap: unit.x1,
    lineHeight: fontLineHeight.caption1,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: stroke.focus,
    paddingBlock: unit.x1,
    paddingInline: unit.x3,
    whiteSpace: 'nowrap'
  }
})

export const badgeVariants = stylex.create({
  primary: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground
  },
  outline: {
    borderColor: colors.border,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.foreground
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveForeground
  }
})
