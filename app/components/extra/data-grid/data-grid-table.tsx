import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { flexRender, Subscribe } from '@tanstack/react-table'
import type { Cell, Column, Header, Row } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { Fragment, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  Ref,
  RefObject
} from 'react'
import { Button } from '#/components/base/button'
import { Checkbox } from '#/components/base/checkbox'
import { Spinner } from '#/components/extra/spinner'
import { getDataGridCellSelectionCellAttrs, toDataGridDomId, useDataGrid } from './data-grid'
import type { DataGridFeatures, DataGridRowStatus, DataGridTableInstance } from './data-grid'
import { dataGridTableViewportStyles, dataGridTableStyles as s } from './data-grid-table.stylex'
import { dataGridCellSelectionStyles } from './data-grid.stylex'

type DataGridCellSelectionAttrs = ReturnType<typeof getDataGridCellSelectionCellAttrs>

/**
 * StyleX counterpart of the source's `dataGridCellSelectionCellClasses` Tailwind
 * string: selection chrome for a body td, applied as conditional
 * stylex.props arguments. All inputs are React-known (the cell selection
 * attrs plus geometry flags), so no data-attribute selectors are needed
 * except the imperative fill/edit states, which live in globals.css.
 */
function cellSelectionChromeProps(
  selection: DataGridCellSelectionAttrs | null,
  geometry: {
    isFirstColumn: boolean
    isLastColumn: boolean
    isFirstRow: boolean
    isLastRow: boolean
    nextPinned: boolean
    prevPinned: boolean
    nextIsFillCell: boolean
  }
) {
  if (!selection) return []
  const chrome = dataGridCellSelectionStyles
  const selected = !!selection['data-cell-selected']
  const focused = !!selection['data-cell-focused']
  const pinned = !!selection['data-pinned' as keyof typeof selection]
  // Boundary clamps: first/last column, first/last row, and cells adjacent
  // to a pinned column or the resize filler strip (all React-known).
  const clampEnd = geometry.isLastColumn || geometry.nextPinned || geometry.nextIsFillCell
  const clampStart = geometry.isFirstColumn || geometry.prevPinned
  return [
    chrome.cell,
    chrome.beforeOverlay,
    selected && chrome.selected,
    selected && pinned && chrome.selectedPinned,
    focused && chrome.focused,
    focused && pinned && chrome.focusedPinned,
    // Interior dividers: end + bottom gridlines repaint gray unless the side
    // belongs to the range perimeter (the edge styles below win the merge).
    selected && chrome.dividerEnd,
    selected && chrome.dividerBottom,
    // The Sheets model: edge attributes draw the full primary box of a
    // single-cell range; focusedRing covers a focused cell with no selection.
    !!selection['data-cell-edge-top'] && chrome.edgeTop,
    !!selection['data-cell-edge-right'] && chrome.edgeEnd,
    !!selection['data-cell-edge-bottom'] && chrome.edgeBottom,
    !!selection['data-cell-edge-left'] && chrome.edgeStart,
    focused && !selected && chrome.focusedRing,
    geometry.isFirstRow && chrome.clampTop,
    geometry.isLastRow && chrome.clampBottom,
    clampStart && chrome.clampStart,
    clampEnd && chrome.clampEnd
  ]
}

// Static spacing lookups replaced by the dense data attribute on the cell.
function getDataGridTreeIndentStyle<TData extends object>(
  row: Row<DataGridFeatures, TData>,
  indent: number = 20
): CSSProperties {
  return {
    '--data-grid-tree-padding': `${row.depth * indent}px`
  } as CSSProperties
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  ;(ref as { current: T | null }).current = value
}

/**
 * Nearest scroll-area viewport that belongs to THIS grid. A viewport outside
 * the grid's own container (e.g. a page-level ScrollArea) would make the
 * width measurement - and the virtualizer - bind the wrong box.
 */
function getDataGridScrollAreaViewport(node: HTMLElement): HTMLElement | null {
  const scrollViewport = node.closest('[data-slot="scroll-area-viewport"]') as HTMLElement | null

  if (!scrollViewport) return null

  const gridContainer = node.closest('[data-slot="data-grid"]')
  if (gridContainer && !gridContainer.contains(scrollViewport)) return null

  return scrollViewport
}

type DataGridResizeStartEvent = ReactMouseEvent<HTMLElement> | ReactTouchEvent<HTMLElement>

type DataGridResizeDocumentEvent = globalThis.MouseEvent | globalThis.TouchEvent

function isDataGridTouchEvent(
  event: DataGridResizeStartEvent | DataGridResizeDocumentEvent
): event is ReactTouchEvent<HTMLElement> | globalThis.TouchEvent {
  return 'touches' in event
}

interface DataGridTouchListLike {
  length: number
  item: (index: number) => { identifier: number; clientX: number } | null
}

function findTouchClientX(list: DataGridTouchListLike, identifier: number) {
  for (let i = 0; i < list.length; i++) {
    const touch = list.item(i)
    if (touch && touch.identifier === identifier) return touch.clientX
  }

  return undefined
}

function getDataGridResizeEventClientX(
  event: DataGridResizeStartEvent | DataGridResizeDocumentEvent,
  touchIdentifier?: number
) {
  if (isDataGridTouchEvent(event)) {
    if (typeof touchIdentifier === 'number') {
      return (
        findTouchClientX(event.touches, touchIdentifier) ??
        findTouchClientX(event.changedTouches, touchIdentifier)
      )
    }

    return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX
  }

  return event.clientX
}

function startDataGridColumnResizeOnEnd<TData extends object>(
  event: DataGridResizeStartEvent,
  header: Header<DataGridFeatures, TData, unknown>,
  table: DataGridTableInstance<TData>,
  /**
   * Live mode: per-move width updates go straight to the table element's
   * `--col/--header` variables, so cells track the pointer with ZERO React
   * renders; state is written twice per drag (start marker, release commit)
   * instead of per mousemove - which re-renders the consumer's whole tree.
   */
  live = false
): (() => void) | undefined {
  const column = table.getColumn(header.column.id)

  if (!column || !column.getCanResize()) return
  const isTouchSession = isDataGridTouchEvent(event)
  if (isTouchSession && event.touches.length > 1) return

  event.persist?.()

  const ownerDocument = event.currentTarget.ownerDocument
  const ownerWindow = ownerDocument.defaultView
  const previousBodyCursor = ownerDocument.body.style.cursor
  const previousDocumentCursor = ownerDocument.documentElement.style.cursor
  const startSize = header.getSize()
  // Track the initiating finger so a second touch cannot move or commit the
  // resize with the wrong clientX.
  const touchIdentifier = isTouchSession ? event.touches[0]?.identifier : undefined
  const dragStartClientX = getDataGridResizeEventClientX(event, touchIdentifier)
  const headerCell = event.currentTarget.closest('th')
  const headerRect = headerCell?.getBoundingClientRect()
  const liveTableElement = live ? headerCell?.closest('table') : null
  // An end-pinned column is anchored at its end edge and grows from its
  // START edge, so its whole resize geometry runs mirrored, exactly like
  // RTL: the anchor is the opposite edge and the drag direction inverts.
  const resizeRtl =
    (table.options.columnResizeDirection === 'rtl') !== (column.getIsPinned() === 'end')
  const startOffset =
    headerRect && Number.isFinite(resizeRtl ? headerRect.left : headerRect.right)
      ? resizeRtl
        ? headerRect.left
        : headerRect.right
      : dragStartClientX

  if (typeof dragStartClientX !== 'number' || typeof startOffset !== 'number') {
    return
  }

  ownerDocument.body.style.cursor = 'col-resize'
  ownerDocument.documentElement.style.cursor = 'col-resize'

  const columnSizingStart = header
    .getLeafHeaders()
    .map((leafHeader) => [leafHeader.column.id, leafHeader.column.getSize()] as [string, number])
  const directionMultiplier = resizeRtl ? -1 : 1

  // Clamp the drag to the leaf columns' min/max sizes so the preview
  // indicator matches what the commit will produce (no overshoot followed by
  // a snap-back on release). columnDef always carries resolved defaults.
  let minDeltaPercentage = -0.999999
  let maxDeltaPercentage = Number.POSITIVE_INFINITY
  columnSizingStart.forEach(([columnId, headerSize]) => {
    if (headerSize <= 0) return

    const leafColumn = table.getColumn(columnId)
    const minSize = leafColumn?.columnDef.minSize
    const maxSize = leafColumn?.columnDef.maxSize

    if (typeof minSize === 'number') {
      minDeltaPercentage = Math.max(minDeltaPercentage, minSize / headerSize - 1)
    }
    if (typeof maxSize === 'number' && Number.isFinite(maxSize)) {
      maxDeltaPercentage = Math.min(maxDeltaPercentage, maxSize / headerSize - 1)
    }
  })

  let lastClientX = dragStartClientX
  let ended = false
  const stopListeners: Array<() => void> = []

  const updateOffset = (clientXPos?: number, commit = false) => {
    if (typeof clientXPos !== 'number') return

    lastClientX = clientXPos

    const nextColumnSizing: Record<string, number> = {}
    const deltaPercentage = Math.min(
      Math.max(
        ((clientXPos - dragStartClientX) * directionMultiplier) / startSize,
        minDeltaPercentage
      ),
      maxDeltaPercentage
    )
    const deltaOffset = deltaPercentage * startSize

    columnSizingStart.forEach(([columnId, headerSize]) => {
      nextColumnSizing[columnId] =
        Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100
    })

    if (liveTableElement) {
      columnSizingStart.forEach(([columnId]) => {
        const nextSize = nextColumnSizing[columnId]
        if (typeof nextSize !== 'number') return
        liveTableElement.style.setProperty(`--col-${columnId}-size`, String(nextSize))
        liveTableElement.style.setProperty(`--header-${columnId}-size`, String(nextSize))
      })
    } else {
      table.setColumnResizing((old) => ({
        ...old,
        startOffset,
        startSize,
        deltaOffset,
        deltaPercentage,
        columnSizingStart,
        isResizingColumn: column.id
      }))
    }

    if (commit) {
      table.setColumnSizing((old) => ({
        ...old,
        ...nextColumnSizing
      }))
    }
  }

  // Single teardown path: commits at the given position, removes every
  // document/window listener, and restores cursors. Safe to call more than
  // once (blur + mouseup + unmount can race).
  const endResize = (clientXPos?: number) => {
    if (ended) return
    ended = true

    stopListeners.forEach((stop) => stop())
    updateOffset(clientXPos, true)
    table.setColumnResizing((old) => ({
      ...old,
      isResizingColumn: false,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      columnSizingStart: []
    }))
    ownerDocument.body.style.cursor = previousBodyCursor
    ownerDocument.documentElement.style.cursor = previousDocumentCursor
  }

  const mouseMoveHandler = (moveEvent: globalThis.MouseEvent) => {
    updateOffset(moveEvent.clientX)
  }
  const mouseUpHandler = (upEvent: globalThis.MouseEvent) => {
    endResize(upEvent.clientX)
  }
  const touchMoveHandler = (moveEvent: globalThis.TouchEvent) => {
    if (moveEvent.cancelable) {
      moveEvent.preventDefault()
      moveEvent.stopPropagation()
    }

    updateOffset(getDataGridResizeEventClientX(moveEvent, touchIdentifier))
  }
  const touchEndHandler = (endEvent: globalThis.TouchEvent) => {
    // Ignore other fingers lifting; only the initiating touch ends the drag.
    const clientXPos =
      typeof touchIdentifier === 'number'
        ? findTouchClientX(endEvent.changedTouches, touchIdentifier)
        : getDataGridResizeEventClientX(endEvent)

    if (typeof clientXPos !== 'number') return

    if (endEvent.cancelable) {
      endEvent.preventDefault()
      endEvent.stopPropagation()
    }

    endResize(clientXPos)
  }
  // System-interrupted gestures and window focus loss would otherwise leave
  // the session (and its document listeners) live with no pointer held.
  const touchCancelHandler = () => {
    endResize(lastClientX)
  }
  const windowBlurHandler = () => {
    endResize(lastClientX)
  }

  const passiveIfSupported = { passive: false } as const

  if (isTouchSession) {
    ownerDocument.addEventListener('touchmove', touchMoveHandler, passiveIfSupported)
    ownerDocument.addEventListener('touchend', touchEndHandler, passiveIfSupported)
    ownerDocument.addEventListener('touchcancel', touchCancelHandler)
    stopListeners.push(() => {
      ownerDocument.removeEventListener('touchmove', touchMoveHandler)
      ownerDocument.removeEventListener('touchend', touchEndHandler)
      ownerDocument.removeEventListener('touchcancel', touchCancelHandler)
    })
  } else {
    ownerDocument.addEventListener('mousemove', mouseMoveHandler, passiveIfSupported)
    ownerDocument.addEventListener('mouseup', mouseUpHandler, passiveIfSupported)
    stopListeners.push(() => {
      ownerDocument.removeEventListener('mousemove', mouseMoveHandler)
      ownerDocument.removeEventListener('mouseup', mouseUpHandler)
    })
  }

  if (ownerWindow) {
    ownerWindow.addEventListener('blur', windowBlurHandler)
    stopListeners.push(() => ownerWindow.removeEventListener('blur', windowBlurHandler))
  }

  table.setColumnResizing((old) => ({
    ...old,
    startOffset,
    startSize,
    deltaOffset: 0,
    deltaPercentage: 0,
    columnSizingStart,
    isResizingColumn: column.id
  }))

  return () => endResize(lastClientX)
}

