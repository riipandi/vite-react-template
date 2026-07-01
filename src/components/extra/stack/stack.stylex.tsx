import * as stylex from '@stylexjs/stylex'
import { spaceVar } from '#/styles/tokens.stylex'

export const stackStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2]
    // ans: `flexWrap: 'wrap'` not supported in StyleX 0.19
    // ans: compound selector `*:data-[slot=separator]:-my-2` not supported in StyleX
  }
})

export const stackDirections = stylex.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  }
})

export const stackSpacings = stylex.create({
  none: {
    gap: spaceVar[0]
  },
  sm: {
    gap: spaceVar['1.5']
  },
  md: {
    gap: spaceVar[3]
  },
  lg: {
    gap: '1.125rem'
  }
})
