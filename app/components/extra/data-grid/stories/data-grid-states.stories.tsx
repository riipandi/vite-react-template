import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, AvatarFallback } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/extra/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/extra/input-group'
import { Skeleton } from '#/components/extra/skeleton'
import { unit } from '#/styles/core/tokens.stylex'
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridContainer,
  DataGridPagination,
  DataGridScrollArea,
  DataGridTable,
  dataGridFeatures,
  type DataGridFeatures,
  type DataGridI18nOverrides
} from '../'
import { CountryFlag, demoData, type IBook } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/States',
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

/* ------------------------------------------------------------------ */
/* Shared bits */
/* ------------------------------------------------------------------ */

const statesStyles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    paddingBlock: 0,
    width: '100%'
  },
  cardOverflow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    overflow: 'hidden',
    paddingBlock: 0
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    justifyContent: 'space-between',
    paddingBlock: unit.x3,
    paddingInline: unit.x5
  },
  cardBody: { paddingBlock: 0 },
  muted: {
    color: s.muted.color as unknown as string
  },
  numeric: { fontVariantNumeric: 'tabular-nums' },
  flag: {
    borderRadius: '999px',
    flexShrink: 0,
    height: 16,
    width: 16
  },
  // Breathing room against the container edges (edgeCell: px-5).
  edgeCell: { paddingInline: 20 },
  searchGroup: { width: 192 }
})

const skeletonStyles = stylex.create({
  avatar: {
    borderRadius: '999px',
    height: 32,
    width: 32
  },
  // Server-side pagination skeleton (c-34 shapes).
  avatarSm: {
    borderRadius: '999px',
    height: 28,
    width: 28
  },
  nameStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  line: {
    height: 14,
    width: 96
  },
  lineSub: {
    height: 12,
    width: 144
  },
  bar: {
    height: 16,
    width: 80
  },
  chip: {
    height: 20,
    width: 64
  },
  num: {
    height: 16,
    width: 96
  },
  lineWide: {
    height: 12,
    width: 120
  },
  lineNarrow: {
    height: 10,
    width: 160
  },
  cell: {
    height: 28,
    width: 112
  },
  small: {
    height: 28,
    width: 64
  }
})

function avatarCell32({ row }: { row: { original: IBook } }) {
  return (
    <div {...stylex.props(s.cellFlexWide)}>
      <Avatar style={s.avatar32}>
        <AvatarFallback>{row.original.initials}</AvatarFallback>
      </Avatar>
      <div {...stylex.props(s.nameStack)}>
        <div {...stylex.props(s.strong)}>{row.original.title}</div>
        <div {...stylex.props(s.muted)}>{row.original.author}</div>
      </div>
    </div>
  )
}

function usePagedTable(columns: ColumnDef<DataGridFeatures, IBook>[]) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'title', desc: true }])
  return useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row: IBook) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting
  })
}

/* ------------------------------------------------------------------ */
/* Card container */
/* ------------------------------------------------------------------ */

