/**
 * Sortable — dnd-kit based drag-and-drop reordering.
 *
 * @example
 *   <Sortable value={items} onValueChange={setItems} getItemValue={(item) => item.id}>
 *     {items.map((item) => (
 *       <SortableItem key={item.id} value={item.id}>
 *         <SortableItemHandle><GripVertical /></SortableItemHandle>
 *         {item.title}
 *       </SortableItem>
 *     ))}
 *   </Sortable>
 *
 * @see: https://docs.dndkit.com
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import type {
  DragCancelEvent,
  DragEndEvent,
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
  TouchSensor,
  useSensor,
  useSensors,
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
import type { CSSProperties, ReactElement, ReactNode } from 'react'
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore
} from 'react'
import { createPortal } from 'react-dom'
import { sortableStyles as s } from './sortable.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivRenderProps = Omit<useRender.ComponentProps<'div'>, 'className' | 'style'> & StyleProp

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

/** Per-item drag plumbing shared between `SortableItem` and its handle. */
export const SortableItemContext = createContext<{
  listeners?: DraggableSyntheticListeners | undefined
  isDragging?: boolean
  disabled?: boolean
}>({ listeners: undefined, isDragging: false, disabled: false })

/** Marks a `SortableItem` clone rendered inside `DragOverlay`. */
const IsOverlayContext = createContext(false)

const SortableInternalContext = createContext<{
  activeId: UniqueIdentifier | null
  modifiers?: Modifiers
  activeWidth: number | undefined
  setActiveWidth: (width: number | undefined) => void
}>({ activeId: null, modifiers: undefined, activeWidth: undefined, setActiveWidth: () => {} })

// ---------------------------------------------------------------------------
// dnd-kit configuration
// ---------------------------------------------------------------------------

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.4' } }
  })
}

/**
 * Client-mount gate for the `createPortal` calls below, which need
 * `document.body` and so must not run on the server or during hydration.
 *
 * A never-notifying subscription makes `useSyncExternalStore` return the
 * server snapshot (`false`) while rendering on the server and while
 * hydrating, then the client snapshot (`true`) once mounted — the same gate
 * the previous `useLayoutEffect(() => setMounted(true), [])` provided, minus
 * the extra render pass. All three functions are module-scoped so their
 * identities stay stable; an inline `getSnapshot` is the classic cause of an
 * infinite re-subscribe loop.
 */
const subscribeToNothing = () => () => {}
const getIsMounted = () => true
const getIsMountedOnServer = () => false

const MOUSE_SENSOR_CONFIG = { activationConstraint: { distance: 10 } }
const TOUCH_SENSOR_CONFIG = { activationConstraint: { delay: 250, tolerance: 5 } }
const KEYBOARD_SENSOR_CONFIG = { coordinateGetter: sortableKeyboardCoordinates }
const MEASURING_CONFIG = { droppable: { strategy: MeasuringStrategy.Always } }

const STRATEGY_MAP = {
  horizontal: rectSortingStrategy,
  grid: rectSortingStrategy,
  vertical: verticalListSortingStrategy
} as const

// ---------------------------------------------------------------------------
// Sortable (root)
// ---------------------------------------------------------------------------

export interface SortableCommitMeta<T = unknown> {
  event: DragEndEvent
  activeIndex: number
  overIndex: number
  previousValue: T[]
}

