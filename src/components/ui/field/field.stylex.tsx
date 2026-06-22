import * as stylex from '@stylexjs/stylex'
import { colors, fontSize, fontWeight, space } from '#/styles/token.stylex'

export const labelStyles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    margin: 0,
    paddingLeft: space[3],
    cursor: 'default',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: colors.zinc500
  }
})

export const descriptionStyles = stylex.create({
  base: {
    margin: 0,
    fontSize: fontSize.sm,
    color: colors.zinc600,
    paddingLeft: space[3]
  }
})

export const fieldErrorStyles = stylex.create({
  base: {
    margin: 0,
    paddingLeft: space[3],
    paddingTop: 0,
    fontSize: fontSize.xs,
    color: colors.destructive600,
    lineHeight: 1.25
  }
})
