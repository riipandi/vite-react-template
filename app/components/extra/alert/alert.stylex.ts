import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { stroke } from '#/styles/core/size.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const alertStyles = stylex.create({
  root: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.cardForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x1,
    padding: unit.x4,
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2
  },
  action: {
    insetBlockStart: unit.x4,
    insetInlineEnd: unit.x4,
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