type DataGridTablePinnedBoundary = 'top' | 'bottom'

function getDataGridTableRowSections<TData extends object>(
  table: DataGridTableInstance<TData>,
  rowsPinnable?: boolean
) {
  if (!rowsPinnable) {
    return {
      topRows: [] as Row<DataGridFeatures, TData>[],
      centerRows: table.getRowModel().rows as Row<DataGridFeatures, TData>[],
      bottomRows: [] as Row<DataGridFeatures, TData>[]
    }
  }

  return {
    topRows: table.getTopRows() as Row<DataGridFeatures, TData>[],
    centerRows: table.getCenterRows() as Row<DataGridFeatures, TData>[],
    bottomRows: table.getBottomRows() as Row<DataGridFeatures, TData>[]
  }
}

function getDataGridTableResolvedRows<TData extends object>(
  table: DataGridTableInstance<TData>,
  rowsPinnable?: boolean
) {
  const { topRows, centerRows, bottomRows } = getDataGridTableRowSections(table, rowsPinnable)
  const resolvedRows: Array<{
    row: Row<DataGridFeatures, TData>
    pinnedBoundary?: DataGridTablePinnedBoundary
  }> = []

  topRows.forEach((row, index) => {
    resolvedRows.push({
      row,
      pinnedBoundary:
        index === topRows.length - 1 && (centerRows.length > 0 || bottomRows.length > 0)
          ? 'top'
          : undefined
    })
  })

  centerRows.forEach((row) => {
    resolvedRows.push({ row })
  })

  bottomRows.forEach((row, index) => {
    resolvedRows.push({
      row,
      pinnedBoundary:
        index === 0 && (centerRows.length > 0 || topRows.length > 0) ? 'bottom' : undefined
    })
  })

  return resolvedRows
}

function getDataGridTableOrderedVisibleColumns<TData extends object>(
  table: DataGridTableInstance<TData>
) {
  return [
    ...table.getStartVisibleLeafColumns(),
    ...table.getCenterVisibleLeafColumns(),
    ...table.getEndVisibleLeafColumns()
  ] as Column<DataGridFeatures, TData, unknown>[]
}

function getDataGridTableOrderedVisibleCells<TData extends object>(
  row: Row<DataGridFeatures, TData>
) {
  return [
    ...row.getStartVisibleCells(),
    ...row.getCenterVisibleCells(),
    ...row.getEndVisibleCells()
  ] as Cell<DataGridFeatures, TData, unknown>[]
}

function getDataGridTableMergedHeaderGroups<TData extends object>(
  table: DataGridTableInstance<TData>
) {
  const leftHeaderGroups = table.getStartHeaderGroups()
  const centerHeaderGroups = table.getCenterHeaderGroups()
  const rightHeaderGroups = table.getEndHeaderGroups()
  const headerGroupCount = Math.max(
    leftHeaderGroups.length,
    centerHeaderGroups.length,
    rightHeaderGroups.length
  )

  return Array.from({ length: headerGroupCount }, (_, index) => {
    const leftGroup = leftHeaderGroups[index]
    const centerGroup = centerHeaderGroups[index]
    const rightGroup = rightHeaderGroups[index]

    return {
      id:
        [leftGroup?.id, centerGroup?.id, rightGroup?.id].filter(Boolean).join(':') ||
        `header-group-${index}`,
      headers: [
        ...(leftGroup?.headers ?? []),
        ...(centerGroup?.headers ?? []),
        ...(rightGroup?.headers ?? [])
      ] as Header<DataGridFeatures, TData, unknown>[]
    }
  })
}

function hasDataGridTableRightPinnedColumns<TData extends object>(
  table: DataGridTableInstance<TData>
) {
  return (table.state.columnPinning.end?.length ?? 0) > 0
}

function getPinningStyles<TData extends object>(
  column: Column<DataGridFeatures, TData, unknown>
): CSSProperties {
  const isPinned = column.getIsPinned()

  return {
    // Logical offsets: TanStack's "left"/"right" buckets are start/end
    // semantics, so pinned columns stick to the correct edge in RTL too
    // (identical to left/right in LTR).
    insetInlineStart: isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    insetInlineEnd: isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    position: isPinned ? 'sticky' : undefined,
    transform: isPinned ? 'translateZ(0)' : undefined,
    contain: isPinned ? 'paint' : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 30 : undefined,
    backgroundClip: isPinned ? 'padding-box' : undefined
  }
}

// A meta.fillWidth column absorbs the free space itself, so the fill cells
// must collapse or the strip would be counted twice.
function hasDataGridFillColumn<TData extends object>(table: DataGridTableInstance<TData>) {
  return table.getVisibleLeafColumns().some((column) => column.columnDef.meta?.fillWidth)
}

function getFillCellWidth<TData extends object>(
  table: DataGridTableInstance<TData>
): CSSProperties {
  return {
    width: hasDataGridFillColumn(table) ? 0 : 'var(--data-grid-fill-size, 0px)'
  }
}

function DataGridTableFillCol() {
  const { props, table } = useDataGrid()

  if (!props.tableLayout?.columnsResizable) return null

  return <col data-slot='data-grid-table-fill-col' style={getFillCellWidth(table)} />
}

function DataGridTableFillHeadCell() {
  const { props, table } = useDataGrid()

  if (!props.tableLayout?.columnsResizable) return null

  return (
    <th
      aria-hidden='true'
      data-slot='data-grid-table-fill-head-cell'
      style={getFillCellWidth(table)}
      {...stylex.props(s.fillCell, props.tableLayout?.headerBackground && s.fillHeadCellBackground)}
    />
  )
}

function DataGridTableFillBodyCell() {
  const { props, table } = useDataGrid()

  if (!props.tableLayout?.columnsResizable) return null

  return (
    <td
      aria-hidden='true'
      data-slot='data-grid-table-fill-body-cell'
      style={getFillCellWidth(table)}
      {...stylex.props(s.fillCell)}
    />
  )
}

function DataGridTableFillFootCell() {
  const { props, table } = useDataGrid()

  if (!props.tableLayout?.columnsResizable) return null

  return (
    <td
      aria-hidden='true'
      data-slot='data-grid-table-fill-foot-cell'
      style={getFillCellWidth(table)}
      {...stylex.props(s.fillCell)}
    />
  )
}

/**
 * The quick-create affordance, rendered as the body's last row when
 * `onRowCreate` is set: one full-width ghost button, the Notion/Airtable
 * "+ New" idiom. What the click creates stays consumer-owned.
 */
