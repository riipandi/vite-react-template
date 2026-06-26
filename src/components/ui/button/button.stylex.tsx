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
    outlineWidth: 0,
    outlineStyle: 'solid',
    outlineColor: colors.primary600,
    outlineOffset: '2px',
    ':focus-visible': {
      outlineWidth: 2
    }
  },
  primary: {
    backgroundColor: colors.primary600,
    color: colors.white,
    boxShadow: shadow.sm,
    ':hover': {
      backgroundColor: colors.primary700
    },
    ':active': {
      backgroundColor: colors.primary800
    }
  },
  secondary: {
    backgroundColor: colors.surface,
    color: colors.zinc700,
    ':hover': {
      backgroundColor: colors.surfaceHover
    },
    ':active': {
      backgroundColor: colors.zinc200
    }
  },
  destructive: {
    backgroundColor: colors.destructive600,
    color: colors.white,
    boxShadow: shadow.sm,
    ':hover': {
      backgroundColor: colors.destructive700
    },
    ':active': {
      backgroundColor: colors.destructive800
    }
  },
  icon: {
    borderWidth: 0,
    padding: space[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.zinc500,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: colors.surfaceHover
    },
    ':active': {
      backgroundColor: colors.zinc200
    }
  },
  disabled: {
    backgroundColor: colors.zinc100,
    color: colors.zinc400,
    borderColor: colors.zinc200,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: colors.zinc100
    },
    ':active': {
      backgroundColor: colors.zinc100
    }
  },
  iconDisabled: {
    backgroundColor: 'transparent',
    color: colors.zinc300,
    ':hover': {
      backgroundColor: 'transparent'
    },
    ':active': {
      backgroundColor: 'transparent'
    }
  }
})
