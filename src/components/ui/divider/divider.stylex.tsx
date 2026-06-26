import * as stylex from '@stylexjs/stylex'
import { colors, fontSize, space } from '#/styles/token.stylex'

export const dividerStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: space[5],
    paddingBottom: space[5],
    color: colors.zinc500,
    transitionProperty: 'color',
    transitionDuration: '200ms'
  },
  withLabel: {
    alignItems: 'center',
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.zinc500
  },
  before: {
    '::before': {
      content: '',
      display: 'block',
      flex: '1 1 0%',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: colors.zinc200,
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
      borderTopColor: colors.zinc200,
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