function DataGridTableAddRow() {
  const { i18n, props, table } = useDataGrid()

  if (!props.onRowCreate) return null

  return (
    <tr data-slot='data-grid-table-add-row' {...stylex.props(props.tableStyles?.rowCreate)}>
      <td
        // The extra column is the filler strip, rendered only when columns
        // are resizable.
        colSpan={
          table.getVisibleLeafColumns().length + (props.tableLayout?.columnsResizable ? 1 : 0)
        }
        {...stylex.props(s.addRowCell)}
      >
        <Button
          type='button'
          variant='ghost'
          size='sm'
          data-dense={props.tableLayout?.dense ? '' : undefined}
          style={s.addRowButton as StyleXStyles}
          onClick={(event) => {
            // Creating often unmounts this affordance (a draft row takes
            // its place); focus would fall to the body and strand the
            // keyboard. Hand it to the grid's focus target instead - but
            // only when it was actually lost, so a consumer that keeps
            // the button mounted keeps repeated Enter presses working.
            // A timer, not rAF: timers also run in background tabs.
            const button = event.currentTarget
            const grid = button.closest('table')
            props.onRowCreate?.()
            setTimeout(() => {
              if (
                !button.isConnected &&
                grid?.isConnected &&
                grid.tabIndex >= 0 &&
                (document.activeElement === document.body || !document.activeElement)
              ) {
                grid.focus()
              }
            }, 0)
          }}
        >
          <PlusIcon aria-hidden='true' {...stylex.props(s.addRowIcon)} />
          {props.rowCreateLabel ?? i18n.labels.rowCreate}
        </Button>
      </td>
    </tr>
  )
}

function DataGridTableBase({ children }: { children: ReactNode }) {
  const { props, table, recordCount } = useDataGrid()
  const leftVisibleColumns = table.getStartVisibleLeafColumns()
  const centerVisibleColumns = table.getCenterVisibleLeafColumns()
  const rightVisibleColumns = table.getEndVisibleLeafColumns()
  const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table)

  /**
   * Compute column widths as CSS custom properties once upfront (memoized).
   * Cells reference these via calc(var(--col-X-size) * 1px) so the browser
   * handles width propagation without per-cell getSize() calls or React
   * re-renders of the body.
   */
  const columnSizeVars = useMemo(() => {
    if (!props.tableLayout?.columnsResizable) return undefined
    const headers = table.getFlatHeaders()
    // `table` is a per-state-change wrapper (v9), so the memo recomputes on
    // every sizing, visibility, order, pinning or column-def change - exactly
    // the events that can move the CSS variables. No narrower re-key is
    // possible: getFlatHeaders() reads through the current instance.
    // A meta.fillWidth column absorbs the filler strip: its size variable
    // carries the unitless fill amount, so every consumer of
    // calc(var(--col-X-size) * 1px) stretches with the container while the
    // fill cells collapse to zero.
    const fillColumnId = table
      .getVisibleLeafColumns()
      .find((column) => column.columnDef.meta?.fillWidth)?.id
    const colSizes: Record<string, number | string> = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] =
        header.column.id === fillColumnId
          ? `calc(${header.column.getSize()} + var(--data-grid-fill, 0))`
          : header.column.getSize()
    }
    return colSizes
  }, [props.tableLayout?.columnsResizable, table])

  // With cell selection on, the table announces as a grid so the tds compute
  // as gridcells and aria-selected applies; existing grids keep their plain
  // semantic table untouched.
  const cellSelectionOn = !!props.tableLayout?.cellSelection && table.atoms.cellSelection != null

  return (
    <table
      data-slot='data-grid-table'
      role={cellSelectionOn ? 'grid' : undefined}
      aria-multiselectable={
        cellSelectionOn && props.tableLayout?.cellSelectionMode !== 'single' ? true : undefined
      }
      // recordCount can undercount the rows actually present (a pinned
      // draft row a consumer keeps out of its totals), and aria-rowindex
      // is computed from the full display order; the union keeps every
      // announced index inside the announced count.
      aria-rowcount={
        cellSelectionOn
          ? Math.max(recordCount, table.getRowsInDisplayOrder().length) + 1
          : undefined
      }
      style={
        props.tableLayout?.columnsResizable
          ? {
              ...columnSizeVars,
              width: `calc(${table.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
            }
          : undefined
      }
      {...stylex.props(
        s.table,
        props.tableLayout?.columnsResizable ? s.tableSized : s.tableFull,
        props.tableLayout?.width === 'auto' ? s.tableAuto : s.tableFixed,
        !props.tableLayout?.columnsDraggable && s.tableSeparate,
        props.tableStyles?.base
      )}
    >
      <colgroup>
        {[...leftVisibleColumns, ...centerVisibleColumns].map((column) => (
          <col
            key={column.id}
            style={
              props.tableLayout?.columnsResizable
                ? { width: `calc(var(--col-${column.id}-size) * 1px)` }
                : props.tableLayout?.width === 'fixed'
                  ? { width: column.getSize() }
                  : undefined
            }
          />
        ))}
        {hasRightPinnedColumns ? <DataGridTableFillCol /> : null}
        {rightVisibleColumns.map((column) => (
          <col
            key={column.id}
            style={
              props.tableLayout?.columnsResizable
                ? { width: `calc(var(--col-${column.id}-size) * 1px)` }
                : props.tableLayout?.width === 'fixed'
                  ? { width: column.getSize() }
                  : undefined
            }
          />
        ))}
        {!hasRightPinnedColumns ? <DataGridTableFillCol /> : null}
      </colgroup>
      {children}
    </table>
  )
}

function DataGridTableViewport({
  children,
  viewportRef,
  style
}: {
  children: ReactNode
  viewportRef?: Ref<HTMLDivElement>
  style?: CSSProperties
}) {
  const { props, table, autoSize } = useDataGrid()
  const isColumnsResizable = !!props.tableLayout?.columnsResizable
  const viewportNodeRef = useRef<HTMLDivElement | null>(null)
  const fillStateRef = useRef({ containerWidth: 0, appliedFill: -1 })
  const stopContainerObserverRef = useRef<(() => void) | null>(null)

  // Free space is written as a CSS variable directly on the viewport node
  // instead of React state, so container resizes and column-size commits
  // reach the fill column without re-rendering the grid.
  const syncFillWidth = useCallback(() => {
    const node = viewportNodeRef.current
    if (!node) return

    const freeSpace = fillStateRef.current.containerWidth - table.getTotalSize()
    const fillWidth = Math.max(0, freeSpace)

    if (fillStateRef.current.appliedFill !== fillWidth) {
      fillStateRef.current.appliedFill = fillWidth
      node.style.setProperty('--data-grid-fill-size', `${fillWidth}px`)
      // Unitless twin for the meta.fillWidth column, whose size variable
      // participates in a calc that multiplies by 1px afterwards.
      node.style.setProperty('--data-grid-fill', String(fillWidth))
    }

    // Signed on purpose: a shrinking container drives the free space
    // NEGATIVE, which is exactly what tells a meta.autoSize column to hand
    // its absorbed width back.
    autoSize?.apply(freeSpace)
  }, [autoSize, table])

  const handleViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      stopContainerObserverRef.current?.()
      stopContainerObserverRef.current = null
      viewportNodeRef.current = node
      assignRef(viewportRef, node)

      if (!node) return

      if (!isColumnsResizable) {
        fillStateRef.current.appliedFill = -1
        node.style.removeProperty('--data-grid-fill-size')
        node.style.removeProperty('--data-grid-fill')
        return
      }

      const scrollViewport = getDataGridScrollAreaViewport(node) ?? node.parentElement
      const measurementTarget = scrollViewport ?? node

      const measure = () => {
        fillStateRef.current.containerWidth = measurementTarget.clientWidth
        syncFillWidth()
      }

      // First measure runs inside the mount commit, before paint, so the fill
      // column and any meta.autoSize growth land in the first painted frame.
      measure()

      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(measure)
        observer.observe(measurementTarget)
        stopContainerObserverRef.current = () => observer.disconnect()
      }
    },
    [isColumnsResizable, syncFillWidth, viewportRef]
  )

  // Column sizing commits and visibility changes alter the table's total size
  // without moving the container, so the fill var must re-sync after renders
  // the ResizeObserver never sees. No-ops when the value is unchanged.
  useLayoutEffect(() => {
    if (!isColumnsResizable) return
    syncFillWidth()
  })

  return (
    <div
      data-slot='data-grid-table-viewport'
      ref={handleViewportRef}
      style={{
        ...(isColumnsResizable
          ? {
              width: `calc(${table.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
            }
          : undefined),
        ...style
      }}
      {...stylex.props(dataGridTableViewportStyles.viewport)}
    >
      {children}
      <DataGridTableResizeIndicator viewportNodeRef={viewportNodeRef} />
    </div>
  )
}

function DataGridTableHead({ children }: { children: ReactNode }) {
  const { props } = useDataGrid()

  return (
    <thead
      {...stylex.props(
        props.tableStyles?.header,
        props.tableLayout?.headerSticky && (props.tableStyles?.headerSticky ?? s.headerSticky)
      )}
    >
      {children}
    </thead>
  )
}

function DataGridTableHeadRow({ children }: { children: ReactNode; rowId: string }) {
  const { props } = useDataGrid()

  return (
    <tr
      aria-rowindex={props.tableLayout?.cellSelection ? 1 : undefined}
      {...stylex.props(props.tableStyles?.headerRow)}
    >
      {children}
    </tr>
  )
}

