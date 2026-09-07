import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnOrderState,
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Card } from '#/components/extra/card'
import {
  DataGrid,
  DataGridContainer,
  DataGridPagination,
  DataGridScrollArea,
  DataGridTable,
  dataGridFeatures,
  type DataGridFeatures
} from '../'
import { demoData, type IData } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Basics',
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
  columnOrderState?: {
    columnOrder?: ColumnOrderState
    onColumnOrderChange?: OnChangeFn<ColumnOrderState>
  }
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])

  return useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      ...columnOrderState
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    ...columnOrderState
  })
}

const AvatarCell = ({ row }: { row: IData & { initials: string } }) => (
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

const AvatarLinkCell = ({ row }: { row: IData & { initials: string } }) => (
  <div {...stylex.props(s.cellFlex)}>
    <Avatar style={s.avatar24}>
      <AvatarImage src={row.avatar} alt={row.name} />
      <AvatarFallback>{row.initials}</AvatarFallback>
    </Avatar>
    <a href={`#${row.id}`} {...stylex.props(s.link, s.strong)}>
      {row.name}
    </a>
  </div>
)

const balanceCell = (info: { getValue: () => unknown }) => (
  <>${(info.getValue() as number).toFixed(2)}</>
)

/** Pagination. */
export const Pagination: Story = {
  name: 'Pagination',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          header: 'Name',
          cell: (info) => <>{info.getValue() as string}</>,
          size: 150
        },
        {
          accessorKey: 'email',
          header: 'Email',
          cell: (info) => (
            <div {...stylex.props(s.truncate)}>
              <a href={`mailto:${info.getValue()}`} {...stylex.props(s.link, s.truncate)}>
                {info.getValue() as string}
              </a>
            </div>
          ),
          size: 150
        },
        {
          accessorKey: 'location',
          header: 'Location',
          cell: ({ row }) => (
            <div {...stylex.props(s.cellFlex)}>
              <img
                src={`https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`}
                alt={row.original.flag}
                {...stylex.props(s.flag)}
              />
              <div>{row.original.location}</div>
            </div>
          ),
          size: 175
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: balanceCell,
          size: 100,
          meta: {
            headerStyle: s.textEnd,
            cellStyle: s.textEnd
          }
        }
      ],
      []
    )
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

/** Cell border. */
export const CellBorder: Story = {
  name: 'Cell border',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: 'Name',
          cell: ({ row }) => <AvatarCell row={row.original} />,
          size: 250,
          enableSorting: true,
          enableHiding: false
        },
        {
          accessorKey: 'company',
          header: 'Company',
          size: 100
        },
        {
          accessorKey: 'role',
          header: 'Occupation',
          size: 100
        },
        {
          accessorKey: 'balance',
          header: 'Salary',
          cell: (info) => (
            <span {...stylex.props(s.salary)}>${(info.getValue() as number).toFixed(2)}</span>
          ),
          size: 100
        }
      ],
      []
    )
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
    const table = useDemoTable(columns, {
      columnOrder,
      onColumnOrderChange: setColumnOrder
    })

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ cellBorder: true }}
      >
        <div {...stylex.props(s.stack)}>
          <Card style={s.cardFlush}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </Card>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/** Dense layout. */
export const DenseLayout: Story = {
  name: 'Dense layout',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: 'Name',
          cell: ({ row }) => <AvatarLinkCell row={row.original} />,
          size: 200,
          enableSorting: true,
          enableHiding: false
        },
        {
          accessorKey: 'email',
          header: 'Email',
          cell: (info) => (
            <a href={`mailto:${info.getValue()}`} {...stylex.props(s.link)}>
              {info.getValue() as string}
            </a>
          ),
          size: 175
        },
        {
          accessorKey: 'location',
          header: 'Location',
          size: 150
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: balanceCell,
          size: 100
        }
      ],
      []
    )
    const table = useDemoTable(columns)

    return (
      <DataGrid table={table} recordCount={demoData?.length || 0} tableLayout={{ dense: true }}>
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

/** Without table borders. */
export const WithoutTableBorders: Story = {
  name: 'Without table borders',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: 'Name',
          cell: ({ row }) => <AvatarCell row={row.original} />,
          size: 225,
          enableSorting: true,
          enableHiding: false
        },
        {
          accessorKey: 'location',
          header: 'Location',
          size: 175
        },
        {
          accessorKey: 'role',
          header: 'Occupation',
          size: 150
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: balanceCell,
          size: 100
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
          headerBackground: false,
          rowBorder: false,
          rowRounded: true
        }}
      >
        <div {...stylex.props(s.stack)}>
          <Card style={s.cardFlush}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </Card>
          <DataGridPagination />
        </div>
      </DataGrid>
    )
  }
}

/** Striped rows. */
export const StripedRows: Story = {
  name: 'Striped rows',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: 'Name',
          cell: ({ row }) => <AvatarLinkCell row={row.original} />,
          size: 175,
          enableSorting: true,
          enableHiding: false
        },
        {
          accessorKey: 'email',
          header: 'Email',
          cell: (info) => (
            <a href={`mailto:${info.getValue()}`} {...stylex.props(s.link)}>
              {info.getValue() as string}
            </a>
          ),
          size: 180
        },
        {
          accessorKey: 'location',
          header: 'Location',
          size: 160
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: balanceCell,
          size: 100
        }
      ],
      []
    )
    const table = useDemoTable(columns)

    return (
      <DataGrid
        table={table}
        recordCount={demoData?.length || 0}
        tableLayout={{ stripped: true, rowRounded: true }}
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

/** Auto width table layout. */
export const AutoWidthTableLayout: Story = {
  name: 'Auto width table layout',
  render: () => {
    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          id: 'name',
          header: 'Name',
          cell: ({ row }) => <AvatarLinkCell row={row.original} />,
          size: 225,
          enableSorting: true,
          enableHiding: false
        },
        {
          accessorKey: 'email',
          header: 'Email',
          cell: (info) => (
            <a href={`mailto:${info.getValue()}`} {...stylex.props(s.link)}>
              {info.getValue() as string}
            </a>
          ),
          size: 200
        },
        {
          accessorKey: 'joined',
          header: 'Joined',
          size: 120
        },
        {
          accessorKey: 'balance',
          header: 'Balance ($)',
          cell: balanceCell,
          size: 120
        }
      ],
      []
    )
    const table = useDemoTable(columns)

    return (
      <DataGrid table={table} recordCount={demoData?.length || 0} tableLayout={{ width: 'auto' }}>
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
