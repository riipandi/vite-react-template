import * as stylex from '@stylexjs/stylex'
import { colorVar, spaceVar, fontSizeVar } from '#/styles/tokens.stylex'

export const labelStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    fontSize: fontSizeVar.sm,
    cursor: 'pointer'
    // ans: :has() selector for disabled state not supported in StyleX
    // ans: complex child selector [&_p[data-slot=text]]:not-first:mt-0 not supported
  }
})
