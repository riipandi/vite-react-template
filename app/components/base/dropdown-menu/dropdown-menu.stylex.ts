import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const dropdownMenuStyles = stylex.create({
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
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.medium,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    maxHeight: 'var(--available-height)',
    minWidth: container.xs,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBlock: unit.x1,
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
    transitionTimingFunction: easing.decelerate,
    width: 'var(--anchor-width)'
  },
  // Submenus anchor to their trigger item — the anchor width is the item, not
  // the menu, so size to content instead.
  subPopup: {
    minWidth: container.xs,
    width: 'max-content'
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.backgroundNeutralFaded
    },
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.foregroundNeutral,
      '[data-disabled]': colors.foregroundNeutralFaded
    },
    cursor: 'default',
    display: 'flex',
    fontSize: fontSize.body2,
    gap: unit.x2,
    marginInline: unit.x1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    outline: 'none',
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2,
    userSelect: 'none'
  },
  // Submenu triggers also light up while their submenu is open.
  subTrigger: {
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.backgroundNeutralFaded,
      '[data-popup-open]': colors.backgroundNeutralFaded
    },
    color: {
      default: null,
      '[data-highlighted]': colors.foregroundNeutral,
      '[data-popup-open]': colors.foregroundNeutral,
      '[data-disabled]': colors.foregroundNeutralFaded
    }
  },
  itemInset: {
    paddingLeft: unit.x7
  },
  // Reserve room for the trailing check indicator (absolute, right-aligned).
  indicatorItem: {
    paddingRight: unit.x8,
    position: 'relative'
  },
  indicator: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x4,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    right: unit.x2,
    width: unit.x4
  },
  itemDestructive: {
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.backgroundCriticalHighlightedFaded
    },
    color: {
      default: colors.foregroundCritical,
      '[data-disabled]': colors.foregroundNeutralFaded
    }
  },
  subTriggerChevron: {
    color: colors.foregroundNeutralFaded,
    flexShrink: 0,
    marginLeft: 'auto'
  },
  shortcut: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  },
  separator: {
    backgroundColor: colors.borderNeutralFaded,
    height: stroke.border,
    marginBlock: unit.x1
  },
  label: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3
  }
})
