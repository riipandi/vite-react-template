import * as stylex from '@stylexjs/stylex'
import { fontFamily, fontSize } from '#/styles/core/font.stylex'
import { unit } from '#/styles/core/size.stylex'

export const paginationStyles = stylex.create({
  nav: {
    display: 'flex',
    fontFamily: fontFamily.body,
    justifyContent: 'center',
    marginInline: 'auto',
    width: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x0_5,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  previous: {
    paddingLeft: unit.x1_5
  },
  next: {
    paddingRight: unit.x1_5
  },
  linkText: {
    display: {
      default: 'none',
      '@media (min-width: 640px)': 'block'
    }
  },
  ellipsis: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    height: unit.x8,
    justifyContent: 'center',
    width: unit.x8
  },
  srOnly: {
    clip: 'rect(0 0 0 0)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
})
