import type { Table } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import { getColumnHeaderLabel, useDataGrid } from './data-grid'
import type { DataGridFeatures } from './data-grid'
import { dataGridColumnVisibilityStyles as s } from './data-grid-column-header.stylex'

function DataGridColumnVisibility<TData extends object>({
  table,
  trigger
}: {
  table: Table<DataGridFeatures, TData>
  trigger: ReactElement<Record<string, unknown>>
}) {
  const { i18n } = useDataGrid()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent align='end' style={s.content}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{i18n.labels.toggleColumns}</DropdownMenuLabel>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  style={s.item}
                  checked={column.getIsVisible()}
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getColumnHeaderLabel(column)}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataGridColumnVisibility }
