/**
 * Kanban — dnd-kit based kanban board with column and item drag-and-drop.
 *
 * @see: https://docs.dndkit.com
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import type {
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  Modifiers,
  UniqueIdentifier
} from '@dnd-kit/core'
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useDndContext,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DraggableAttributes,
  type DraggableSyntheticListeners
} from '@dnd-kit/core'
import {
  arrayMove,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  type AnimateLayoutChanges
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from 'react'
import { createPortal } from 'react-dom'
import { kanbanStyles } from './kanban.stylex'

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

interface KanbanContextProps<T> {
  columns: Record<string, T[]>
  setColumns: (columns: Record<string, T[]>) => void
  getItemId: (item: T) => string
  columnIds: string[]
  activeId: UniqueIdentifier | null
  setActiveId: (id: UniqueIdentifier | null) => void
  findContainer: (id: UniqueIdentifier) => string | undefined
  isColumn: (id: UniqueIdentifier) => boolean
  modifiers?: Modifiers
}

const KanbanContext = createContext<KanbanContextProps<unknown>>({
  columns: {},
  setColumns: () => {},
  getItemId: () => '',
  columnIds: [],
  activeId: null,
  setActiveId: () => {},
  findContainer: () => undefined,
  isColumn: () => false,
  modifiers: undefined
})

const ColumnContext = createContext<{
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners | undefined
  isDragging?: boolean
  disabled?: boolean
}>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  isDragging: false,
  disabled: false
})

const IsOverlayContext = createContext(false)

// ---------------------------------------------------------------------------
// dnd-kit configuration
// ---------------------------------------------------------------------------

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4'
      }
    }
  })
}

/**
 * Client-mount gate for the `createPortal` call in KanbanOverlay.
 */
const subscribeToNothing = () => () => {}
const getIsMounted = () => true
const getIsMountedOnServer = () => false

const MOUSE_SENSOR_OPTIONS = { activationConstraint: { distance: 10 } }
const TOUCH_SENSOR_OPTIONS = { activationConstraint: { delay: 250, tolerance: 5 } }
const KEYBOARD_SENSOR_OPTIONS = { coordinateGetter: sortableKeyboardCoordinates }
const MEASURING_CONFIG = { droppable: { strategy: MeasuringStrategy.Always } }

/**
 * Pointer-first collision detection. The DragOverlay tracks the pointer while
 * the source node stays in its column, so rect-based strategies (the dnd-kit
 * default) keep resolving `over` to the source column — drops into empty
 * columns and column padding never register. `pointerWithin` fixes that and
 * prefers the smallest rect under the pointer (item over its column);
 * `rectIntersection` only backs it up when the pointer leaves every droppable.
 */
const collisionDetectionStrategy: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args)
  return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args)
}

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivRenderProps = Omit<useRender.ComponentProps<'div'>, 'className' | 'style'> & StyleProp

export interface KanbanMoveEvent {
  event: DragEndEvent
  activeContainer: string
  activeIndex: number
  overContainer: string
  overIndex: number
}

export interface KanbanCommitMeta<T> {
  kind: 'item' | 'column'
  event: DragEndEvent
  activeContainer: string
  activeIndex: number
  overContainer: string
  overIndex: number
  previousValue: Record<string, T[]>
}

export interface KanbanRootProps<T> extends Omit<
  DivRenderProps,
  'onDragStart' | 'onDragEnd' | 'onDragCancel'
> {
  value: Record<string, T[]>
  onValueChange: (value: Record<string, T[]>) => void
  getItemValue: (item: T) => string
  children: ReactNode
  onMove?: (event: KanbanMoveEvent) => void
  onValueCommit?: (value: Record<string, T[]>, meta: KanbanCommitMeta<T>) => void
  restoreOnCancel?: boolean
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragCancel?: (event: DragCancelEvent) => void
  accessibility?: React.ComponentProps<typeof DndContext>['accessibility']
  modifiers?: Modifiers
}

// ---------------------------------------------------------------------------
// Kanban (root)
// ---------------------------------------------------------------------------

