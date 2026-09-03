import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight, duration, easing } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const meterStyles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: font.sans,
    gap: space.s3,
    width: '100%'
  },
  track: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    display: 'flex',
    height: space.s1,
    overflowX: 'hidden',
    position: 'relative',
    width: '100%'
  },
  indicator: {
    backgroundColor: colors.primary,
    height: '100%',
    transitionDuration: duration.fast,
    transitionProperty: 'width',
    transitionTimingFunction: easing.out
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.control
  },
  value: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: lineHeight.control,
    marginLeft: 'auto'
  }
})
