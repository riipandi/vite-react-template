import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  shadowVar,
  fontSizeVar,
  fontWeightVar
} from '#/styles/tokens.stylex'

export const checkboxStyles = stylex.create({
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
    flexShrink: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.xs,
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
      cursor: 'not-allowed',
      opacity: 0.5
    }
  },
  indicator: {
    display: 'flex',
    color: colorVar.onPrimary,
    '[data-unchecked]': {
      display: 'none'
    }
  }
})
