import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import * as stylex from '@stylexjs/stylex'
import { flexRender } from '@tanstack/react-table'
import type { Cell, Header, HeaderGroup, Row } from '@tanstack/react-table'
import { GripVerticalIcon } from 'lucide-react'
import { Fragment, memo, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '#/components/base/button'
import { useDataGrid } from './data-grid'
import type { DataGridFeatures, DataGridTableInstance } from './data-grid'
import {
  DataGridTableBase,
  DataGridTableBody,
  DataGridTableBodyRow,
  DataGridTableBodyRowCell,
  DataGridTableBodyRowExpandded,
  DataGridTableBodyRowSkeleton,
  DataGridTableBodyRowSkeletonCell,
  DataGridTableEmpty,
  DataGridTableFillBodyCell,
  DataGridTableFillHeadCell,
  DataGridTableFoot,
  DataGridTableHead,
  DataGridTableHeadRow,
  DataGridTableHeadRowCell,
  DataGridTableHeadRowCellResize,
  DataGridTableRowSpacer,
  DataGridTableViewport
} from './data-grid-table'
import {
  dndCellDragStyle,
  dndGripCursorStyles,
  dataGridTableDndStyles
} from './data-grid-table-dnd.stylex'

function DataGridTableDndHeader<TData extends object>({
  header
}: {
  header: Header<DataGridFeatures, TData, unknown>
}) {
  const { i18n, props } = useDataGrid()
  const { column } = header

  // Check if column ordering is enabled for this column
  const canOrder =
    (column.columnDef as { enableColumnOrdering?: boolean }).enableColumnOrdering !== false

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: header.column.id
  })

  return (
    <DataGridTableHeadRowCell
      header={header}
      dndStyle={dndCellDragStyle(isDragging, CSS.Translate.toString(transform), transition)}
      dndRef={setNodeRef}
    >
      <div data-dragging={isDragging ? '' : undefined} {...stylex.props(s2.headerControls)}>
        {canOrder && (
          <Button
            size='iconSm'
            variant='ghost'
            style={isDragging ? dndGripCursorStyles.dragging : dndGripCursorStyles.idle}
            {...attributes}
            {...listeners}
            aria-label={i18n.labels.dragToReorder}
          >
            <GripVerticalIcon aria-hidden='true' {...stylex.props(s2.grip)} />
          </Button>
        )}
        <div {...stylex.props(s2.headerLabel)}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        {props.tableLayout?.columnsResizable && column.getCanResize() && (
          <DataGridTableHeadRowCellResize header={header} />
        )}
      </div>
    </DataGridTableHeadRowCell>
  )
}

function DataGridTableDndCell<TData extends object>({
  cell
}: {
  cell: Cell<DataGridFeatures, TData, unknown>
}) {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id
  })

  return (
    <DataGridTableBodyRowCell
      cell={cell}
      dndStyle={dndCellDragStyle(isDragging, CSS.Translate.toString(transform), transition)}
      dndRef={setNodeRef}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </DataGridTableBodyRowCell>
  )
}

function DataGridTableDndBodyRows<TData extends object>({
  table
}: {
  table: DataGridTableInstance<TData>
}) {
  const { isLoading, props } = useDataGrid()
  const pagination = table.state.pagination

  if (props.loadingMode === 'skeleton' && isLoading && pagination?.pageSize) {
    return (
      <>
        {Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
          <DataGridTableBodyRowSkeleton key={rowIndex} wantsBorder>
            {table.getVisibleFlatColumns().map((column, colIndex) => {
              return (
                <DataGridTableBodyRowSkeletonCell column={column} key={colIndex}>
                  {column.columnDef.meta?.skeleton}
                </DataGridTableBodyRowSkeletonCell>
              )
            })}
            <DataGridTableFillBodyCell />
          </DataGridTableBodyRowSkeleton>
        ))}
      </>
    )
  }

  if (!table.getRowModel().rows.length) return <DataGridTableEmpty />

  return (
    <>
      {table.getRowModel().rows.map((row: Row<DataGridFeatures, TData>) => {
        return (
          <Fragment key={row.id}>
            <DataGridTableBodyRow row={row}>
              <SortableContext
                items={table.state.columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {row.getVisibleCells().map((cell: Cell<DataGridFeatures, TData, unknown>) => (
                  <DataGridTableDndCell cell={cell} key={cell.id} />
                ))}
              </SortableContext>
              <DataGridTableFillBodyCell />
            </DataGridTableBodyRow>
            {row.getIsExpanded() && <DataGridTableBodyRowExpandded row={row} />}
          </Fragment>
        )
      })}
    </>
  )
}

