import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const meterStyles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamily.body,
    gap: unit.x3,
    width: '100%'
  },
  track: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.circular,
    display: 'flex',
    height: unit.x1,
    overflowX: 'hidden',
    position: 'relative',
    width: '100%'
  },
  indicator: {
    backgroundColor: colors.primary,
    height: '100%',
    transitionDuration: duration.fast,
    transitionProperty: 'width',
    transitionTimingFunction: easing.decelerate
  },
  label: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  value: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: fontLineHeight.body2,
    marginLeft: 'auto'
  }
})
