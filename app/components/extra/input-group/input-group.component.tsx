import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonProps } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { Textarea } from '#/components/extra/textarea'
import { inputGroupStyles as s } from './input-group.stylex'
import { inputGroupAddonAligns as addonAligns } from './input-group.stylex'
import { inputGroupButtonSizes as buttonSizes } from './input-group.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function InputGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div role='group' {...props} {...stylex.props(s.root, style)} />
}

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

export function InputGroupAddon({
  align = 'inline-start',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> &
  StyleProp & { align?: InputGroupAddonAlign }) {
  return (
    <div
      role='group'
      // Read by the group root's :has() to switch to a column layout for block-aligned addons.
      data-align={align}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        event.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus()
      }}
      {...props}
      {...stylex.props(s.addon, addonAligns[align], style)}
    />
  )
}

export type InputGroupButtonSize = 'xs' | 'iconXs' | 'iconSm'

export function InputGroupButton({
  variant = 'ghost',
  size = 'xs',
  style,
  ...props
}: Omit<ButtonProps, 'size'> & { size?: InputGroupButtonSize }) {
  return <Button type='button' variant={variant} {...props} style={[buttonSizes[size], style]} />
}

export function InputGroupText({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(s.text, style)} />
}

export function InputGroupInput({ style, ...props }: React.ComponentPropsWithoutRef<typeof Input>) {
  return <Input {...props} style={[s.control, style]} />
}

export function InputGroupTextarea({
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea>) {
  return <Textarea {...props} style={[s.control, s.textarea, style]} />
}
