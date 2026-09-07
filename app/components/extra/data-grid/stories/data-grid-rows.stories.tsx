import type { UniqueIdentifier } from '@dnd-kit/core'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type {
  Column,
  ColumnDef,
  ExpandedState,
  PaginationState,
  RowSelectionState,
  SortingState
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronUpIcon, RefreshCwIcon } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent, CardFooter, CardHeader } from '#/components/extra/card'
import { unit } from '#/styles/core/tokens.stylex'
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridContainer,
  DataGridPagination,
  DataGridScrollArea,
  DataGridTable,
  DataGridTableRowPin,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  DataGridTableRowExpand,
  DataGridTableDndRowHandle,
  DataGridTableDndRows,
  dataGridFeatures,
  type DataGridFeatures
} from '../'
import { demoData, type IData } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Rows',
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
/* Shared module-scope styles */
/* ------------------------------------------------------------------ */

const statusStyles = stylex.create({
  muted: {
    color: s.muted.color as unknown as string
  },
  expanderButton: {
    marginInlineStart: `calc(-1 * ${unit.x2})`
  },
  expanderIcon: {
    height: 16,
    width: 16
  },
  expandedContent: {
    paddingBlock: 12,
    paddingInline: 32
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
  cardBody: {
    padding: 0
  },
  cardFooter: {
    padding: 12
  },
  cardOverflow: {
    overflow: 'hidden',
    padding: 0
  }
})

/* ------------------------------------------------------------------ */
/* Row selection */
/* ------------------------------------------------------------------ */

function selectionColumns(): ColumnDef<DataGridFeatures, IData>[] {
  return [
    {
      id: 'select',
      meta: { headerTitle: 'Select all' },
      size: 40,
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <span {...stylex.props(s.strong)}>{info.getValue() as string}</span>,
      size: 160
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200
    },
    {
      accessorKey: 'location',
      header: 'Location',
      size: 150
    },
    {
      accessorKey: 'balance',
      header: 'Balance ($)',
      cell: (info) => <>${(info.getValue() as number).toFixed(2)}</>,
      size: 120
    }
  ]
}

export const RowSelection: Story = {
  name: 'Row selection',
  render: () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
    const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])
    const columns = useMemo(() => selectionColumns(), [])
    const selectedCount = Object.keys(rowSelection).length

    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: demoData,
      pageCount: Math.ceil(demoData.length / pagination.pageSize),
      getRowId: (row: IData) => row.id,
      state: { pagination, sorting, rowSelection },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPagination,
      onSortingChange: setSorting
    })

    return (
      <DataGrid table={table} recordCount={demoData.length}>
        <div {...stylex.props(s.stack)}>
          <span {...stylex.props(s.muted)}>
            {selectedCount} of {demoData.length} selected
          </span>
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
/* Expandable rows */
/* ------------------------------------------------------------------ */

interface IDetail extends IData {
  details: string
}

const detailData: IDetail[] = demoData.slice(0, 5).map((row, index) => ({
  ...row,
  details:
    index % 2 === 0
      ? 'Full access to billing, members and security settings.'
      : 'Read-only access; cannot invite members.'
}))

function ExpandableColumns(): ColumnDef<DataGridFeatures, IDetail>[] {
  return [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <Button
            variant='ghost'
            size='icon'
            style={statusStyles.expanderButton}
            onClick={row.getToggleExpandedHandler()}
            aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          >
            {row.getIsExpanded() ? (
              <ChevronUpIcon aria-hidden='true' {...stylex.props(statusStyles.expanderIcon)} />
            ) : (
              <ChevronDownIcon aria-hidden='true' {...stylex.props(statusStyles.expanderIcon)} />
            )}
          </Button>
        ) : null,
      size: 48,
      meta: {
        // Receives `row.original` (source contract), not the TanStack row.
        // The features bundle erases TData, so narrow here.
        expandedContent: (rawRow) => {
          const row = rawRow as IDetail
          return (
            <div {...stylex.props(statusStyles.muted, statusStyles.expandedContent)}>
              {row.details}
            </div>
          )
        }
      }
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 180
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200
    },
    {
      accessorKey: 'role',
      header: 'Role',
      size: 150
    },
    {
      id: 'details',
      header: 'Access',
      cell: ({ row }) => <span {...stylex.props(s.muted)}>{row.original.details}</span>,
      size: 320
    }
  ]
}

