import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { stroke, container } from '#/styles/core/size.stylex'
import { unit, radius, zIndex } from '#/styles/core/size.stylex'

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
    backgroundColor: colors.popover,
    borderRadius: radius.medium,
    color: colors.popoverForeground,
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
      '[data-highlighted]': colors.accent
    },
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.accentForeground,
      '[data-disabled]': colors.mutedForeground
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
      '[data-highlighted]': colors.accent,
      '[data-popup-open]': colors.accent
    },
    color: {
      default: null,
      '[data-highlighted]': colors.accentForeground,
      '[data-popup-open]': colors.accentForeground,
      '[data-disabled]': colors.mutedForeground
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
      '[data-highlighted]': `color-mix(in srgb, ${colors.destructive} 10%, transparent)`
    },
    color: {
      default: colors.destructive,
      '[data-disabled]': colors.mutedForeground
    }
  },
  subTriggerChevron: {
    color: colors.mutedForeground,
    flexShrink: 0,
    marginLeft: 'auto'
  },
  shortcut: {
    color: colors.mutedForeground,
    fontSize: fontSize.caption1,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: unit.x1
  },
  label: {
    color: colors.mutedForeground,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3
  }
})
