import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

export const accordionStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    width: '100%'
  },
  item: {
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomStyle: { default: 'solid', ':last-child': 'none' },
    borderBottomWidth: { default: stroke.border, ':last-child': 0 }
  },
  header: {
    display: 'flex',
    margin: 0
  },
  trigger: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: radius.large,
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x4,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.foregroundPrimary}`
    },
    // Read by the chevron below — StyleX has no child selectors, so the
    // trigger's [data-panel-open] state travels via a custom property.
    // No `default` here: StyleX emits it unlayered, beating the layered
    // [data-*] rule; the chevron's var() fallback covers the closed state.
    '--accordion-trigger-rotation': {
      default: null,
      '[data-panel-open]': '180deg'
    },
    paddingBlock: unit.x2,
    paddingInline: 0,
    textAlign: 'left',
    textDecoration: { default: 'none', ':hover': 'underline' }
  },
  chevron: {
    color: colors.foregroundNeutralFaded,
    flexShrink: 0,
    marginLeft: 'auto',
    marginTop: unit.x0_5,
    pointerEvents: 'none',
    transform: 'rotate(var(--accordion-trigger-rotation, 0deg))',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'transform',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    transitionTimingFunction: easing.decelerate
  },
  // Height transition through Base UI's measured --accordion-panel-height;
  // the starting/ending frames pin it to 0 so both open AND close animate
  // (a one-way keyframe would replay its open animation on close).
  panel: {
    fontSize: fontSize.body2,
    height: {
      default: 'var(--accordion-panel-height)',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    lineHeight: fontLineHeight.body2,
    overflow: 'hidden',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': '0s'
    },
    transitionProperty: 'height',
    transitionTimingFunction: easing.decelerate
  },
  inner: {
    paddingBottom: unit.x1
  }
})
