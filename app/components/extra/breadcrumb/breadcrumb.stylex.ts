import * as stylex from '@stylexjs/stylex'
import { space, fontSize, duration } from '#/lib/constants.stylex'
import { colors, font } from '#/lib/tokens.stylex'

export const breadcrumbStyles = stylex.create({
  list: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    gap: space.s15,
    listStyle: 'none',
    margin: 0,
    overflowWrap: 'break-word',
    padding: 0
  },
  item: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: space.s1
  },
  link: {
    color: {
      default: 'inherit',
      ':hover': colors.foreground
    },
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'color'
  },
  page: {
    color: colors.foreground
  },
  separator: {
    alignItems: 'center',
    display: 'flex'
  },
  ellipsis: {
    alignItems: 'center',
    display: 'flex',
    height: space.s5,
    justifyContent: 'center',
    width: space.s5
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
