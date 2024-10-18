import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,
  type GridListItemProps,
  type GridListProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { Checkbox } from '../Checkbox'
import { ctrp, focusRing } from '../utils'

export function GridList<T extends object>({ children, ...props }: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={ctrp(
        props.className,
        'relative overflow-auto rounded-md border dark:border-zinc-600'
      )}
    >
      {children}
    </AriaGridList>
  )
}

const itemStyles = tv({
  extend: focusRing,
  base: 'relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-gray-900 dark:text-zinc-200 border-y dark:border-y-zinc-700 border-transparent first:border-t-0 last:border-b-0 first:rounded-t-md last:rounded-b-md -mb-px last:mb-0 -outline-offset-2',
  variants: {
    isSelected: {
      false: 'hover:bg-gray-100 dark:hover:bg-zinc-700/60',
      true: 'bg-primary-100 dark:bg-primary-700/30 hover:bg-primary-200 dark:hover:bg-primary-700/40 border-y-blue-200 dark:border-y-blue-900 z-20',
    },
    isDisabled: {
      true: 'text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText] z-10',
    },
  },
})

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === 'string' ? children : undefined
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </AriaGridListItem>
  )
}
