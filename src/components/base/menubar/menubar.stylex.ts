import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar } from '#/styles/tokens.stylex'

export const menubarStyles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[1],
    padding: spaceVar[1],
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgPage
  }
})

export const menubarSizes = stylex.create({
  default: {
    padding: spaceVar[1]
  },
  compact: {
    padding: spaceVar[0.5]
  }
})
