import * as stylex from '@stylexjs/stylex'
import { space } from '#/styles/tokens.stylex'

export const containerStyles = stylex.create({
  base: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '80rem',
    paddingLeft: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    },
    paddingRight: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    },
    paddingTop: {
      default: space[6],
      '@media (min-width: 640px)': space[8],
      '@media (min-width: 1024px)': space[10]
    },
    paddingBottom: {
      default: space[8],
      '@media (min-width: 640px)': space[10],
      '@media (min-width: 1024px)': space[12]
    }
  },
  fluid: {
    marginLeft: 0,
    marginRight: 0,
    maxWidth: 'none',
    paddingLeft: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[10]
    },
    paddingRight: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[10]
    },
    paddingTop: {
      default: space[6],
      '@media (min-width: 640px)': space[8],
      '@media (min-width: 1024px)': space[10]
    },
    paddingBottom: {
      default: space[8],
      '@media (min-width: 640px)': space[10],
      '@media (min-width: 1024px)': space[12]
    }
  }
})
