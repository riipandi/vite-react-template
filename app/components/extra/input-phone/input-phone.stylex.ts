import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { unit } from '#/styles/core/tokens.stylex'

export const inputPhoneStyles = stylex.create({
  // The digits sit right of the country selector inside the group; strip the
  // bare Input's radius so nothing rounds inside the group's border.
  control: {
    borderRadius: 0
  },
  invalid: {
    // The InputGroup draws border/focus; only tint the text when invalid.
    color: colors.foregroundCritical
  },
  // Country trigger shown inside the group, left of the digits.
  countryTrigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    fontFamily: 'inherit',
    gap: unit.x1,
    height: '100%',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    paddingInline: unit.x3
  },
  flag: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x4,
    width: unit.x4,
    // Rounded corners for the 3x2 flag svg.
    borderRadius: 2,
    overflow: 'hidden'
  },
  countryCode: {
    color: colors.foregroundNeutralFaded
  }
})
