import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import {
  fontFamily,
  fontSize,
  fontLineHeight,
  fontWeight,
  radius,
  stroke,
  unit
} from '#/styles/core/tokens.stylex'

/**
 * Column header, column filter and column visibility chrome. The filter and
 * visibility styles are small enough to share this file: they render inside
 * the same header cells and popups as the header trigger.
 *
 * the source's per-theme radius lists collapse to the project radius token.
 */
export const dataGridColumnHeaderStyles = stylex.create({
  // "-ms-2 flex h-full items-center justify-between gap-1.5" — the negative
  // inline start margin eats the header cell's padding so the trigger aligns
  // with the cell text.
  controlsRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1_5,
    height: '100%',
    justifyContent: 'space-between',
    marginInlineStart: `calc(-1 * ${unit.x2})`
  },
  sortRow: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    marginInlineStart: `calc(-1 * ${unit.x2})`
  },
  // The ghost trigger: muted at rest, full foreground on hover/open, with
  // the source's `bg-secondary` hover tint (muted background, stronger than the
  // ghost variant's default faded hover). Values go through color-mix so a
  // themed variable can ride a conditional key (raw defineVar values under a
  // conditional produce broken CSS in stylex 0.19).
  triggerButton: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.backgroundNeutral} 100%, transparent)`,
      '[data-popup-open]': `color-mix(in srgb, ${colors.backgroundNeutral} 100%, transparent)`
    },
    borderRadius: radius.medium,
    color: {
      default: `color-mix(in srgb, ${colors.foregroundNeutral} 80%, transparent)`,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.foregroundNeutral} 100%, transparent)`,
      '[data-popup-open]': `color-mix(in srgb, ${colors.foregroundNeutral} 100%, transparent)`
    },
    fontSize: fontSize.body2,
    fontWeight: fontWeight.regular,
    height: unit.x6,
    lineHeight: fontLineHeight.body2,
    paddingInline: unit.x2
  },
  // Plain label variant.
  label: {
    alignItems: 'center',
    color: `color-mix(in srgb, ${colors.foregroundNeutral} 80%, transparent)`,
    display: 'inline-flex',
    fontSize: '0.8125rem',
    fontWeight: fontWeight.regular,
    gap: unit.x1_5,
    height: '100%',
    lineHeight: 1.3846
  },
  // Consumer-provided icon node: the source sized svg descendants via a
  // [&_svg] rule, which StyleX cannot express — the wrapper keeps the
  // muted opacity and alignment; callers own the size.
  labelIcon: {
    alignItems: 'center',
    display: 'inline-flex',
    opacity: 0.6
  },
  // Sort indicator icon: 13px, nudged down 1px while idle.
  sortIcon: { flexShrink: 0, height: 13, width: 13 },
  sortIconIdle: { marginBlockStart: 1 },
  menuIcon: { flexShrink: 0, height: 14, width: 14 },
  menuCheckIcon: {
    color: colors.foregroundPrimary,
    height: unit.x4,
    opacity: 1,
    width: unit.x4
  },
  menuItemLabel: { flexGrow: 1 },
  menuContent: { width: 160 },
  capitalize: { textTransform: 'capitalize' },
  unpinButton: { marginInlineEnd: `calc(-1 * ${unit.x1})` },
  unpinIcon: { height: 14, opacity: 0.5, width: 14 }
})

export const dataGridColumnFilterStyles = stylex.create({
  triggerIcon: { flexShrink: 0, height: unit.x4, width: unit.x4 },
  countBadge: {
    display: {
      default: 'inline-flex',
      '@media (min-width: 1280px)': 'none'
    },
    fontWeight: fontWeight.regular,
    paddingInline: unit.x1
  },
  badgeList: {
    display: {
      default: 'none',
      '@media (min-width: 1280px)': 'flex'
    },
    gap: unit.x1
  },
  verticalSeparator: { height: unit.x4, marginInline: unit.x2 },
  content: { padding: 0, width: 200 },
  searchArea: { padding: unit.x2 },
  searchInput: { height: unit.x8 },
  optionsScroll: { maxHeight: 300, overflowY: 'auto' },
  empty: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    paddingBlock: unit.x6,
    textAlign: 'center'
  },
  listArea: { padding: unit.x1 },
  optionRow: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': `color-mix(in srgb, ${colors.backgroundNeutralHighlightedFaded} 100%, transparent)`,
      ':focus-visible': `color-mix(in srgb, ${colors.backgroundNeutralHighlightedFaded} 100%, transparent)`
    },
    // Native <button> reset: the rows are real buttons (keyboard + a11y for
    // free) styled back to the row look.
    appearance: 'none',
    borderColor: 'transparent',
    borderStyle: 'none',
    borderWidth: 0,
    fontFamily: 'inherit',
    borderRadius: radius.small,
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'flex',
    fontSize: fontSize.body2,
    gap: unit.x2,
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2,
    position: 'relative',
    textAlign: 'start',
    userSelect: 'none',
    width: '100%'
  },
  clearRow: { justifyContent: 'center' },
  optionBox: {
    alignItems: 'center',
    borderColor: colors.borderPrimary,
    borderRadius: radius.small,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    display: 'flex',
    flexShrink: 0,
    height: unit.x4,
    justifyContent: 'center',
    width: unit.x4
  },
  optionBoxSelected: {
    backgroundColor: colors.backgroundPrimary,
    color: colors.onBackgroundPrimary
  },
  optionBoxUnchecked: { opacity: 0.5 },
  optionCheckIcon: { height: unit.x4, width: unit.x4 },
  iconHidden: { visibility: 'hidden' },
  optionIcon: {
    color: colors.foregroundNeutralFaded,
    flexShrink: 0,
    height: unit.x4,
    width: unit.x4
  },
  facetCount: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.caption1,
    height: unit.x4,
    justifyContent: 'center',
    marginInlineStart: 'auto',
    width: unit.x4
  },
  divider: {
    backgroundColor: colors.borderNeutralFaded,
    height: stroke.ring1,
    marginBlock: unit.x1,
    marginInline: `calc(-1 * ${unit.x1})`
  }
})

export const dataGridColumnVisibilityStyles = stylex.create({
  content: { minWidth: 150 },
  item: { textTransform: 'capitalize' }
})
