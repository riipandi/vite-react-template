import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { radius, unit } from '#/styles/core/size.stylex'

export const scrollAreaStyles = {
  // -------------------------------------------------------------------------
  // Height scale
  // -------------------------------------------------------------------------

  heights: stylex.create({
    1: { height: unit.x4 },
    2: { height: unit.x8 },
    3: { height: unit.x12 },
    4: { height: unit.x16 },
    5: { height: unit.x20 },
    full: { height: '100%' }
  }),

  maxHeights: stylex.create({
    1: { maxHeight: unit.x4 },
    2: { maxHeight: unit.x8 },
    3: { maxHeight: unit.x12 },
    4: { maxHeight: unit.x16 },
    5: { maxHeight: unit.x20 }
  }),

  // -------------------------------------------------------------------------
  // Viewport
  // -------------------------------------------------------------------------

  viewport: stylex.create({
    base: {
      boxSizing: 'border-box',
      height: '100%',
      overflow: 'auto',
      scrollbarWidth: 'none',
      outline: 'none',
      boxShadow: {
        default: 'none',
        ':focus-visible': `0 0 0 2px ${colors.backgroundPage}, 0 0 0 4px ${colors.borderPrimary}`
      }
    },
    overscrollAuto: {
      overscrollBehavior: 'auto'
    },
    overscrollContain: {
      overscrollBehavior: 'contain'
    },
    overscrollNone: {
      overscrollBehavior: 'none'
    },
    fade: {
      maskImage:
        'linear-gradient(to bottom, transparent 0, black min(2.5rem, var(--scroll-area-overflow-y-start)), black calc(100% - min(2.5rem, var(--scroll-area-overflow-y-end, 2.5rem))), transparent 100%)',
      maskRepeat: 'no-repeat'
    }
  }),

  // -------------------------------------------------------------------------
  // Content
  // -------------------------------------------------------------------------

  content: stylex.create({
    root: {
      boxSizing: 'border-box',
      display: 'block'
    }
  }),

  // -------------------------------------------------------------------------
  // Scrollbar
  // -------------------------------------------------------------------------

  scrollbar: stylex.create({
    root: {
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box',
      borderRadius: radius.circular,
      backgroundColor: colors.borderNeutralFaded,
      opacity: 0,
      pointerEvents: 'none',
      transitionProperty: 'opacity',
      transitionDuration: duration.fast,
      transitionTimingFunction: easing.standard
    },
    vertical: {
      width: unit.x2,
      marginBlock: unit.x1,
      marginInlineEnd: unit.x1
    },
    horizontal: {
      height: unit.x2,
      marginBlock: unit.x1,
      marginInline: unit.x1
    },
    visible: {
      opacity: 1,
      pointerEvents: 'auto'
    },
    scrolling: {
      transitionDuration: '0ms'
    }
  }),

  // -------------------------------------------------------------------------
  // Thumb
  // -------------------------------------------------------------------------

  thumb: stylex.create({
    root: {
      boxSizing: 'border-box',
      borderRadius: radius.circular,
      backgroundColor: colors.foregroundNeutralFaded
    },
    vertical: {
      width: '100%',
      minHeight: '2rem'
    },
    horizontal: {
      height: '100%',
      minWidth: '2rem'
    }
  }),

  // -------------------------------------------------------------------------
  // Corner
  // -------------------------------------------------------------------------

  corner: stylex.create({
    root: {
      backgroundColor: colors.backgroundNeutralFaded
    }
  })
}
