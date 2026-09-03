import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const sliderHaloShadow = `0 0 0 ${stroke.halo} color-mix(in srgb, ${colors.foregroundPrimary} 50%, transparent)`

export const sliderStyles = stylex.create({
  control: {
    opacity: { default: 1, '[data-disabled]': 0.5 },
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    touchAction: 'none',
    userSelect: 'none'
  },
  controlDisabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  track: {
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.circular,
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none'
  },
  range: {
    backgroundColor: colors.backgroundPrimary,
    userSelect: 'none'
  },
  thumb: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.foregroundPrimary,
    borderRadius: radius.circular,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    boxShadow: {
      default: 'none',
      ':hover': sliderHaloShadow,
      ':focus-visible': sliderHaloShadow,
      ':active': sliderHaloShadow
    },
    flexShrink: 0,
    height: unit.x3,
    outline: 'none',
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'box-shadow',
    userSelect: 'none',
    width: unit.x3
  }
})

export const sliderRootOrientations = stylex.create({
  horizontal: {
    width: '100%'
  },
  vertical: {
    height: '100%',
    minHeight: container.xs
  }
})

export const sliderControlOrientations = stylex.create({
  horizontal: {
    width: '100%'
  },
  vertical: {
    flexDirection: 'column',
    height: '100%',
    minHeight: container.xs
  }
})

export const sliderTrackOrientations = stylex.create({
  horizontal: {
    height: unit.x1,
    width: '100%'
  },
  vertical: {
    height: '100%',
    width: unit.x1
  }
})

export const sliderRangeOrientations = stylex.create({
  horizontal: {
    height: '100%'
  },
  vertical: {
    width: '100%'
  }
})
