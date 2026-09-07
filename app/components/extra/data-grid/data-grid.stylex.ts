import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { radius, stroke, unit } from '#/styles/core/tokens.stylex'

/**
 * Shared data-grid chrome: the container slot and the scroll-area viewport /
 * scrollbar pieces. Feature-specific styles live next to their components
 * (e.g. `data-grid-table.stylex.ts`, `data-grid-cell.stylex.ts`).
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
    transitionDuration: '150ms',
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
    backgroundColor: colors.borderNeutral,
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
    backgroundColor: colors.borderNeutral,
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
      borderColor: colors.backgroundPrimary,
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
      borderTopColor: colors.backgroundPrimary,
      borderTopStyle: 'solid',
      borderTopWidth: stroke.ring1
    }
  },
  edgeEnd: {
    '::before': {
      borderInlineEndColor: colors.backgroundPrimary,
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: stroke.ring1
    }
  },
  edgeBottom: {
    '::before': {
      borderBottomColor: colors.backgroundPrimary,
      borderBottomStyle: 'solid',
      borderBottomWidth: stroke.ring1
    }
  },
  edgeStart: {
    '::before': {
      borderInlineStartColor: colors.backgroundPrimary,
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
