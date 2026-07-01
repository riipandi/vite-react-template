import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const popoverStyles = stylex.create({
  root: {},
  trigger: {},
  positioner: {},
  popup: {
    color: colorVar.fgNeutral,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spaceVar[2],
    backgroundColor: colorVar.bgElevationOverlay,
    boxShadow: shadowVar.overlay,
    borderRadius: radiusVar.sm,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    padding: spaceVar[4],
    outline: 'none',
    transitionProperty: 'transform, opacity',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease'
  },
  arrow: {
    position: 'absolute',
    zIndex: -1,
    '[data-side=bottom]': {
      top: '-0.5rem'
    },
    '[data-side=top]': {
      bottom: '-0.5rem',
      transform: 'rotate(180deg)'
    },
    '[data-side=left]': {
      right: '-0.75rem',
      transform: 'rotate(90deg)'
    },
    '[data-side=right]': {
      left: '-0.75rem',
      transform: 'rotate(-90deg)'
    }
  },
  title: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.semibold
  },
  description: {
    color: colorVar.fgNeutralFaded,
    marginBottom: spaceVar[2],
    fontSize: fontSizeVar.xs,
    lineHeight: 1.5
  }
})
