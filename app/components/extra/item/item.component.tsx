import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { itemStyles as styles, itemVariants, itemSizes } from './item.stylex'
import { itemMediaVariants as mediaVariants } from './item.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function ItemGroup({ style, ...props }: DivProps) {
  return <div role='list' {...props} {...stylex.props(styles.group, style)} />
}

export function ItemSeparator({ ...props }: React.ComponentPropsWithoutRef<typeof Separator>) {
  return <Separator orientation='horizontal' {...props} />
}

export type ItemVariant = 'default' | 'outline' | 'muted'
export type ItemSize = 'xs' | 'sm' | 'md'

export interface ItemProps
  extends Omit<useRender.ComponentProps<'div'>, 'className' | 'style'>, StyleProp {
  variant?: ItemVariant
  size?: ItemSize
}

export function Item({ variant = 'default', size = 'md', style, render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      stylex.props(styles.root, itemVariants[variant], itemSizes[size], style),
      props
    ),
    render
  })
}

export type ItemMediaVariant = 'default' | 'icon' | 'image'

export function ItemMedia({
  variant = 'default',
  style,
  ...props
}: DivProps & { variant?: ItemMediaVariant }) {
  return <div {...props} {...stylex.props(styles.media, mediaVariants[variant], style)} />
}

export function ItemContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}

export function ItemTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.title, style)} />
}

export function ItemDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> & StyleProp) {
  return <p {...props} {...stylex.props(styles.description, style)} />
}

export function ItemActions({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.actions, style)} />
}

export function ItemHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.headerFooter, style)} />
}

export function ItemFooter({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.headerFooter, style)} />
}
