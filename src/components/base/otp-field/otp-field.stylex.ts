import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontWeightVar,
  fontSizeVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const otpFieldStyles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
  },
  input: {
    color: colorVar.fgNeutral,
    boxShadow: shadowVar.raised,
    borderRadius: radiusVar.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutralFaded,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: fontWeightVar.medium,
    outline: 'none',
    ':focus': {
      outlineColor: colorVar.bgPrimary,
      outlineWidth: 2,
      outlineOffset: -1,
      outlineStyle: 'solid'
    },
    '::placeholder': {
      color: colorVar.fgNeutralFaded,
      opacity: 0.8
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    },
    '[data-complete]': {
      borderColor: colorVar.borderPrimary
    }
  },
  separator: {
    color: colorVar.fgNeutralFaded,
    backgroundColor: 'transparent'
  }
})

export const otpFieldSizes = stylex.create({
  sm: {
    height: spaceVar[9],
    width: spaceVar[10],
    fontSize: fontSizeVar.md
  },
  md: {
    height: spaceVar[10],
    width: spaceVar[12],
    fontSize: fontSizeVar.lg
  },
  lg: {
    height: spaceVar[12],
    width: spaceVar[14],
    fontSize: fontSizeVar['2xl']
  },
  xl: {
    height: spaceVar[14],
    width: spaceVar[16],
    fontSize: fontSizeVar['2xl']
  }
})
