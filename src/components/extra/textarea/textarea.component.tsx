/**
 * A multiline text input component that auto-adjusts its height based on content.
 *
 * Anatomy:
 * <Textarea />
 */

import { Field as FieldPrimitive } from '@base-ui/react/field'
import { mergeProps } from '@base-ui/react/merge-props'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { textareaSizes, textareaStyles, textareaVariants } from './textarea.stylex'

export type TextareaVariant = keyof typeof textareaVariants
export type TextareaSize = keyof typeof textareaSizes

export type TextareaProps = React.ComponentProps<'textarea'> & {
  variant?: TextareaVariant
  size?: TextareaSize
  xstyle?: StyleXStyles
}

export function Textarea({ variant = 'default', size = 'md', xstyle, ...props }: TextareaProps) {
  return (
    <FieldPrimitive.Control
      render={(renderProps) => (
        <textarea
          data-slot='textarea'
          {...stylex.props(
            textareaStyles.base,
            textareaVariants[variant],
            textareaSizes[size],
            xstyle
          )}
          {...mergeProps(renderProps, props)}
        />
      )}
    />
  )
}
