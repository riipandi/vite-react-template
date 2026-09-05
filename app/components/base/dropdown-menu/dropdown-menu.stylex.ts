import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'

export const dropdownMenuStyles = stylex.create({
  // Closed pose (Base UI's [data-starting-style]/[data-ending-style] frames):
  // faded, slightly shrunk, nudged toward the anchor. [data-side] sets the
  // nudge direction; the transition animates entry and exit through it.
  // Shared frames live in `popupFx` (positioner/shift/fade/pose).
  popup: {
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.medium,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    maxHeight: 'var(--available-height)',
    minWidth: container.xxsmall,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBlock: unit.x1,
    width: 'var(--anchor-width)'
  },
  // Submenus anchor to their trigger item — the anchor width is the item, not
  // the menu, so size to content instead.
  subPopup: {
    minWidth: container.xxsmall,
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
    height: stroke.ring1,
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
