import * as stylex from '@stylexjs/stylex'
import type { Column } from '@tanstack/react-table'
import { CheckIcon, CirclePlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { Popover, PopoverContent, PopoverTrigger } from '#/components/base/popover'
import { Separator } from '#/components/base/separator'
import { Badge } from '#/components/extra/badge'
import { useDataGrid } from './data-grid'
import type { DataGridFeatures } from './data-grid'
import { dataGridColumnFilterStyles as s } from './data-grid-column-header.stylex'

interface DataGridColumnFilterProps<TData extends object, TValue> {
  column?: Column<DataGridFeatures, TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
}

const OPTION_ICON_PROPS = stylex.props(s.optionIcon) as { className?: string }

function DataGridColumnFilter<TData extends object, TValue>({
  column,
  title,
  options
}: DataGridColumnFilterProps<TData, TValue>) {
  const { i18n } = useDataGrid()
  const facets = column?.getFacetedUniqueValues()
  const filterValue = column?.getFilterValue()
  const selectedValues = new Set(Array.isArray(filterValue) ? (filterValue as string[]) : [])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant='outline' size='sm'>
            <CirclePlusIcon {...stylex.props(s.triggerIcon)} />
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Separator orientation='vertical' style={s.verticalSeparator} />
                <Badge variant='secondary' style={s.countBadge}>
                  {selectedValues.size}
                </Badge>
                <div {...stylex.props(s.badgeList)}>
                  {selectedValues.size > 2 ? (
                    <Badge variant='secondary' style={s.countBadge}>
                      {i18n.labels.filterSelectedCount(selectedValues.size)}
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge variant='secondary' key={option.value} style={s.countBadge}>
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        }
      />
      <PopoverContent align='start' style={s.content}>
        <div {...stylex.props(s.searchArea)}>
          <Input
            placeholder={title}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={s.searchInput}
          />
        </div>
        <div {...stylex.props(s.optionsScroll)}>
          {filteredOptions.length === 0 ? (
            <div {...stylex.props(s.empty)}>{i18n.labels.filterNoResults}</div>
          ) : (
            <div {...stylex.props(s.listArea)}>
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.has(option.value)
                const facetCount = facets?.get(option.value)
                const toggleOption = () => {
                  if (isSelected) {
                    selectedValues.delete(option.value)
                  } else {
                    selectedValues.add(option.value)
                  }
                  const filterValues = Array.from(selectedValues)
                  column?.setFilterValue(filterValues.length ? filterValues : undefined)
                }
                return (
                  <div
                    key={option.value}
                    role='button'
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={toggleOption}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleOption()
                      }
                    }}
                    {...stylex.props(s.optionRow)}
                  >
                    <div
                      {...stylex.props(
                        s.optionBox,
                        isSelected ? s.optionBoxSelected : s.optionBoxUnchecked
                      )}
                    >
                      <CheckIcon
                        {...stylex.props(s.optionCheckIcon, !isSelected && s.iconHidden)}
                      />
                    </div>
                    {option.icon && <option.icon {...OPTION_ICON_PROPS} />}
                    <span>{option.label}</span>
                    {facetCount !== undefined && (
                      <span {...stylex.props(s.facetCount)}>{facetCount}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          {selectedValues.size > 0 && (
            <>
              <div {...stylex.props(s.divider)} />
              <div {...stylex.props(s.listArea)}>
                <div
                  role='button'
                  tabIndex={0}
                  onClick={() => column?.setFilterValue(undefined)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      column?.setFilterValue(undefined)
                    }
                  }}
                  {...stylex.props(s.optionRow, s.clearRow)}
                >
                  {i18n.labels.filterClear}
                </div>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DataGridColumnFilter, type DataGridColumnFilterProps }
