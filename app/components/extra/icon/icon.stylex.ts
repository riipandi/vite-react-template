import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

/**
 * Icon styles — ported from Reshaped's Icon utility
 * (reshaped.so/docs/utilities/icon) and adapted to StyleX + local tokens.
 */
export const iconStyles = stylex.create({
  // Center svg in a squared bounding box so a row of icons stays aligned.
  root: {
    alignItems: 'center',
    aspectRatio: '1',
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    transitionProperty: 'color',
    transitionDuration: duration.fast,
    transitionTimingFunction: easing.decelerate,
    verticalAlign: 'middle'
  },
  // Keep only the vertical bounding box and use the svg asset's own width.
  auto: {
    aspectRatio: 'auto',
    justifyContent: 'flex-start',
    width: 'auto'
  },
  // Dynamic height; width follows through the square aspect ratio.
  size: (value: string) => ({ height: value })
})

/** Foreground token presets for the `color` prop. */
export const iconColors = stylex.create({
  neutral: { color: colors.foregroundNeutral },
  neutralFaded: { color: colors.foregroundNeutralFaded },
  primary: { color: colors.foregroundPrimary },
  positive: { color: colors.foregroundPositive },
  warning: { color: colors.foregroundWarning },
  critical: { color: colors.foregroundCritical },
  disabled: { color: colors.foregroundDisabled }
})
