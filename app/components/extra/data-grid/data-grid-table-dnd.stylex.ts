import * as stylex from '@stylexjs/stylex'
import { unit } from '#/styles/core/tokens.stylex'

/**
 * Draggable-columns chrome. Drag geometry (transform/transition/opacity) is
 * applied through dynamic styles; the grip button and its hairline spacing
 * are static.
 */
export const dataGridTableDndStyles = stylex.create({
  headerControls: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x0_5,
    justifyContent: 'flex-start'
  },
  grip: {
    display: 'inline-flex',
    height: unit.x4,
    marginInlineStart: `calc(-1 * ${unit.x2})`,
    opacity: {
      default: 0.6,
      ':hover': 1
    },
    width: unit.x4
  },
  gripButton: (isDragging: boolean) => ({
    cursor: isDragging ? 'grabbing' : 'grab',
    height: unit.x6,
    marginInlineStart: `calc(-1 * ${unit.x2})`,
    width: unit.x6
  }),
  headerLabel: {
    flexGrow: 1
  },
  // Dynamic drag geometry for the sortable th/td.
  sortableCell: (style: {
    opacity: number
    transform: string | null
    transition: string | null
    isDragging: boolean
  }) => ({
    cursor: style.isDragging ? 'grabbing' : null,
    opacity: style.opacity,
    position: 'relative',
    transform: style.transform,
    transitionProperty: style.transition,
    zIndex: style.isDragging ? 1 : 0
  }),
  viewportDragging: {
    cursor: 'grabbing'
  }
})

/**
 * Applies the dnd-kit drag state to a sortable th/td. `width` stays on the
 * element's inline style (it rides the CSS-variable resize system).
 */
export function dndCellDragStyle(
  isDragging: boolean,
  transform: string | undefined,
  transition: string | undefined
) {
  return dataGridTableDndStyles.sortableCell({
    opacity: isDragging ? 0.8 : 1,
    transform: transform ?? null,
    transition: transition ?? null,
    isDragging
  })
}

export const dndGripCursorStyles = {
  dragging: dataGridTableDndStyles.gripButton(true),
  idle: dataGridTableDndStyles.gripButton(false)
}