export interface SortableRootProps<T>
  extends
    Omit<useRender.ComponentProps<'div'>, 'onDragStart' | 'onDragEnd' | 'children' | 'style'>,
    StyleProp {
  value: T[]
  onValueChange: (value: T[]) => void
  getItemValue: (item: T) => string
  children: ReactNode
  onMove?: (event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void
  onValueCommit?: (value: T[], meta: SortableCommitMeta<T>) => void
  strategy?: keyof typeof STRATEGY_MAP
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragCancel?: (event: DragCancelEvent) => void
  accessibility?: React.ComponentProps<typeof DndContext>['accessibility']
  modifiers?: Modifiers
}

function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  style,
  render,
  onMove,
  onValueCommit,
  strategy = 'vertical',
  onDragStart,
  onDragEnd,
  onDragCancel,
  accessibility,
  modifiers,
  children,
  ...props
}: SortableRootProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeWidth, setActiveWidth] = useState<number | undefined>(undefined)
  const mounted = useSyncExternalStore(subscribeToNothing, getIsMounted, getIsMountedOnServer)

  const contextValue = useMemo(
    () => ({ activeId, modifiers, activeWidth, setActiveWidth }),
    [activeId, modifiers, activeWidth, setActiveWidth]
  )

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_CONFIG),
    useSensor(TouchSensor, TOUCH_SENSOR_CONFIG),
    useSensor(KeyboardSensor, KEYBOARD_SENSOR_CONFIG)
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id)
      onDragStart?.(event)
    },
    [onDragStart]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      onDragEnd?.(event)

      if (!over) return

      // Handle item reordering
      const activeIndex = value.findIndex((item: T) => getItemValue(item) === active.id)
      const overIndex = value.findIndex((item: T) => getItemValue(item) === over.id)

      if (activeIndex === -1 || overIndex === -1) return

      if (activeIndex !== overIndex) {
        if (onMove) {
          onMove({ event, activeIndex, overIndex })
        } else {
          const newValue = arrayMove(value, activeIndex, overIndex)
          onValueChange(newValue)
          onValueCommit?.(newValue, {
            event,
            activeIndex,
            overIndex,
            previousValue: value
          })
        }
      }
    },
    [value, getItemValue, onValueChange, onMove, onDragEnd, onValueCommit]
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      setActiveId(null)
      onDragCancel?.(event)
    },
    [onDragCancel]
  )

  const itemIds = useMemo(() => {
    const ids = value.map(getItemValue)

    if (process.env.NODE_ENV !== 'production') {
      const seen = new Set<string>()
      for (const id of ids) {
        if (seen.has(id)) {
          console.warn(
            `[Sortable] Duplicate item id "${id}". Item ids must be unique, or drag and drop will misbehave.`
          )
          break
        }
        seen.add(id)
      }
    }

    return ids
  }, [value, getItemValue])

  // Find the active child for the overlay
  const overlayContent = useMemo(() => {
    if (!activeId) return null

    let result: ReactNode = null
    Children.forEach(children, (child) => {
      if (isValidElement(child) && (child.props as { value?: string }).value === activeId) {
        const childStyle = (child.props as { style?: stylex.StyleXStyles }).style
        result = cloneElement(child as ReactElement<{ style?: stylex.StyleXStyles }>, {
          // Match the dragged item's measured width so the overlay doesn't
          // collapse or grow differently than its grid slot.
          style: [
            s.overlayContent,
            activeWidth != null ? { width: activeWidth } : { width: 'fit-content' },
            childStyle
          ] as stylex.StyleXStyles
        })
      }
    })
    return result
  }, [activeId, activeWidth, children])

  const rendered = useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        // `defaultMarker` powers the `stylex.when.ancestor` rules that fade
        // sibling items while a drag is in flight (see `itemFaded`).
        ...stylex.props(stylex.defaultMarker(), s.root, activeId !== null && s.rootDragging, style),
        'data-slot': 'sortable',
        'data-dragging': activeId !== null ? 'true' : undefined,
        children
      } as React.ComponentPropsWithRef<'div'>,
      props
    )
  })

  return (
    <SortableInternalContext.Provider value={contextValue}>
      <DndContext
        accessibility={accessibility}
        collisionDetection={undefined}
        measuring={MEASURING_CONFIG}
        modifiers={modifiers}
        sensors={sensors}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={itemIds} strategy={STRATEGY_MAP[strategy]}>
          {rendered}
        </SortableContext>
        {mounted &&
          createPortal(
            <DragOverlay dropAnimation={dropAnimationConfig}>{overlayContent}</DragOverlay>,
            document.body
          )}
      </DndContext>
    </SortableInternalContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// SortableItem
// ---------------------------------------------------------------------------

export interface SortableItemProps extends DivRenderProps {
  value: string
  disabled?: boolean
}

function SortableItem({ value, style, render, disabled, ...props }: SortableItemProps) {
  const isOverlay = useContext(IsOverlayContext)
  const { setActiveWidth } = useContext(SortableInternalContext)

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

  // Translate only: `rectSortingStrategy` (grid/horizontal) also returns
  // scaleX/scaleY ratios that condense the dragged tile when cells differ in
  // size — the overlay clone shows the drag, so the source needs no scaling.
  const runtimeStyle = {
    transition,
    transform: CSS.Translate.toString(transform)
  } as CSSProperties

  // Measure the dragged item's width so the portal overlay can match it.
  React.useLayoutEffect(() => {
    if (!isSortableDragging) {
      setActiveWidth(undefined)
      return
    }

    const el = document.querySelector(
      `[data-slot="sortable-item"][data-value="${value}"][data-dragging="true"]`
    ) as HTMLElement | null

    if (!el) return

    setActiveWidth(el.offsetWidth)

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          setActiveWidth(entry.contentBoxSize?.[0]?.inlineSize ?? el.offsetWidth)
        }
      }
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [isSortableDragging, setActiveWidth, value])

  return (
    <SortableItemContext.Provider value={{ listeners, isDragging: isSortableDragging, disabled }}>
      {useRender({
        defaultTagName: 'div',
        render,
        props: mergeProps<'div'>(
          stylex.props(
            s.item,
            s.itemFaded,
            !isOverlay && isSortableDragging && s.itemDragging,
            !isOverlay && isOver && !isSortableDragging && s.itemOver,
            disabled && s.itemDisabled,
            style
          ),
          !isOverlay ? { style: runtimeStyle } : undefined,
          {
            'data-slot': 'sortable-item',
            'data-value': value,
            'data-dragging': isOverlay ? true : isSortableDragging,
            'data-disabled': isOverlay ? undefined : disabled,
            ref: isOverlay ? undefined : setNodeRef,
            ...(!isOverlay ? attributes : {}),
            ...(!isOverlay ? listeners : {}),
            children: props.children
          } as React.ComponentPropsWithRef<'div'>,
          props
        )
      })}
    </SortableItemContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// SortableItemHandle
// ---------------------------------------------------------------------------

export interface SortableItemHandleProps extends DivRenderProps {
  cursor?: boolean
}

function SortableItemHandle({ style, render, cursor = true, ...props }: SortableItemHandleProps) {
  const { isDragging, disabled } = useContext(SortableItemContext)
  const { activeId } = useContext(SortableInternalContext)

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        ...stylex.props(
          s.handle,
          cursor && isDragging && s.handleDragging,
          // Handles on non-dragged items hide while a drag is in flight.
          activeId !== null && !isDragging && s.handleHiddenDuringDrag,
          disabled && s.handleDisabled,
          style
        ),
        'data-slot': 'sortable-item-handle',
        'data-dragging': isDragging,
        'data-disabled': disabled,
        children: props.children
      } as React.ComponentPropsWithRef<'div'>,
      props
    )
  })
}

// ---------------------------------------------------------------------------
// SortableOverlay
// ---------------------------------------------------------------------------

export interface SortableOverlayProps extends Omit<
  React.ComponentProps<typeof DragOverlay>,
  'children' | 'className' | 'style'
> {
  children?: ReactNode | ((params: { value: UniqueIdentifier }) => ReactNode)
}

function SortableOverlay({ children, ...props }: SortableOverlayProps) {
  const { activeId, modifiers } = useContext(SortableInternalContext)
  const mounted = useSyncExternalStore(subscribeToNothing, getIsMounted, getIsMountedOnServer)

  const content =
    activeId && children
      ? typeof children === 'function'
        ? children({ value: activeId })
        : children
      : null

  if (!mounted) return null

  return createPortal(
    <DragOverlay dropAnimation={dropAnimationConfig} modifiers={modifiers} {...props}>
      <IsOverlayContext.Provider value={true}>{content}</IsOverlayContext.Provider>
    </DragOverlay>,
    document.body
  )
}

export { Sortable, SortableItem, SortableItemHandle, SortableOverlay }
