import * as stylex from '@stylexjs/stylex'
import { fontSize, fontWeight, space, color } from '#/styles/tokens.stylex'

export const labelStyles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    margin: 0,
    paddingLeft: space[3],
    cursor: 'default',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: color.fgNeutralFaded
  }
})

export const descriptionStyles = stylex.create({
  base: {
    margin: 0,
    fontSize: fontSize.sm,
    color: color.fgNeutralFaded,
    paddingLeft: space[3]
  }
})

export const fieldErrorStyles = stylex.create({
  base: {
    margin: 0,
    paddingLeft: space[3],
    paddingTop: 0,
    fontSize: fontSize.xs,
    color: color.fgCritical,
    lineHeight: 1.25
  }
})
