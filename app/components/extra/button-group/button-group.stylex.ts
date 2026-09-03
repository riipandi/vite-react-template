import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const buttonGroupStyles = stylex.create({
  root: {
    alignItems: 'stretch',
    display: 'flex',
    fontFamily: fontFamily.body,
    width: 'fit-content'
  },
  text: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    paddingInline: unit.x2
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.borderNeutralFaded
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
