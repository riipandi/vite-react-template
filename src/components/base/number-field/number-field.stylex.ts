import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, shadowVar, fontSizeVar } from '#/styles/tokens.stylex'

export const numberFieldStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spaceVar[2],
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  scrubArea: {
    cursor: 'ew-resize'
  },
  group: {
    display: 'flex',
    height: spaceVar[9],
    borderRadius: radiusVar.sm,
    ':focus-within': {
      outlineColor: colorVar.borderPrimary,
      outlineWidth: 2,
      outlineStyle: 'solid'
    }
  },
  decrement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spaceVar[9],
    height: spaceVar[9],
    backgroundColor: 'transparent',
    color: colorVar.fgNeutral,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '100ms',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':first-child': {
      // ans: borderTopLeftRadius not supported in StyleX 0.19
      // ans: borderBottomLeftRadius not supported in StyleX 0.19
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  increment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spaceVar[9],
    height: spaceVar[9],
    backgroundColor: 'transparent',
    color: colorVar.fgNeutral,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '100ms',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':last-child': {
      // ans: borderTopRightRadius not supported in StyleX 0.19
      // ans: borderBottomRightRadius not supported in StyleX 0.19
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  input: {
    zIndex: 10,
    width: spaceVar[16],
    paddingInline: spaceVar[2],
    textAlign: 'center',
    fontSize: fontSizeVar.xs,
    outline: 'none',
    color: colorVar.fgNeutral,
    transitionProperty: 'all',
    transitionDuration: '100ms',
    // ans: ::placeholder pseudo-element not supported in StyleX
    ':disabled': {
      // ans: pointerEvents not supported in StyleX 0.19
      opacity: 0.7
    }
  }
})

export const numberFieldVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase,
    boxShadow: shadowVar.raised,
    outlineWidth: 1,
    outlineStyle: 'solid',
    outlineColor: colorVar.borderNeutral
  },
  ghost: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  }
})