function DataGridTableHeadRowCell<TData extends object>({
  children,
  header,
  dndRef,
  dndStyle
}: {
  children: ReactNode
  header: Header<DataGridFeatures, TData, unknown>
  dndRef?: Ref<HTMLTableCellElement>
  dndStyle?: StyleXStyles
}) {
  const { props, table } = useDataGrid()

  const { column } = header
  const isPinned = column.getIsPinned()
  const isFirstStartPinned = isPinned === 'start' && column.getIsFirstColumn('start')
  const isLastStartPinned = isPinned === 'start' && column.getIsLastColumn('start')
  const isFirstEndPinned = isPinned === 'end' && column.getIsFirstColumn('end')
  const isLastEndPinned = isPinned === 'end' && column.getIsLastColumn('end')
  const isLastVisibleColumn =
    column.getIndex() === header.getContext().table.getVisibleLeafColumns().length - 1

  const sortDirection = column.getIsSorted()

  return (
    <th
      ref={dndRef}
      scope='col'
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : column.getCanSort()
              ? 'none'
              : undefined
      }
      aria-colindex={props.tableLayout?.cellSelection ? column.getIndex() + 1 : undefined}
      data-col-id={column.id}
      data-dense={props.tableLayout?.dense ? '' : undefined}
      data-pinned={isPinned || undefined}
      data-outer-pinned-col={isFirstStartPinned ? 'start' : isLastEndPinned ? 'end' : undefined}
      data-last-col={isLastStartPinned ? 'start' : isFirstEndPinned ? 'end' : undefined}
      style={{
        // Width geometry stays imperative: resize drags update the CSS
        // variables without React renders.
        ...(props.tableLayout?.width === 'fixed' &&
          !props.tableLayout?.columnsResizable && {
            width: header.getSize()
          }),
        ...(props.tableLayout?.columnsPinnable && column.getCanPin() && getPinningStyles(column)),
        // A sticky child does not ride a sticky ancestor: under a sticky
        // header the pinned cell's own position:sticky (horizontal) opts it
        // out of the thead's vertical stickiness, and the corner scrolls
        // away while its non-positioned siblings stick. Pin both axes on
        // the cell itself.
        ...(props.tableLayout?.headerSticky && isPinned ? { top: 0 } : null),
        ...(props.tableLayout?.columnsResizable && {
          width: `calc(var(--header-${header.id}-size) * 1px)`
        })
      }}
      {...stylex.props(
        s.th,
        props.tableLayout?.headerBackground && s.thHeaderBackground,
        props.tableLayout?.headerBorder && s.thHeaderBorder,
        props.tableLayout?.cellBorder && s.cellBorder,
        // The resize filler column follows the center group, and a border on
        // the last center cell would float against that empty strip.
        props.tableLayout?.cellBorder &&
          props.tableLayout?.columnsResizable &&
          // With end-pinned columns but no pin affordance, the pinned edge
          // draws no separator of its own; keep the border then.
          (props.tableLayout?.columnsPinnable || !hasDataGridTableRightPinnedColumns(table)) &&
          !isPinned &&
          column.getIsLastColumn('center') &&
          s.cellBorderLast,
        props.tableLayout?.columnsResizable && column.getCanResize() && s.thResizable,
        props.tableLayout?.columnsResizable &&
          column.getCanResize() &&
          isLastVisibleColumn &&
          s.thResizableLast,
        props.tableLayout?.columnsPinnable && column.getCanPin() && isPinned && s.thPinned,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          isPinned === 'start' &&
          isLastStartPinned &&
          s.thPinnedDividerStart,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          isPinned === 'end' &&
          isLastEndPinned &&
          s.thPinnedDividerEnd,
        column.columnDef.meta?.headerStyle,
        // Edge detection spans the full visible leaf order; the header's own
        // group only covers one pinning bucket.
        (column.getIndex() === 0 || isLastVisibleColumn) && props.tableStyles?.edgeCell,
        dndStyle
      )}
    >
      {children}
    </th>
  )
}

/**
 * TanStack's own default, restated here on purpose.
 *
 * v8 merged each feature's default table options into `table.options`, so
 * reading `table.options.columnResizeMode` gave you `"onEnd"` even when the
 * consumer never set it. v9 resolves feature defaults internally and leaves
 * the option `undefined` on the instance, so the old `?? table.options...`
 * fallback quietly produced `undefined` - and every grid that had not opted
 * into a mode explicitly lost the onEnd drag session: no cursor lock, no
 * vertical indicator, and an immediate commit instead of a deferred one.
 */
const DATA_GRID_DEFAULT_COLUMN_RESIZE_MODE = 'onEnd' as const

function getDataGridColumnResizeMode(
  layoutMode: 'onChange' | 'onEnd' | undefined,
  tableMode: 'onChange' | 'onEnd' | undefined
) {
  return layoutMode ?? tableMode ?? DATA_GRID_DEFAULT_COLUMN_RESIZE_MODE
}

function DataGridTableHeadRowCellResize<TData extends object>({
  header
}: {
  header: Header<DataGridFeatures, TData, unknown>
}) {
  const { props, table } = useDataGrid<TData>()
  const { column } = header
  const isPinned = column.getIsPinned()
  const isLastVisibleColumn =
    column.getIndex() === header.getContext().table.getVisibleLeafColumns().length - 1
  const isResizeModeOnEnd =
    getDataGridColumnResizeMode(
      props.tableLayout?.columnsResizeMode,
      table.options.columnResizeMode
    ) === 'onEnd'
  const stopResizeSessionRef = useRef<(() => void) | undefined>(undefined)

  // End a live drag if the handle unmounts mid-resize so document listeners
  // and the app-wide col-resize cursor don't outlive the grid.
  useEffect(() => {
    return () => {
      stopResizeSessionRef.current?.()
      stopResizeSessionRef.current = undefined
    }
  }, [])

  const handleMouseDown = (event: ReactMouseEvent<HTMLElement>) => {
    // Only the primary button starts a resize; guard before preventDefault so
    // right-click still opens the context menu.
    if (event.button !== 0) return

    event.preventDefault()
    event.stopPropagation()

    stopResizeSessionRef.current?.()
    stopResizeSessionRef.current = startDataGridColumnResizeOnEnd(
      event,
      header,
      table,
      !isResizeModeOnEnd
    )
  }

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()

    stopResizeSessionRef.current?.()
    stopResizeSessionRef.current = startDataGridColumnResizeOnEnd(
      event,
      header,
      table,
      !isResizeModeOnEnd
    )
  }

  const isResizing = column.getIsResizing()

  return (
    // A span, deliberately: consumers stretch end-aligned header CONTENT
    // with `[&>div]:w-full` on headerClassName, and that compiled child
    // selector (0,1,1) beats the handle's own w-5 (0,1,0) - a div handle
    // then covers the whole cell and swallows the menu click. Hardening
    // w-5 with ! was rejected: the tag change removes the fight instead
    // of escalating it.
    <span
      data-slot='data-grid-table-resize-handle'
      {...{
        onDoubleClick: () => column.resetSize(),
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart
      }}
      {...stylex.props(
        s.resizeHandle,
        isPinned === 'end'
          ? [
              // An end-pinned column grows from its START edge (its end is
              // anchored), so the handle lives there, inside the sticky cell.
              s.resizeHandleStart,
              props.tableLayout?.columnsPinnable
                ? s.resizeHandleLineHidden
                : [s.resizeHandleLine, s.resizeHandleLineStart]
            ]
          : isLastVisibleColumn
            ? [s.resizeHandleEnd, s.resizeHandleLineHidden]
            : isPinned
              ? [
                  // A pinned column is sticky, so the handle sits inside the
                  // cell instead of straddling the boundary, where the next
                  // sticky cell would paint over it.
                  s.resizeHandleEnd,
                  // With the pin affordance on, the pinned edge already draws
                  // its own separator and a resize line would double it. But
                  // pinning is also usable purely as an ordering lock, with no
                  // affordance and no separator -- and there this line is the
                  // only thing marking the edge, so hiding it left a resizable
                  // column showing a resize cursor and no indicator at all.
                  props.tableLayout?.columnsPinnable
                    ? s.resizeHandleLineHidden
                    : [s.resizeHandleLine, s.resizeHandleLineEnd]
                ]
              : [
                  s.resizeHandleCenter,
                  // With cell borders on, the th border-e already marks every
                  // boundary and this always-on line would double it; the wide
                  // hit area and resize cursor stay.
                  props.tableLayout?.cellBorder
                    ? s.resizeHandleLineHidden
                    : [s.resizeHandleLine, s.resizeHandleLineCenter]
                ],
        isResizing && s.resizeHandleActive,
        isResizing &&
          !isResizeModeOnEnd &&
          !isLastVisibleColumn && [
            s.resizeHandleActiveLine,
            ...(isPinned || isLastVisibleColumn
              ? [s.resizeHandleLineEnd, s.resizeHandleActiveLineEnd]
              : [s.resizeHandleLineCenter])
          ]
      )}
    />
  )
}

