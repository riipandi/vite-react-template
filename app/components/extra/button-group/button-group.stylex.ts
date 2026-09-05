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
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
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
    borderRadius: radius.none
  },
  'horizontal-last': {
    borderBottomLeftRadius: radius.none,
    borderLeftWidth: 0,
    borderTopLeftRadius: radius.none
  },
  'vertical-first': {
    borderBottomLeftRadius: radius.none,
    borderBottomRightRadius: radius.none
  },
  'vertical-middle': {
    borderRadius: radius.none,
    borderTopWidth: 0
  },
  'vertical-last': {
    borderTopLeftRadius: radius.none,
    borderTopRightRadius: radius.none,
    borderTopWidth: 0
  }
})
