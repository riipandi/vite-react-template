import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { Subscribe } from '@tanstack/react-table'
import type { Column } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  PinOffIcon,
  Settings2Icon
} from 'lucide-react'
import { memo, useMemo } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Button } from '#/components/base/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import { getColumnHeaderLabel, useDataGrid } from './data-grid'
import type { DataGridFeatures } from './data-grid'
import { dataGridColumnHeaderStyles as s } from './data-grid-column-header.stylex'

interface DataGridColumnHeaderProps<TData extends object, TValue> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style'
> {
  column: Column<DataGridFeatures, TData, TValue>
  /** When omitted, uses `column.columnDef.meta.headerTitle`, then a string `columnDef.header`, then `column.id`. */
  title?: string
  icon?: ReactNode
  /** Reserved; pin controls are gated by tableLayout.columnsPinnable + column.getCanPin(). */
  pinnable?: boolean
  filter?: ReactNode
  visibility?: boolean
  style?: StyleXStyles
}

function DataGridColumnHeaderInner<TData extends object, TValue>({
  column,
  title,
  icon,
  style,
  filter,
  visibility = false
}: DataGridColumnHeaderProps<TData, TValue>) {
  const { i18n, isLoading, table, props } = useDataGrid()
  const resolvedTitle = title ?? getColumnHeaderLabel(column)

  // TanStack's columnOrder defaults to [] until a consumer seeds it; fall
  // back to the definition order so Move Left/Right work out of the box.
  const columnOrderState = table.state.columnOrder
  const columnOrder =
    columnOrderState.length > 0
      ? columnOrderState
      : table.getAllLeafColumns().map((leafColumn) => leafColumn.id)
  const columnVisibilityKey =
    props.tableLayout?.columnsVisibility && visibility
      ? JSON.stringify(table.state.columnVisibility)
      : ''
  const isSorted = column.getIsSorted()
  const isPinned = column.getIsPinned()
  const canSort = column.getCanSort()
  const canPin = column.getCanPin()
  const canResize = column.getCanResize()

  const columnIndex = columnOrder.indexOf(column.id)
  const canMoveLeft = columnIndex > 0
  const canMoveRight = columnIndex < columnOrder.length - 1

  const handleSort = () => {
    if (isSorted === 'asc') {
      column.toggleSorting(true)
    } else if (isSorted === 'desc') {
      column.clearSorting()
    } else {
      column.toggleSorting(false)
    }
  }

  const sortIcon =
    canSort &&
    (isSorted === 'desc' ? (
      <ArrowDownIcon aria-hidden='true' {...stylex.props(s.sortIcon)} />
    ) : isSorted === 'asc' ? (
      <ArrowUpIcon aria-hidden='true' {...stylex.props(s.sortIcon)} />
    ) : (
      <ChevronsUpDownIcon aria-hidden='true' {...stylex.props(s.sortIcon, s.sortIconIdle)} />
    ))

  const hasControls =
    props.tableLayout?.columnsMovable ||
    (props.tableLayout?.columnsVisibility && visibility) ||
    (props.tableLayout?.columnsPinnable && canPin) ||
    filter

  const menuItems = useMemo(() => {
    const items: ReactNode[] = []
    let hasPreviousSection = false

    // Filter section
    if (filter) {
      items.push(
        <DropdownMenuGroup key='group-filter'>
          <DropdownMenuLabel key='filter'>{filter}</DropdownMenuLabel>
        </DropdownMenuGroup>
      )
      hasPreviousSection = true
    }

    // Sort section
    if (canSort) {
      if (hasPreviousSection) {
        items.push(<DropdownMenuSeparator key='sep-sort' />)
      }
      items.push(
        <DropdownMenuItem
          key='sort-asc'
          onClick={() => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }}
          disabled={!canSort}
        >
          <ArrowUpIcon {...stylex.props(s.menuIcon)} />
          <span {...stylex.props(s.menuItemLabel)}>{i18n.labels.sortAscending}</span>
          {isSorted === 'asc' && <CheckIcon {...stylex.props(s.menuCheckIcon)} />}
        </DropdownMenuItem>,
        <DropdownMenuItem
          key='sort-desc'
          onClick={() => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }}
          disabled={!canSort}
        >
          <ArrowDownIcon {...stylex.props(s.menuIcon)} />
          <span {...stylex.props(s.menuItemLabel)}>{i18n.labels.sortDescending}</span>
          {isSorted === 'desc' && <CheckIcon {...stylex.props(s.menuCheckIcon)} />}
        </DropdownMenuItem>
      )
      hasPreviousSection = true
    }

    // Pin section
    if (props.tableLayout?.columnsPinnable && canPin) {
      if (hasPreviousSection) {
        items.push(<DropdownMenuSeparator key='sep-pin' />)
      }
      items.push(
        <DropdownMenuItem
          key='pin-left'
          onClick={() => column.pin(isPinned === 'start' ? false : 'start')}
        >
          <ArrowLeftToLineIcon aria-hidden='true' {...stylex.props(s.menuIcon)} />
          <span {...stylex.props(s.menuItemLabel)}>{i18n.labels.pinColumnStart}</span>
          {isPinned === 'start' && <CheckIcon {...stylex.props(s.menuCheckIcon)} />}
        </DropdownMenuItem>,
        <DropdownMenuItem
          key='pin-right'
          onClick={() => column.pin(isPinned === 'end' ? false : 'end')}
        >
          <ArrowRightToLineIcon aria-hidden='true' {...stylex.props(s.menuIcon)} />
          <span {...stylex.props(s.menuItemLabel)}>{i18n.labels.pinColumnEnd}</span>
          {isPinned === 'end' && <CheckIcon {...stylex.props(s.menuCheckIcon)} />}
        </DropdownMenuItem>
      )
      hasPreviousSection = true
    }

    // Move section
    if (props.tableLayout?.columnsMovable) {
      if (hasPreviousSection) {
        items.push(<DropdownMenuSeparator key='sep-move' />)
      }
      items.push(
        <DropdownMenuItem
          key='move-left'
          onClick={() => {
            if (columnIndex > 0) {
              const newOrder = [...columnOrder]
              const [movedColumn] = newOrder.splice(columnIndex, 1)
              if (movedColumn !== undefined) {
                newOrder.splice(columnIndex - 1, 0, movedColumn)
                table.setColumnOrder(newOrder)
              }
            }
          }}
          disabled={!canMoveLeft || isPinned !== false}
        >
          <ArrowLeftIcon aria-hidden='true' {...stylex.props(s.menuIcon)} />
          <span>{i18n.labels.moveColumnStart}</span>
        </DropdownMenuItem>,
        <DropdownMenuItem
          key='move-right'
          onClick={() => {
            if (columnIndex < columnOrder.length - 1) {
              const newOrder = [...columnOrder]
              const [movedColumn] = newOrder.splice(columnIndex, 1)
              if (movedColumn !== undefined) {
                newOrder.splice(columnIndex + 1, 0, movedColumn)
                table.setColumnOrder(newOrder)
              }
            }
          }}
          disabled={!canMoveRight || isPinned !== false}
        >
          <ArrowRightIcon aria-hidden='true' {...stylex.props(s.menuIcon)} />
          <span>{i18n.labels.moveColumnEnd}</span>
        </DropdownMenuItem>
      )
      hasPreviousSection = true
    }

    // Visibility section
    if (props.tableLayout?.columnsVisibility && visibility) {
      if (hasPreviousSection) {
        items.push(<DropdownMenuSeparator key='sep-visibility' />)
      }
      items.push(
        <DropdownMenuSub key='visibility'>
          <DropdownMenuSubTrigger>
            <Settings2Icon {...stylex.props(s.menuIcon)} />
            <span>{i18n.labels.columnsMenu}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent side='right'>
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  style={s.capitalize}
                >
                  {getColumnHeaderLabel(col)}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }

    return items
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter,
    canSort,
    isSorted,
    column,
    props.tableLayout?.columnsPinnable,
    props.tableLayout?.columnsMovable,
    props.tableLayout?.columnsVisibility,
    canPin,
    isPinned,
    canMoveLeft,
    canMoveRight,
    visibility,
    table,
    columnIndex,
    columnOrder,
    columnVisibilityKey, // Needed to update checkbox states when visibility changes
    i18n
  ])

  if (hasControls) {
    return (
      <div {...stylex.props(s.controlsRow)}>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant='ghost' style={[s.triggerButton, style]} disabled={isLoading}>
                {icon && icon}
                {resolvedTitle}
                {sortIcon}
              </Button>
            }
          />
          <DropdownMenuContent align='start' style={s.menuContent}>
            {menuItems}
          </DropdownMenuContent>
        </DropdownMenu>
        {props.tableLayout?.columnsPinnable && canPin && isPinned && (
          <Button
            size='iconXs'
            variant='ghost'
            style={s.unpinButton}
            onClick={() => column.pin(false)}
            aria-label={i18n.labels.unpinColumn(resolvedTitle)}
            title={i18n.labels.unpinColumn(resolvedTitle)}
          >
            <PinOffIcon aria-hidden='true' {...stylex.props(s.unpinIcon)} />
          </Button>
        )}
      </div>
    )
  }

  if (canSort || (props.tableLayout?.columnsResizable && canResize)) {
    return (
      <div {...stylex.props(s.sortRow)}>
        <Button
          variant='ghost'
          style={[s.triggerButton, style]}
          disabled={isLoading}
          onClick={handleSort}
        >
          {icon && icon}
          {resolvedTitle}
          {sortIcon}
        </Button>
      </div>
    )
  }

  return (
    <div {...stylex.props(s.label, style)}>
      {icon && <span {...stylex.props(s.labelIcon)}>{icon}</span>}
      {resolvedTitle}
    </div>
  )
}

