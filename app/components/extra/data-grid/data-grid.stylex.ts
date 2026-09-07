import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import {
  duration,
  fontFamily,
  fontSize,
  fontLineHeight,
  fontWeight,
  radius,
  stroke,
  unit
} from '#/styles/core/tokens.stylex'

/**
 * Shared data-grid chrome: the container slot, the scroll-area viewport /
 * scrollbar pieces, the cell-selection feature chrome (selection tints,
 * fill-drag outline, built-in cell editor, bulk selection bar), and the
 * column header / filter / visibility chrome. Table-renderer styles live in
 * `data-grid-table.stylex.ts`.
 */
export const dataGridStyles = stylex.create({
  container: {
    // relative: anchors floating chrome composed inside the container,
    // like the fill-drag preview outline.
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  }
})

/**
 * Base UI ScrollArea chrome for the grid viewports. Scrollbars track the
 * design system: 8px horizontal / 6px vertical tracks, each losing 1px to
 * the transparent edge border plus 2px to padding, so thumbs land at 5px
 * and 3px. Shrink further and the thumb stops being a grab target.
 */
export const dataGridScrollAreaStyles = stylex.create({
  root: {
    position: 'relative'
  },
  viewport: {
    height: '100%',
    width: '100%'
  },
  scrollbar: {
    display: 'flex',
    padding: unit.x0_5,
    touchAction: 'none',
    transitionProperty: 'color, background-color, border-color',
    transitionDuration: duration.fast,
    userSelect: 'none'
  },
  scrollbarHorizontal: {
    flexDirection: 'column',
    height: unit.x2
  },
  scrollbarVertical: {
    height: '100%',
    width: unit.x1_5
  },
  thumb: {
    backgroundColor: colors.borderNeutralFaded,
    borderRadius: radius.full,
    flex: 1,
    position: 'relative'
  },
  // Overlay scrollbar for sticky-header grids; the metric custom properties
  // (`--data-grid-scrollbar-*`) are written imperatively on this element.
  overlay: {
    insetInlineEnd: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 'var(--data-grid-scrollbar-header-height)',
    zIndex: 20,
    height: 'var(--data-grid-scrollbar-track-height)'
  },
  overlayTrack: {
    height: '100%',
    padding: unit.x0_5,
    pointerEvents: 'auto',
    position: 'relative',
    touchAction: 'none',
    width: unit.x1_5
  },
  overlayThumb: {
    backgroundColor: colors.borderNeutralFaded,
    borderRadius: radius.full,
    insetInlineEnd: unit.x0_5,
    position: 'absolute',
    top: 'var(--data-grid-scrollbar-thumb-top)',
    width: unit.x1_5,
    height: 'var(--data-grid-scrollbar-thumb-height)'
  }
})

/**
 * Selection chrome for a body td in cell-selection mode, replacing the source's
 * `dataGridCellSelectionCellClasses` Tailwind string. States are applied as
 * conditional stylex.props arguments computed in React (selected, focused,
 * edges, pinned) instead of data-attribute selectors.
 *
 * Every selection line is one layout-free ::before overlay per cell. It
 * reaches 1px BEYOND the cell so each line paints exactly ON the shared
 * gridline it replaces: the range perimeter and the interior dividers share
 * this geometry, so where they meet they coincide instead of stacking into a
 * wider edge, every side stays exactly 1px, and selecting never adds real
 * borders that shift layout. At the table's own boundary there is no shared
 * gridline and the overshoot leaves the scrollable content box, where it is
 * CLIPPED - so every overshoot that can hit a boundary goes through a custom
 * property (`--data-grid-overlay-*`) that the boundary cells zero out via the
 * clamp styles below.
 */
