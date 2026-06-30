/**
 * A flexible list item component with title, description, media, and action sections.
 *
 * Anatomy:
 * <Item>
 *   <ItemMedia />
 *   <ItemContent>
 *     <ItemTitle />
 *     <ItemDescription />
 *   </ItemContent>
 *   <ItemAction />
 * </Item>
 */

import { useRender } from '@base-ui/react/use-render'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { itemDirections, itemSizes, itemStyles, itemVariants } from './item.stylex'

export type ItemVariant = keyof typeof itemVariants
export type ItemSize = keyof typeof itemSizes
export type ItemDirection = keyof typeof itemDirections

export type ItemProps = useRender.ComponentProps<'div'> & {
  variant?: ItemVariant
  size?: ItemSize
  direction?: ItemDirection
  xstyle?: StyleXStyles
}
export type ItemContentProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type ItemTitleProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type ItemDescriptionProps = React.ComponentProps<'p'> & {
  xstyle?: StyleXStyles
}
export type ItemMetaProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type ItemMediaProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type ItemActionProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}

export function Item({
  render,
  variant = 'default',
  size = 'md',
  direction,
  xstyle,
  ...props
}: ItemProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-slot': 'item',
      ...stylex.props(
        itemStyles.base,
        itemVariants[variant],
        itemSizes[size],
        direction && itemDirections[direction],
        xstyle
      ),
      ...props
    }
  })
}

export function ItemContent({ xstyle, ...props }: ItemContentProps) {
  return <div data-slot='item-content' {...stylex.props(itemStyles.content, xstyle)} {...props} />
}

export function ItemTitle({ xstyle, ...props }: ItemTitleProps) {
  return <div data-slot='item-title' {...stylex.props(itemStyles.title, xstyle)} {...props} />
}

export function ItemDescription({ xstyle, ...props }: ItemDescriptionProps) {
  return (
    <p data-slot='item-description' {...stylex.props(itemStyles.description, xstyle)} {...props} />
  )
}

export function ItemMeta({ xstyle, ...props }: ItemMetaProps) {
  return <div data-slot='item-meta' {...stylex.props(itemStyles.meta, xstyle)} {...props} />
}

export function ItemMedia({ xstyle, ...props }: ItemMediaProps) {
  return <div data-slot='item-media' {...stylex.props(itemStyles.media, xstyle)} {...props} />
}

export function ItemAction({ xstyle, ...props }: ItemActionProps) {
  return <div data-slot='item-action' {...stylex.props(itemStyles.action, xstyle)} {...props} />
}
