import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import { Button } from '#/components/base/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/base/select'
import { Skeleton } from '#/components/extra/skeleton'
import { useDataGrid } from './data-grid'
import { dataGridPaginationStyles as s } from './data-grid-pagination.stylex'

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
          size='iconSm'
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
          size='iconSm'
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
          size='iconSm'
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
                  size='iconSm'
                  variant='ghost'
                  style={s.arrowButton}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span {...stylex.props(s.srOnly)}>{mergedProps.previousPageLabel}</span>
                  <ChevronLeftIcon {...stylex.props(s.arrowIcon)} />
                </Button>

                {renderEllipsisPrevButton()}

                {renderPageButtons()}

                {renderEllipsisNextButton()}

                <Button
                  size='iconSm'
                  variant='ghost'
                  style={s.arrowButton}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span {...stylex.props(s.srOnly)}>{mergedProps.nextPageLabel}</span>
                  <ChevronRightIcon {...stylex.props(s.arrowIcon)} />
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
