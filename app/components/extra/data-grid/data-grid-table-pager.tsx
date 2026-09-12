import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { ChevronLeft, ChevronRight } from '@keyline-icons/react'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { JSX, PointerEvent, ReactNode } from 'react'
import { Button } from '#/components/base/button'
import { SelectContent, SelectTrigger, SelectValue } from '#/components/base/select'
import { Select, SelectItem } from '#/components/base/select'
import { Skeleton } from '#/components/extra/skeleton'
import { useDataGrid } from './data-grid'
import { dataGridPaginationStyles } from './data-grid-table.stylex'
import { dataGridScrollAreaStyles } from './data-grid.stylex'

const MIN_THUMB_SIZE = 24
const FALLBACK_SCROLLBAR_SIZE = 12

const INITIAL_METRICS = {
  hasVerticalOverflow: false,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
} as const

type DataGridScrollAreaOrientation = 'horizontal' | 'vertical' | 'both'

interface ScrollbarMetrics {
  hasVerticalOverflow: boolean
  headerHeight: number
  horizontalScrollbarSize: number
  thumbHeight: number
  thumbTop: number
  trackHeight: number
}

interface ObservedElements {
  header: HTMLElement | null
  horizontalScrollbar: HTMLElement | null
  table: HTMLElement | null
  tableViewport: HTMLElement | null
}

type DataGridScrollAreaProps = Omit<
  BaseScrollArea.Root.Props,
  'children' | 'className' | 'style'
> & {
  children: ReactNode
  style?: StyleXStyles
  orientation?: DataGridScrollAreaOrientation
}

const scrollbarInset = stylex.create({
  inset: (start: number, end: number) => ({
    marginInlineEnd: end > 0 ? `${end}px` : null,
    marginInlineStart: start > 0 ? `${start}px` : null
  })
})

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function areMetricsEqual(next: ScrollbarMetrics, prev: ScrollbarMetrics) {
  return (
    next.hasVerticalOverflow === prev.hasVerticalOverflow &&
    next.headerHeight === prev.headerHeight &&
    next.horizontalScrollbarSize === prev.horizontalScrollbarSize &&
    next.thumbHeight === prev.thumbHeight &&
    next.thumbTop === prev.thumbTop &&
    next.trackHeight === prev.trackHeight
  )
}

function applyMetrics(element: HTMLElement, metrics: ScrollbarMetrics) {
  element.style.setProperty('--data-grid-scrollbar-header-height', `${metrics.headerHeight}px`)
  element.style.setProperty('--data-grid-scrollbar-thumb-height', `${metrics.thumbHeight}px`)
  element.style.setProperty('--data-grid-scrollbar-thumb-top', `${metrics.thumbTop}px`)
  element.style.setProperty('--data-grid-scrollbar-track-height', `${metrics.trackHeight}px`)
}

interface DataGridPaginationProps {
  sizes?: number[]
  sizesInfo?: string
  sizesLabel?: string
  sizesDescription?: string
  sizesSkeleton?: ReactNode
  more?: boolean
  moreLimit?: number
  info?: string
  infoSkeleton?: ReactNode
  style?: StyleXStyles
  rowsPerPageLabel?: string
  previousPageLabel?: string
  nextPageLabel?: string
  ellipsisText?: string
}

