import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar } from '#/styles/tokens.stylex'

export const scrollAreaStyles = stylex.create({
  root: {
    overflow: 'hidden'
  },
  viewport: {
    width: '100%',
    height: '100%',
    // ans: overscrollBehavior not supported in StyleX 0.19
    outline: 'none'
  },
  scrollbar: {
    margin: spaceVar[1],
    display: 'flex',
    // ans: touchAction not supported in StyleX 0.19
    overflow: 'visible',
    userSelect: 'none',
    // ans: pointerEvents not supported in StyleX 0.19
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '300ms',
    // ans: transitionDelay not supported in StyleX 0.19
    '[data-hovering]': {
      opacity: 1,
      // ans: transitionDelay not supported in StyleX 0.19
      // ans: pointerEvents not supported in StyleX 0.19
      transitionDuration: '75ms'
    },
    '[data-scrolling]': {
      opacity: 1,
      // ans: transitionDelay not supported in StyleX 0.19
      // ans: pointerEvents not supported in StyleX 0.19
      transitionDuration: '75ms'
    }
  },
  thumb: {
    backgroundColor: colorVar.bgNeutralFaded,
    width: '100%',
    cursor: 'default',
    borderRadius: radiusVar.full,
    ':hover': {
      backgroundColor: colorVar.bgNeutral
    },
    ':active': {
      cursor: 'default'
    },
    transitionProperty: 'all',
    transitionDuration: '75ms',
    transitionTimingFunction: 'ease-out'
  }
})

export const scrollAreaOrientations = stylex.create({
  horizontal: {
    height: spaceVar['1.5'],
    justifyContent: 'flex-start'
  },
  vertical: {
    width: spaceVar['1.5'],
    justifyContent: 'center'
  }
})