export const dataGridCellSelectionStyles = stylex.create({
  cell: {
    position: 'relative',
    userSelect: 'none'
  },
  // A light tint: the selection must read as a range without drowning the
  // gridlines under a heavy fill. The focused cell stays unfilled. Pinned
  // cells must stay OPAQUE (they hide scrolled content), so they get the
  // tint pre-mixed over the background, and the focused pinned cell keeps
  // a solid background instead of turning transparent.
  selected: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundPrimary} 4%, transparent)`
  },
  selectedPinned: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundPrimary} 4%, ${colors.backgroundPage})`
  },
  focused: {
    backgroundColor: 'transparent'
  },
  focusedPinned: {
    backgroundColor: colors.backgroundPage
  },
  // Tint only: the dashed region outline is one overlay element drawn by
  // the fill session, so neighboring target cells never double their edges.
  fillTarget: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundPrimary} 4%, transparent)`
  },
  fillTargetPinned: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundPrimary} 4%, ${colors.backgroundPage})`
  },
  // The overlay: one absolute ::before per cell, primary by default. Every
  // side's WIDTH starts at 0 — Tailwind's preflight zeroes border widths
  // globally, which StyleX cannot assume, and an unstyled side would fall
  // back to `medium` (3px) instead of resting unpainted.
  beforeOverlay: {
    '::before': {
      borderBottomWidth: 0,
      borderInlineEndWidth: 0,
      borderInlineStartWidth: 0,
      borderTopWidth: 0,
      borderStyle: 'solid',
      borderColor: colors.foregroundPrimary,
      bottom: 'var(--data-grid-overlay-bottom, -1px)',
      boxSizing: 'border-box',
      content: '""',
      insetInlineEnd: 'var(--data-grid-overlay-end, -1px)',
      insetInlineStart: 'var(--data-grid-overlay-start, -1px)',
      pointerEvents: 'none',
      position: 'absolute',
      top: 'var(--data-grid-overlay-top, -1px)'
    }
  },
  // Interior dividers: selected cells repaint their own end and bottom
  // gridlines on the overlay, so gridline-less grids still divide a range.
  // The gray color applies only when the side does NOT belong to the range
  // perimeter (guarded by the edge styles below), so a side that belongs to
  // the range perimeter deterministically stays primary.
  dividerEnd: {
    '::before': {
      borderInlineEndColor: colors.borderNeutralFaded,
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: stroke.ring1
    }
  },
  dividerBottom: {
    '::before': {
      borderBottomColor: colors.borderNeutralFaded,
      borderBottomStyle: 'solid',
      borderBottomWidth: stroke.ring1
    }
  },
  // The Sheets model: a single selected cell IS its own range, so the four
  // edge styles draw its full primary box; inside a larger range the anchor
  // reads by its unfilled background alone. The explicit ring only covers a
  // focused cell with no selection at all. Edge styles also re-state the
  // primary color so an edge side deterministically beats the gray interior
  // divider (the merge order puts edges after dividers).
  edgeTop: {
    '::before': {
      borderTopColor: colors.foregroundPrimary,
      borderTopStyle: 'solid',
      borderTopWidth: stroke.ring1
    }
  },
  edgeEnd: {
    '::before': {
      borderInlineEndColor: colors.foregroundPrimary,
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: stroke.ring1
    }
  },
  edgeBottom: {
    '::before': {
      borderBottomColor: colors.foregroundPrimary,
      borderBottomStyle: 'solid',
      borderBottomWidth: stroke.ring1
    }
  },
  edgeStart: {
    '::before': {
      borderInlineStartColor: colors.foregroundPrimary,
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: stroke.ring1
    }
  },
  focusedRing: {
    '::before': {
      borderBottomWidth: stroke.ring1,
      borderInlineEndWidth: stroke.ring1,
      borderInlineStartWidth: stroke.ring1,
      borderTopWidth: stroke.ring1
    }
  },
  // Boundary clamps: zero the overshoot where the overlay would be clipped
  // outside the scrollable content (first/last column, first/last row) or
  // would double against a pinned-column divider.
  clampStart: {
    '--data-grid-overlay-start': '0px'
  },
  clampEnd: {
    '--data-grid-overlay-end': '0px'
  },
  clampTop: {
    '--data-grid-overlay-top': '0px'
  },
  clampBottom: {
    '--data-grid-overlay-bottom': '0px'
  }
})

/**
 * Compiled class name for the imperatively toggled fill-drag preview tint
 * (`data-cell-fill-target` is written outside React). The imperative code
 * adds/removes this class plus `dataGridFillTargetPinnedClassName` on the
 * preview cells, mirroring the source's `data-[cell-fill-target]:bg-primary/4`
 * and its pinned variant.
 */
export const dataGridFillTargetClassName =
  stylex.props(dataGridCellSelectionStyles.fillTarget).className ?? ''

export const dataGridFillTargetPinnedClassName =
  stylex.props(dataGridCellSelectionStyles.fillTargetPinned).className ?? ''

/**
 * Cell-selection feature chrome: the pieces rendered by the feature itself —
 * the fill-drag preview outline, the built-in cell editor overlay, and the
 * bulk selection bar. State-driven selection styles live in the shared
 * `dataGridCellSelectionStyles` above.
 */
