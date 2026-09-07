import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { RefreshCwIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
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
  tags: []
} satisfies Meta

type Story = StoryObj<typeof meta>
export default meta

interface IRow {
  id: string
  name: string
  avatar: string
  email: string
  status: 'Active' | 'Inactive' | 'Pending'
  balance: number
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

const NAMES = [
  'Alex Johnson',
  'Sarah Chen',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Aron Thompson',
  'James Brown',
  'Maria Garcia',
  'Nick Johnson',
  'Liam Thompson'
]

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80'
]

function simulateRow(index: number): IRow {
  const name = NAMES[index % NAMES.length]!
  return {
    id: String(index + 1),
    name,
    avatar: AVATARS[index % AVATARS.length]!,
    email: `${name.toLowerCase().replace(' ', '.')}${index}@company.com`,
    status: (['Active', 'Inactive', 'Pending'] as const)[index % 3]!,
    balance: Math.round((Math.random() * 9000 + 1000) * 100) / 100
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
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => <DataGridColumnHeader title='User' column={column} />,
        cell: ({ row }) => (
          <div {...stylex.props(s.cellFlexWide)}>
            <Avatar style={s.avatar24}>
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span {...stylex.props(s.strong)}>{row.original.name}</span>
          </div>
        ),
        minSize: 150,
        meta: { autoSize: true },
        enableSorting: true
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: ({ column }) => <DataGridColumnHeader title='Email' column={column} />,
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
        accessorKey: 'balance',
        id: 'balance',
        header: ({ column }) => <DataGridColumnHeader title='Balance ($)' column={column} />,
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
/* Local infinite scroll (ReUI c-data-grid-27)                         */
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
/* Remote infinite scroll (ReUI c-data-grid-28)                        */
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
/* Column virtualization (ReUI c-data-grid-32)                         */
/* ------------------------------------------------------------------ */

const METRIC_COLUMN_COUNT = 60
const matrixRows = generateData(50)
const columnVirtualizerOptions = { enabled: true, overscan: 3 }

function matrixColumns(): ColumnDef<DataGridFeatures, IRow>[] {
  return [
    {
      accessorKey: 'name',
      id: 'name',
      header: ({ column }) => <DataGridColumnHeader title='Name' column={column} />,
      cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.name}</span>,
      size: 180,
      enablePinning: true,
      enableResizing: true
    },
    ...Array.from({ length: METRIC_COLUMN_COUNT }, (_, metric) => {
      return {
        accessorKey: 'balance',
        id: `metric-${metric + 1}`,
        // Matrix headers are uniform; the loose context typing keeps the
        // generated columns simple.
        // oxlint-disable-next-line @typescript-eslint/no-explicit-any
        header: (context: any) => (
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
        columnPinning: { start: ['name'] }
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
                onClick={() => setTargetColumnIndex((old) => Math.max(0, old - 1))}
              >
                Prev
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setTargetColumnIndex((old) => Math.min(METRIC_COLUMN_COUNT - 1, old + 1))
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
                  scrollToColumnIndex={targetColumnIndex}
                  scrollToColumnAlign='start'
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
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
