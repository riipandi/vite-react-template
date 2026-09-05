import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

export const selectStyles = stylex.create({
  label: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3
  },
  separator: {
    backgroundColor: colors.borderNeutralFaded,
    height: stroke.ring1,
    marginBlock: unit.x1
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderColor: {
      default: colors.borderNeutralFaded,
      '[data-invalid]': colors.borderCritical
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x2,
    height: unit.x9,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.body2,
    minWidth: container.xs,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.ring1})`,
    paddingInline: unit.x3,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  icon: {
    color: colors.foregroundNeutralFaded,
    display: 'flex'
  },
  // Shared frames (positioner/shift/fade/pose) live in `popupFx`. The base
  // popup only fades out; the closed pose applies in anchored mode below.
  popup: {
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.medium,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    lineHeight: fontLineHeight.body2,
    maxHeight: 'var(--available-height)',
    opacity: { default: 1, '[data-ending-style]': 0 },
    width: 'var(--anchor-width)',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative'
  },
  // Closed pose (anchored mode only): the shrink + nudge rides `popupFx.pose`
  // and the `--popup-shift-*` custom properties from `popupFx.shift`.
  popupAnchored: {
    maxHeight: `min(${container.sm}, var(--available-height))`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    }
  },
  list: {
    paddingBlock: unit.x1
  },
  scrollArrow: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevationOverlay,
    color: colors.foregroundNeutralFaded,
    cursor: 'default',
    display: 'flex',
    height: unit.x4,
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
      '[data-highlighted]': colors.backgroundNeutralFaded
    },
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.foregroundNeutral,
      '[data-disabled]': colors.foregroundNeutralFaded
    },
    cursor: 'default',
    display: 'grid',
    fontSize: fontSize.body2,
    gap: unit.x2,
    gridTemplateColumns: `1fr ${unit.x4}`,
    marginInline: unit.x1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    outline: 'none',
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2,
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
