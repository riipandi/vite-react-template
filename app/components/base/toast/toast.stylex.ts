import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { stroke, container } from '#/lib/constants.stylex'
import { colors, shadow } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { radius, zIndex } from '#/styles/core/size.stylex'

export const toastStyles = stylex.create({
  viewport: {
    bottom: space.s4,
    position: 'fixed',
    right: space.s4,
    width: container.md,
    zIndex: zIndex.fixed
  },
  root: {
    // Behind toasts peek out above the frontmost one, shrunk slightly; swipe
    // movement rides along via the Base UI-provided CSS variables.
    '--toast-gap': space.s2,
    alignItems: 'flex-start',
    backgroundColor: colors.popover,
    // Error toasts get a destructive accent; other types render neutrally
    // (matches sonner's default look — no per-type colors without opt-in).
    borderColor: { default: colors.border, '[data-type="error"]': colors.destructive },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    bottom: 0,
    boxShadow: shadow.lg,
    boxSizing: 'border-box',
    color: colors.popoverForeground,
    display: 'flex',
    fontFamily: fontFamily.body,
    // Behind-card content fades in when the stack expands (read by .content).
    '--toast-content-visible': { default: null, '[data-expanded]': '1' },
    // All toasts share the frontmost height while collapsed so the stack
    // reads as one card with edges peeking out.
    height: {
      default: 'var(--toast-frontmost-height)',
      '[data-expanded]': 'var(--toast-height)'
    },
    // [data-limited]: over the provider's limit — kept mounted, hidden by us.
    opacity: {
      default: 1,
      '[data-limited]': 0,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    overflow: 'hidden',
    padding: space.s4,
    position: 'absolute',
    right: 0,
    // Later conditions win at equal specificity: the closed pose overrides
    // the expanded/collapsed stack pose while entering or leaving.
    transform: {
      default: `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc(var(--toast-swipe-movement-y, 0px) + min(var(--toast-index), 10) * -1 * var(--toast-gap))) scale(calc(max(0.8, 1 - var(--toast-index) * 0.05)))`,
      '[data-expanded]': `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc(var(--toast-swipe-movement-y, 0px) - var(--toast-offset-y) - var(--toast-index) * var(--toast-gap)))`,
      '[data-starting-style]': `translateY(calc(100% + ${space.s4}))`,
      '[data-ending-style]': `translateY(calc(100% + ${space.s4}))`
    },
    transformOrigin: 'center bottom',
    transitionDuration: { default: duration.slow, '[data-swiping]': '0s' },
    transitionProperty: {
      default: 'transform, opacity, height',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate,
    width: '100%',
    zIndex: `calc(${zIndex.fixed} - var(--toast-index))`
  },
  content: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: space.s2,
    justifyContent: 'space-between',
    // Behind toasts hide their content so the collapsed stack shows only the
    // frontmost card's text; expanding reveals every card (custom property set
    // by rootExpanded).
    opacity: `var(--toast-content-visible, calc(max(0, 1 - var(--toast-index))))`,
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    width: '100%'
  },
  text: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.s1
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  action: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.accent
    },
    borderColor: colors.border,
    borderRadius: radius.small,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    height: space.s6,
    justifyContent: 'center',
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    paddingInline: space.s2
  },
  close: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.accent
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: colors.mutedForeground,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    height: space.s6,
    justifyContent: 'center',
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    padding: 0,
    width: space.s6
  }
})
