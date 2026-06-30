import * as stylex from '@stylexjs/stylex'
import { fontSize, fontWeight, radius, shadow, space, color } from '#/styles/tokens.stylex'

export const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.borderNeutral,
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
    outlineColor: color.bgPrimary,
    outlineOffset: '2px'
  },
  primary: {
    backgroundColor: {
      default: color.bgPrimary,
      ':hover': color.bgPrimary,
      ':active': color.bgPrimary
    },
    color: color.onPrimary,
    boxShadow: shadow.sm
  },
  secondary: {
    backgroundColor: {
      default: color.bgPage,
      ':hover': color.bgNeutralFaded,
      ':active': color.bgNeutralFaded
    },
    color: color.fgNeutral
  },
  destructive: {
    backgroundColor: {
      default: color.bgCritical,
      ':hover': color.bgCritical,
      ':active': color.bgCritical
    },
    color: color.onPrimary,
    boxShadow: shadow.sm
  },
  icon: {
    borderWidth: 0,
    padding: space[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: {
      default: color.fgNeutralFaded,
      ':hover': color.fgNeutralFaded,
      ':active': color.fgNeutralFaded
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': color.bgNeutralFaded,
      ':active': color.bgNeutralFaded
    }
  },
  disabled: {
    backgroundColor: {
      default: color.bgNeutralFaded,
      ':hover': color.bgNeutralFaded,
      ':active': color.bgNeutralFaded
    },
    color: color.fgNeutralFaded,
    borderColor: color.borderNeutral,
    cursor: 'not-allowed'
  },
  iconDisabled: {
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent',
      ':active': 'transparent'
    },
    color: color.fgDisabled
  }
})
