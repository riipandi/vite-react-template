import * as stylex from '@stylexjs/stylex'
import { colors, fontSize, fontWeight, radius, shadow, space } from '#/styles/token.stylex'

export const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[2],
    paddingBottom: space[2],
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionDuration: '150ms',
    outlineWidth: {
      default: 0,
      ':focus-visible': 2
    },
    outlineStyle: 'solid',
    outlineColor: colors.primary600,
    outlineOffset: '2px'
  },
  primary: {
    backgroundColor: {
      default: colors.primary600,
      ':hover': colors.primary700,
      ':active': colors.primary800
    },
    color: colors.white,
    boxShadow: shadow.sm
  },
  secondary: {
    backgroundColor: {
      default: colors.surface,
      ':hover': colors.surfaceHover,
      ':active': colors.zinc200
    },
    color: colors.zinc700
  },
  destructive: {
    backgroundColor: {
      default: colors.destructive600,
      ':hover': colors.destructive700,
      ':active': colors.destructive800
    },
    color: colors.white,
    boxShadow: shadow.sm
  },
  icon: {
    borderWidth: 0,
    padding: space[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: {
      default: colors.zinc500,
      ':hover': colors.zinc500,
      ':active': colors.zinc500
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceHover,
      ':active': colors.zinc200
    }
  },
  disabled: {
    backgroundColor: {
      default: colors.zinc100,
      ':hover': colors.zinc100,
      ':active': colors.zinc100
    },
    color: colors.zinc400,
    borderColor: colors.zinc200,
    cursor: 'not-allowed'
  },
  iconDisabled: {
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent',
      ':active': 'transparent'
    },
    color: colors.zinc300
  }
})
