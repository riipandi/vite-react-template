import * as stylex from '@stylexjs/stylex'
import { ui, fontSize, fontWeight, space } from '#/styles/token.stylex'

export const labelStyles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    margin: 0,
    paddingLeft: space[3],
    cursor: 'default',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: ui.fgFaded
  }
})

export const descriptionStyles = stylex.create({
  base: {
    margin: 0,
    fontSize: fontSize.sm,
    color: ui.fgFaded,
    paddingLeft: space[3]
  }
})

export const fieldErrorStyles = stylex.create({
  base: {
    margin: 0,
    paddingLeft: space[3],
    paddingTop: 0,
    fontSize: fontSize.xs,
    color: ui.fgCritical,
    lineHeight: 1.25
  }
})
