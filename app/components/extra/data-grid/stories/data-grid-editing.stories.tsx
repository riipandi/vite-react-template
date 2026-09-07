import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useTable } from '@tanstack/react-table'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '#/components/extra/card'
import { InputGroup, InputGroupAddon } from '#/components/extra/input-group'
import {
  DataGrid,
  DataGridCellSelection,
  DataGridContainer,
  DataGridPagination,
  DataGridScrollArea,
  DataGridTable,
  dataGridFeatures,
  type DataGridCellsChangeDetails,
  type DataGridCellStatus,
  type DataGridFeatures,
  type DataGridRowStatus
} from '../'
import { demoData, type IData } from './_mocks'
import { stackStyles as s } from './_mocks.stylex'

const meta = {
  title: 'Data Grid/Editing',
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
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const editingStyles = stylex.create({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlock: 8,
    paddingInline: 14
  },
  searchGroup: { width: 192 },
  cardBody: { padding: 0 },
  // Breathing room against the container edges (ReUI c-31 edgeCell: first
  // ps-4 / last pe-4; a symmetric inline padding reads the same on fixed
  // columns and stays within StyleXStyles' static-only shape).
  edgeCell: { paddingInline: 16 },
  right: {
    display: 'block',
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'end',
    width: '100%'
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%'
  },
  frameHeader: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    padding: 12
  },
  frameBody: { padding: 0 },
  frameFooter: { padding: 12 },
  statusCell: { fontWeight: 500 }
})

/* ------------------------------------------------------------------ */
/* CRUD features (ReUI c-data-grid-22)                                 */
/* ------------------------------------------------------------------ */

