import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type { ColumnDef, HeaderContext, SortingState } from '@tanstack/react-table'
import { RefreshCwIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, AvatarFallback } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { Card, CardContent } from '#/components/extra/card'
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridContainer,
  DataGridTableVirtual,
  dataGridFeatures,
  type DataGridFeatures
} from '../'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Infinite',
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta

type Story = StoryObj<typeof meta>
export default meta

interface IRow {
  id: string
  title: string
  author: string
  status: 'In print' | 'Out of print' | 'Pre-order'
  price: number
}

const infiniteStyles = stylex.create({
  mutedNumeric: {
    color: 'oklch(0.54 0 89.88)',
    fontVariantNumeric: 'tabular-nums'
  },
  numeric: {
    fontVariantNumeric: 'tabular-nums'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    padding: 0,
    width: '100%'
  },
  cardOverflow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    overflow: 'hidden',
    padding: 0
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    justifyContent: 'space-between',
    padding: 12
  },
  cardBody: { padding: 0 }
})

/**
 * The virtual table manages its own scroll container in standalone mode;
 * a plain div keeps the DataGridContainer width contract without double
 * scroll areas.
 */
function DataGridScrollAreaProxy({ children }: { children: React.ReactNode }) {
  return <div style={{ width: '100%' }}>{children}</div>
}

const TITLES = [
  'Angels & Demons',
  'The Da Vinci Code',
  'The Lost Symbol',
  'Inferno',
  'Origin',
  "Harry Potter and the Philosopher's Stone",
  'Harry Potter and the Chamber of Secrets',
  'Harry Potter and the Prisoner of Azkaban',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix'
]

const AUTHORS = ['Dan Brown', 'J.K. Rowling']

function simulateRow(index: number): IRow {
  return {
    id: String(index + 1),
    title: TITLES[index % TITLES.length]!,
    author: AUTHORS[index % 2]!,
    status: (['In print', 'Out of print', 'Pre-order'] as const)[index % 3]!,
    price: Math.round((Math.random() * 10 + 8) * 100) / 100
  }
}

function generateData(count: number): IRow[] {
  return Array.from({ length: count }, (_, index) => simulateRow(index))
}

function useColumns() {
  return useMemo<ColumnDef<DataGridFeatures, IRow>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'id',
        header: ({ column }) => <DataGridColumnHeader title='#' column={column} />,
        cell: ({ row }) => (
          <span {...stylex.props(infiniteStyles.mutedNumeric)}>{row.original.id}</span>
        ),
        size: 70,
        enableSorting: false
      },
      {
        accessorKey: 'title',
        id: 'title',
        header: ({ column }) => <DataGridColumnHeader title='Title' column={column} />,
        cell: ({ row }) => (
          <div {...stylex.props(s.cellFlexWide)}>
            <Avatar style={s.avatar24}>
              <AvatarFallback>
                {row.original.title
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span {...stylex.props(s.strong)}>{row.original.title}</span>
          </div>
        ),
        minSize: 150,
        meta: { autoSize: true },
        enableSorting: true
      },
      {
        accessorKey: 'author',
        id: 'author',
        header: ({ column }) => <DataGridColumnHeader title='Author' column={column} />,
        size: 200,
        enableSorting: true
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title='Status' column={column} />,
        size: 120,
        enableSorting: true
      },
      {
        accessorKey: 'price',
        id: 'price',
        header: ({ column }) => <DataGridColumnHeader title='Price ($)' column={column} />,
        cell: (info) => (
          <span {...stylex.props(infiniteStyles.numeric)}>
            ${(info.getValue() as number).toFixed(2)}
          </span>
        ),
        size: 130,
        enableSorting: true
      }
    ],
    []
  )
}

/* ------------------------------------------------------------------ */
/* Local infinite scroll */
/* ------------------------------------------------------------------ */

const LOCAL_TOTAL = 200
const localAllData = generateData(LOCAL_TOTAL)