const DataGridColumnHeaderMemo = memo(DataGridColumnHeaderInner) as <TData extends object, TValue>(
  props: DataGridColumnHeaderProps<TData, TValue> & {
    /** Internal: the state slices the header re-renders on. Not part of the public API. */
    subscribedState?: unknown
  }
) => ReactNode

/**
 * Sort and pin state reaches this header through builder calls on `column`
 * (`getIsSorted()`, `getIsPinned()`), and `column` is a stable reference. That
 * combination is the one v9's fresh-table-per-state-change does NOT cover:
 * React Compiler is free to memoize against the stable column and never
 * re-evaluate those reads, which shows up as frozen sort arrows and pin
 * controls. The `Subscribe` below turns the slices this header actually reads
 * into a real reactive dependency, and threading the selection through as a
 * prop is what lets it past the `memo` - which would otherwise see unchanged
 * props and skip the render anyway.
 */
function DataGridColumnHeader<TData extends object, TValue>(
  props: DataGridColumnHeaderProps<TData, TValue>
) {
  const { table } = useDataGrid()

  return (
    <Subscribe
      source={table.store}
      selector={(state) => ({
        sorting: state.sorting,
        columnPinning: state.columnPinning,
        columnOrder: state.columnOrder,
        columnVisibility: state.columnVisibility
      })}
    >
      {(subscribed) => <DataGridColumnHeaderMemo {...props} subscribedState={subscribed} />}
    </Subscribe>
  )
}

export { DataGridColumnHeader, type DataGridColumnHeaderProps }
