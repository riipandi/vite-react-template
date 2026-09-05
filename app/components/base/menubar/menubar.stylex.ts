import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const menubarStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: unit.x0_5,
    height: unit.x8,
    paddingInline: unit.x0_5
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutral,
      '[data-popup-open]': colors.backgroundNeutral
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: 'default',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    paddingBlock: unit.x0_5,
    paddingInline: unit.x1_5,
    userSelect: 'none'
  },
  // Menubar popups size to their content, not the trigger.
  content: {
    width: 'max-content'
  }
})