export const CardContainer: Story = {
  name: 'Card container',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IBook>[]>(
      () => [
        {
          accessorKey: 'title',
          id: 'title',
          header: ({ column }) => <DataGridColumnHeader title='Title' visibility column={column} />,
          cell: avatarCell32,
          minSize: 200,
          // Absorbs the free card width so the table follows the card.
          meta: { autoSize: true },
          enableSorting: true,
          enableHiding: false,
          enableResizing: true
        },
        {
          accessorKey: 'country',
          id: 'country',
          header: ({ column }) => (
            <DataGridColumnHeader title='Country' visibility column={column} />
          ),
          cell: ({ row }) => (
            <div {...stylex.props(s.cellFlex)}>
              <CountryFlag
                code={row.original.flag}
                title={row.original.country}
                style={statesStyles.flag}
              />
              <span {...stylex.props(s.strong)}>{row.original.country}</span>
            </div>
          ),
          size: 200,
          enableSorting: true,
          enableHiding: true,
          enableResizing: true
        },
        {
          accessorKey: 'status',
          id: 'status',
          header: ({ column }) => (
            <DataGridColumnHeader title='Status' visibility column={column} />
          ),
          cell: ({ row }) =>
            row.original.status === 'inPrint' ? (
              <Badge variant='primary'>In print</Badge>
            ) : (
              <Badge variant='destructive'>Out of print</Badge>
            ),
          size: 200,
          enableSorting: true,
          enableHiding: true,
          enableResizing: false
        }
      ],
      []
    )
    const table = usePagedTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData.length}
        tableStyles={{ edgeCell: statesStyles.edgeCell }}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true
        }}
      >
        <Card style={statesStyles.card}>
          <CardHeader style={statesStyles.header}>
            <CardTitle>Books</CardTitle>
            <Button size='sm' variant='outline'>
              <PlusIcon style={{ height: 16, width: 16 }} />
              Add book
            </Button>
          </CardHeader>
          <CardContent style={statesStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Loading skeleton */
/* ------------------------------------------------------------------ */

export const LoadingSkeleton: Story = {
  name: 'Loading skeleton',
  render: () => {
    const [isLoading, setIsLoading] = useState(true)
    const columns = useMemo<ColumnDef<DataGridFeatures, IBook>[]>(
      () => [
        {
          accessorKey: 'title',
          id: 'title',
          header: 'Title',
          cell: ({ row }) => <AvatarCell32 {...row.original} />,
          size: 220,
          meta: {
            skeleton: (
              <div {...stylex.props(s.cellFlexWide)}>
                <Skeleton style={skeletonStyles.avatar} />
                <div {...stylex.props(s.nameStack)}>
                  <Skeleton style={skeletonStyles.lineWide} />
                  <Skeleton style={skeletonStyles.lineNarrow} />
                </div>
              </div>
            )
          }
        },
        {
          accessorKey: 'role',
          header: 'Genre',
          size: 160,
          meta: { skeleton: <Skeleton style={skeletonStyles.cell} /> }
        },
        {
          accessorKey: 'country',
          header: 'Country',
          size: 150,
          meta: { skeleton: <Skeleton style={skeletonStyles.small} /> }
        },
        {
          accessorKey: 'price',
          header: 'Price ($)',
          size: 130,
          meta: { skeleton: <Skeleton style={skeletonStyles.cell} /> }
        }
      ],
      []
    )
    const table = usePagedTable(columns)

    return (
      <DataGrid table={table} recordCount={demoData.length} isLoading={isLoading}>
        <div {...stylex.props(s.stack)}>
          <Button size='sm' variant='outline' onClick={() => setIsLoading((old) => !old)}>
            {isLoading ? 'Disable loading' : 'Enable loading'}
          </Button>
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

function AvatarCell32(row: IBook) {
  return (
    <div {...stylex.props(s.cellFlexWide)}>
      <Avatar style={s.avatar32}>
        <AvatarFallback>{row.initials}</AvatarFallback>
      </Avatar>
      <div {...stylex.props(s.nameStack)}>
        <div {...stylex.props(s.strong)}>{row.title}</div>
        <div {...stylex.props(s.muted)}>{row.author}</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Localized labels */
/* ------------------------------------------------------------------ */

const LOCALES: Record<
  string,
  {
    label: string
    columns: Record<string, string>
    status: Record<string, string>
    currency: string
    i18n: DataGridI18nOverrides
  }
> = {
  en: {
    label: 'EN',
    columns: {
      reference: 'Order',
      item: 'Book',
      city: 'City',
      status: 'Status',
      total: 'Total'
    },
    status: { shipped: 'Shipped', processing: 'Processing' },
    currency: 'USD',
    i18n: {}
  },
  de: {
    label: 'DE',
    columns: {
      reference: 'Bestellung',
      item: 'Buch',
      city: 'Stadt',
      status: 'Status',
      total: 'Gesamt'
    },
    status: { shipped: 'Versandt', processing: 'In Bearbeitung' },
    currency: 'EUR',
    i18n: {
      labels: {
        rowsPerPage: 'Zeilen pro Seite',
        previousPage: 'Zur vorherigen Seite',
        nextPage: 'Zur nächsten Seite',
        loading: 'Wird geladen...',
        empty: 'Keine Daten verfügbar',
        sortAscending: 'Aufsteigend',
        sortDescending: 'Absteigend',
        columnsMenu: 'Spalten',
        toggleColumns: 'Spalten ein-/ausschalten'
      }
    }
  },
  id: {
    label: 'ID',
    columns: {
      reference: 'Pesanan',
      item: 'Buku',
      city: 'Kota',
      status: 'Status',
      total: 'Total'
    },
    status: { shipped: 'Terkirim', processing: 'Diproses' },
    currency: 'IDR',
    i18n: {
      labels: {
        rowsPerPage: 'Baris per halaman',
        previousPage: 'Ke halaman sebelumnya',
        nextPage: 'Ke halaman berikutnya',
        loading: 'Memuat...',
        empty: 'Tidak ada data',
        sortAscending: 'Naik',
        sortDescending: 'Turun',
        columnsMenu: 'Kolom',
        toggleColumns: 'Tampilkan kolom'
      }
    }
  }
}

interface IOrderRow {
  id: string
  reference: string
  item: string
  city: string
  status: 'shipped' | 'processing'
  total: number
}

const localizedOrders: IOrderRow[] = demoData.slice(0, 6).map((row, index) => ({
  id: row.id,
  reference: `ORD-${2041 + index}`,
  item: row.title,
  city: row.country,
  status: (index % 2 === 0 ? 'shipped' : 'processing') as 'shipped' | 'processing',
  total: 120.5 + index * 84.25
}))

export const LocalizedLabels: Story = {
  name: 'Localized labels',
  render: () => {
    const [locale, setLocale] = useState<'en' | 'de' | 'id'>('en')
    const config = LOCALES[locale]!
    const columns = useMemo<ColumnDef<DataGridFeatures, IOrderRow>[]>(
      () => [
        {
          accessorKey: 'reference',
          header: config.columns.reference,
          size: 140
        },
        {
          accessorKey: 'item',
          header: config.columns.customer,
          size: 180
        },
        {
          accessorKey: 'city',
          header: config.columns.city,
          size: 160
        },
        {
          accessorKey: 'status',
          header: config.columns.status,
          cell: ({ row }) =>
            row.original.status === 'shipped' ? (
              <Badge variant='secondary'>{config.status.shipped}</Badge>
            ) : (
              <Badge variant='secondary'>{config.status.processing}</Badge>
            ),
          size: 140
        },
        {
          accessorKey: 'total',
          header: config.columns.total,
          cell: (info) => (
            <span {...stylex.props(statesStyles.numeric)}>
              {config.currency === 'IDR'
                ? `Rp ${(info.getValue() as number).toLocaleString('id-ID')}`
                : `${config.currency} ${(info.getValue() as number).toFixed(2)}`}
            </span>
          ),
          size: 140
        }
      ],
      [config]
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: localizedOrders,
      getRowId: (row) => row.id,
      state: { pagination: { pageIndex: 0, pageSize: 6 } }
    }) as never as ReturnType<typeof useTable>

    return (
      <DataGrid table={table} recordCount={localizedOrders.length} i18n={config.i18n}>
        <div {...stylex.props(s.stack)}>
          <div {...stylex.props(s.cellFlex)}>
            {(['en', 'de', 'id'] as const).map((key) => (
              <Button
                key={key}
                size='sm'
                variant={locale === key ? 'primary' : 'outline'}
                onClick={() => setLocale(key)}
              >
                {LOCALES[key]!.label}
              </Button>
            ))}
          </div>
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Server side pagination */
/* ------------------------------------------------------------------ */

const serverRecords: IBook[] = demoData
const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'In print', value: 'inPrint' },
  { label: 'Out of print', value: 'outOfPrint' }
]
type StatusFilter = 'all' | 'inPrint' | 'outOfPrint'

/** One page of rows plus the total AFTER filtering — the server contract. */
async function fetchServerPage(params: {
  pageIndex: number
  pageSize: number
  sorting: SortingState
  search: string
  status: StatusFilter
}): Promise<{ rows: IBook[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const search = params.search.toLowerCase()
  let rows = serverRecords
  if (params.status !== 'all') {
    rows = rows.filter((record) => record.status === params.status)
  }
  if (search) {
    rows = rows.filter((record) =>
      [record.title, record.author, record.publisher].some((value) =>
        value.toLowerCase().includes(search)
      )
    )
  }

  const sort = params.sorting[0]
  if (sort) {
    const direction = sort.desc ? -1 : 1
    rows = rows.toSorted((a, b) => {
      const left = a[sort.id as keyof IBook]
      const right = b[sort.id as keyof IBook]
      if (typeof left === 'number' && typeof right === 'number') {
        return (left - right) * direction
      }
      return String(left).localeCompare(String(right)) * direction
    })
  }

  const start = params.pageIndex * params.pageSize
  return {
    rows: rows.slice(start, start + params.pageSize),
    total: rows.length
  }
}

export const ServerSidePagination: Story = {
  name: 'Server side pagination',
  render: () => {
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<StatusFilter>('all')
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [rows, setRows] = useState<IBook[]>([])
    const [total, setTotal] = useState(0)
    const [isFetching, setIsFetching] = useState(true)

    // Refetch whenever the server inputs move.
    useEffect(() => {
      let alive = true
      setIsFetching(true)
      void fetchServerPage({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        search: query,
        status
      }).then((page) => {
        if (!alive) return
        setRows(page.rows)
        setTotal(page.total)
        setIsFetching(false)
      })
      return () => {
        alive = false
      }
    }, [pagination, sorting, query, status])

    const columns = useMemo<ColumnDef<DataGridFeatures, IBook>[]>(
      () => [
        {
          accessorKey: 'title',
          id: 'title',
          header: ({ column }) => <DataGridColumnHeader title='Title' column={column} />,
          cell: ({ row }) => <AvatarCell32 {...row.original} />,
          size: 230,
          meta: {
            skeleton: (
              <div {...stylex.props(s.cellFlex)}>
                <Skeleton style={skeletonStyles.avatarSm} />
                <div {...stylex.props(skeletonStyles.nameStack)}>
                  <Skeleton style={skeletonStyles.line} />
                  <Skeleton style={skeletonStyles.lineSub} />
                </div>
              </div>
            )
          }
        },
        {
          accessorKey: 'publisher',
          header: ({ column }) => <DataGridColumnHeader title='Publisher' column={column} />,
          size: 140,
          meta: { skeleton: <Skeleton style={skeletonStyles.bar} /> }
        },
        {
          accessorKey: 'status',
          header: ({ column }) => <DataGridColumnHeader title='Status' column={column} />,
          cell: ({ row }) =>
            row.original.status === 'inPrint' ? (
              <Badge variant='secondary'>In print</Badge>
            ) : (
              <Badge variant='destructive'>Out of print</Badge>
            ),
          size: 130,
          meta: { skeleton: <Skeleton style={skeletonStyles.chip} /> }
        },
        {
          accessorKey: 'price',
          header: ({ column }) => <DataGridColumnHeader title='Price ($)' column={column} />,
          cell: (info) => (
            <span {...stylex.props(statesStyles.numeric)}>
              ${(info.getValue() as number).toFixed(2)}
            </span>
          ),
          size: 130,
          meta: { skeleton: <Skeleton style={skeletonStyles.num} /> }
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: rows,
      pageCount: Math.max(1, Math.ceil(total / pagination.pageSize)),
      getRowId: (row: IBook) => row.id,
      state: { pagination, sorting },
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      manualPagination: true,
      manualSorting: true
    })

    return (
      <DataGrid table={table} recordCount={total} isLoading={isFetching}>
        <div {...stylex.props(s.stack)}>
          <Card style={statesStyles.card}>
            <CardHeader style={statesStyles.header}>
              <InputGroup style={statesStyles.searchGroup}>
                <InputGroupAddon align='inline-start'>
                  <SearchIcon style={{ height: 16, width: 16 }} />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder='Search...'
                  value={query}
                  onChange={(event) => {
                    setPagination((old) => ({ ...old, pageIndex: 0 }))
                    setQuery(event.target.value)
                  }}
                />
              </InputGroup>
              <div {...stylex.props(s.cellFlex)}>
                {STATUS_FILTERS.map(({ label, value }) => (
                  <Button
                    key={value}
                    size='sm'
                    variant={status === value ? 'primary' : 'outline'}
                    onClick={() => {
                      setPagination((old) => ({ ...old, pageIndex: 0 }))
                      setStatus(value)
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent style={statesStyles.cardBody}>
              <DataGridContainer>
                <DataGridScrollArea>
                  <DataGridTable />
                </DataGridScrollArea>
              </DataGridContainer>
            </CardContent>
          </Card>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}
