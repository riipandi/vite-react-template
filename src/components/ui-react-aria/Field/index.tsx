import {
  FieldError as AriaFieldError,
  Input as AriaInput,
  Label as AriaLabel,
  type FieldErrorProps,
  Group,
  type GroupProps,
  type InputProps,
  type LabelProps,
  Text,
  type TextProps,
  composeRenderProps,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { ctrp, focusRing } from '../utils'

export function Label(props: LabelProps) {
  return (
    <AriaLabel
      {...props}
      className={twMerge(
        'w-fit cursor-default font-medium text-gray-500 text-sm dark:text-zinc-400',
        props.className
      )}
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge('text-gray-600 text-sm', props.className)}
    />
  )
}

export function FieldError(props: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={ctrp(props.className, 'text-destructive-600 text-sm forced-colors:text-[Mark]')}
    />
  )
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-gray-300 dark:border-zinc-500 forced-colors:border-[ButtonBorder]',
      true: 'border-gray-600 dark:border-zinc-300 forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-destructive-600 dark:border-destructive-600 forced-colors:border-[Mark]',
    },
    isDisabled: {
      true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]',
    },
  },
})

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group flex items-center h-9 bg-white dark:bg-zinc-900 forced-colors:bg-[Field] border-2 rounded-md overflow-hidden',
  variants: fieldBorderStyles.variants,
})

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className })
      )}
    />
  )
}

export function Input(props: InputProps) {
  return (
    <AriaInput
      {...props}
      className={ctrp(
        props.className,
        'min-w-0 flex-1 bg-white px-2 py-1.5 text-gray-800 text-sm outline outline-0 disabled:text-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600'
      )}
    />
  )
}