function Kanban<T>({
  value,
  onValueChange,
  getItemValue,
  style,
  render,
  onMove,
  onValueCommit,
  restoreOnCancel = false,
  onDragStart,
  onDragEnd,
  onDragCancel,
  accessibility,
  modifiers,
  children,
  ...props
}: KanbanRootProps<T>) {
  const columns = value
  const setColumns = onValueChange
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  // Always-current mirrors so drag handlers can read fresh values without
  // widening dependency arrays.
  const valueRef = useRef(value)
  const getItemValueRef = useRef(getItemValue)

  useLayoutEffect(() => {
    valueRef.current = value
    getItemValueRef.current = getItemValue
  })

  const dragOriginRef = useRef<{
    value: Record<string, T[]>
    container: string | undefined
    index: number
  } | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
    useSensor(KeyboardSensor, KEYBOARD_SENSOR_OPTIONS)
  )

  const columnIds = useMemo(() => {
    const keys = Object.keys(columns)
    if (process.env.NODE_ENV !== 'production') {
      const seen = new Set<string>()
      for (const key of keys) {
        const items = columns[key]
        if (!items) continue
        for (const item of items) {
          const itemId = getItemValue(item)
          if (seen.has(itemId)) {
            console.warn(
              `[Kanban] Duplicate item id "${itemId}". Item ids must be unique across all columns, or drag and drop will misbehave.`
            )
            break
          }
          seen.add(itemId)
        }
      }
    }
    return keys
  }, [columns, getItemValue])

  const isColumn = useCallback(
    (id: UniqueIdentifier) => columnIds.includes(id as string),
    [columnIds]
  )

  const findContainer = useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return id as string
      return columnIds.find((key) => columns[key]?.some((item) => getItemValue(item) === id))
    },
    [columns, columnIds, getItemValue, isColumn]
  )

  const commitChange = useCallback(
    (finalValue: Record<string, T[]>, event: DragEndEvent, kind: 'item' | 'column') => {
      if (!onValueCommit) return
      const origin = dragOriginRef.current
      if (!origin) return
      const id = event.active.id
      if (kind === 'column') {
        const keys = Object.keys(finalValue)
        const overIndex = keys.indexOf(id as string)
        if (overIndex === -1 || overIndex === origin.index) return
        onValueCommit(finalValue, {
          kind: 'column',
          event,
          activeContainer: id as string,
          activeIndex: origin.index,
          overContainer: String(event.over?.id ?? id),
          overIndex,
          previousValue: origin.value
        })
        return
      }
      const getId = getItemValueRef.current
      let overContainer: string | undefined
      let overIndex = -1
      for (const key of Object.keys(finalValue)) {
        const found = finalValue[key]?.findIndex((item) => getId(item) === id)
        if (found !== undefined && found > -1) {
          overContainer = key
          overIndex = found
          break
        }
      }
      if (overContainer === undefined) return
      if (overContainer === origin.container && overIndex === origin.index) return
      onValueCommit(finalValue, {
        kind: 'item',
        event,
        activeContainer: origin.container ?? overContainer,
        activeIndex: origin.index,
        overContainer,
        overIndex,
        previousValue: origin.value
      })
    },
    [onValueCommit]
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id)
      onDragStart?.(event)
      if (onValueCommit || restoreOnCancel) {
        const snapshot = valueRef.current
        const id = event.active.id
        const keys = Object.keys(snapshot)
        if (keys.includes(id as string)) {
          dragOriginRef.current = {
            value: snapshot,
            container: id as string,
            index: keys.indexOf(id as string)
          }
        } else {
          const getId = getItemValueRef.current
          let container: string | undefined
          let index = -1
          for (const key of keys) {
            const found = snapshot[key]?.findIndex((item) => getId(item) === id)
            if (found !== undefined && found > -1) {
              container = key
              index = found
              break
            }
          }
          dragOriginRef.current = { value: snapshot, container, index }
        }
      }
    },
    [onDragStart, onValueCommit, restoreOnCancel]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      if (onMove) return
      const { active, over } = event
      if (!over) return
      if (isColumn(active.id)) return
      const activeContainer = findContainer(active.id)
      const overContainer = findContainer(over.id)
      if (!activeContainer || !overContainer) return
      if (activeContainer !== overContainer) {
        const activeItems = columns[activeContainer] ?? []
        const overItems = columns[overContainer] ?? []
        const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id)
        // When `over` is the column itself (e.g. an empty column), append to
        // the end of its item list.
        const overIndex = isColumn(over.id)
          ? overItems.length
          : overItems.findIndex((item: T) => getItemValue(item) === over.id)
        if (activeIndex === -1 || overIndex === -1) return
        const newActiveItems = [...activeItems]
        const newOverItems = [...overItems]
        const movedItems = newActiveItems.splice(activeIndex, 1)
        if (movedItems.length > 0) {
          newOverItems.splice(overIndex, 0, movedItems[0] as T)
        }
        setColumns({ ...columns, [activeContainer]: newActiveItems, [overContainer]: newOverItems })
      } else {
        const container = activeContainer
        const activeItems = columns[container] ?? []
        const overItems = columns[container] ?? []
        const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id)
        const overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id)
        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
          setColumns({ ...columns, [container]: arrayMove(activeItems, activeIndex, overIndex) })
        }
      }
    },
    [findContainer, getItemValue, isColumn, setColumns, columns, onMove]
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      const origin = dragOriginRef.current
      if (restoreOnCancel && origin && !onMove) {
        setColumns(origin.value)
      } else if (onValueCommit && origin && !onMove) {
        commitChange(valueRef.current, event, 'item')
      }
      dragOriginRef.current = null
      setActiveId(null)
      onDragCancel?.(event)
    },
    [restoreOnCancel, onMove, onValueCommit, setColumns, onDragCancel, commitChange]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      onDragEnd?.(event)
      if (!over) {
        commitChange(valueRef.current, event, 'item')
        dragOriginRef.current = null
        return
      }
      if (onMove && !isColumn(active.id)) {
        const activeContainer = findContainer(active.id)
        const overContainer = findContainer(over.id)
        if (activeContainer && overContainer) {
          const activeItems = columns[activeContainer] ?? []
          const overItems = columns[overContainer] ?? []
          const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id)
          const overIndex = isColumn(over.id)
            ? overItems.length
            : overItems.findIndex((item: T) => getItemValue(item) === over.id)
          onMove({ event, activeContainer, activeIndex, overContainer, overIndex })
        }
        dragOriginRef.current = null
        return
      }
      if (isColumn(active.id)) {
        // The drop target may be an item inside another column — resolve it
        // back to its container column so reordering works over items too.
        const overColumnId = isColumn(over.id) ? (over.id as string) : findContainer(over.id)
        const activeIndex = columnIds.indexOf(active.id as string)
        const overIndex = overColumnId ? columnIds.indexOf(overColumnId) : -1
        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
          const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex)
          const newColumns: Record<string, T[]> = {}
          newOrder.forEach((key) => {
            const items = columns[key]
            if (items) {
              newColumns[key] = items
            }
          })
          setColumns(newColumns)
          commitChange(newColumns, event, 'column')
        }
        dragOriginRef.current = null
        return
      }
      const activeContainer = findContainer(active.id)
      const overContainer = findContainer(over.id)
      if (activeContainer && overContainer && activeContainer === overContainer) {
        const container = activeContainer
        const activeItems = columns[container] ?? []
        const overItems = columns[container] ?? []
        const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id)
        const overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id)
        if (activeIndex !== overIndex) {
          const newColumns = {
            ...columns,
            [container]: arrayMove(activeItems, activeIndex, overIndex)
          }
          setColumns(newColumns)
          commitChange(newColumns, event, 'item')
        } else {
          commitChange(columns, event, 'item')
        }
      } else if (activeContainer && overContainer) {
        // Cross-column drop that dragOver did not already apply (e.g. an
        // immediate release over an empty column).
        const activeItems = columns[activeContainer] ?? []
        const overItems = columns[overContainer] ?? []
        const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id)
        const overIndex = isColumn(over.id)
          ? overItems.length
          : overItems.findIndex((item: T) => getItemValue(item) === over.id)
        if (activeIndex !== -1 && overIndex !== -1) {
          const newActiveItems = [...activeItems]
          const newOverItems = [...overItems]
          const movedItems = newActiveItems.splice(activeIndex, 1)
          if (movedItems.length > 0) {
            newOverItems.splice(overIndex, 0, movedItems[0] as T)
          }
          const newColumns = {
            ...columns,
            [activeContainer]: newActiveItems,
            [overContainer]: newOverItems
          }
          setColumns(newColumns)
          commitChange(newColumns, event, 'item')
        } else {
          commitChange(columns, event, 'item')
        }
      } else {
        commitChange(columns, event, 'item')
      }
      dragOriginRef.current = null
    },
    [
      columnIds,
      columns,
      findContainer,
      getItemValue,
      isColumn,
      setColumns,
      onMove,
      onDragEnd,
      commitChange
    ]
  )

  const contextValue = useMemo(
    () => ({
      columns,
      setColumns,
      getItemId: getItemValue,
      columnIds,
      activeId,
      setActiveId,
      findContainer,
      isColumn,
      modifiers
    }),
    [columns, setColumns, getItemValue, columnIds, activeId, findContainer, isColumn, modifiers]
  )

  return (
    <KanbanContext.Provider value={contextValue as KanbanContextProps<unknown>}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        modifiers={modifiers}
        accessibility={accessibility}
        measuring={MEASURING_CONFIG}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {useRender({
          defaultTagName: 'div',
          render,
          props: mergeProps<'div'>(
            {
              ...stylex.props(
                kanbanStyles.root,
                activeId !== null && kanbanStyles.rootDragging,
                style
              ),
              'data-slot': 'kanban',
              'data-dragging': activeId !== null ? 'true' : undefined,
              children
            } as React.ComponentPropsWithRef<'div'>,
            props
          )
        })}
      </DndContext>
    </KanbanContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// KanbanBoard
// ---------------------------------------------------------------------------

export type KanbanBoardProps = useRender.ComponentProps<'div'> & {
  style?: stylex.StyleXStyles
}

function KanbanBoard({ style, render, ...props }: KanbanBoardProps) {
  const { columnIds } = useContext(KanbanContext)

  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      {useRender({
        defaultTagName: 'div',
        render,
        props: mergeProps<'div'>(
          {
            // @ts-ignore - stylex.props return type is not recognized by TS in this context
            ...stylex.props(kanbanStyles.board, style),
            'data-slot': 'kanban-board',
            children: props.children
          } as React.ComponentPropsWithRef<'div'>,
          props
        )
      })}
    </SortableContext>
  )
}