function DataGridTableResizeIndicator({
  viewportNodeRef
}: {
  viewportNodeRef: RefObject<HTMLDivElement | null>
}) {
  const { props, table } = useDataGrid()
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const indicatorHeadRef = useRef<HTMLDivElement | null>(null)
  // Header height is stable for the duration of a drag; caching it per
  // session avoids a forced layout (querySelector + getBoundingClientRect)
  // on every mousemove.
  const headerHeightCacheRef = useRef<{
    key: string | false
    value: number
  }>({ key: false, value: 0 })
  const columnResizing = table.state.columnResizing
  const resizingColumnId = columnResizing.isResizingColumn
  const resizeMode = getDataGridColumnResizeMode(
    props.tableLayout?.columnsResizeMode,
    table.options.columnResizeMode
  )
  const isActive = !!(
    props.tableLayout?.columnsResizable &&
    resizeMode === 'onEnd' &&
    resizingColumnId
  )

  // Positioning happens imperatively after each drag-frame render: layout
  // reads (viewport rect, thead height) and ref access belong outside render,
  // and writing styles directly avoids holding the viewport node in React
  // state, which would cost every grid a second render pass at mount.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current
    const indicatorHead = indicatorHeadRef.current
    const viewportElement = viewportNodeRef.current

    if (!isActive || !indicator || !indicatorHead || !resizingColumnId) return

    const resizingHeader = table
      .getFlatHeaders()
      .find((header) => header.column.id === resizingColumnId || header.id === resizingColumnId)

    if (!resizingHeader) return

    // deltaOffset is a logical delta (already direction-adjusted); translate
    // by the physical pointer movement so the indicator follows the cursor
    // instead of mirroring it. End-pinned columns resize mirrored (see the
    // session), so the multiplier matches theirs.
    const directionMultiplier =
      (table.options.columnResizeDirection === 'rtl') !==
      (resizingHeader.column.getIsPinned() === 'end')
        ? -1
        : 1
    const deltaOffset = (columnResizing.deltaOffset ?? 0) * directionMultiplier

    if (headerHeightCacheRef.current.key !== resizingColumnId) {
      headerHeightCacheRef.current = {
        key: resizingColumnId,
        value:
          viewportElement
            ?.querySelector('[data-slot="data-grid-table"] thead')
            ?.getBoundingClientRect().height ?? 0
      }
    }

    const headerHeight = headerHeightCacheRef.current.value
    // Anchor on the live header cell: content math (getStart) cannot place a
    // STICKY pinned column, while the DOM rect is right for every column at
    // any scroll position. The state offset and content math stay as
    // fallbacks for a header that is not in the DOM.
    const viewportRoot =
      viewportElement ?? indicator.closest<HTMLElement>('[data-slot="data-grid-table-viewport"]')
    const headerCellElement = viewportRoot?.querySelector<HTMLElement>(
      `thead th[data-col-id="${CSS.escape(resizingHeader.column.id)}"]`
    )
    let indicatorLeft: number
    if (headerCellElement && viewportRoot) {
      const anchorRect = headerCellElement.getBoundingClientRect()
      const edgeClientX =
        (table.options.columnResizeDirection === 'rtl') !==
        (resizingHeader.column.getIsPinned() === 'end')
          ? anchorRect.left
          : anchorRect.right
      indicatorLeft = edgeClientX - viewportRoot.getBoundingClientRect().left
    } else if (typeof columnResizing.startOffset === 'number' && viewportElement) {
      indicatorLeft = columnResizing.startOffset - viewportElement.getBoundingClientRect().left
    } else {
      indicatorLeft = resizingHeader.getStart() + resizingHeader.getSize()
    }

    indicator.style.left = `${indicatorLeft}px`
    indicator.style.transform = `translateX(${deltaOffset}px)`
    indicatorHead.style.height = `${Math.max(headerHeight, 6)}px`
  })

  if (!isActive) return null

  return (
    <div
      ref={indicatorRef}
      aria-hidden='true'
      data-slot='data-grid-table-resize-indicator'
      {...stylex.props(s.resizeIndicator)}
    >
      <div {...stylex.props(s.resizeIndicatorBar)} />
      <div ref={indicatorHeadRef} {...stylex.props(s.resizeIndicatorHead)} style={{ width: 5 }} />
    </div>
  )
}

function DataGridTableRowSpacer() {
  return (
    <tbody
      aria-hidden='true'
      data-slot='data-grid-table-body-spacer'
      {...stylex.props(s.bodySpacer)}
    />
  )
}

function DataGridTableBody({ children }: { children: ReactNode }) {
  return <tbody data-slot='data-grid-table-body'>{children}</tbody>
}

function DataGridTableFoot({ children }: { children: ReactNode }) {
  const { props } = useDataGrid()
  return (
    <tfoot data-slot='data-grid-table-foot' {...stylex.props(props.tableStyles?.footer)}>
      {children}
    </tfoot>
  )
}

function DataGridTableFootRow({ children }: { children: ReactNode }) {
  const { props } = useDataGrid()

  return (
    <tr
      data-slot='data-grid-table-foot-row'
      {...stylex.props(
        props.tableLayout?.footerBackground && s.footRowBackground,
        props.tableLayout?.cellBorder && s.cellBorder
      )}
    >
      {children}
      <DataGridTableFillFootCell />
    </tr>
  )
}

function DataGridTableFootRowCell({
  children,
  colSpan,
  style
}: {
  children?: ReactNode
  colSpan?: number
  style?: StyleXStyles
}) {
  const { props } = useDataGrid()
  return (
    <td
      colSpan={colSpan}
      data-dense={props.tableLayout?.dense ? '' : undefined}
      {...stylex.props(
        s.footCell,
        props.tableLayout?.footerBackground && s.footRowBackground,
        props.tableLayout?.cellBorder && s.cellBorder,
        style
      )}
    >
      {children}
    </td>
  )
}

function DataGridTableBodyRowSkeleton({
  children,
  wantsBorder,
  style
}: {
  children: ReactNode
  wantsBorder?: boolean
  style?: StyleXStyles
}) {
  const { props } = useDataGrid()

  return (
    <tr
      style={{ '--dg-row-border-b': wantsBorder ? '1px' : '0px' } as CSSProperties}
      data-dense={props.tableLayout?.dense ? '' : undefined}
      {...stylex.props(
        s.row,
        props.onRowClick && s.rowHoverCursor,
        props.tableLayout?.cellBorder && s.cellBorder,
        props.tableStyles?.bodyRow,
        style
      )}
    >
      {children}
    </tr>
  )
}

function DataGridTableBodyRowSkeletonCell<TData extends object>({
  children,
  column
}: {
  children: ReactNode
  column: Column<DataGridFeatures, TData, unknown>
}) {
  const { props, table } = useDataGrid()

  return (
    <td
      style={
        props.tableLayout?.columnsResizable
          ? { width: `calc(var(--col-${column.id}-size) * 1px)` }
          : undefined
      }
      data-dense={props.tableLayout?.dense ? '' : undefined}
      data-pinned={column.getIsPinned() || undefined}
      {...stylex.props(
        s.td,
        props.tableLayout?.cellBorder && s.cellBorder,
        props.tableLayout?.cellBorder &&
          props.tableLayout?.columnsResizable &&
          // With end-pinned columns but no pin affordance, the pinned edge
          // draws no separator of its own; keep the border then.
          (props.tableLayout?.columnsPinnable || !hasDataGridTableRightPinnedColumns(table)) &&
          !column.getIsPinned() &&
          column.getIsLastColumn('center') &&
          s.cellBorderLast,
        props.tableLayout?.columnsResizable && column.getCanResize() && s.tdTruncate,
        column.columnDef.meta?.cellStyle,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          column.getIsPinned() &&
          s.tdPinned,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          column.getIsPinned() === 'start' &&
          column.getIsLastColumn('start') &&
          s.tdPinnedDividerStart,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          column.getIsPinned() === 'end' &&
          column.getIsFirstColumn('end') &&
          s.tdPinnedDividerEnd,
        (column.getIndex() === 0 ||
          column.getIndex() === table.getVisibleLeafColumns().length - 1) &&
          props.tableStyles?.edgeCell
      )}
    >
      {children}
    </td>
  )
}

function DataGridTableBodyRow<TData extends object>({
  children,
  row,
  pinnedBoundary,
  rowRef,
  dndRef,
  dndStyle,
  dataIndex,
  wantsBorder
}: {
  children: ReactNode
  row: Row<DataGridFeatures, TData>
  pinnedBoundary?: DataGridTablePinnedBoundary
  rowRef?: Ref<HTMLTableRowElement>
  dndRef?: Ref<HTMLTableRowElement>
  dndStyle?: StyleXStyles
  dataIndex?: number
  /** Whether this row paints a bottom border on its tds. */
  wantsBorder?: boolean
}) {
  const { props, table } = useDataGrid<TData>()
  const isRowPinned = row.getIsPinned()
  const rowStatus = props.getRowStatus?.(row.original)

  return (
    <tr
      ref={(node) => {
        assignRef(rowRef, node)
        assignRef(dndRef, node)
      }}
      style={
        {
          '--dg-row-border-b': wantsBorder ? '1px' : '0px'
        } as CSSProperties
      }
      data-state={table.options.enableRowSelection && row.getIsSelected() ? 'selected' : undefined}
      data-index={dataIndex}
      data-row-id={row.id}
      data-depth={row.depth || undefined}
      data-row-pinned={isRowPinned || undefined}
      data-row-pinned-boundary={pinnedBoundary}
      data-row-status={rowStatus}
      // 1-based after the header row; row.index is the position in the data,
      // so the announced index stays absolute across pagination.
      aria-rowindex={props.tableLayout?.cellSelection ? row.index + 2 : undefined}
      onClick={() => props.onRowClick && props.onRowClick(row.original)}
      {...stylex.props(
        s.row,
        props.onRowClick && s.rowHoverCursor,
        // Optional CRUD indications, active only when getRowStatus is
        // wired; the muted defaults yield to tableStyles overrides per
        // status. Pinned cells must stay OPAQUE (they hide scrolled
        // content), so they get the same tint pre-mixed over the
        // background instead of inheriting the translucent row fill.
        rowStatus === 'deleted' && s.rowStatusDeleted,
        rowStatus === 'dirty' && s.rowStatusDirty,
        rowStatus === 'new' && s.rowStatusNew,
        props.tableLayout?.rowsPinnable && isRowPinned && s.rowPinnedTint,
        props.tableStyles?.bodyRow,
        rowStatus === 'new' && props.tableStyles?.rowNew,
        rowStatus === 'dirty' && props.tableStyles?.rowDirty,
        rowStatus === 'deleted' && props.tableStyles?.rowDeleted,
        props.tableLayout?.rowsPinnable && isRowPinned && props.tableStyles?.rowPinned,
        dndStyle
      )}
      data-dense={props.tableLayout?.dense ? '' : undefined}
    >
      {children}
    </tr>
  )
}

function DataGridTableBodyRowExpandded<TData extends object>({
  row
}: {
  row: Row<DataGridFeatures, TData>
}) {
  const { props, table } = useDataGrid<TData>()
  const expandedContent = table
    .getAllColumns()
    .find((column) => column.columnDef.meta?.expandedContent)?.columnDef.meta?.expandedContent

  // Tree and grouped rows share row.getIsExpanded() with detail expansion.
  // Without a detail column there is nothing to render, and an empty <tr>
  // would break striping parity, rowBorder, and virtual row measurement.
  if (!expandedContent) return null

  return (
    <tr data-slot='data-grid-table-expanded-row'>
      <td
        colSpan={
          getDataGridTableOrderedVisibleCells(row).length +
          (props.tableLayout?.columnsResizable ? 1 : 0)
        }
      >
        {expandedContent(row.original)}
      </td>
    </tr>
  )
}

