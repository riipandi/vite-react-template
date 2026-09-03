import * as stylex from '@stylexjs/stylex'
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const buttonGroupStyles = stylex.create({
  root: {
    alignItems: 'stretch',
    display: 'flex',
    fontFamily: font.sans,
    width: 'fit-content'
  },
  text: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    paddingInline: space.s25
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.input
  }
})

export const buttonGroupOrientations = stylex.create({
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  }
})

export const buttonGroupJoined = stylex.create({
  'horizontal-first': {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  'horizontal-middle': {
    borderLeftWidth: 0,
    borderRadius: 0
  },
  'horizontal-last': {
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0
  },
  'vertical-first': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  'vertical-middle': {
    borderRadius: 0,
    borderTopWidth: 0
  },
  'vertical-last': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0
  }
})
