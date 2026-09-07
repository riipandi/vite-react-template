import type { Meta, StoryObj } from '@storybook/tanstack-react'
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
import { demoData, type IData } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Footers',
  parameters: { layout: 'fullscreen' },
  tags: []
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
    padding: 0,
    width: '100%'
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12
  },
  cardBody: { padding: 0 },
  total: { fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
  numeric: { fontVariantNumeric: 'tabular-nums' }
})

const fmt = (value: number) => value.toLocaleString('en-US', { minimumFractionDigits: 2 })

function useDemoTable(columns: ColumnDef<DataGridFeatures, IData>[]) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])

  return useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting
  })
}

function baseColumns(): ColumnDef<DataGridFeatures, IData>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.name}</span>,
      size: 170
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 190
    },
    {
      accessorKey: 'role',
      header: 'Occupation',
      size: 150
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) =>
        row.original.status === 'active' ? (
          <Badge variant='secondary'>Active</Badge>
        ) : (
          <Badge variant='destructive'>Inactive</Badge>
        ),
      size: 110
    },
    {
      accessorKey: 'balance',
      header: 'Balance ($)',
      cell: (info) => (
        <span {...stylex.props(footerStyles.numeric)}>
          ${(info.getValue() as number).toFixed(2)}
        </span>
      ),
      size: 130
    }
  ]
}

/** Column totals footer (ReUI c-data-grid-24). */
export const ColumnTotalsFooter: Story = {
  name: 'Column totals footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const visibleCount = table.getVisibleLeafColumns().length
    const totalBalance = demoData.reduce((total, row) => total + row.balance, 0)

    const footer = (
      <DataGridTableFootRow>
        {/* Label spans checkbox + user + role + status */}
        <DataGridTableFootRowCell colSpan={visibleCount - 2}>
          <span {...stylex.props(footerStyles.muted)}>Total balance</span>
        </DataGridTableFootRowCell>
        {/* Balance total */}
        <DataGridTableFootRowCell style={footerStyles.total}>
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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

/** Summary stats footer (ReUI c-data-grid-25). */
export const SummaryStatsFooter: Story = {
  name: 'Summary stats footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const visibleCount = table.getVisibleLeafColumns().length
    const balances = demoData.map((row) => row.balance)
    const stats = {
      minBalance: Math.min(...balances),
      maxBalance: Math.max(...balances),
      avgBalance: balances.reduce((total, value) => total + value, 0) / balances.length,
      activeCount: demoData.filter((row) => row.status === 'active').length
    }

    const footer = (
      <>
        {/* Row 1: record count, min balance, max balance */}
        <DataGridTableFootRow>
          <DataGridTableFootRowCell colSpan={visibleCount - 2} />
          <DataGridTableFootRowCell>
            <div {...stylex.props(footerStyles.stack)}>
              <span {...stylex.props(footerStyles.muted)}>Min</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.minBalance)}</span>
            </div>
          </DataGridTableFootRowCell>
          <DataGridTableFootRowCell>
            <div {...stylex.props(footerStyles.stack)}>
              <span {...stylex.props(footerStyles.muted)}>Max</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.maxBalance)}</span>
            </div>
          </DataGridTableFootRowCell>
        </DataGridTableFootRow>
        {/* Row 2: avg balance, active count */}
        <DataGridTableFootRow>
          <DataGridTableFootRowCell colSpan={visibleCount - 2}>
            <div {...stylex.props(s.cellFlex)}>
              <span {...stylex.props(footerStyles.muted)}>Avg balance</span>
              <span {...stylex.props(footerStyles.numeric)}>{fmt(stats.avgBalance)}</span>
            </div>
          </DataGridTableFootRowCell>
          <DataGridTableFootRowCell colSpan={2}>
            <div {...stylex.props(s.cellFlex)}>
              <span {...stylex.props(footerStyles.muted)}>Active</span>
              <Badge variant='secondary'>{stats.activeCount}</Badge>
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

/** Per-column aggregate footer (ReUI c-data-grid-26). */
export const PerColumnAggregateFooter: Story = {
  name: 'Per-column aggregate footer',
  render: () => {
    const columns = useMemo(() => baseColumns(), [])
    const table = useDemoTable(columns)
    const balances = demoData.map((row) => row.balance)
    const aggregates = {
      avgBalance: balances.reduce((total, value) => total + value, 0) / balances.length,
      minBalance: Math.min(...balances),
      maxBalance: Math.max(...balances)
    }

    const footer = (
      <DataGridTableFootRow>
        <DataGridTableFootRowCell colSpan={2}>
          <div {...stylex.props(footerStyles.stack)}>
            <span {...stylex.props(footerStyles.muted)}>Summary</span>
            <span {...stylex.props(footerStyles.strong)}>Across all members</span>
            <span {...stylex.props(footerStyles.muted, footerStyles.numeric)}>
              {demoData.length} members
            </span>
          </div>
        </DataGridTableFootRowCell>
        <DataGridTableFootRowCell>
          <div {...stylex.props(footerStyles.stack)}>
            <span {...stylex.props(footerStyles.muted)}>Avg</span>
            <span {...stylex.props(footerStyles.numeric)}>{fmt(aggregates.avgBalance)}</span>
            <span {...stylex.props(footerStyles.muted, footerStyles.numeric)}>
              {fmt(aggregates.minBalance)} - {fmt(aggregates.maxBalance)}
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