function DataGridPagination(props: DataGridPaginationProps): JSX.Element {
  const s = dataGridPaginationStyles
  const { i18n, table, recordCount, isLoading } = useDataGrid()

  const defaultProps: Partial<DataGridPaginationProps> = {
    sizes: [5, 10, 25, 50, 100],
    sizesSkeleton: <Skeleton style={s.sizesSkeleton} />,
    moreLimit: 5,
    infoSkeleton: <Skeleton style={s.infoSkeleton} />,
    rowsPerPageLabel: i18n.labels.rowsPerPage,
    previousPageLabel: i18n.labels.previousPage,
    nextPageLabel: i18n.labels.nextPage,
    ellipsisText: i18n.labels.paginationEllipsis
  }

  const mergedProps: DataGridPaginationProps = { ...defaultProps, ...props }

  const pageIndex = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const from = recordCount === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min((pageIndex + 1) * pageSize, recordCount)
  const pageCount = table.getPageCount()

  // A supplied `info` keeps its placeholder-template contract; the default
  // routes through the i18n label function, where word order is free.
  const paginationInfo = mergedProps.info
    ? mergedProps.info
        .replaceAll('{from}', from.toString())
        .replaceAll('{to}', to.toString())
        .replaceAll('{count}', recordCount.toString())
    : i18n.labels.paginationInfo({ from, to, count: recordCount })

  // Pagination limit logic
  const paginationMoreLimit = mergedProps.moreLimit || 5

  // Determine the start and end of the pagination group
  const currentGroupStart = Math.floor(pageIndex / paginationMoreLimit) * paginationMoreLimit
  const currentGroupEnd = Math.min(currentGroupStart + paginationMoreLimit, pageCount)

  // Render page buttons based on the current group
  const renderPageButtons = () => {
    const buttons = []
    for (let i = currentGroupStart; i < currentGroupEnd; i++) {
      buttons.push(
        <Button
          key={i}
          size='icon-sm'
          variant='ghost'
          aria-label={i18n.labels.goToPage(i + 1)}
          aria-current={pageIndex === i ? 'page' : undefined}
          style={[s.pageButton, s.pageButtonMuted, pageIndex === i && s.pageButtonActive]}
          onClick={() => {
            if (pageIndex !== i) {
              table.setPageIndex(i)
            }
          }}
        >
          {i + 1}
        </Button>
      )
    }
    return buttons
  }

  // Render a "previous" ellipsis button if there are previous pages to show
  const renderEllipsisPrevButton = () => {
    if (currentGroupStart > 0) {
      return (
        <Button
          size='icon-sm'
          variant='ghost'
          style={s.pageButton}
          onClick={() => table.setPageIndex(currentGroupStart - 1)}
        >
          {mergedProps.ellipsisText}
        </Button>
      )
    }
    return null
  }

  // Render a "next" ellipsis button if there are more pages to show after the current group
  const renderEllipsisNextButton = () => {
    if (currentGroupEnd < pageCount) {
      return (
        <Button
          size='icon-sm'
          variant='ghost'
          style={s.pageButton}
          onClick={() => table.setPageIndex(currentGroupEnd)}
        >
          {mergedProps.ellipsisText}
        </Button>
      )
    }
    return null
  }

  return (
    <div data-slot='data-grid-pagination' {...stylex.props(s.root, mergedProps.style)}>
      <div {...stylex.props(s.sizes)}>
        {isLoading ? (
          mergedProps.sizesSkeleton
        ) : (
          <>
            <div {...stylex.props(s.mutedText)}>{mergedProps.rowsPerPageLabel}</div>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                const newPageSize = Number(value)
                table.setPageSize(newPageSize)
              }}
            >
              <SelectTrigger aria-label={mergedProps.rowsPerPageLabel} style={s.pageSizeTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align='start' alignItemWithTrigger={false} style={s.pageSizeContent}>
                {mergedProps.sizes?.map((size: number) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div {...stylex.props(s.info)}>
        {isLoading ? (
          mergedProps.infoSkeleton
        ) : (
          <>
            <div {...stylex.props(s.infoText)}>{paginationInfo}</div>
            {pageCount > 1 && (
              <div {...stylex.props(s.pages)}>
                <Button
                  size='icon-sm'
                  variant='ghost'
                  style={s.arrowButton}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span {...stylex.props(s.srOnly)}>{mergedProps.previousPageLabel}</span>
                  <ChevronLeft {...stylex.props(s.arrowIcon)} />
                </Button>

                {renderEllipsisPrevButton()}

                {renderPageButtons()}

                {renderEllipsisNextButton()}

                <Button
                  size='icon-sm'
                  variant='ghost'
                  style={s.arrowButton}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span {...stylex.props(s.srOnly)}>{mergedProps.nextPageLabel}</span>
                  <ChevronRight {...stylex.props(s.arrowIcon)} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export { DataGridPagination, type DataGridPaginationProps }

function DataGridScrollArea({
  children,
  style,
  orientation = 'both',
  ...props
}: DataGridScrollAreaProps) {
  const s = dataGridScrollAreaStyles
  const { props: dataGridProps, table } = useDataGrid()
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{
    pointerId: number
    startScrollTop: number
    startY: number
  } | null>(null)
  const metricsRef = useRef<ScrollbarMetrics>(INITIAL_METRICS)
  const observedElementsRef = useRef<ObservedElements>({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  })

  const showHorizontal = orientation !== 'vertical'
  const showVertical = orientation !== 'horizontal'
  const usesCustomVerticalScrollbar = showVertical && !!dataGridProps.tableLayout?.headerSticky
  // Pinned columns are sticky and never scroll, so the horizontal scrollbar
  // track is inset to span only the scrollable center region between them.
  const isColumnsPinnable = !!dataGridProps.tableLayout?.columnsPinnable
  const scrollbarInsetStart = isColumnsPinnable ? table.getStartTotalSize() : 0
  const scrollbarInsetEnd = isColumnsPinnable ? table.getEndTotalSize() : 0
  const [hasCustomVerticalOverflow, setHasCustomVerticalOverflow] = useState(false)

  const clearDragState = useCallback(() => {
    dragRef.current = null
    document.body.style.userSelect = ''
    document.body.style.webkitUserSelect = ''
  }, [])

  // The overlay is mounted one commit after the sync that detected overflow,
  // so it misses that sync's write. Seeding it from the ref callback lands the
  // geometry during commit, before the browser paints the track.
  const setOverlayRef = useCallback((node: HTMLDivElement | null) => {
    overlayRef.current = node

    if (node) applyMetrics(node, metricsRef.current)
  }, [])

  const resetMetrics = useCallback(() => {
    if (!areMetricsEqual(INITIAL_METRICS, metricsRef.current)) {
      metricsRef.current = INITIAL_METRICS
      if (overlayRef.current) applyMetrics(overlayRef.current, INITIAL_METRICS)
    }

    setHasCustomVerticalOverflow((prev) => (prev ? false : prev))
  }, [])

  const syncCustomVerticalScrollbar = useCallback(() => {
    const container = containerRef.current
    const viewport = viewportRef.current

    if (!container || !viewport || !usesCustomVerticalScrollbar) {
      resetMetrics()
      return
    }

    const { header, horizontalScrollbar } = observedElementsRef.current
    const headerHeight = header?.getBoundingClientRect().height ?? 0
    const viewportHeight = viewport.clientHeight
    const viewportWidth = viewport.clientWidth
    const scrollHeight = viewport.scrollHeight
    const scrollWidth = viewport.scrollWidth
    const hasHorizontalOverflow = showHorizontal && scrollWidth > viewportWidth + 0.5
    const horizontalScrollbarSize = hasHorizontalOverflow
      ? horizontalScrollbar?.offsetHeight || FALLBACK_SCROLLBAR_SIZE
      : 0
    const trackHeight = Math.max(0, viewportHeight - headerHeight - horizontalScrollbarSize)
    const maxScroll = Math.max(0, scrollHeight - viewportHeight)

    let nextMetrics: ScrollbarMetrics

    if (trackHeight === 0 || maxScroll === 0) {
      nextMetrics = {
        hasVerticalOverflow: false,
        headerHeight,
        horizontalScrollbarSize,
        thumbHeight: trackHeight,
        thumbTop: 0,
        trackHeight
      }
    } else {
      const bodyContentHeight = Math.max(trackHeight, scrollHeight - headerHeight)
      const thumbHeight = clamp(
        trackHeight * (trackHeight / bodyContentHeight),
        MIN_THUMB_SIZE,
        trackHeight
      )
      const maxThumbTop = Math.max(0, trackHeight - thumbHeight)
      const thumbTop = maxThumbTop > 0 ? (viewport.scrollTop / maxScroll) * maxThumbTop : 0

      nextMetrics = {
        hasVerticalOverflow: true,
        headerHeight,
        horizontalScrollbarSize,
        thumbHeight,
        thumbTop,
        trackHeight
      }
    }

    if (!areMetricsEqual(nextMetrics, metricsRef.current)) {
      metricsRef.current = nextMetrics
      // Scoped to the overlay, never to the container. These four properties
      // inherit, and thumbTop changes on essentially every scroll frame, so
      // writing them on the element that wraps the whole grid invalidates
      // computed style for every row and cell each frame. The overlay subtree
      // is their only reader.
      if (overlayRef.current) applyMetrics(overlayRef.current, nextMetrics)
    }

    setHasCustomVerticalOverflow((prev) =>
      prev === nextMetrics.hasVerticalOverflow ? prev : nextMetrics.hasVerticalOverflow
    )
  }, [resetMetrics, showHorizontal, usesCustomVerticalScrollbar])

  useEffect(() => {
    const container = containerRef.current
    const viewport = viewportRef.current

    if (!container || !viewport) return

    if (!usesCustomVerticalScrollbar) {
      // Scheduled on the next frame: the reset is a settled-state cleanup,
      // and a synchronous setState here would chain a render off this effect.
      const resetFrame = window.requestAnimationFrame(resetMetrics)
      return () => cancelAnimationFrame(resetFrame)
    }

    let frame = 0

    const scheduleSync = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(syncCustomVerticalScrollbar)
    }

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleSync)
    const observed = new Set<HTMLElement>()

    const observeElement = (element: HTMLElement | null) => {
      if (element && observer && !observed.has(element)) {
        observer.observe(element)
        observed.add(element)
      }
    }

    const resolveObservedElements = () => {
      observedElementsRef.current = {
        header: container.querySelector(
          '[data-slot="data-grid-table"] thead'
        ) as HTMLElement | null,
        horizontalScrollbar: container.querySelector(
          '[data-slot="data-grid-scrollbar"][data-orientation="horizontal"]'
        ) as HTMLElement | null,
        table: container.querySelector('[data-slot="data-grid-table"]') as HTMLElement | null,
        tableViewport: container.querySelector(
          '[data-slot="data-grid-table-viewport"]'
        ) as HTMLElement | null
      }

      observeElement(observedElementsRef.current.header)
      observeElement(observedElementsRef.current.table)
      observeElement(observedElementsRef.current.tableViewport)

      return !!(observedElementsRef.current.header && observedElementsRef.current.table)
    }

    observeElement(viewport)
    const resolvedOnMount = resolveObservedElements()

    scheduleSync()
    viewport.addEventListener('scroll', scheduleSync, { passive: true })

    // A table that mounts after this effect (empty state swapped for data)
    // would otherwise never be observed and the custom scrollbar would
    // overlap the sticky header. One-shot: disconnects once resolved.
    let mutationObserver: MutationObserver | null = null
    if (!resolvedOnMount && typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        if (resolveObservedElements()) {
          mutationObserver?.disconnect()
          mutationObserver = null
          scheduleSync()
        }
      })
      mutationObserver.observe(container, { childList: true, subtree: true })
    }

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      mutationObserver?.disconnect()
      viewport.removeEventListener('scroll', scheduleSync)
      clearDragState()
    }
  }, [clearDragState, resetMetrics, syncCustomVerticalScrollbar, usesCustomVerticalScrollbar])

  const scrollToThumbOffset = (nextThumbTop: number) => {
    const viewport = viewportRef.current
    const { thumbHeight, trackHeight } = metricsRef.current

    if (!viewport) return

    const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
    const maxThumbTop = Math.max(0, trackHeight - thumbHeight)

    if (maxScroll === 0 || maxThumbTop === 0) {
      viewport.scrollTop = 0
      return
    }

    const ratio = clamp(nextThumbTop, 0, maxThumbTop) / maxThumbTop
    viewport.scrollTop = ratio * maxScroll
  }

  const handleThumbPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current

    if (!viewport) return

    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)

    dragRef.current = {
      pointerId: event.pointerId,
      startScrollTop: viewport.scrollTop,
      startY: event.clientY
    }

    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
  }

  const handleThumbPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    const dragState = dragRef.current
    const { thumbHeight, trackHeight } = metricsRef.current

    if (!viewport || !dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    const maxThumbTop = Math.max(0, trackHeight - thumbHeight)
    const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight)

    if (maxThumbTop === 0 || maxScroll === 0) return

    const deltaY = event.clientY - dragState.startY
    const nextScrollTop = dragState.startScrollTop + (deltaY / maxThumbTop) * maxScroll

    viewport.scrollTop = clamp(nextScrollTop, 0, maxScroll)
  }

  const handleThumbPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    clearDragState()
  }

  const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const { thumbHeight } = metricsRef.current

    if (event.target !== event.currentTarget) return

    event.preventDefault()
    event.stopPropagation()

    const rect = event.currentTarget.getBoundingClientRect()
    const offsetY = event.clientY - rect.top - thumbHeight / 2

    scrollToThumbOffset(offsetY)
  }

  return (
    <div ref={containerRef} {...stylex.props(s.root)}>
      <BaseScrollArea.Root
        data-slot='data-grid-scroll-area'
        // Styling hook: present while the sticky-header scroll mode detects
        // vertical overflow, so consumers can style scrollable vs short
        // grids with a plain ancestor attribute selector.
        data-overflow-vertical={hasCustomVerticalOverflow ? 'true' : undefined}
        {...props}
        {...stylex.props(s.root, style)}
      >
        <BaseScrollArea.Viewport
          ref={viewportRef}
          data-slot='scroll-area-viewport'
          {...stylex.props(s.viewport)}
        >
          <BaseScrollArea.Content data-slot='scroll-area-content'>
            {children}
          </BaseScrollArea.Content>
        </BaseScrollArea.Viewport>

        {showHorizontal && (
          <BaseScrollArea.Scrollbar
            data-slot='data-grid-scrollbar'
            data-orientation='horizontal'
            orientation='horizontal'
            {...stylex.props(
              s.scrollbar,
              s.scrollbarHorizontal,
              (scrollbarInsetStart > 0 || scrollbarInsetEnd > 0) &&
                scrollbarInset.inset(scrollbarInsetStart, scrollbarInsetEnd)
            )}
          >
            <BaseScrollArea.Thumb data-slot='data-grid-thumb' {...stylex.props(s.thumb)} />
          </BaseScrollArea.Scrollbar>
        )}

        {showVertical && !usesCustomVerticalScrollbar && (
          <BaseScrollArea.Scrollbar
            data-slot='data-grid-scrollbar'
            data-orientation='vertical'
            orientation='vertical'
            {...stylex.props(s.scrollbar, s.scrollbarVertical)}
          >
            <BaseScrollArea.Thumb data-slot='data-grid-thumb' {...stylex.props(s.thumb)} />
          </BaseScrollArea.Scrollbar>
        )}
      </BaseScrollArea.Root>

      {usesCustomVerticalScrollbar && hasCustomVerticalOverflow && (
        <div ref={setOverlayRef} aria-hidden='true' {...stylex.props(s.overlay)}>
          <div {...stylex.props(s.overlayTrack)} onPointerDown={handleTrackPointerDown}>
            <div
              {...stylex.props(s.overlayThumb)}
              onLostPointerCapture={clearDragState}
              onPointerCancel={handleThumbPointerUp}
              onPointerDown={handleThumbPointerDown}
              onPointerMove={handleThumbPointerMove}
              onPointerUp={handleThumbPointerUp}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { DataGridScrollArea }
export type { DataGridScrollAreaOrientation, DataGridScrollAreaProps }