export const ExpandableRows: Story = {
  name: 'Expandable rows',
  render: () => {
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const columns = useMemo(() => ExpandableColumns(), [])
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: detailData,
      getRowId: (row: IDetail) => row.id,
      getRowCanExpand: (row) => Boolean(row.original.details),
      state: { expanded },
      onExpandedChange: setExpanded
    })

    return (
      <DataGrid
        table={table}
        recordCount={detailData.length}
        tableLayout={{ headerBackground: false }}
      >
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Sub table (condensed) */
/* ------------------------------------------------------------------ */

interface IOrder {
  id: string
  order: string
  customer: string
  items: number
  total: number
  lines: { sku: string; name: string; qty: number; price: number }[]
}

const orderData: IOrder[] = [
  {
    id: '1',
    order: 'ORD-2041',
    customer: 'Sarah Chen',
    items: 3,
    total: 249.0,
    lines: [
      { sku: 'SKU-102', name: 'Keyboard', qty: 1, price: 99 },
      { sku: 'SKU-233', name: 'Mouse', qty: 2, price: 75 }
    ]
  },
  {
    id: '2',
    order: 'ORD-2042',
    customer: 'Michael Rodriguez',
    items: 1,
    total: 1299.0,
    lines: [{ sku: 'SKU-777', name: 'Studio Display', qty: 1, price: 1299 }]
  },
  {
    id: '3',
    order: 'ORD-2043',
    customer: 'Emma Wilson',
    items: 2,
    total: 340.5,
    lines: [
      { sku: 'SKU-310', name: 'Desk lamp', qty: 1, price: 120.5 },
      { sku: 'SKU-412', name: 'USB-C hub', qty: 1, price: 220 }
    ]
  }
]

/** Price cell shared by the order-line tables (currency, two decimals). */
const priceCell = (info: { getValue: () => unknown }) => (
  <>${(info.getValue() as number).toFixed(2)}</>
)

/** The demo owns no data writes — the drag itself is the visible reorder;
 * persisting the new order is the consumer's concern. */
function demoRowDragEnd() {}

function SubTable({ items }: { items: IOrder['lines'] }) {
  const columns = useMemo<ColumnDef<DataGridFeatures, IOrder['lines'][number]>[]>(
    () => [
      { accessorKey: 'sku', header: 'SKU', size: 120 },
      { accessorKey: 'name', header: 'Item', size: 240 },
      { accessorKey: 'qty', header: 'Qty', size: 80 },
      {
        accessorKey: 'price',
        header: 'Price ($)',
        cell: priceCell,
        size: 120
      }
    ],
    []
  )
  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: items,
    getRowId: (row) => row.sku
  })

  return (
    <div style={{ paddingBlock: 8, paddingInline: 32 }}>
      <DataGrid table={table} recordCount={items.length}>
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
      </DataGrid>
    </div>
  )
}

