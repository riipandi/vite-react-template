import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'

export const separatorStyles = stylex.create({
  root: {
    backgroundColor: colors.border,
    flexShrink: 0
  }
})

export const separatorOrientations = stylex.create({
  horizontal: {
    height: stroke.border,
    width: '100%'
  },
  vertical: {
    alignSelf: 'stretch',
    width: stroke.border
  }
})
