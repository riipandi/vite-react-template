import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '#/components/base/dialog'
import { commandStyles as s } from './command.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export interface CommandProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Root>,
      'className' | 'style' | 'inline' | 'open'
    >,
    StyleProp {
  children?: React.ReactNode
}

/**
 * Command palette built on Base UI Autocomplete in `inline open` mode: the
 * filtered list renders in place (no popup), like cmdk. Pass `items` to the
 * root; `CommandList` accepts a render function over the filtered items.
 */
export function Command({ style, children, ...props }: CommandProps) {
  return (
    <BaseAutocomplete.Root inline open autoHighlight {...props}>
      <div {...stylex.props(s.root, style)}>{children}</div>
    </BaseAutocomplete.Root>
  )
}

export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run…',
  children,
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Dialog>, 'children'> &
  StyleProp & {
    title?: string
    description?: string
    children: React.ReactNode
  }) {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false} style={[s.dialogContent, style]}>
        <DialogTitle style={s.srOnly}>{title}</DialogTitle>
        <DialogDescription style={s.srOnly}>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function CommandInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>, 'className' | 'style'> &
  StyleProp) {
  return (
    <div {...stylex.props(s.inputWrap, style)}>
      <svg
        width='16'
        height='16'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        aria-hidden
        {...stylex.props(s.inputIcon)}
      >
        <circle cx='7' cy='7' r='4.5' />
        <path d={`m10.5 10.5 3 3`} />
      </svg>
      <BaseAutocomplete.Input {...props} {...stylex.props(s.input)} />
    </div>
  )
}

export function CommandList({
  style,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.List>,
  'className' | 'style' | 'children'
> &
  StyleProp & {
    /** Static items, or a render function over the filtered items. */
    // oxlint-disable-next-line typescript/no-explicit-any
    children?: React.ReactNode | ((item: any) => React.ReactNode)
  }) {
  return <BaseAutocomplete.List {...props} {...stylex.props(s.list, style)} />
}

export function CommandEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Empty {...props} {...stylex.props(s.empty, style)} />
}

export function CommandGroup({
  heading,
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>, 'className' | 'style'> &
  StyleProp & { heading?: React.ReactNode }) {
  return (
    <BaseAutocomplete.Group {...props} {...stylex.props(style)}>
      {heading && (
        <BaseAutocomplete.GroupLabel {...stylex.props(s.groupLabel)}>
          {heading}
        </BaseAutocomplete.GroupLabel>
      )}
      {children}
    </BaseAutocomplete.Group>
  )
}

export function CommandItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Item {...props} {...stylex.props(s.item, style)} />
}

export function CommandSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Separator {...props} {...stylex.props(s.separator, style)} />
}

export function CommandShortcut({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(s.shortcut, style)} />
}
