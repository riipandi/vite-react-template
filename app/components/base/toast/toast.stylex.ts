import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const toastStyles = stylex.create({
  viewport: {
    bottom: unit.x4,
    position: 'fixed',
    right: unit.x4,
    width: container.md,
    zIndex: zIndex.fixed
  },
  root: {
    // Behind toasts peek out above the frontmost one, shrunk slightly; swipe
    // movement rides along via the Base UI-provided CSS variables.
    '--toast-gap': unit.x2,
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundElevationOverlay,
    // Error toasts get a critical accent; other types render neutrally
    // (matches sonner's default look — no per-type colors without opt-in).
    borderColor: {
      default: colors.borderNeutralFaded,
      '[data-type="error"]': colors.borderCritical
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    bottom: 0,
    boxShadow: shadow.overlay,
    boxSizing: 'border-box',
    color: colors.foregroundNeutral,
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
    padding: unit.x4,
    position: 'absolute',
    right: 0,
    // Later conditions win at equal specificity: the closed pose overrides
    // the expanded/collapsed stack pose while entering or leaving.
    transform: {
      default: `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc(var(--toast-swipe-movement-y, 0px) + min(var(--toast-index), 10) * -1 * var(--toast-gap))) scale(calc(max(0.8, 1 - var(--toast-index) * 0.05)))`,
      '[data-expanded]': `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc(var(--toast-swipe-movement-y, 0px) - var(--toast-offset-y) - var(--toast-index) * var(--toast-gap)))`,
      '[data-starting-style]': `translateY(calc(100% + ${unit.x4}))`,
      '[data-ending-style]': `translateY(calc(100% + ${unit.x4}))`
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
    gap: unit.x2,
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
    gap: unit.x1
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  description: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  action: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralFaded
    },
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.small,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    height: unit.x6,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    paddingInline: unit.x2
  },
  close: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralFaded
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: colors.foregroundNeutralFaded,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    height: unit.x6,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    padding: 0,
    width: unit.x6
  }
})
