import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const badgeStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.full,
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    lineHeight: lineHeight.none,
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
