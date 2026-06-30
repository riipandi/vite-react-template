/**
 * An input component that can be used in forms.
 *
 * @see: https://base-ui.com/react/components/input
 *
 * BaseUI Anatomy:
 * <Input />
 */

import { Input as BaseInput } from '@base-ui/react/input'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { inputStyles, inputVariants } from './input.stylex'

export type InputVariant = keyof typeof inputVariants

export type InputProps = React.ComponentProps<typeof BaseInput> & {
  variant?: InputVariant
  xstyle?: StyleXStyles
}

export function Input({ variant = 'default', xstyle, ...props }: InputProps) {
  return (
    <BaseInput
      data-slot='input'
      {...stylex.props(inputStyles.base, inputVariants[variant], xstyle)}
      {...props}
    />
  )
}