// ---------------------------------------------------------------------------
// KanbanColumn
// ---------------------------------------------------------------------------

export interface KanbanColumnProps extends DivRenderProps {
  value: string
  disabled?: boolean
}

function KanbanColumn({ value, style, render, disabled, ...props }: KanbanColumnProps) {
  const isOverlay = useContext(IsOverlayContext)
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
    isOver
  } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges
  })

  const { activeId, isColumn } = useContext(KanbanContext)
  const isColumnDragging = activeId ? isColumn(activeId) : false

  const runtimeStyle: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <ColumnContext.Provider
      value={
        isOverlay
          ? {
              attributes: {} as DraggableAttributes,
              listeners: undefined,
              isDragging: true,
              disabled: false
            }
          : { attributes, listeners, isDragging: isColumnDragging, disabled }
      }
    >
      {useRender({
        defaultTagName: 'div',
        render,
        props: mergeProps<'div'>(
          {
            ...stylex.props(
              stylex.defaultMarker(),
              kanbanStyles.column,
              !isOverlay && isSortableDragging && kanbanStyles.columnDragging,
              !isOverlay && isOver && !isSortableDragging && kanbanStyles.columnOver,
              disabled && kanbanStyles.columnDisabled,
              style
            ),
            'data-slot': 'kanban-column',
            'data-value': value,
            'data-dragging': isOverlay ? true : isSortableDragging,
            'data-disabled': isOverlay ? undefined : disabled,
            ...(!isOverlay ? { ref: setNodeRef, style: runtimeStyle } : {}),
            children: props.children
          } as React.ComponentPropsWithRef<'div'>,
          props
        )
      })}
    </ColumnContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// KanbanColumnHandle
