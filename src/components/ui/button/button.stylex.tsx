import * as stylex from '@stylexjs/stylex'
import { ui, fontSize, fontWeight, radius, shadow, space } from '#/styles/token.stylex'

export const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: ui.border,
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
    outlineColor: ui.bgPrimary,
    outlineOffset: '2px'
  },
  primary: {
    backgroundColor: {
      default: ui.bgPrimary,
      ':hover': ui.bgPrimary,
      ':active': ui.bgPrimary
    },
    color: ui.onPrimary,
    boxShadow: shadow.sm
  },
  secondary: {
    backgroundColor: {
      default: ui.bg,
      ':hover': ui.bgNeutralFaded,
      ':active': ui.bgNeutralFaded
    },
    color: ui.fg
  },
  destructive: {
    backgroundColor: {
      default: ui.bgCritical,
      ':hover': ui.bgCritical,
      ':active': ui.bgCritical
    },
    color: ui.onPrimary,
    boxShadow: shadow.sm
  },
  icon: {
    borderWidth: 0,
    padding: space[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: {
      default: ui.fgFaded,
      ':hover': ui.fgFaded,
      ':active': ui.fgFaded
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': ui.bgNeutralFaded,
      ':active': ui.bgNeutralFaded
    }
  },
  disabled: {
    backgroundColor: {
      default: ui.bgNeutralFaded,
      ':hover': ui.bgNeutralFaded,
      ':active': ui.bgNeutralFaded
    },
    color: ui.fgFaded,
    borderColor: ui.border,
    cursor: 'not-allowed'
  },
  iconDisabled: {
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent',
      ':active': 'transparent'
    },
    color: ui.fgDisabled
  }
})
