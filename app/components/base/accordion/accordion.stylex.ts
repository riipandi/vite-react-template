import * as stylex from '@stylexjs/stylex'
import {
  space,
  fontSize,
  lineHeight,
  fontWeight,
  duration,
  easing,
  stroke
} from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const accordionStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    width: '100%'
  },
  item: {
    borderBottomColor: colors.border,
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
    borderRadius: radius.lg,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s4,
    justifyContent: 'space-between',
    lineHeight: lineHeight.control,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    // Read by the chevron below — StyleX has no child selectors, so the
    // trigger's [data-panel-open] state travels via a custom property.
    // No `default` here: StyleX emits it unlayered, beating the layered
    // [data-*] rule; the chevron's var() fallback covers the closed state.
    '--accordion-trigger-rotation': {
      default: null,
      '[data-panel-open]': '180deg'
    },
    paddingBlock: space.s25,
    paddingInline: 0,
    textAlign: 'left',
    textDecoration: { default: 'none', ':hover': 'underline' }
  },
  chevron: {
    color: colors.mutedForeground,
    flexShrink: 0,
    marginLeft: 'auto',
    marginTop: space.s05,
    pointerEvents: 'none',
    transform: 'rotate(var(--accordion-trigger-rotation, 0deg))',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'transform',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    transitionTimingFunction: easing.out
  },
  // Height transition through Base UI's measured --accordion-panel-height;
  // the starting/ending frames pin it to 0 so both open AND close animate
  // (a one-way keyframe would replay its open animation on close).
  panel: {
    fontSize: fontSize.sm,
    height: {
      default: 'var(--accordion-panel-height)',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    lineHeight: lineHeight.normal,
    overflow: 'hidden',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': '0s'
    },
    transitionProperty: 'height',
    transitionTimingFunction: easing.out
  },
  inner: {
    paddingBottom: space.s25
  }
})
