import * as stylex from '@stylexjs/stylex'
import { unit } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  wrapper: {
    width: '100%',
    maxWidth: '28rem'
  },
  header: {
    position: 'absolute',
    top: unit.x4,
    right: unit.x4,
    display: 'flex',
    alignItems: 'center',
    gap: unit.x2
  }
})
