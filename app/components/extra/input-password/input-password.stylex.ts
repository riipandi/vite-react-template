import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const inputPasswordStyles = stylex.create({
  // The group already draws the border and focus ring; the wrapper only
  // guarantees a full-width block so it behaves like a plain input.
  root: {
    width: '100%'
  },
  toggle: {
    // Icon-only control inside the group: keep it flush with the trailing
    // edge and let it adopt the group's medium corner radius.
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radius.medium,
    borderStyle: 'none',
    color: colors.foregroundNeutralFaded,
    cursor: 'pointer',
    display: 'inline-flex',
    height: unit.x7,
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    padding: 0,
    width: unit.x7
  }
})
