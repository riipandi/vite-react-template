import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontSize } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit } from '#/styles/core/size.stylex'

export const breadcrumbStyles = stylex.create({
  list: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x1_5,
    listStyle: 'none',
    margin: 0,
    overflowWrap: 'break-word',
    padding: 0
  },
  item: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: unit.x1
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
    height: unit.x5,
    justifyContent: 'center',
    width: unit.x5
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