// ---------------------------------------------------------------------------

export interface KanbanColumnHandleProps extends DivRenderProps {
  cursor?: boolean
}

function KanbanColumnHandle({ style, render, cursor = true, ...props }: KanbanColumnHandleProps) {
  const { attributes, listeners, isDragging, disabled } = useContext(ColumnContext)
  const { activeId } = useContext(KanbanContext)

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        ...stylex.props(
          stylex.defaultMarker(),
          kanbanStyles.columnHandle,
          cursor &&
            (isDragging ? kanbanStyles.columnHandleDragging : kanbanStyles.columnHandleGrab),
          // Exactly one visibility state — non-dragged handles stay hidden
          // for the whole drag, hover included.
          isDragging
            ? kanbanStyles.columnHandleDragging
            : activeId !== null
              ? kanbanStyles.columnHandleHiddenDuringDrag
              : kanbanStyles.columnHandleVisible,
          disabled && kanbanStyles.columnHandleDisabled,
          style
        ),
        'data-slot': 'kanban-column-handle',
        'data-dragging': isDragging,
        'data-disabled': disabled,
        ...attributes,
        ...listeners,
        children: props.children
      } as React.ComponentPropsWithRef<'div'>,
      props
    )
  })
}

// ---------------------------------------------------------------------------
// KanbanItem
// ---------------------------------------------------------------------------

