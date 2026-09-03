import * as stylex from '@stylexjs/stylex'
import { space, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const badgeStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.full,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    lineHeight: fontLineHeight.caption1,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: stroke.focus,
    paddingBlock: space.s1,
    paddingInline: space.s25,
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
