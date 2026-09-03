import * as stylex from '@stylexjs/stylex'
import { duration, easing } from '#/lib/constants.stylex'

export const collapsibleStyles = stylex.create({
  // Height transition through Base UI's measured --collapsible-panel-height;
  // the starting/ending frames pin it to 0 so both open AND close animate.
  panel: {
    height: {
      default: 'var(--collapsible-panel-height)',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    overflow: 'hidden',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': '0s'
    },
    transitionProperty: 'height',
    transitionTimingFunction: easing.out
  }
})
