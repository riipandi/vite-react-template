import * as stylex from '@stylexjs/stylex'
import { colorVar, fontSizeVar } from '#/styles/tokens.stylex'

export const separatorStyles = stylex.create({
  base: {
    backgroundColor: colorVar.borderNeutralFaded
  },
  label: {
    color: colorVar.fgNeutralFaded,
    backgroundColor: colorVar.bgPage,
    position: 'relative',
    zIndex: 10,
    fontSize: fontSizeVar.sm,
    whiteSpace: 'nowrap'
  }
})

export const separatorOrientations = stylex.create({
  horizontal: {
    height: '1px',
    width: '100%'
  },
  vertical: {
    width: '1px',
    minHeight: '1.125rem'
  }
})
