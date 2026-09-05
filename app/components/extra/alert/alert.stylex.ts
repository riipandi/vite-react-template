import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const alertStyles = stylex.create({
  root: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
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
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  description: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    marginTop: unit.x2,
    margin: 0
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
    borderColor: colors.borderCritical,
    color: colors.foregroundCritical
  }
})
