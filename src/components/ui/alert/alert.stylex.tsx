import * as stylex from '@stylexjs/stylex'
import { radius, space, fontSize, color } from '#/styles/tokens.stylex'

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
    borderColor: color.borderPrimaryFaded,
    borderLeftColor: color.bgPrimary,
    backgroundColor: color.bgPrimaryFaded,
    color: color.fgPrimary
  },
  success: {
    borderColor: color.borderPositiveFaded,
    borderLeftColor: color.fgPositive,
    backgroundColor: color.bgPositiveFaded,
    color: color.fgPositive
  },
  destructive: {
    borderColor: color.borderCriticalFaded,
    borderLeftColor: color.bgCritical,
    backgroundColor: color.bgCriticalFaded,
    color: color.fgCritical
  },
  warning: {
    borderColor: color.borderWarningFaded,
    borderLeftColor: color.fgWarning,
    backgroundColor: color.bgWarningFaded,
    color: color.fgWarning
  },
  subtle: {
    borderColor: color.borderNeutral,
    borderLeftColor: color.fgNeutralFaded,
    backgroundColor: color.bgPage,
    color: color.fgNeutralFaded
  }
})
