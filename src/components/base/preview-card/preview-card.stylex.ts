import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, shadowVar } from '#/styles/tokens.stylex'

export const previewCardStyles = stylex.create({
  root: {},
  trigger: {},
  positioner: {},
  popup: {
    color: colorVar.fgNeutral,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spaceVar[1],
    backgroundColor: colorVar.bgElevationOverlay,
    boxShadow: shadowVar.overlay,
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    padding: spaceVar[3],
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
      right: '-0.8125rem',
      transform: 'rotate(90deg)'
    },
    '[data-side=right]': {
      left: '-0.8125rem',
      transform: 'rotate(-90deg)'
    }
  }
})