export interface KanbanItemProps extends DivRenderProps {
  value: string
  disabled?: boolean
}

function KanbanItem({ value, style, render, disabled, ...props }: KanbanItemProps) {
  const isOverlay = useContext(IsOverlayContext)
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
    isOver
  } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges
  })

  const runtimeStyle: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        ...stylex.props(
          stylex.defaultMarker(),
          kanbanStyles.item,
          !isOverlay && isSortableDragging && kanbanStyles.itemDragging,
          !isOverlay && isOver && !isSortableDragging && kanbanStyles.itemOver,
          disabled && kanbanStyles.itemDisabled,
          style
        ),
        'data-slot': 'kanban-item',
        'data-value': value,
        'data-dragging': isOverlay ? true : isSortableDragging,
        'data-disabled': isOverlay ? undefined : disabled,
        // The whole item is the drag surface — no separate handle affordance.
        ...(!isOverlay
          ? { ref: setNodeRef, style: runtimeStyle, ...attributes, ...listeners }
          : {}),
        children: props.children
      } as React.ComponentPropsWithRef<'div'>,
      props
    )
  })
}

// ---------------------------------------------------------------------------
// KanbanColumnContent
// ---------------------------------------------------------------------------

export interface KanbanColumnContentProps extends DivRenderProps {
  value: string
}

function KanbanColumnContent({ value, style, render, ...props }: KanbanColumnContentProps) {
  const { columns, getItemId } = useContext(KanbanContext)
  const isEmpty = (columns[value]?.length ?? 0) === 0

  const itemIds = useMemo(() => {
    const items = columns[value]
    if (!items) {
      throw new Error(
        `KanbanColumnContent: column "${value}" was not found in the Kanban value. ` +
          `Available columns: ${Object.keys(columns).join(', ') || '(none)'}.`
      )
    }
    return items.map(getItemId)
  }, [columns, getItemId, value])

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      {useRender({
        defaultTagName: 'div',
        render,
        props: mergeProps<'div'>(
          {
            ...stylex.props(
              stylex.defaultMarker(),
              kanbanStyles.columnContent,
              isEmpty && kanbanStyles.columnContentEmpty,
              style
            ),
            'data-slot': 'kanban-column-content',
            children: props.children
          } as React.ComponentPropsWithRef<'div'>,
          props
        )
      })}
    </SortableContext>
  )
}

// ---------------------------------------------------------------------------
// KanbanOverlay
// ---------------------------------------------------------------------------

export interface KanbanOverlayProps {
  children?:
    | ReactNode
    | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => ReactNode)
  style?: stylex.StyleXStyles
  render?: React.ComponentType<React.ComponentPropsWithRef<'div'>>
}

function KanbanOverlay({ children, style, ...props }: KanbanOverlayProps) {
  const { activeId, isColumn, modifiers } = useContext(KanbanContext)
  const { activeNodeRect } = useDndContext()
  const mounted = useSyncExternalStore(subscribeToNothing, getIsMounted, getIsMountedOnServer)

  const variant = activeId ? (isColumn(activeId) ? 'column' : 'item') : 'item'
  const content =
    activeId && children
      ? typeof children === 'function'
        ? children({ value: activeId, variant })
        : children
      : null

  if (!mounted) return null

  // Pin the ghost to the dragged element's measured size — DragOverlay would
  // otherwise size to its content, so the ghost does not match the column or
  // item being dragged.
  const ghostProps = stylex.props(kanbanStyles.overlayContent, style)
  const ghostSize = activeNodeRect
    ? { height: activeNodeRect.height, width: activeNodeRect.width }
    : undefined

  return createPortal(
    <DragOverlay dropAnimation={dropAnimationConfig} modifiers={modifiers} {...props}>
      <IsOverlayContext.Provider value={true}>
        <div {...ghostProps} style={{ ...ghostProps.style, ...ghostSize } as CSSProperties}>
          {content}
        </div>
      </IsOverlayContext.Provider>
    </DragOverlay>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanColumnContent,
  KanbanOverlay
}