/**
 * Memoized body rows: skip re-renders during active column resize.
 * Column widths update via CSS variables on the <table> element,
 * so the browser handles width changes without React re-renders.
 */
const MemoizedDataGridTableDndBodyRows = memo(
  DataGridTableDndBodyRows,
  (_prev, next) => !!next.table.state.columnResizing.isResizingColumn
) as typeof DataGridTableDndBodyRows

function DataGridTableDnd<TData extends object>({
  handleDragEnd,
  footerContent
}: {
  handleDragEnd: (event: DragEndEvent) => void
  footerContent?: ReactNode
}) {
  const { table, props } = useDataGrid()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDraggingColumn, setIsDraggingColumn] = useState(false)

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    // Keyboard reordering moves one sortable position per keypress instead
    // of the sensor's raw 25px default.
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    if (!isDraggingColumn) return

    const { body, documentElement } = document
    const previousBodyCursor = body.style.cursor
    const previousDocumentCursor = documentElement.style.cursor

    body.style.cursor = 'grabbing'
    documentElement.style.cursor = 'grabbing'

    return () => {
      body.style.cursor = previousBodyCursor
      documentElement.style.cursor = previousDocumentCursor
    }
  }, [isDraggingColumn])

  // Custom modifier to restrict dragging within table bounds with edge offset
  const modifiers = useMemo(() => {
    const restrictToTableBounds: Modifier = ({ draggingNodeRect, transform }) => {
      if (!draggingNodeRect || !containerRef.current) {
        return { ...transform, y: 0 }
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const edgeOffset = 0

      const minX = containerRect.left - draggingNodeRect.left - edgeOffset
      const maxX = containerRect.right - draggingNodeRect.left - draggingNodeRect.width + edgeOffset

      return {
        ...transform,
        x: Math.min(Math.max(transform.x, minX), maxX),
        y: 0 // Lock vertical movement
      }
    }

    return [restrictToTableBounds]
  }, [])

  return (
    <DndContext
      collisionDetection={closestCenter}
      id={useId()}
      modifiers={modifiers}
      onDragCancel={() => setIsDraggingColumn(false)}
      onDragEnd={(event) => {
        setIsDraggingColumn(false)
        handleDragEnd(event)
      }}
      onDragStart={() => setIsDraggingColumn(true)}
      sensors={sensors}
    >
      <DataGridTableViewport
        viewportRef={containerRef}
        style={isDraggingColumn ? { cursor: 'grabbing' } : undefined}
      >
        <DataGridTableBase>
          <DataGridTableHead>
            {table
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<DataGridFeatures, TData>, index) => {
                return (
                  <DataGridTableHeadRow key={index} rowId={headerGroup.id}>
                    <SortableContext
                      items={table.state.columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      {headerGroup.headers.map((header) => (
                        <DataGridTableDndHeader header={header} key={header.id} />
                      ))}
                    </SortableContext>
                    <DataGridTableFillHeadCell />
                  </DataGridTableHeadRow>
                )
              })}
          </DataGridTableHead>

          {(props.tableLayout?.stripped || !props.tableLayout?.rowBorder) && (
            <DataGridTableRowSpacer />
          )}

          <DataGridTableBody>
            <MemoizedDataGridTableDndBodyRows table={table} />
          </DataGridTableBody>

          {footerContent && <DataGridTableFoot>{footerContent}</DataGridTableFoot>}
        </DataGridTableBase>
      </DataGridTableViewport>
    </DndContext>
  )
}

// Local alias to keep the stylex import list tight in the header component.
const s2 = dataGridTableDndStyles

export { DataGridTableDnd }
export type { DataGridTableDndProps }
interface DataGridTableDndProps {
  handleDragEnd: (event: DragEndEvent) => void
  footerContent?: ReactNode
}
