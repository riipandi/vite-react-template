import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnOrderState,
  PaginationState,
  SortingState
} from '@tanstack/react-table'
import { MailIcon, MapPinIcon, UserIcon, WalletIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridContainer,
  DataGridPagination,
  DataGridScrollArea,
  DataGridTable,
  DataGridTableDnd,
  dataGridFeatures,
  type DataGridFeatures
} from '../'
import { CountryFlag, demoData, type IData } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Columns',
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

function useDemoTable(
  columns: ColumnDef<DataGridFeatures, IData>[],
  pageSize = 5,
  initialColumnOrder: string[] = []
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(initialColumnOrder)

  return useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder
  })
}

function AvatarCell({ row }: { row: IData }) {
  return (
    <div {...stylex.props(s.cellFlexWide)}>
      <Avatar style={s.avatar32}>
        <AvatarImage src={row.avatar} alt={row.name} />
        <AvatarFallback>{row.initials}</AvatarFallback>
      </Avatar>
      <div {...stylex.props(s.nameStack)}>
        <div {...stylex.props(s.strong)}>{row.name}</div>
        <div {...stylex.props(s.muted)}>{row.email}</div>
      </div>
    </div>
  )
}

function staffColumns(withIcons: boolean): ColumnDef<DataGridFeatures, IData>[] {
  const iconStyle = stylex.create({ icon: { height: 14, width: 14 } })
  const icon = (node: React.ReactNode) => <span {...stylex.props(iconStyle.icon)}>{node}</span>
  return [
    {
      accessorKey: 'name',
      id: 'name',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Staff' column={column} icon={icon(<UserIcon />)} />
        ) : (
          <DataGridColumnHeader title='Staff' column={column} />
        ),
      cell: ({ row }) => <AvatarCell row={row.original} />,
      size: 200,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'email',
      id: 'email',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Email' column={column} icon={icon(<MailIcon />)} />
        ) : (
          <DataGridColumnHeader title='Email' column={column} />
        ),
      size: 160,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'location',
      id: 'location',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Location' column={column} icon={icon(<MapPinIcon />)} />
        ) : (
          <DataGridColumnHeader title='Location' column={column} />
        ),
      cell: ({ row }) => (
        <div {...stylex.props(s.cellFlex)}>
          <CountryFlag code={row.original.flag} title={row.original.location} style={s.flag} />
          <div {...stylex.props(s.strong)}>{row.original.location}</div>
        </div>
      ),
      size: 150,
      enableSorting: false
    },
    {
      accessorKey: 'balance',
      id: 'balance',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Dividend' column={column} icon={icon(<WalletIcon />)} />
        ) : (
          <DataGridColumnHeader title='Dividend' column={column} />
        ),
      cell: (info) => <>${(info.getValue() as number).toFixed(2)}</>,
      size: 120,
      enableSorting: true,
      enableHiding: false
    }
  ]
}

/** Column icons. */
export const ColumnIcons: Story = {
  name: 'Column icons',
  render: () => {
    const columns = useMemo(() => staffColumns(true), [])
    const table = useDemoTable(columns)

    return (
      <DataGrid table={table} recordCount={demoData?.length || 0}>
        <div {...stylex.props(s.stack)}>
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

/** Sortable columns. */
export const SortableColumns: Story = {
  name: 'Sortable columns',
  render: () => {
    const columns = useMemo(() => staffColumns(false), [])
    const table = useDemoTable(columns)

    return (
      <DataGrid table={table} recordCount={demoData?.length || 0}>
        <div {...stylex.props(s.stack)}>
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

/** Movable columns via the header menu. */
export const MovableColumns: Story = {
  name: 'Movable columns',
  render: () => {
    const columns = useMemo(() => staffColumns(false), [])
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ columnsMovable: true }}
      >
        <div {...stylex.props(s.stack)}>
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

/** Draggable columns via dnd-kit. */
export const DraggableColumns: Story = {
  name: 'Draggable columns',
  render: () => {
    const columns = useMemo(
      () =>
        staffColumns(false).map((column) => ({
          ...column,
          enableColumnOrdering: true
        })),
      []
    )
    const table = useDemoTable(
      columns,
      5,
      columns.map((column) => column.id as string)
    )
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      if (active && over && active.id !== over.id) {
        table.setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string)
          const newIndex = columnOrder.indexOf(over.id as string)
          return arrayMove(columnOrder, oldIndex, newIndex)
        })
      }
    }

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ columnsDraggable: true }}
      >
        <div {...stylex.props(s.stack)}>
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTableDnd handleDragEnd={handleDragEnd} />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/** Column resizing. */
export const ColumnResizing: Story = {
  name: 'Column resizing',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: ({ column }) => <DataGridColumnHeader title='Staff' column={column} />,
          cell: ({ row }) => <AvatarCell row={row.original} />,
          size: 400,
          minSize: 300,
          meta: { autoSize: true },
          enableSorting: true,
          enableHiding: false,
          enableResizing: true
        },
        {
          accessorKey: 'role',
          id: 'role',
          header: ({ column }) => <DataGridColumnHeader title='Occupation' column={column} />,
          size: 200,
          enableResizing: true
        },
        {
          accessorKey: 'availability',
          id: 'availability',
          header: ({ column }) => <DataGridColumnHeader title='Status' column={column} />,
          size: 200,
          enableResizing: true
        }
      ],
      []
    )
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ columnsResizable: true }}
      >
        <div {...stylex.props(s.stack)}>
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

/** Pinnable columns. */
export const PinnableColumns: Story = {
  name: 'Pinnable columns',
  render: () => {
    const columns = useMemo(() => staffColumns(false), [])
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ columnsPinnable: true, columnsResizable: true }}
      >
        <div {...stylex.props(s.stack)}>
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

/** Sticky header. */
export const StickyHeader: Story = {
  name: 'Sticky header',
  render: () => {
    const columns = useMemo(() => staffColumns(false), [])
    const table = useDemoTable(columns, 10)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ headerSticky: true }}
      >
        <div {...stylex.props(s.stack)}>
          {/* Fixed viewport height: sticky needs vertical overflow to scroll. */}
          <DataGridContainer>
            <DataGridScrollArea style={atoms.height['384px']}>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/** Column controls. */
export const ColumnControls: Story = {
  name: 'Column controls',
  render: () => {
    const columns = useMemo(() => staffColumns(false), [])
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true
        }}
      >
        <div {...stylex.props(s.stack)}>
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

/** Column visibility controls. */
export const ColumnVisibilityControls: Story = {
  name: 'Column visibility controls',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: ({ column }) => <DataGridColumnHeader title='User' visibility column={column} />,
          cell: ({ row }) => <AvatarCell row={row.original} />,
          minSize: 200,
          meta: { autoSize: true },
          enableSorting: true,
          enableHiding: false,
          enableResizing: true
        },
        {
          accessorKey: 'location',
          id: 'location',
          header: ({ column }) => (
            <DataGridColumnHeader title='Location' visibility column={column} />
          ),
          size: 175,
          enableHiding: false
        },
        {
          accessorKey: 'role',
          id: 'role',
          header: ({ column }) => (
            <DataGridColumnHeader title='Occupation' visibility column={column} />
          ),
          size: 150
        },
        {
          accessorKey: 'balance',
          id: 'balance',
          header: ({ column }) => (
            <DataGridColumnHeader title='Balance' visibility column={column} />
          ),
          size: 120
        }
      ],
      []
    )
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true
        }}
      >
        <div {...stylex.props(s.stack)}>
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
