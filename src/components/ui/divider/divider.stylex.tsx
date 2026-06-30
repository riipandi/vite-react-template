import * as stylex from '@stylexjs/stylex'
import { ui, fontSize, space } from '#/styles/token.stylex'

export const dividerStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: space[5],
    paddingBottom: space[5],
    color: ui.fgFaded,
    transitionProperty: 'color',
    transitionDuration: '200ms'
  },
  withLabel: {
    alignItems: 'center',
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: ui.fgFaded
  },
  before: {
    '::before': {
      content: '',
      display: 'block',
      flex: '1 1 0%',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: ui.border,
      transitionProperty: 'border-color',
      transitionDuration: '200ms'
    }
  },
  after: {
    '::after': {
      content: '',
      display: 'block',
      flex: '1 1 0%',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: ui.border,
      transitionProperty: 'border-color',
      transitionDuration: '200ms'
    }
  },
  labelBefore: {
    '::before': {
      marginRight: space[6]
    }
  },
  labelAfter: {
    '::after': {
      marginLeft: space[6]
    }
  }
})
