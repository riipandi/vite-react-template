import * as stylex from '@stylexjs/stylex'
import { space, fontSize } from '#/lib/constants.stylex'
import { fontFamily } from '#/styles/core/font.stylex'

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
    gap: space.s05,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  previous: {
    paddingLeft: space.s15
  },
  next: {
    paddingRight: space.s15
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
    fontSize: fontSize.sm,
    height: space.s8,
    justifyContent: 'center',
    width: space.s8
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
