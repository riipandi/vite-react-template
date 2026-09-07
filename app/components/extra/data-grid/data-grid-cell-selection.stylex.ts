import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { radius, stroke, unit } from '#/styles/core/tokens.stylex'

/**
 * Cell-selection feature chrome. State-driven styles live in the shared
 * `dataGridCellSelectionStyles` (data-grid.stylex.ts); this file owns the
 * pieces rendered by the feature itself: the fill-drag preview outline, the
 * built-in cell editor overlay, and the bulk selection bar.
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
    outlineColor: colors.backgroundPrimary,
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
    outlineColor: colors.backgroundPrimary,
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
    maxWidth: 'calc(100% - 2rem)',
    paddingBlock: '10px',
    paddingInline: unit.x4,
    position: 'sticky',
    zIndex: 40
  },
  label: {
    color: colors.foregroundNeutral,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem'
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'flex-end'
  }
})

/**
 * Compiled class names for imperative writers. The fill-drag preview outline
 * is a DOM element created outside React (`startDataGridFillSession`), so it
 * receives the compiled StyleX class directly.
 */
export const dataGridGestureOutlineClassName =
  stylex.props(dataGridCellSelectionFeatureStyles.gestureOutline).className ?? ''
