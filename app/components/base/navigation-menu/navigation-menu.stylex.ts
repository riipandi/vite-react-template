import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { z, stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { radius } from '#/styles/core/size.stylex'

export const navigationMenuStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    justifyContent: 'center',
    maxWidth: 'max-content',
    position: 'relative'
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s1,
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: {
    position: 'relative'
  },
  trigger: {
    // Read by the chevron below — StyleX has no child selectors, so the
    // trigger's [data-popup-open] state travels via a custom property.
    // No `default` here: StyleX emits it unlayered, beating the layered
    // [data-*] rule; the chevron's var() fallback covers the closed state.
    '--navigation-menu-chevron-rotation': {
      default: null,
      '[data-popup-open]': '180deg'
    },
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-popup-open]': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    borderRadius: radius.large,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    height: space.s9,
    justifyContent: 'center',
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    paddingBlock: space.s15,
    paddingInline: space.s25,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, color',
    userSelect: 'none',
    width: 'max-content'
  },
  triggerChevron: {
    marginTop: '1px',
    transform: 'rotate(var(--navigation-menu-chevron-rotation, 0deg))',
    transitionDuration: duration.slow,
    transitionProperty: 'transform',
    transitionTimingFunction: easing.decelerate
  },
  content: {
    padding: space.s1
  },
  link: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-active]': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    borderRadius: radius.medium,
    color: colors.foreground,
    display: 'flex',
    fontSize: fontSize.body2,
    gap: space.s2,
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    padding: space.s2,
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color'
  },
  positioner: {
    height: 'var(--positioner-height)',
    maxWidth: 'var(--available-width)',
    transitionDuration: duration.slow,
    transitionProperty: {
      default: 'top, left, right, bottom',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    // Must match the popup's curve — positioner and popup move as one
    // surface during the trigger-to-trigger morph.
    transitionTimingFunction: easing.decelerate,
    width: 'var(--positioner-width)',
    zIndex: z.popup
  },
  popup: {
    backgroundColor: colors.popover,
    borderRadius: radius.large,
    color: colors.popoverForeground,
    height: 'var(--popup-height)',
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    position: 'relative',
    transform: {
      default: 'scale(1)',
      '[data-starting-style]': 'scale(0.97)',
      '[data-ending-style]': 'scale(0.97)'
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.slow,
    transitionProperty: {
      default: 'opacity, transform, width, height',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate,
    width: 'var(--popup-width)'
  },
  viewport: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  }
})