export const SubTableStory: Story = {
  name: 'Sub table',
  render: () => {
    const [expanded, setExpanded] = useState<ExpandedState>({ '1': true })
    const columns = useMemo<ColumnDef<DataGridFeatures, IOrder>[]>(
      () => [
        {
          accessorKey: 'order',
          header: 'Order',
          size: 140
        },
        {
          accessorKey: 'customer',
          header: 'Customer',
          size: 180
        },
        {
          accessorKey: 'items',
          header: 'Items',
          size: 90
        },
        {
          accessorKey: 'total',
          header: 'Total ($)',
          cell: (info) => <>${(info.getValue() as number).toFixed(2)}</>,
          size: 120,
          meta: {
            // The features bundle erases TData, so narrow here.
            expandedContent: (rawRow) => <SubTable items={(rawRow as IOrder).lines} />
          }
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: orderData,
      getRowId: (row: IOrder) => row.id,
      getRowCanExpand: (row) => row.original.lines.length > 0,
      state: { expanded },
      onExpandedChange: setExpanded
    })

    return (
      <DataGrid table={table} recordCount={orderData.length}>
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Draggable rows */
/* ------------------------------------------------------------------ */

export const DraggableRows: Story = {
  name: 'Draggable rows',
  render: () => {
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 8
    })
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          id: 'drag',
          size: 40,
          cell: () => <DataGridTableDndRowHandle />
        },
        {
          accessorKey: 'name',
          header: 'Name',
          cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.name}</span>,
          size: 160
        },
        {
          accessorKey: 'role',
          header: 'Occupation',
          size: 160
        },
        {
          accessorKey: 'location',
          header: 'Location',
          size: 160
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: (info) => <>${(info.getValue() as number).toFixed(2)}</>,
          size: 120
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: demoData,
      getRowId: (row: IData) => row.id,
      state: { pagination },
      onPaginationChange: setPagination
    })
    const dataIds = useMemo<UniqueIdentifier[]>(
      () => table.getRowModel().rows.map((row) => row.id),
      [table]
    )

    return (
      <DataGrid table={table} recordCount={demoData.length}>
        <div {...stylex.props(s.stack)}>
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTableDndRows handleDragEnd={demoRowDragEnd} dataIds={dataIds} />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Row pinning */
/* ------------------------------------------------------------------ */

export const RowPinningSupport: Story = {
  name: 'Row pinning support',
  render: () => {
    const [rowPinning, setRowPinning] = useState<{ top: string[]; bottom: string[] }>({
      top: ['1'],
      bottom: []
    })
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 8
    })
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          id: 'pin',
          size: 40,
          header: () => null,
          cell: ({ row }) => <DataGridTableRowPin row={row} />
        },
        {
          accessorKey: 'name',
          header: 'Team Members',
          meta: { autoSize: true },
          cell: ({ row }) => (
            <div {...stylex.props(s.cellFlex)}>
              <Avatar style={s.avatar24}>
                <AvatarImage src={row.original.avatar} alt={row.original.name} />
                <AvatarFallback>{row.original.initials}</AvatarFallback>
              </Avatar>
              <span {...stylex.props(s.strong)}>{row.original.name}</span>
            </div>
          ),
          size: 200
        },
        {
          accessorKey: 'role',
          header: 'Role',
          size: 180
        },
        {
          accessorKey: 'location',
          header: 'Location',
          size: 160
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: demoData,
      getRowId: (row: IData) => row.id,
      state: { pagination, rowPinning },
      onRowPinningChange: setRowPinning,
      onPaginationChange: setPagination,
      paginateExpandedRows: false
    })
    const pinnedCount = rowPinning.top.length

    return (
      <DataGrid
        table={table}
        recordCount={demoData.length}
        tableLayout={{ rowsPinnable: true, columnsResizable: true }}
      >
        <Card style={statusStyles.card}>
          <CardHeader style={statusStyles.cardHeader}>
            <div {...stylex.props(s.cellFlex)}>
              <span {...stylex.props(s.strong)}>Team Members</span>
              {pinnedCount > 0 ? <Badge variant='primary'>{pinnedCount} pinned</Badge> : null}
            </div>
            {pinnedCount > 0 ? (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setRowPinning({ top: [], bottom: [] })}
              >
                Unpin all
              </Button>
            ) : (
              <Button variant='ghost' size='iconSm' aria-label='Reset'>
                <RefreshCwIcon style={undefined} {...stylex.props(s.flag)} />
              </Button>
            )}
          </CardHeader>
          <CardContent style={statusStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
          <CardFooter style={statusStyles.cardFooter}>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Tree rows (condensed) */
/* ------------------------------------------------------------------ */

interface ITreeNode {
  id: string
  name: string
  type: 'department' | 'team' | 'member'
  role?: string
  avatar?: string
  status: 'active' | 'inactive'
  children?: ITreeNode[]
}

const treeData: ITreeNode[] = [
  {
    id: 'eng',
    name: 'Engineering',
    type: 'department',
    status: 'active',
    children: [
      {
        id: 'eng-platform',
        name: 'Platform',
        type: 'team',
        status: 'active',
        children: [
          {
            id: 'eng-platform-1',
            name: 'Alex Johnson',
            type: 'member',
            role: 'Developer',
            avatar: demoData[0]?.avatar,
            status: 'active'
          },
          {
            id: 'eng-platform-2',
            name: 'Sarah Chen',
            type: 'member',
            role: 'Data Scientist',
            avatar: demoData[1]?.avatar,
            status: 'active'
          }
        ]
      },
      {
        id: 'eng-mobile',
        name: 'Mobile',
        type: 'team',
        status: 'active',
        children: [
          {
            id: 'eng-mobile-1',
            name: 'Emma Wilson',
            type: 'member',
            role: 'Designer',
            avatar: demoData[3]?.avatar,
            status: 'inactive'
          }
        ]
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    type: 'department',
    status: 'active',
    children: [
      {
        id: 'design-1',
        name: 'Maria Garcia',
        type: 'member',
        role: 'Director',
        avatar: demoData[7]?.avatar,
        status: 'active'
      }
    ]
  }
]

export const TreeRows: Story = {
  name: 'Tree rows',
  render: () => {
    const [expanded, setExpanded] = useState<ExpandedState>({
      eng: true,
      'eng-platform': true
    })
    const columns = useMemo<ColumnDef<DataGridFeatures, ITreeNode>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: ({ column }) => <DataGridColumnHeaderInline title='Name' column={column} />,
          cell: ({ row }) => {
            const item = row.original
            return (
              <div {...stylex.props(s.cellFlex)}>
                <DataGridTableRowExpand row={row} />
                {item.type === 'member' ? (
                  <Fragment>
                    <Avatar style={s.avatar24}>
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>
                        {item.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <a href={`#${item.id}`} {...stylex.props(s.link, s.strong)}>
                      {item.name}
                    </a>
                  </Fragment>
                ) : (
                  <span {...stylex.props(s.strong)}>{item.name}</span>
                )}
              </div>
            )
          },
          minSize: 260,
          enableSorting: true,
          enableHiding: false,
          meta: { autoSize: true }
        },
        {
          accessorKey: 'role',
          header: 'Role',
          cell: ({ row }) => (
            <span {...stylex.props(s.muted)}>
              {row.original.role ?? (row.original.type === 'department' ? 'Department' : 'Team')}
            </span>
          ),
          size: 180
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
          size: 130
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: treeData,
      getRowId: (row: ITreeNode) => row.id,
      getSubRows: (row) => row.children,
      state: { expanded },
      onExpandedChange: setExpanded,
      paginateExpandedRows: false
    })

    return (
      <DataGrid
        table={table}
        recordCount={treeData.length}
        tableLayout={{
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true
        }}
      >
        <div {...stylex.props(s.stack)}>
          <Card style={statusStyles.cardOverflow}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </Card>
          <DataGridPagination sizes={[4, 8, 16]} />
        </div>
      </DataGrid>
    )
  }
}

/** Tree story header uses the real column header component. */
function DataGridColumnHeaderInline({
  title,
  column
}: {
  title: string
  column: Column<DataGridFeatures, ITreeNode>
}) {
  return <DataGridColumnHeader title={title} column={column} />
}