/**
 * Interactive descendants keep their own mousedown semantics: a click on a
 * button, link, editor or checkbox inside a cell must never start or replace
 * a range. One selector also covers the row-dnd grip (a button), the expand
 * toggle, and `data-cell-interactive` - the documented opt-out for custom
 * widgets built from elements the tag list cannot know about.
 */
function isDataGridCellInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest(
      'button, a, input, select, textarea, [contenteditable], [role="checkbox"], [data-cell-interactive], [data-slot="data-grid-table-row-expand"], [data-slot="data-grid-cell-fill-handle"]'
    ) != null
  )
}

function DataGridTableBodyRowCell<TData extends object>({
  children,
  cell,
  dndRef,
  dndStyle,
  columnIndex,
  isFirstRow,
  isLastRow,
  nextPinned,
  prevPinned,
  nextIsFillCell,
  rowSelected,
  rowStatus
}: {
  children: ReactNode
  cell: Cell<DataGridFeatures, TData, unknown>
  dndRef?: Ref<HTMLTableCellElement>
  dndStyle?: StyleXStyles
  /** Center-column index under column virtualization; data-column-index. */
  columnIndex?: number
  /** Cell-selection boundary clamps (row position). */
  isFirstRow?: boolean
  isLastRow?: boolean
  /** Cell-selection boundary clamps (pinned neighbors / filler strip). */
  nextPinned?: boolean
  prevPinned?: boolean
  nextIsFillCell?: boolean
  /** Pre-mixed pinned tints, resolved by the row. */
  rowSelected?: boolean
  rowStatus?: DataGridRowStatus | undefined
}) {
  const { props, table, gridId } = useDataGrid<TData>()

  const { column, row } = cell
  const isPinned = column.getIsPinned()
  const isLastStartPinned = isPinned === 'start' && column.getIsLastColumn('start')
  const isFirstEndPinned = isPinned === 'end' && column.getIsFirstColumn('end')
  const isLastCenter = column.getIsLastColumn('center')

  // The atom check backs up the flag: consumers may hand the grid a leaner
  // bundle without cellSelectionFeature, and the flag alone must not make the
  // renderer call prototype APIs that were never assigned.
  const cellSelectionOn = !!props.tableLayout?.cellSelection && table.atoms.cellSelection != null
  const rangeSelectionOn = cellSelectionOn && props.tableLayout?.cellSelectionMode !== 'single'

  const renderTd = (selection: DataGridCellSelectionAttrs | null) => (
    <td
      ref={dndRef}
      // The id is what the controller's aria-activedescendant points at, so
      // a screen reader tracks the focused cell through the container-focus
      // model.
      id={
        cellSelectionOn
          ? `${gridId}c-${toDataGridDomId(row.id)}-${toDataGridDomId(column.id)}`
          : undefined
      }
      aria-colindex={cellSelectionOn ? column.getIndex() + 1 : undefined}
      data-col-id={column.id}
      data-dense={props.tableLayout?.dense ? '' : undefined}
      data-pinned={isPinned || undefined}
      data-last-col={isLastStartPinned ? 'start' : isFirstEndPinned ? 'end' : undefined}
      data-cell-status={props.getCellStatus?.(row.original, column.id)}
      data-column-index={columnIndex}
      style={{
        ...(props.tableLayout?.columnsPinnable && column.getCanPin() && getPinningStyles(column)),
        // Paint containment clips at the padding edge, which would erase
        // the ::before selection chrome on pinned cells.
        ...(cellSelectionOn ? { contain: undefined } : null),
        ...(props.tableLayout?.columnsResizable && {
          width: `calc(var(--col-${column.id}-size) * 1px)`
        })
      }}
      {...(selection ? selection : null)}
      onMouseDown={
        selection
          ? (event) => {
              if (event.button !== 0) return
              if (isDataGridCellInteractiveTarget(event.target)) {
                // A modifier click is a SELECTION gesture even on a control:
                // Shift extends and Ctrl/Cmd adds, exactly as on a plain
                // cell, so no column is unreachable for ranges.
                if (
                  rangeSelectionOn &&
                  (event.shiftKey || event.metaKey || event.ctrlKey) &&
                  cell.getCanSelect()
                ) {
                  event.preventDefault()
                  cell.getSelectionStartHandler()(event)
                  return
                }
                // The press starts the range session exactly like a plain
                // cell: the cell focuses, a drag extends from it, and a
                // motionless press still ends in the control's own click
                // (this is why drag releases are squelched upstream, in the
                // controller, once a drag actually grew the range).
                if (cell.getCanSelect()) {
                  if (rangeSelectionOn) {
                    cell.getSelectionStartHandler()(event)
                  } else {
                    table.setFocusedCell(row.id, column.id)
                  }
                }
                return
              }
              if (!rangeSelectionOn) {
                // Single mode: every gesture collapses to the one cell.
                if (cell.getCanSelect()) {
                  table.setFocusedCell(row.id, column.id)
                }
                return
              }
              cell.getSelectionStartHandler()(event)
            }
          : undefined
      }
      onMouseEnter={
        rangeSelectionOn ? (event) => cell.getSelectionExtendHandler()(event) : undefined
      }
      {...stylex.props(
        s.td,
        props.tableLayout?.cellBorder && s.cellBorder,
        // Mirror of the head cell rule: no floating border against the
        // resize filler strip.
        props.tableLayout?.cellBorder &&
          props.tableLayout?.columnsResizable &&
          // With end-pinned columns but no pin affordance, the pinned edge
          // draws no separator of its own; keep the border then.
          (props.tableLayout?.columnsPinnable || !hasDataGridTableRightPinnedColumns(table)) &&
          !isPinned &&
          isLastCenter &&
          s.cellBorderLast,
        props.tableLayout?.columnsResizable &&
          column.getCanResize() &&
          !cellSelectionOn &&
          s.tdTruncate,
        props.tableLayout?.columnsPinnable && column.getCanPin() && isPinned && s.tdPinned,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          isPinned === 'start' &&
          isLastStartPinned &&
          s.tdPinnedDividerStart,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          isPinned === 'end' &&
          isFirstEndPinned &&
          s.tdPinnedDividerEnd,
        // The classic edited-cell corner mark, active only when
        // getCellStatus is wired: warning for "dirty", critical for "invalid".
        props.getCellStatus && rowStatus && s.cellStatusMark,
        props.getCellStatus && rowStatus === 'dirty' && s.cellStatusMarkDirty,
        // CRUD status tints, pre-mixed over the background on pinned cells.
        rowStatus === 'deleted' && s.cellStatusDeleted,
        rowStatus === 'dirty' && isPinned && s.cellStatusDirtyPinned,
        rowStatus === 'new' && isPinned && s.cellStatusNewPinned,
        // Pinned cells pre-mix the row's selected tint (they are opaque and
        // would hide the translucent row fill).
        rowSelected && isPinned && s.pinnedCellSelectedMix,
        column.columnDef.meta?.cellStyle,
        (column.getIndex() === 0 || column.getIndex() === row.getVisibleCells().length - 1) &&
          props.tableStyles?.edgeCell,
        ...cellSelectionChromeProps(selection, {
          isFirstColumn: column.getIndex() === 0,
          isLastColumn: column.getIndex() === row.getVisibleCells().length - 1,
          isFirstRow: !!isFirstRow,
          isLastRow: !!isLastRow,
          nextPinned: !!nextPinned,
          prevPinned: !!prevPinned,
          nextIsFillCell: !!nextIsFillCell
        }),
        dndStyle
      )}
    >
      {/* With cell selection on, the td must not clip (its ::before paints
          the selection chrome 1px outside the cell), so the resize
          truncation moves to an inner wrapper that clips at the same
          boundary the td used to. */}
      {cellSelectionOn && props.tableLayout?.columnsResizable && column.getCanResize() ? (
        <div
          data-dense={props.tableLayout?.dense ? '' : undefined}
          {...stylex.props(s.truncateWrap)}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {props.tableLayout?.cellFillHandle &&
        selection?.['data-cell-edge-bottom'] &&
        selection['data-cell-edge-right'] && (
          <span
            data-slot='data-grid-cell-fill-handle'
            /* "dot" stays fully inside the cell corner; "ring" rides the
               corner point the way Sheets draws it. Either way the handle
               clamps where straddling would break: at the grid's own
               boundary (last row, last cell, a last cell followed only by
               the filler strip), where an overhang would extend the scroll
               content and clip the selection chrome, and beside a PINNED
               column, whose sticky layer (z 30) would otherwise paint over
               the straddling half - raising the handle instead would float
               it above the pinned column during horizontal scroll. */
            {...stylex.props(
              s.fillHandle,
              props.tableLayout?.cellFillHandleVariant === 'ring'
                ? [
                    s.fillHandleRing,
                    (isLastRow || nextPinned || nextIsFillCell) && s.fillHandleRingClampEnd,
                    isLastRow && s.fillHandleRingClampBottom
                  ]
                : props.tableLayout?.cellFillHandleVariant === 'square'
                  ? /* Abutting the cell borders from inside: no gap and no
                       overlap, so the square cannot merge with a gridline
                       into a wider-than-tall blob, and it can never leave
                       the grid, which is why it needs no boundary clamps. */
                    s.fillHandleSquare
                  : s.fillHandleDot,
              props.tableStyles?.cellFillHandle
            )}
          />
        )}
    </td>
  )

  if (!cellSelectionOn) return renderTd(null)

  // Per-cell subscription with a projecting selector: the atom writes once
  // per cell crossed during a drag, and shallow-comparing this tuple limits
  // the re-render to cells whose selection state actually changed.
  return (
    <Subscribe
      source={table.atoms.cellSelection}
      selector={() => getDataGridCellSelectionCellAttrs(cell)}
    >
      {(selection) => renderTd(selection)}
    </Subscribe>
  )
}

function DataGridTableRenderedRow<TData extends object>({
  row,
  pinnedBoundary,
  rowRef,
  rowIndex,
  wantsBorder,
  isFirstRow,
  isLastRow,
  centerWindow
}: {
  row: Row<DataGridFeatures, TData>
  pinnedBoundary?: DataGridTablePinnedBoundary
  rowRef?: Ref<HTMLTableRowElement>
  /** Virtualized list index, rendered as data-index for measureElement. */
  rowIndex?: number
  /** Whether this row paints a bottom border on its tds. */
  wantsBorder?: boolean
  /** Cell-selection overlay clamps: this row's DOM position. */
  isFirstRow?: boolean
  isLastRow?: boolean
  /**
   * Column-virtualization window over the CENTER cells: only the inclusive
   * [start, end] slice renders, and each flank collapses into one colSpan
   * spacer. The spacers carry no width of their own - the colgroup stays
   * complete, so under table-fixed the browser sizes them from the col
   * elements they span and the layout cannot drift.
   */
  centerWindow?: { start: number; end: number }
}) {
  const { props, table } = useDataGrid<TData>()
  const startVisibleCells = row.getStartVisibleCells()
  const centerVisibleCells = row.getCenterVisibleCells()
  const endVisibleCells = row.getEndVisibleCells()
  const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table)
  const windowedCenterCells = centerWindow
    ? centerVisibleCells.slice(centerWindow.start, centerWindow.end + 1)
    : centerVisibleCells
  const leadingSpacerSpan = centerWindow ? centerWindow.start : 0
  const trailingSpacerSpan = centerWindow
    ? Math.max(0, centerVisibleCells.length - 1 - centerWindow.end)
    : 0
  const orderedCells = [...startVisibleCells, ...centerVisibleCells, ...endVisibleCells]
  const rowSelected = row.getIsSelected()
  const rowStatus = props.getRowStatus?.(row.original)
  const resizableWithRightPinned = props.tableLayout?.columnsResizable && hasRightPinnedColumns
  const resizableWithoutRightPinned = props.tableLayout?.columnsResizable && !hasRightPinnedColumns

  // Cell-selection chrome clamps: neighbors and row position, resolved once
  // per row and threaded into the cells.
  const neighborFlags = (index: number) => ({
    prevPinned: index > 0 ? !!orderedCells[index - 1]?.column.getIsPinned() : false,
    nextPinned:
      index < orderedCells.length - 1 ? !!orderedCells[index + 1]?.column.getIsPinned() : false,
    nextIsFillCell:
      props.tableLayout?.columnsResizable &&
      index === orderedCells.length - 1 &&
      // The filler cell follows the last cell of the grid (either directly,
      // or after the center group when end columns are pinned).
      true
  })

  return (
    <Fragment>
      <DataGridTableBodyRow
        row={row}
        pinnedBoundary={pinnedBoundary}
        rowRef={rowRef}
        dataIndex={rowIndex}
        wantsBorder={wantsBorder}
      >
        {startVisibleCells.map((cell: Cell<DataGridFeatures, TData, unknown>, index) => (
          <DataGridTableBodyRowCell
            cell={cell}
            key={cell.id}
            isFirstRow={isFirstRow}
            isLastRow={isLastRow}
            nextPinned={neighborFlags(index).nextPinned}
            prevPinned={neighborFlags(index).prevPinned}
            nextIsFillCell={neighborFlags(index).nextIsFillCell}
            rowSelected={rowSelected}
            rowStatus={rowStatus}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataGridTableBodyRowCell>
        ))}
        {leadingSpacerSpan > 0 && (
          <td
            aria-hidden='true'
            data-slot='data-grid-table-virtual-col-spacer'
            colSpan={leadingSpacerSpan}
          />
        )}
        {windowedCenterCells.map((cell: Cell<DataGridFeatures, TData, unknown>, cellIndex) => (
          <DataGridTableBodyRowCell
            cell={cell}
            key={cell.id}
            columnIndex={centerWindow ? centerWindow.start + cellIndex : undefined}
            isFirstRow={isFirstRow}
            isLastRow={isLastRow}
            nextPinned={neighborFlags(startVisibleCells.length + cellIndex).nextPinned}
            prevPinned={neighborFlags(startVisibleCells.length + cellIndex).prevPinned}
            nextIsFillCell={neighborFlags(startVisibleCells.length + cellIndex).nextIsFillCell}
            rowSelected={rowSelected}
            rowStatus={rowStatus}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataGridTableBodyRowCell>
        ))}
        {trailingSpacerSpan > 0 && (
          <td
            aria-hidden='true'
            data-slot='data-grid-table-virtual-col-spacer'
            colSpan={trailingSpacerSpan}
          />
        )}
        {resizableWithRightPinned ? <DataGridTableFillBodyCell /> : null}
        {endVisibleCells.map((cell: Cell<DataGridFeatures, TData, unknown>) => (
          <DataGridTableBodyRowCell
            cell={cell}
            key={cell.id}
            isFirstRow={isFirstRow}
            isLastRow={isLastRow}
            rowSelected={rowSelected}
            rowStatus={rowStatus}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataGridTableBodyRowCell>
        ))}
        {resizableWithoutRightPinned ? <DataGridTableFillBodyCell /> : null}
      </DataGridTableBodyRow>
      {row.getIsExpanded() && <DataGridTableBodyRowExpandded row={row} />}
    </Fragment>
  )
}

function DataGridTableEmpty() {
  const { i18n, table, props } = useDataGrid()
  const visibleColumnCount =
    getDataGridTableOrderedVisibleColumns(table).length +
    (props.tableLayout?.columnsResizable ? 1 : 0)

  return (
    <tr>
      <td colSpan={Math.max(visibleColumnCount, 1)} {...stylex.props(s.emptyCell)}>
        {props.emptyMessage || i18n.labels.empty}
      </td>
    </tr>
  )
}

function DataGridTableLoader() {
  const { i18n, props } = useDataGrid()

  return (
    <div {...stylex.props(s.loaderWrap)}>
      <div {...stylex.props(s.loaderCard)}>
        <Spinner style={s.loaderSpinner} />
        {props.loadingMessage || i18n.labels.loading}
      </div>
    </div>
  )
}

function DataGridTableRowPin<TData extends object>({ row }: { row: Row<DataGridFeatures, TData> }) {
  const { i18n } = useDataGrid()
  const isPinned = row.getIsPinned()

  return (
    <button
      type='button'
      aria-label={isPinned ? i18n.labels.unpinRow : i18n.labels.pinRow}
      data-pinned={isPinned ? 'true' : undefined}
      onClick={(event) => {
        // Pinning must not bubble into the row's onRowClick handler.
        event.stopPropagation()

        if (isPinned) {
          row.pin(false)
        } else {
          row.pin('top')
        }
      }}
      {...stylex.props(s.rowPinButton)}
    >
      {isPinned ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='currentColor'
          stroke='none'
        >
          <path d='M16 2l4.585 4.586-2.122 2.121L17.05 7.293l-3.535 3.536 1.413 5.658-2.12 2.121-4.244-4.243L4.322 18.6l-1.414-1.41 4.242-4.244-4.243-4.243 2.122-2.121 5.656 1.414 3.536-3.536-1.414-1.414z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='12' y1='17' x2='12' y2='22' />
          <path d='M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24z' />
        </svg>
      )}
    </button>
  )
}

