import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { stroke, container } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { radius, zIndex } from '#/styles/core/size.stylex'

export const selectStyles = stylex.create({
  label: {
    color: colors.mutedForeground,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: space.s15,
    paddingInline: space.s3
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: space.s1
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: { default: colors.input, '[data-invalid]': colors.destructive },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: space.s2,
    height: space.s9,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.body2,
    minWidth: container.xs,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingInline: space.s3,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  icon: {
    color: colors.mutedForeground,
    display: 'flex'
  },
  positioner: {
    outline: 'none',
    zIndex: zIndex.absolute
  },
  popup: {
    backgroundColor: colors.popover,
    borderRadius: radius.medium,
    color: colors.popoverForeground,
    fontFamily: fontFamily.body,
    lineHeight: fontLineHeight.body2,
    maxHeight: 'var(--available-height)',
    opacity: { default: 1, '[data-ending-style]': 0 },
    width: 'var(--anchor-width)',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate
  },
  // Closed pose (anchored mode only — [data-side] sets the nudge direction,
  // [data-starting-style]/[data-ending-style] apply it).
  popupAnchored: {
    // No `default` for conditional custom properties: StyleX emits the
    // default rule unlayered (beating the layered [data-*] rules); the
    // var() fallback covers the unset case instead.
    '--popup-shift-x': {
      default: null,
      '[data-side="left"]': space.s2,
      '[data-side="right"]': `calc(-1 * ${space.s2})`,
      '[data-side="inline-start"]': space.s2,
      '[data-side="inline-end"]': `calc(-1 * ${space.s2})`
    },
    '--popup-shift-y': {
      default: null,
      '[data-side="top"]': space.s2,
      '[data-side="bottom"]': `calc(-1 * ${space.s2})`
    },
    maxHeight: `min(${container.sm}, var(--available-height))`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    transform: {
      default: 'scale(1)',
      '[data-starting-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)',
      '[data-ending-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)'
    }
  },
  list: {
    paddingBlock: space.s1
  },
  scrollArrow: {
    alignItems: 'center',
    backgroundColor: colors.popover,
    color: colors.mutedForeground,
    cursor: 'default',
    display: 'flex',
    height: space.s4,
    justifyContent: 'center',
    position: 'sticky',
    width: '100%',
    zIndex: 1
  },
  scrollArrowUp: {
    top: 0
  },
  scrollArrowDown: {
    bottom: 0
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.accent
    },
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.accentForeground,
      '[data-disabled]': colors.mutedForeground
    },
    cursor: 'default',
    display: 'grid',
    fontSize: fontSize.body2,
    gap: space.s2,
    gridTemplateColumns: `1fr ${space.s4}`,
    marginInline: space.s1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    outline: 'none',
    paddingBlock: space.s15,
    paddingInline: space.s2,
    userSelect: 'none'
  },
  itemIndicator: {
    alignItems: 'center',
    display: 'flex',
    gridColumnStart: 2,
    justifyContent: 'center'
  },
  itemText: {
    gridColumnStart: 1
  }
})