export const LocalInfiniteScroll: Story = {
  name: 'Local infinite scroll',
  render: () => {
    const columns = useColumns()
    const [sorting, setSorting] = useState<SortingState>([])
    const [limit, setLimit] = useState(30)
    const [isFetching, setIsFetching] = useState(false)
    const hasMore = limit < LOCAL_TOTAL

    const fetchMore = useCallback(() => {
      setIsFetching(true)
      window.setTimeout(() => {
        setLimit((old) => Math.min(old + 30, LOCAL_TOTAL))
        setIsFetching(false)
      }, 600)
    }, [])

    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: localAllData.slice(0, limit),
      getRowId: (row: IRow) => row.id,
      state: { sorting },
      onSortingChange: setSorting
    })

    return (
      <DataGrid table={table} recordCount={limit}>
        <Card style={infiniteStyles.card}>
          <CardContent style={infiniteStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollAreaProxy>
                <DataGridTableVirtual
                  estimateSize={41}
                  onFetchMore={hasMore ? fetchMore : undefined}
                  isFetchingMore={isFetching}
                  hasMore={hasMore}
                  height={400}
                />
              </DataGridScrollAreaProxy>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Remote infinite scroll */
/* ------------------------------------------------------------------ */

const REMOTE_TOTAL = 200
const REMOTE_PAGE = 20

export const RemoteInfiniteScroll: Story = {
  name: 'Remote infinite scroll',
  render: () => {
    const columns = useColumns()
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<IRow[]>(() =>
      Array.from({ length: REMOTE_PAGE }, (_, index) => simulateRow(index))
    )
    const [isFetching, setIsFetching] = useState(false)
    const timeoutRef = useRef<number | null>(null)
    const hasMore = data.length < REMOTE_TOTAL

    useEffect(() => {
      return () => {
        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
      }
    }, [])

    const fetchMore = useCallback(() => {
      setIsFetching(true)
      timeoutRef.current = window.setTimeout(() => {
        setData((old) => {
          const next = Array.from({ length: REMOTE_PAGE }, (_, offset) =>
            simulateRow(old.length + offset)
          )
          return [...old, ...next]
        })
        setIsFetching(false)
      }, 700)
    }, [])

    const table = useTable({
      features: dataGridFeatures,
      columns,
      data,
      getRowId: (row: IRow) => row.id,
      state: { sorting },
      onSortingChange: setSorting
    })

    return (
      <DataGrid table={table} recordCount={data.length}>
        <Card style={infiniteStyles.card}>
          <div {...stylex.props(infiniteStyles.header)}>
            <span {...stylex.props(s.strong)}>
              {data.length} of {REMOTE_TOTAL} records
            </span>
            <Button
              variant='ghost'
              size='iconSm'
              aria-label='Reset'
              onClick={() => {
                setData(Array.from({ length: REMOTE_PAGE }, (_, index) => simulateRow(index)))
              }}
            >
              <RefreshCwIcon style={{ height: 16, width: 16 }} />
            </Button>
          </div>
          <CardContent style={infiniteStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollAreaProxy>
                <DataGridTableVirtual
                  estimateSize={41}
                  onFetchMore={hasMore ? fetchMore : undefined}
                  isFetchingMore={isFetching}
                  hasMore={hasMore}
                  height={400}
                />
              </DataGridScrollAreaProxy>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Column virtualization */
/* ------------------------------------------------------------------ */

const METRIC_COLUMN_COUNT = 36
// Same scale as the source pattern: enough columns to prove windowing.
const ROW_COUNT = 1000
const COLUMN_JUMP_SIZE = 8
const matrixRows = generateData(ROW_COUNT)
const columnVirtualizerOptions = { enabled: true, overscan: 3 }

function matrixColumns(): ColumnDef<DataGridFeatures, IRow>[] {
  return [
    {
      accessorKey: 'title',
      id: 'title',
      header: ({ column }) => <DataGridColumnHeader title='Title' column={column} />,
      cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.title}</span>,
      size: 180,
      enablePinning: true,
      enableResizing: true
    },
    ...Array.from({ length: METRIC_COLUMN_COUNT }, (_, metric) => {
      return {
        accessorKey: 'price',
        id: `metric-${metric + 1}`,
        // Matrix headers are uniform; the loose context typing keeps the
        // generated columns simple.
        header: (context: HeaderContext<DataGridFeatures, IRow>) => (
          <DataGridColumnHeader
            title={`M${String(metric + 1).padStart(2, '0')}`}
            column={context.column}
          />
        ),
        cell: (info: { getValue: () => unknown }) => (
          <span {...stylex.props(infiniteStyles.numeric)}>
            {(info.getValue() as number).toFixed(0)}
          </span>
        ),
        size: 110,
        enableResizing: false
      }
    })
  ]
}

export const ColumnVirtualization: Story = {
  name: 'Column virtualization',
  render: () => {
    const [targetColumnIndex, setTargetColumnIndex] = useState(0)
    const columns = useMemo(() => matrixColumns(), [])
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: matrixRows,
      getRowId: (row: IRow) => row.id,
      state: {
        sorting,
        // Full pinning state: table-core 9.2 reads `start`/`end` as arrays
        // (row_getCenterVisibleCells spreads both), so a partial `{ start }`
        // crashes with "end is not iterable".
        columnPinning: { start: ['name'], end: [] }
      } as never,
      onSortingChange: setSorting
    })

    return (
      <DataGrid
        table={table}
        recordCount={matrixRows.length}
        tableLayout={{
          width: 'fixed',
          dense: true,
          columnsPinnable: true,
          columnsResizable: true,
          headerSticky: true
        }}
      >
        <Card style={infiniteStyles.cardOverflow}>
          <div {...stylex.props(infiniteStyles.header)}>
            <span {...stylex.props(s.strong)}>Performance Matrix</span>
            <span {...stylex.props(s.muted)}>
              Metric {String(targetColumnIndex + 1).padStart(2, '0')} of {METRIC_COLUMN_COUNT}
            </span>
            <div {...stylex.props(s.cellFlex)}>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setTargetColumnIndex((old) => Math.max(0, old - COLUMN_JUMP_SIZE))}
              >
                Prev
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setTargetColumnIndex((old) =>
                    Math.min(METRIC_COLUMN_COUNT - 1, old + COLUMN_JUMP_SIZE)
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>
          <CardContent style={infiniteStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollAreaProxy>
                <DataGridTableVirtual
                  estimateSize={41}
                  height={420}
                  overscan={8}
                  scrollBehavior='smooth'
                  scrollToColumnIndex={targetColumnIndex}
                  scrollToColumnAlign='center'
                  columnVirtualizerOptions={columnVirtualizerOptions}
                />
              </DataGridScrollAreaProxy>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Shared bits */
/* ------------------------------------------------------------------ */