/**
 * Selection cell.
 *
 * The `Subscribe` wrapper is the v9 fix for React Compiler, and it is why this
 * file no longer needs `"use no memo"`. `useTable` hands back a fresh table on
 * every state change, which covers anything read through `table`, but this
 * component reads selection through `row.getIsSelected()` - a builder call
 * that hides its state dependency from the compiler. Rendered inside a column
 * `cell` template it receives a *stable* row, so the compiler is free to
 * memoize this JSX and never re-run those reads, which shows up as checkboxes
 * that do not respond to clicks.
 *
 * Subscribing to the row-selection atom gives the compiler a dependency it can
 * see. Note the standalone `Subscribe` rather than `table.Subscribe`: inside a
 * cell template the `table` handed to the column def is the core `Table`, which
 * has no `Subscribe` attached.
 */
function DataGridTableRowSelect<TData extends object>({
  row
}: {
  row: Row<DataGridFeatures, TData>
}) {
  const { i18n } = useDataGrid()
  return (
    <Subscribe source={row.table.atoms.rowSelection}>
      {() => (
        <>
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected() && !row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(event) => {
              // Selection must not bubble into the row's onRowClick handler.
              event.stopPropagation()
            }}
            aria-label={i18n.labels.selectRow}
          />
        </>
      )}
    </Subscribe>
  )
}

function DataGridTableRowSelectAll() {
  const { i18n, table, recordCount, isLoading } = useDataGrid()

  // `getIsSomePageRowsSelected()` means "at least one" in v9, where v8 meant
  // "some but not all", so the all-selected case has to be excluded explicitly
  // or the header checkbox stays indeterminate once every row is checked.
  return (
    <Subscribe source={table.atoms.rowSelection}>
      {() => {
        const isAllSelected = table.getIsAllPageRowsSelected()
        const isSomeSelected = table.getIsSomePageRowsSelected()

        return (
          <Checkbox
            checked={isAllSelected}
            indeterminate={isSomeSelected && !isAllSelected}
            disabled={isLoading || recordCount === 0}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label={i18n.labels.selectAll}
          />
        )
      }}
    </Subscribe>
  )
}

