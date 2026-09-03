import * as stylex from '@stylexjs/stylex'

export const aspectRatioStyles = stylex.create({
  root: {
    position: 'relative',
    width: '100%'
  }
})

export const aspectRatioRatios = stylex.create({
  ratio: (value: number) => ({ aspectRatio: value })
})
