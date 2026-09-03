import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight } from '#/styles/core/font.stylex'

export const alertStyles = stylex.create({
  root: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.cardForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s1,
    padding: space.s4,
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal
  },
  action: {
    insetBlockStart: space.s4,
    insetInlineEnd: space.s4,
    position: 'absolute'
  }
})

export const alertVariants = stylex.create({
  default: {},
  destructive: {
    borderColor: colors.destructive,
    color: colors.destructive
  }
})
