import * as stylex from '@stylexjs/stylex'
import { spaceVar } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  wrapper: {
    width: '100%',
    maxWidth: '28rem'
  },
  header: {
    position: 'absolute',
    top: spaceVar[4],
    right: spaceVar[4],
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
  }
})
