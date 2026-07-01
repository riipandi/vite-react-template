import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, shadowVar } from '#/styles/tokens.stylex'

export const tooltipStyles = stylex.create({
  provider: {},
  root: {},
  trigger: {},
  portal: {},
  positioner: {
    zIndex: 50
  },
  content: {
    width: 'fit-content',
    backgroundColor: colorVar.bgNeutral,
    color: colorVar.onBgNeutral,
    borderRadius: radiusVar.sm,
    paddingInline: spaceVar[3],
    paddingTop: spaceVar['1.5'],
    paddingBottom: spaceVar['1.5'],
    fontSize: fontSizeVar.xs,
    boxShadow: shadowVar.md
    // ans: textWrap not supported in StyleX 0.19
  },
  arrow: {
    zIndex: 50,
    position: 'relative',
    color: colorVar.bgNeutral,
    '[data-side=bottom]': {
      top: '-0.5rem'
    },
    '[data-side=top]': {
      bottom: '-0.5rem',
      transform: 'rotate(180deg)'
    },
    '[data-side=left]': {
      right: '-0.8125rem',
      transform: 'rotate(90deg)'
    },
    '[data-side=right]': {
      left: '-0.8125rem',
      transform: 'rotate(-90deg)'
    }
  },
  arrowBackground: {},
  arrowStroke: {}
})
