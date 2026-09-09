import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { useCallback } from 'react'
import { textareaStyles as s } from './textarea.stylex'

export interface TextareaProps extends Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
  /** Grow the textarea with its content instead of a fixed height. */
  autoResize?: boolean
}

export function Textarea({ style, autoResize = false, onChange, ...props }: TextareaProps) {
  const resize = useCallback((element: HTMLTextAreaElement | null) => {
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) resize(event.currentTarget)
    onChange?.(event)
  }

  return (
    <textarea
      {...props}
      ref={autoResize ? resize : undefined}
      onChange={handleChange}
      {...stylex.props(s.root, autoResize && s.autoResize, style)}
    />
  )
}
