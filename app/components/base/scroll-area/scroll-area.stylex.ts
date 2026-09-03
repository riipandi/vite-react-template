import * as stylex from '@stylexjs/stylex'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export const scrollAreaStyles = stylex.create({
  root: {
    position: 'relative'
  },
  viewport: {
    borderRadius: 'inherit',
    height: '100%',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    width: '100%'
  },
  // Overlay scrollbar: hidden at rest, fades in while hovering or scrolling.
  // The delay only applies to the fade-out, so appearing is immediate but
  // disappearing waits a beat after the pointer leaves.
  scrollbar: {
    display: 'flex',
    opacity: {
      default: 0,
      '[data-hovering]': 1,
      '[data-scrolling]': 1
    },
    padding: stroke.border,
    touchAction: 'none',
    transitionDelay: {
      default: duration.slow,
      '[data-hovering]': '0s',
      '[data-scrolling]': '0s'
    },
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    userSelect: 'none'
  },
  thumb: {
    backgroundColor: colors.border,
    borderRadius: radius.full,
    flex: 1,
    position: 'relative'
  }
})

export const scrollAreaScrollbarOrientations = stylex.create({
  vertical: {
    height: '100%',
    width: space.s25
  },
  horizontal: {
    flexDirection: 'column',
    height: space.s25
  }
})