export const CrudFeatures: Story = {
  name: 'CRUD features',
  render: () => {
    const [query, setQuery] = useState('')
    const [draft, setDraft] = useState<IData | null>(null)
    const rowIdRef = useRef(demoData.length + 1)

    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          header: 'Name',
          cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.name}</span>,
          size: 180
        },
        {
          accessorKey: 'email',
          header: 'Email',
          size: 200
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
          accessorKey: 'status',
          header: 'Status',
          cell: ({ row }) =>
            row.original.status === 'active' ? (
              <Badge variant='secondary'>Active</Badge>
            ) : (
              <Badge variant='destructive'>Inactive</Badge>
            ),
          size: 120
        }
      ],
      []
    )
    const filtered = demoData.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()))
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
    const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: draft ? [...filtered, draft] : filtered,
      pageCount: Math.ceil(filtered.length / pagination.pageSize),
      getRowId: (row: IData) => row.id,
      state: { pagination, sorting },
      onPaginationChange: setPagination,
      onSortingChange: setSorting
    })

    return (
      <DataGrid
        table={table}
        recordCount={filtered.length}
        onRowCreate={() => {
          const id = String(rowIdRef.current++)
          setDraft({
            ...demoData[0]!,
            id,
            name: 'New member',
            email: 'new@example.com'
          })
        }}
        rowCreateLabel='Add row'
      >
        <Card style={editingStyles.frame}>
          <CardHeader style={editingStyles.toolbar}>
            <InputGroup style={editingStyles.searchGroup}>
              <InputGroupAddon align='inline-start'>
                <SearchIcon style={{ height: 16, width: 16 }} />
              </InputGroupAddon>
              <Input
                placeholder='Search members...'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroup>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                const id = String(rowIdRef.current++)
                setDraft({
                  ...demoData[0]!,
                  id,
                  name: 'New member',
                  email: 'new@example.com'
                })
              }}
            >
              <PlusIcon style={{ height: 16, width: 16 }} />
              Create
            </Button>
          </CardHeader>
          <CardContent style={editingStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
          <CardFooter style={editingStyles.frameFooter}>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* CRUD in frame container (ReUI c-data-grid-23)                       */
/* ------------------------------------------------------------------ */

export const CrudInFrameContainer: Story = {
  name: 'CRUD in frame container',
  render: () => {
    const [rows, setRows] = useState(demoData)

    const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
      () => [
        {
          accessorKey: 'name',
          header: 'Name',
          cell: ({ row }) => <span {...stylex.props(s.strong)}>{row.original.name}</span>,
          size: 180
        },
        {
          accessorKey: 'email',
          header: 'Email',
          size: 200
        },
        {
          accessorKey: 'role',
          header: 'Occupation',
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
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data: rows,
      pageCount: Math.ceil(rows.length / pagination.pageSize),
      getRowId: (row: IData) => row.id,
      state: { pagination },
      onPaginationChange: setPagination
    })

    return (
      <DataGrid
        table={table}
        recordCount={rows.length}
        onRowCreate={() => {
          setRows((old) => [...old, { ...old[0]!, id: String(Date.now()), name: 'New member' }])
        }}
      >
        {/* ReUI renders this inside its Frame component; a muted card frame
            carries the same header/content/footer intent here. */}
        <Card style={editingStyles.frame}>
          <CardHeader style={editingStyles.frameHeader}>
            <CardTitle>Team members</CardTitle>
            <Button size='sm' variant='outline'>
              <PlusIcon style={{ height: 16, width: 16 }} />
              New member
            </Button>
          </CardHeader>
          <CardContent style={editingStyles.cardBody}>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </CardContent>
          <CardFooter style={editingStyles.frameFooter}>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Spreadsheet editing (ReUI c-data-grid-31)                           */
/* ------------------------------------------------------------------ */

interface IProduct {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

const productData: IProduct[] = demoData.slice(0, 8).map((row, index) => ({
  id: row.id,
  name: `${row.company} ${index + 1}`,
  category: row.role,
  price: 49.99 + index * 15,
  stock: 12 + index * 7
}))

const rowMeta: Record<string, DataGridRowStatus | undefined> = {
  '3': 'new',
  '5': 'dirty'
}

export const SpreadsheetEditing: Story = {
  name: 'Spreadsheet editing',
  render: () => {
    const [data, setData] = useState(productData)
    const [dirtyCells, setDirtyCells] = useState<Set<string>>(new Set())

    const columns = useMemo<ColumnDef<DataGridFeatures, IProduct>[]>(
      () => [
        {
          accessorKey: 'id',
          header: 'SKU',
          cell: (info) => <span {...stylex.props(s.muted)}>{info.getValue() as string}</span>,
          enableSorting: false,
          size: 90
        },
        {
          accessorKey: 'name',
          header: 'Product',
          size: 200,
          meta: {
            cellEdit: { control: 'text' }
          }
        },
        {
          accessorKey: 'category',
          header: 'Category',
          size: 180,
          meta: {
            cellEdit: { control: 'text' }
          }
        },
        {
          accessorKey: 'price',
          header: 'Price ($)',
          size: 140,
          cell: (info) => (
            <span {...stylex.props(editingStyles.right)}>
              {(info.getValue() as number).toFixed(2)}
            </span>
          ),
          meta: {
            cellEdit: {
              parse: (raw) => {
                const value = Number.parseFloat(raw)
                return Number.isNaN(value) ? undefined : value
              }
            }
          }
        },
        {
          accessorKey: 'stock',
          header: 'Stock',
          size: 140,
          cell: (info) => (
            <span {...stylex.props(editingStyles.right)}>{info.getValue() as number}</span>
          ),
          meta: {
            cellEdit: {
              parse: (raw) => {
                const value = Number.parseInt(raw, 10)
                return Number.isNaN(value) ? undefined : value
              }
            }
          }
        }
      ],
      []
    )
    const table = useTable({
      features: dataGridFeatures,
      columns,
      data,
      getRowId: (row: IProduct) => row.id,
      state: { pagination: { pageIndex: 0, pageSize: 8 } }
    })
    const getCellStatus = (_row: IProduct, columnId: string): DataGridCellStatus | undefined =>
      dirtyCells.has(`${_row.id}:${columnId}`) ? 'dirty' : undefined

    const handleCellsChange = (details: DataGridCellsChangeDetails<IProduct>) => {
      // Immutable write-back; the grid never writes data itself.
      setData((old) => {
        const next = old.map((row) => ({ ...row }))
        for (const change of details.changes) {
          const rowIndex = next.findIndex((candidate) => candidate.id === change.rowId)
          if (rowIndex === -1) continue
          const record = next[rowIndex]! as unknown as Record<string, unknown>
          record[change.columnId] = change.value
        }
        return next
      })
      if (details.changes.length) {
        setDirtyCells((old) => {
          const next = new Set(old)
          for (const change of details.changes) {
            next.add(`${change.rowId}:${change.columnId}`)
          }
          return next
        })
      }
    }

    return (
      <DataGrid
        table={table}
        recordCount={data.length}
        onCellsChange={handleCellsChange}
        getRowStatus={(row) => rowMeta[row.id]}
        getCellStatus={getCellStatus}
        tableStyles={{ edgeCell: editingStyles.edgeCell }}
        tableLayout={{
          dense: true,
          cellSelection: true,
          cellFillHandle: true,
          // The Excel-style solid square inside the selection corner.
          cellFillHandleVariant: 'square',
          cellBorder: true,
          columnsResizable: true,
          columnsPinnable: true
        }}
      >
        <DataGridCellSelection />
        <Card style={editingStyles.frame}>
          <div {...stylex.props(s.stack)}>
            <span {...stylex.props(s.muted)}>
              Drag, Shift+arrows or Ctrl/Cmd+A to select · type to edit · paste from a spreadsheet
            </span>
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
            <DataGridPagination />
          </div>
        </Card>
      </DataGrid>
    )
  }
}
