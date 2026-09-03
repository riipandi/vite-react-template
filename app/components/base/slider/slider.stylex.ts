import * as stylex from '@stylexjs/stylex'
import { space, duration, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export const sliderHaloShadow = `0 0 0 ${stroke.halo} color-mix(in srgb, ${colors.ring} 50%, transparent)`

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
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none'
  },
  range: {
    backgroundColor: colors.primary,
    userSelect: 'none'
  },
  thumb: {
    backgroundColor: colors.background,
    borderColor: colors.ring,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    boxShadow: {
      default: 'none',
      ':hover': sliderHaloShadow,
      ':focus-visible': sliderHaloShadow,
      ':active': sliderHaloShadow
    },
    flexShrink: 0,
    height: space.s3,
    outline: 'none',
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'box-shadow',
    userSelect: 'none',
    width: space.s3
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
    height: space.s1,
    width: '100%'
  },
  vertical: {
    height: '100%',
    width: space.s1
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
