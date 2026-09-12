import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Mail, MapPin, User, Wallet } from '@keyline-icons/react'
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
import { useMemo, useState } from 'react'
import { Avatar, AvatarFallback } from '#/components/base/avatar'
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
import { CountryFlag, demoData, type IBook } from './_mocks'
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
  columns: ColumnDef<DataGridFeatures, IBook>[],
  pageSize = 5,
  initialColumnOrder: string[] = []
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'title', desc: true }])
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(initialColumnOrder)

  return useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pageSize),
    getRowId: (row: IBook) => row.id,
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

function AvatarCell({ row }: { row: IBook }) {
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

function bookColumns(withIcons: boolean): ColumnDef<DataGridFeatures, IBook>[] {
  const iconStyle = stylex.create({ icon: { height: 14, width: 14 } })
  const icon = (node: React.ReactNode) => <span {...stylex.props(iconStyle.icon)}>{node}</span>
  return [
    {
      accessorKey: 'title',
      id: 'title',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Title' column={column} icon={icon(<User />)} />
        ) : (
          <DataGridColumnHeader title='Title' column={column} />
        ),
      cell: ({ row }) => <AvatarCell row={row.original} />,
      size: 200,
      meta: { autoSize: true },
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'author',
      id: 'author',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Author' column={column} icon={icon(<Mail />)} />
        ) : (
          <DataGridColumnHeader title='Author' column={column} />
        ),
      size: 160,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'country',
      id: 'country',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Country' column={column} icon={icon(<MapPin />)} />
        ) : (
          <DataGridColumnHeader title='Country' column={column} />
        ),
      cell: ({ row }) => (
        <div {...stylex.props(s.cellFlex)}>
          <CountryFlag code={row.original.flag} title={row.original.country} style={s.flag} />
          <div {...stylex.props(s.strong)}>{row.original.country}</div>
        </div>
      ),
      size: 150,
      enableSorting: false
    },
    {
      accessorKey: 'price',
      id: 'price',
      header: ({ column }) =>
        withIcons ? (
          <DataGridColumnHeader title='Price' column={column} icon={icon(<Wallet />)} />
        ) : (
          <DataGridColumnHeader title='Price' column={column} />
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
    const columns = useMemo(() => bookColumns(true), [])
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
    const columns = useMemo(() => bookColumns(false), [])
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
    const columns = useMemo(() => bookColumns(false), [])
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
        bookColumns(false).map((column) => ({
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
    const columns = useMemo<ColumnDef<DataGridFeatures, IBook>[]>(
      () => [
        {
          accessorKey: 'title',
          id: 'title',
          header: ({ column }) => <DataGridColumnHeader title='Title' column={column} />,
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
          header: ({ column }) => <DataGridColumnHeader title='Genre' column={column} />,
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
    const columns = useMemo(() => bookColumns(false), [])
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
    const columns = useMemo(() => bookColumns(false), [])
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
    const columns = useMemo(() => bookColumns(false), [])
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
    const columns = useMemo<ColumnDef<DataGridFeatures, IBook>[]>(
      () => [
        {
          accessorKey: 'title',
          id: 'title',
          header: ({ column }) => <DataGridColumnHeader title='Title' visibility column={column} />,
          cell: ({ row }) => <AvatarCell row={row.original} />,
          minSize: 200,
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
          size: 175,
          enableHiding: false
        },
        {
          accessorKey: 'genre',
          id: 'genre',
          header: ({ column }) => <DataGridColumnHeader title='Genre' visibility column={column} />,
          size: 150
        },
        {
          accessorKey: 'price',
          id: 'price',
          header: ({ column }) => <DataGridColumnHeader title='Price' visibility column={column} />,
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
