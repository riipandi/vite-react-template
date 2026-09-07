import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent } from '#/components/extra/card'
import {
  DataGrid,
  DataGridContainer,
  DataGridScrollArea,
  DataGridTable,
  DataGridTableFootRow,
  DataGridTableFootRowCell,
  dataGridFeatures,
  type DataGridFeatures
} from '../'
import { demoData, type IBook } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Footers',
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

const footerStyles = stylex.create({
  muted: {
    color: s.muted.color as unknown as string,
    fontSize: '0.75rem'
  },
  strong: {
    color: s.strong.color as unknown as string,
    fontWeight: 500
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    paddingBlock: 0,
    width: '100%'
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlock: 12,
    paddingInline: 24
  },
  cardBody: { paddingBlock: 0 },
  total: { fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
  numeric: { fontVariantNumeric: 'tabular-nums' }
})

const fmt = (value: number) => value.toLocaleString('en-US', { minimumFractionDigits: 2 })

function useDemoTable(columns: ColumnDef<DataGridFeatures, IBook>[]) {
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

function baseColumns(): ColumnDef<DataGridFeatures, IBook>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.title}</span>,
      size: 170,
      meta: { autoSize: true }
    },
    {
      accessorKey: 'author',
      header: 'Author',
      size: 190
    },
    {
      accessorKey: 'role',
      header: 'Genre',
      size: 150
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) =>
        row.original.status === 'inPrint' ? (
          <Badge variant='secondary'>In print</Badge>
        ) : (
          <Badge variant='destructive'>Out of print</Badge>
        ),
      size: 110
    },
    {
      accessorKey: 'price',
      header: 'Price ($)',
      cell: (info) => (
        <span {...stylex.props(footerStyles.numeric)}>
          ${(info.getValue() as number).toFixed(2)}
        </span>
      ),
      size: 130
    }
  ]
}

/** Column totals footer. */
export const ColumnTotalsFooter: Story = {
  name: 'Column totals footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const visibleCount = table.getVisibleLeafColumns().length
    const totalPrice = demoData.reduce((total, row) => total + row.price, 0)

    const footer = (
      <DataGridTableFootRow>
        {/* Label spans checkbox + title + genre + status */}
        <DataGridTableFootRowCell colSpan={visibleCount - 2}>
          <span {...stylex.props(footerStyles.muted)}>Total balance</span>
        </DataGridTableFootRowCell>
        {/* Price total */}
        <DataGridTableFootRowCell style={footerStyles.total}>
          ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </DataGridTableFootRowCell>
        {/* Actions column - empty */}
        <DataGridTableFootRowCell />
      </DataGridTableFootRow>
    )

    return (
      <DataGrid
        table={table}
        recordCount={demoData.length}
        tableLayout={{ columnsPinnable: true, columnsResizable: true, columnsVisibility: true }}
      >
        <Card style={footerStyles.card}>
          <div {...stylex.props(footerStyles.cardHeader)}>
            <span {...stylex.props(s.strong)}>Employee Balances</span>
          </div>
          <CardContent style={footerStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable footerContent={footer} />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/** Summary stats footer. */
export const SummaryStatsFooter: Story = {
  name: 'Summary stats footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const visibleCount = table.getVisibleLeafColumns().length
    const prices = demoData.map((row) => row.price)
    const stats = {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      avgPrice: prices.reduce((total, value) => total + value, 0) / prices.length,
      inPrintCount: demoData.filter((row) => row.status === 'inPrint').length
    }

    const footer = (
      <>
        {/* Row 1: record count, min balance, max balance */}
        <DataGridTableFootRow>
          <DataGridTableFootRowCell colSpan={visibleCount - 2} />
          <DataGridTableFootRowCell>
            <div {...stylex.props(footerStyles.stack)}>
              <span {...stylex.props(footerStyles.muted)}>Min</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.minPrice)}</span>
            </div>
          </DataGridTableFootRowCell>
          <DataGridTableFootRowCell>
            <div {...stylex.props(footerStyles.stack)}>
              <span {...stylex.props(footerStyles.muted)}>Max</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.maxPrice)}</span>
            </div>
          </DataGridTableFootRowCell>
        </DataGridTableFootRow>
        {/* Row 2: avg balance, active count */}
        <DataGridTableFootRow>
          <DataGridTableFootRowCell colSpan={visibleCount - 2}>
            <div {...stylex.props(s.cellFlex)}>
              <span {...stylex.props(footerStyles.muted)}>Avg balance</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.avgPrice)}</span>
            </div>
          </DataGridTableFootRowCell>
          <DataGridTableFootRowCell colSpan={2}>
            <div {...stylex.props(s.cellFlex)}>
              <span {...stylex.props(footerStyles.muted)}>In print</span>
              <Badge variant='secondary'>{stats.inPrintCount}</Badge>
            </div>
          </DataGridTableFootRowCell>
        </DataGridTableFootRow>
      </>
    )

    return (
      <DataGrid
        table={table}
        recordCount={demoData.length}
        tableLayout={{ columnsPinnable: true, columnsResizable: true }}
      >
        <Card style={footerStyles.card}>
          <div {...stylex.props(footerStyles.cardHeader)}>
            <span {...stylex.props(s.strong)}>Balance Statistics</span>
          </div>
          <CardContent style={footerStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable footerContent={footer} />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}

/** Per-column aggregate footer. */
export const PerColumnAggregateFooter: Story = {
  name: 'Per-column aggregate footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const prices = demoData.map((row) => row.price)
    const aggregates = {
      avgPrice: prices.reduce((total, value) => total + value, 0) / prices.length,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    }

    const footer = (
      <DataGridTableFootRow>
        <DataGridTableFootRowCell colSpan={2}>
          <div {...stylex.props(footerStyles.stack)}>
            <span {...stylex.props(footerStyles.muted)}>Summary</span>
            <span {...stylex.props(footerStyles.strong)}>Across all books</span>
            <span {...stylex.props(footerStyles.muted, footerStyles.numeric)}>
              {demoData.length} books
            </span>
          </div>
        </DataGridTableFootRowCell>
        <DataGridTableFootRowCell>
          <div {...stylex.props(footerStyles.stack)}>
            <span {...stylex.props(footerStyles.muted)}>Avg</span>
            <span {...stylex.props(footerStyles.numeric)}>{fmt(aggregates.avgPrice)}</span>
            <span {...stylex.props(footerStyles.muted, footerStyles.numeric)}>
              {fmt(aggregates.minPrice)} - {fmt(aggregates.maxPrice)}
            </span>
          </div>
        </DataGridTableFootRowCell>
        <DataGridTableFootRowCell />
      </DataGridTableFootRow>
    )

    return (
      <DataGrid
        table={table}
        recordCount={demoData.length}
        tableLayout={{ columnsPinnable: true, columnsResizable: true, columnsVisibility: true }}
      >
        <Card style={footerStyles.card}>
          <div {...stylex.props(footerStyles.cardHeader)}>
            <span {...stylex.props(s.strong)}>Column Aggregates</span>
          </div>
          <CardContent style={footerStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable footerContent={footer} />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
        </Card>
      </DataGrid>
    )
  }
}
