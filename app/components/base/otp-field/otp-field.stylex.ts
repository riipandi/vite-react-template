import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const otpFieldStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: unit.x2
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  // Slots fuse into one field: shared vertical borders, a leading border only
  // on the first slot, and end radii — joined-slot look. The
  // focused slot draws a full ring above its neighbors.
  slot: {
    backgroundColor: colors.backgroundPage,
    borderBottomLeftRadius: { default: 0, ':first-child': radius.large },
    borderBottomRightRadius: { default: 0, ':last-child': radius.large },
    borderColor: { default: colors.borderNeutralFaded, ':focus': colors.foregroundPrimary },
    borderStyle: 'solid',
    borderTopLeftRadius: { default: 0, ':first-child': radius.large },
    borderTopRightRadius: { default: 0, ':last-child': radius.large },
    borderWidth: stroke.ring1,
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 ${stroke.ring3} color-mix(in srgb, ${colors.foregroundPrimary} 50%, transparent)`
    },
    color: colors.foregroundNeutral,
    fontSize: fontSize.body2,
    height: unit.x8,
    lineHeight: fontLineHeight.body2,
    marginLeft: { default: `calc(-1 * ${stroke.ring1})`, ':first-child': 0 },
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    position: 'relative',
    textAlign: 'center',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, box-shadow',
    width: unit.x8,
    zIndex: { default: 0, ':focus': 1 }
  },
  separator: {
    alignItems: 'center',
    color: colors.foregroundNeutralFaded,
    display: 'flex'
  }
})
