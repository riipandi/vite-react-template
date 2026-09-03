import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const tooltipStyles = stylex.create({
  positioner: {
    outline: 'none',
    zIndex: zIndex.absolute
  },
  // Closed pose (Base UI's [data-starting-style]/[data-ending-style] frames):
  // faded, slightly shrunk, nudged toward the anchor. [data-side] sets the
  // nudge direction; the transition animates entry and exit through it.
  popup: {
    // No `default` for conditional custom properties: StyleX emits the
    // default rule unlayered (beating the layered [data-*] rules); the
    // var() fallback covers the unset case instead.
    '--popup-shift-x': {
      default: null,
      '[data-side="left"]': unit.x2,
      '[data-side="right"]': `calc(-1 * ${unit.x2})`,
      '[data-side="inline-start"]': unit.x2,
      '[data-side="inline-end"]': `calc(-1 * ${unit.x2})`
    },
    '--popup-shift-y': {
      default: null,
      '[data-side="top"]': unit.x2,
      '[data-side="bottom"]': `calc(-1 * ${unit.x2})`
    },
    backgroundColor: colors.foregroundNeutral,
    borderRadius: radius.small,
    color: colors.backgroundPage,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    maxWidth: container.sm,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3,
    transform: {
      default: 'scale(1)',
      '[data-starting-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)',
      '[data-ending-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)'
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate
  },
  // A rotated square, half tucked under the popup; Base UI positions it along
  // the anchor axis, we offset the cross axis per [data-side] — the rotated
  // corner peeks out just enough to bridge the default 4px sideOffset gap.
  arrow: {
    backgroundColor: colors.foregroundNeutral,
    bottom: { default: null, '[data-side="top"]': `calc(-1 * ${unit.x0_5})` },
    height: unit.x3,
    left: {
      default: null,
      '[data-side="right"]': `calc(-1 * ${unit.x0_5})`,
      '[data-side="inline-end"]': `calc(-1 * ${unit.x0_5})`
    },
    position: 'absolute',
    right: {
      default: null,
      '[data-side="left"]': `calc(-1 * ${unit.x0_5})`,
      '[data-side="inline-start"]': `calc(-1 * ${unit.x0_5})`
    },
    top: { default: null, '[data-side="bottom"]': `calc(-1 * ${unit.x0_5})` },
    transform: 'rotate(45deg)',
    width: unit.x3
  }
})
