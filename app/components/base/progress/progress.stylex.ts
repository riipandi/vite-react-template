import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

// Kept in sync with ../meter/meter.stylex.ts — intentional duplication
// so both components stay independently styled but visually identical.

export const progressStyles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamily.body,
    gap: unit.x3,
    width: '100%'
  },
  track: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.circular,
    display: 'flex',
    height: unit.x1,
    overflowX: 'hidden',
    position: 'relative',
    width: '100%'
  },
  indicator: {
    backgroundColor: colors.backgroundPrimary,
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
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: fontLineHeight.body2,
    marginLeft: 'auto'
  }
})
