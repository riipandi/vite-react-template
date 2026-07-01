import * as stylex from '@stylexjs/stylex'
import { colorVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const fieldsetStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2]
  },
  legend: {
    color: colorVar.fgNeutral,
    marginBottom: spaceVar['1.5'],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.semibold
  }
})