export const dataGridCellSelectionFeatureStyles = stylex.create({
  // The fill drag's feedback: ONE dashed border (the Sheets fill marquee)
  // around the whole pending region - the source PLUS the extension - so the
  // drag reads as one growing region, never as a second box glued under the
  // source. While the session runs the viewport carries data-cell-filling and
  // the source cells' own selection chrome rests (see globals.css), so this
  // element is the only painter and nothing can double at the junction.
  // zIndex 35: above the sticky pinned cells (zIndex 30) so the border
  // survives crossing a pinned column; below the sticky header (zIndex 40).
  gestureOutline: {
    outlineColor: colors.foregroundPrimary,
    outlineOffset: `-${stroke.ring1}`,
    outlineStyle: 'dashed',
    outlineWidth: stroke.ring1,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 35
  }
})

/** Measured geometry of the focused cell for the editor overlay. */
export interface DataGridCellEditorMetrics {
  left: number
  top: number
  width: number
  minHeight: number
  fontFamily: string
  fontSize: string
  fontWeight: string
  fontStyle: string
  lineHeight: string
  letterSpacing: string
  textAlign: string
  paddingLeft: string
  paddingRight: string
  paddingTop: number
  paddingBottom: number
}

/**
 * The built-in free-text editor: a portal into the body viewport, positioned
 * flush over the focused cell with the cell's own font, alignment and
 * padding, so the text keeps its exact place - the Sheets model. The
 * `textarea` control grows downward over the rows below as the text wraps.
 * Primary outline at the same 1px weight as the focused cell's box: with the
 * overlay covering that box, opening the editor reads as the same border
 * becoming editable. zIndex 35 (see gestureOutline).
 */
export const dataGridCellEditorStyles = stylex.create({
  editor: (m: DataGridCellEditorMetrics) => ({
    backgroundColor: colors.backgroundPage,
    boxSizing: 'border-box',
    color: colors.foregroundNeutral,
    left: m.left,
    minHeight: m.minHeight,
    outlineColor: colors.foregroundPrimary,
    outlineOffset: `-${stroke.ring1}`,
    outlineStyle: 'solid',
    outlineWidth: stroke.ring1,
    position: 'absolute',
    resize: 'none',
    top: m.top,
    width: m.width,
    zIndex: 35,
    fontFamily: m.fontFamily,
    fontSize: m.fontSize,
    fontStyle: m.fontStyle,
    fontWeight: m.fontWeight,
    letterSpacing: m.letterSpacing,
    lineHeight: m.lineHeight,
    // Computed-style values; the cast only satisfies the CSS union type.
    textAlign: m.textAlign as 'left',
    paddingTop: m.paddingTop,
    paddingBottom: m.paddingBottom,
    paddingLeft: m.paddingLeft,
    paddingRight: m.paddingRight
  })
})

/**
 * Floating bulk-edit toolbar, the Google Sheets way: auto width, centered,
 * elevated, and sticky to the viewport bottom with breathing room, so bulk
 * actions stay reachable while the grid scrolls.
 */
export const dataGridSelectionBarStyles = stylex.create({
  bar: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1,
    borderInlineStartColor: colors.borderNeutralFaded,
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: stroke.ring1,
    borderInlineEndColor: colors.borderNeutralFaded,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: stroke.ring1,
    borderStyle: 'solid',
    borderTopColor: colors.borderNeutralFaded,
    borderTopWidth: stroke.ring1,
    borderRadius: radius.large,
    bottom: unit.x4,
    boxShadow: shadow.raised,
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x3,
    insetInline: 0,
    marginInline: 'auto',
    // unit.x8 (32px) breathing room each side: 1rem from the source's
    // max-width clamp, split across both edges.
    maxWidth: `calc(100% - ${unit.x8})`,
    paddingBlock: unit.x2,
    paddingInline: unit.x4,
    position: 'sticky',
    zIndex: 40
  },
  label: {
    color: colors.foregroundNeutral,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: unit.x2,
    justifyContent: 'flex-end'
  }
})

/**
 * Compiled class name for the imperative fill-drag preview outline (the
 * preview element is created outside React, in `startDataGridFillSession`),
 * so it receives the compiled StyleX class directly.
 */
export const dataGridGestureOutlineClassName =
  stylex.props(dataGridCellSelectionFeatureStyles.gestureOutline).className ?? ''

/**
 * Column header, column filter and column visibility chrome. The filter and
 * visibility styles are small enough to share this section: they render
 * inside the same header cells and popups as the header trigger.
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
    fontSize: fontSize.body2,
    fontWeight: fontWeight.regular,
    gap: unit.x1_5,
    height: '100%',
    lineHeight: fontLineHeight.body2
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
    // Unchecked border matches the base Checkbox (borderNeutralFaded), not
    // the source's always-primary outline.
    borderColor: colors.borderNeutralFaded,
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
    borderColor: colors.backgroundPrimary,
    color: colors.onBrand
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
