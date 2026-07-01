import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  shadowVar,
  fontSizeVar,
  fontWeightVar
} from '#/styles/tokens.stylex'

export const radioStyles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2]
  },
  groupLabel: {
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  root: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgElevationBase,
    boxShadow: shadowVar.raised,
    width: spaceVar[4],
    height: spaceVar[4],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.full,
    outline: 'none',
    transitionProperty: 'color,background-color,border-color',
    transitionDuration: '75ms',
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineOffset: '2px',
      outlineColor: colorVar.fgPrimary
    },
    ':hover': {
      borderColor: colorVar.borderPrimary
    },
    '[data-checked]': {
      backgroundColor: colorVar.bgPrimary,
      borderColor: colorVar.borderPrimary
    },
    '[data-disabled]': {
      // ans: pointerEvents not supported in StyleX 0.19
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  indicator: {
    backgroundColor: colorVar.onPrimary,
    width: spaceVar[2],
    height: spaceVar[2],
    borderRadius: radiusVar.full
  }
})
