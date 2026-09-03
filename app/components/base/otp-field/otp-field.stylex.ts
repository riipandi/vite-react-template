import * as stylex from '@stylexjs/stylex'
import { space, stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { radius } from '#/styles/core/size.stylex'

export const otpFieldStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: space.s2
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  // Slots fuse into one field: shared vertical borders, a leading border only
  // on the first slot, and end radii — joined-slot look. The
  // focused slot draws a full ring above its neighbors.
  slot: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: { default: 0, ':first-child': radius.large },
    borderBottomRightRadius: { default: 0, ':last-child': radius.large },
    borderColor: { default: colors.input, ':focus': colors.ring },
    borderStyle: 'solid',
    borderTopLeftRadius: { default: 0, ':first-child': radius.large },
    borderTopRightRadius: { default: 0, ':last-child': radius.large },
    borderWidth: stroke.border,
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 ${stroke.halo} color-mix(in srgb, ${colors.ring} 50%, transparent)`
    },
    color: colors.foreground,
    fontSize: fontSize.body2,
    height: space.s8,
    lineHeight: fontLineHeight.body2,
    marginLeft: { default: `calc(-1 * ${stroke.border})`, ':first-child': 0 },
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    position: 'relative',
    textAlign: 'center',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, box-shadow',
    width: space.s8,
    zIndex: { default: 0, ':focus': 1 }
  },
  separator: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex'
  }
})
