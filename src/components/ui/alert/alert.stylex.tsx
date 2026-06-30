import * as stylex from '@stylexjs/stylex'
import { ui, radius, space, fontSize } from '#/styles/token.stylex'

export const alertStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderLeftWidth: 4,
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[4],
    paddingRight: space[4],
    fontSize: fontSize.sm,
    lineHeight: '1.5',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: '200ms'
  },
  info: {
    borderColor: ui.borderPrimaryFaded,
    borderLeftColor: ui.bgPrimary,
    backgroundColor: ui.bgPrimaryFaded,
    color: ui.fgPrimary
  },
  success: {
    borderColor: ui.borderPositiveFaded,
    borderLeftColor: ui.fgPositive,
    backgroundColor: ui.bgPositiveFaded,
    color: ui.fgPositive
  },
  destructive: {
    borderColor: ui.borderCriticalFaded,
    borderLeftColor: ui.bgCritical,
    backgroundColor: ui.bgCriticalFaded,
    color: ui.fgCritical
  },
  warning: {
    borderColor: ui.borderWarningFaded,
    borderLeftColor: ui.fgWarning,
    backgroundColor: ui.bgWarningFaded,
    color: ui.fgWarning
  },
  subtle: {
    borderColor: ui.border,
    borderLeftColor: ui.fgFaded,
    backgroundColor: ui.bg,
    color: ui.fgFaded
  }
})