function DataGridTableRowExpand<TData extends object>({
  row,
  indent = 20,
  style,
  children
}: {
  row: Row<DataGridFeatures, TData>
  /** Horizontal offset in px applied per tree depth level. */
  indent?: number
  style?: StyleXStyles
  /** Custom toggle icon; replaces the default chevron. */
  children?: ReactNode
}) {
  const { i18n, props } = useDataGrid()
  const isExpanded = row.getIsExpanded()

  return (
    <span
      data-slot='data-grid-table-row-expand'
      style={getDataGridTreeIndentStyle(row, indent)}
      {...stylex.props(s.rowExpand, style)}
    >
      {row.getCanExpand() ? (
        <button
          type='button'
          aria-expanded={isExpanded}
          aria-label={isExpanded ? i18n.labels.collapseRow : i18n.labels.expandRow}
          data-dense={props.tableLayout?.dense ? '' : undefined}
          onClick={(event) => {
            // Expansion must not bubble into the row's onRowClick handler.
            event.stopPropagation()
            row.toggleExpanded()
          }}
          {...stylex.props(s.rowExpandButton)}
        >
          {children ?? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
              {...stylex.props(s.rowExpandChevron, !isExpanded && s.rowExpandChevronCollapsed)}
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          )}
        </button>
      ) : (
        // Leaf spacer: compact by design so leaf content sits near the
        // parent label instead of a full toggle width deeper.
        <span aria-hidden='true' {...stylex.props(s.rowExpandLeafSpacer)} />
      )}
    </span>
  )
}

function DataGridTableBodyRows<TData extends object>({
  table,
  hasFollowingFooter
}: {
  table: DataGridTableInstance<TData>
  /** A tfoot directly follows this tbody: the last row keeps its border. */
  hasFollowingFooter?: boolean
}) {
  const { i18n, isLoading, props } = useDataGrid()
  const pagination = table.state.pagination

  if (isLoading && props.loadingMode === 'skeleton' && pagination?.pageSize) {
    const leftVisibleColumns = table.getStartVisibleLeafColumns()
    const centerVisibleColumns = table.getCenterVisibleLeafColumns()
    const rightVisibleColumns = table.getEndVisibleLeafColumns()
    const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table)

    return (
      <>
        {Array.from(
          { length: pagination.pageSize },
          (_, rowIndex) => `skeleton-row-${rowIndex}`
        ).map((rowKey, rowIndex) => (
          <DataGridTableBodyRowSkeleton
            key={rowKey}
            wantsBorder={props.tableLayout?.rowBorder && rowIndex < pagination.pageSize - 1}
          >
            {[...leftVisibleColumns, ...centerVisibleColumns].map((column) => (
              <DataGridTableBodyRowSkeletonCell column={column} key={column.id}>
                {column.columnDef.meta?.skeleton}
              </DataGridTableBodyRowSkeletonCell>
            ))}
            {props.tableLayout?.columnsResizable && hasRightPinnedColumns ? (
              <DataGridTableFillBodyCell />
            ) : null}
            {rightVisibleColumns.map((column) => (
              <DataGridTableBodyRowSkeletonCell column={column} key={column.id}>
                {column.columnDef.meta?.skeleton}
              </DataGridTableBodyRowSkeletonCell>
            ))}
            {props.tableLayout?.columnsResizable && !hasRightPinnedColumns ? (
              <DataGridTableFillBodyCell />
            ) : null}
          </DataGridTableBodyRowSkeleton>
        ))}
      </>
    )
  }

  if (isLoading && props.loadingMode === 'spinner') {
    return (
      <tr>
        <td
          colSpan={
            table.getVisibleFlatColumns().length + (props.tableLayout?.columnsResizable ? 1 : 0)
          }
          {...stylex.props(s.loadingCell)}
        >
          <div {...stylex.props(s.loadingInner)}>
            <Spinner style={s.loaderSpinner} />
            <span {...stylex.props(s.loadingText)}>
              {props.loadingMessage || i18n.labels.loading}
            </span>
          </div>
        </td>
      </tr>
    )
  }

  const resolvedRows = getDataGridTableResolvedRows(table, props.tableLayout?.rowsPinnable)

  if (!resolvedRows.length) return <DataGridTableEmpty />

  return (
    <>
      {resolvedRows.map(({ row, pinnedBoundary }, index) => (
        <DataGridTableRenderedRow
          key={row.id}
          row={row}
          pinnedBoundary={pinnedBoundary}
          wantsBorder={
            !!props.tableLayout?.rowBorder &&
            !props.tableLayout?.stripped &&
            (index < resolvedRows.length - 1 || hasFollowingFooter)
          }
        />
      ))}
    </>
  )
}

/**
 * Memoized body rows: skip re-renders during active column resize.
 * Column widths update via CSS variables on the <table> element,
 * so the browser handles width changes without React re-renders.
 * A cell-selection drag gets the same treatment: the root re-renders once per
 * cell crossed, but painting goes through each cell's own Subscribe, so row
 * reconciliation during the drag is pure waste.
 */
const MemoizedDataGridTableBodyRows = memo(
  DataGridTableBodyRows,
  (_prev, next) => !!next.table.state.columnResizing.isResizingColumn
) as typeof DataGridTableBodyRows

function DataGridTableHeader() {
  const { table, props } = useDataGrid()
  const mergedHeaderGroups = getDataGridTableMergedHeaderGroups(table)
  const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table)

  return (
    <DataGridTableViewport>
      <DataGridTableBase>
        <DataGridTableHead>
          {mergedHeaderGroups.map((headerGroup) => {
            return (
              <DataGridTableHeadRow key={headerGroup.id} rowId={headerGroup.id}>
                {headerGroup.headers
                  .filter((header) => header.column.getIsPinned() !== 'end')
                  .map((header) => {
                    const { column } = header

                    return (
                      <DataGridTableHeadRowCell header={header} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {props.tableLayout?.columnsResizable && column.getCanResize() && (
                          <DataGridTableHeadRowCellResize header={header} />
                        )}
                      </DataGridTableHeadRowCell>
                    )
                  })}
                {props.tableLayout?.columnsResizable && hasRightPinnedColumns ? (
                  <DataGridTableFillHeadCell />
                ) : null}
                {headerGroup.headers
                  .filter((header) => header.column.getIsPinned() === 'end')
                  .map((header) => {
                    const { column } = header

                    return (
                      <DataGridTableHeadRowCell header={header} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {props.tableLayout?.columnsResizable && column.getCanResize() && (
                          <DataGridTableHeadRowCellResize header={header} />
                        )}
                      </DataGridTableHeadRowCell>
                    )
                  })}
                {props.tableLayout?.columnsResizable && !hasRightPinnedColumns ? (
                  <DataGridTableFillHeadCell />
                ) : null}
              </DataGridTableHeadRow>
            )
          })}
        </DataGridTableHead>
      </DataGridTableBase>
    </DataGridTableViewport>
  )
}

function DataGridTable({
  footerContent,
  renderHeader = true
}: {
  footerContent?: ReactNode
  renderHeader?: boolean
}) {
  const { table, props } = useDataGrid()
  const mergedHeaderGroups = getDataGridTableMergedHeaderGroups(table)
  const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table)

  return (
    <DataGridTableViewport>
      <DataGridTableBase>
        {renderHeader && (
          <DataGridTableHead>
            {mergedHeaderGroups.map((headerGroup) => {
              return (
                <DataGridTableHeadRow key={headerGroup.id} rowId={headerGroup.id}>
                  {headerGroup.headers
                    .filter((header) => header.column.getIsPinned() !== 'end')
                    .map((header) => {
                      const { column } = header

                      return (
                        <DataGridTableHeadRowCell header={header} key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {props.tableLayout?.columnsResizable && column.getCanResize() && (
                            <DataGridTableHeadRowCellResize header={header} />
                          )}
                        </DataGridTableHeadRowCell>
                      )
                    })}
                  {props.tableLayout?.columnsResizable && hasRightPinnedColumns ? (
                    <DataGridTableFillHeadCell />
                  ) : null}
                  {headerGroup.headers
                    .filter((header) => header.column.getIsPinned() === 'end')
                    .map((header) => {
                      const { column } = header

                      return (
                        <DataGridTableHeadRowCell header={header} key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {props.tableLayout?.columnsResizable && column.getCanResize() && (
                            <DataGridTableHeadRowCellResize header={header} />
                          )}
                        </DataGridTableHeadRowCell>
                      )
                    })}
                  {props.tableLayout?.columnsResizable && !hasRightPinnedColumns ? (
                    <DataGridTableFillHeadCell />
                  ) : null}
                </DataGridTableHeadRow>
              )
            })}
          </DataGridTableHead>
        )}

        {renderHeader && (props.tableLayout?.stripped || !props.tableLayout?.rowBorder) && (
          <DataGridTableRowSpacer />
        )}

        <DataGridTableBody>
          <MemoizedDataGridTableBodyRows table={table} hasFollowingFooter={!!footerContent} />
          {props.appendRow}
          <DataGridTableAddRow />
        </DataGridTableBody>

        {footerContent && <DataGridTableFoot>{footerContent}</DataGridTableFoot>}
      </DataGridTableBase>
    </DataGridTableViewport>
  )
}

export {
  DataGridTable,
  DataGridTableAddRow,
  DataGridTableBase,
  DataGridTableBody,
  DataGridTableBodyRow,
  DataGridTableBodyRowCell,
  DataGridTableBodyRowExpandded,
  DataGridTableRenderedRow,
  DataGridTableBodyRowSkeleton,
  DataGridTableBodyRowSkeletonCell,
  DataGridTableEmpty,
  DataGridTableFillBodyCell,
  DataGridTableFillHeadCell,
  DataGridTableFoot,
  DataGridTableFootRow,
  DataGridTableFootRowCell,
  DataGridTableHeader,
  DataGridTableHead,
  DataGridTableHeadRow,
  DataGridTableHeadRowCell,
  DataGridTableHeadRowCellResize,
  DataGridTableLoader,
  DataGridTableRowExpand,
  DataGridTableRowPin,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  DataGridTableRowSpacer,
  DataGridTableViewport,
  getDataGridScrollAreaViewport,
  getDataGridTableMergedHeaderGroups,
  getPinningStyles,
  getDataGridTableResolvedRows,
  getDataGridTableRowSections,
  getDataGridTreeIndentStyle,
  hasDataGridTableRightPinnedColumns
}

export type { DataGridTablePinnedBoundary }
