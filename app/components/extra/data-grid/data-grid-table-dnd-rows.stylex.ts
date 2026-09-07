import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { radius, stroke, unit } from '#/styles/core/tokens.stylex'

/** Draggable-rows chrome. */
export const dataGridTableDndRowsStyles = stylex.create({
  // The grip button: 28px, grab cursor, muted at rest.
  gripButton: {
    blockSize: unit.x7,
    cursor: 'grab',
    inlineSize: unit.x7,
    opacity: {
      default: 0.7,
      ':hover': 1,
      ':active': 1
    }
  },
  gripButtonActive: {
    cursor: 'grabbing'
  },
  gripDisabled: {
    cursor: 'not-allowed'
  },
  gripIcon: {
    blockSize: unit.x4,
    inlineSize: unit.x4
  },
  // Decoration / drop-indicator wrappers ride the ROW as the nearest
  // positioned ancestor, spanning the full width without adding a column.
  rowDecoration: {
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute'
  },
  dropIndicator: {
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 20
  },
  // Two solid pixels down the leading edge — the bar is the whole indicator.
  dropIndicatorBar: {
    backgroundColor: colors.backgroundPrimary,
    insetBlock: 0,
    insetInlineStart: 0,
    position: 'absolute',
    width: 2
  },
  // DragOverlay clone.
  overlayTable: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutralFaded,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    borderRadius: radius.medium,
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    pointerEvents: 'none'
  },
  overlayCell: {
    padding: 0,
    verticalAlign: 'middle'
  },
  overlayCellInner: {
    overflow: 'hidden',
    paddingInline: unit.x3,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // Dynamic drag state for the sortable tr.
  rowDrag: (state: { isDragging: boolean; transform: string | null }) => ({
    cursor: state.isDragging ? 'grabbing' : null,
    opacity: state.isDragging ? 0.4 : null,
    // Inset so the dashes sit inside the row box and cannot be clipped by
    // the neighbouring row's border.
    outlineColor: state.isDragging ? colors.borderNeutralFaded : null,
    outlineOffset: state.isDragging ? -1 : null,
    outlineStyle: state.isDragging ? 'dashed' : null,
    outlineWidth: state.isDragging ? 1 : null,
    position: 'relative',
    transform: state.transform,
    zIndex: state.isDragging ? 1 : 0
  })
})

/**
 * Row drag state for the sortable tr: transform from dnd-kit, and the
 * held-row treatment (dimmed, dashed inset outline) so the slot left behind
 * reads as the space being moved out of. dnd-kit's own transition is dropped:
 * a transform transition on a `tr` stops the transform applying at all in
 * Chrome, and displacement must land in one step anyway.
 */
export function dndRowDragStyle(isDragging: boolean, transform: string | undefined) {
  return dataGridTableDndRowsStyles.rowDrag({
    isDragging,
    transform: transform ?? null
  })
}
