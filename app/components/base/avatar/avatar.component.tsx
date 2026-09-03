/**
 * An easily stylable avatar component.
 *
 * @see: https://base-ui.com/react/components/avatar
 *
 * BaseUI Anatomy:
 * <Avatar.Root>
 *   <Avatar.Image />
 *   <Avatar.Fallback />
 * </Avatar.Root>
 */

import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { colors } from '#/lib/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { avatarStyles as s, avatarSizes as sizes } from './avatar.stylex'

export type AvatarSize = 'sm' | 'md' | 'lg'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function Avatar({
  size = 'md',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>, 'className' | 'style'> &
  StyleProp & { size?: AvatarSize }) {
  return <BaseAvatar.Root {...props} {...stylex.props(s.root, sizes[size], style)} />
}

export function AvatarImage({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAvatar.Image {...props} {...stylex.props(s.image, style)} />
}

export function AvatarFallback({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAvatar.Fallback {...props} {...stylex.props(s.fallback, style)} />
}

/** Status indicator anchored to the bottom-right corner of an `Avatar`. */
export function AvatarBadge({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.badge, style)} />
}

/**
 * Overlaps its `Avatar` (and `AvatarGroupCount`) children, each with a
 * `colors.background` ring separating it from its neighbors. StyleX has no
 * sibling selectors, so each child is wrapped in a span carrying the
 * overlap + ring styles directly.
 */
export function AvatarGroup({ style, children, ...props }: DivProps) {
  const items = React.Children.toArray(children)
  return (
    <div {...props} {...stylex.props(s.group, style)}>
      {items.map((child, index) => (
        <span
          key={index}
          {...stylex.props(
            s.groupItem,
            index > 0 && s.groupItemOverlap,
            s.groupItemStack(items.length - index),
            ring({ width: stroke.focus, color: colors.background })
          )}
        >
          {child}
        </span>
      ))}
    </div>
  )
}

/** Trailing "+N" indicator for an `AvatarGroup`, sized to match `Avatar`. */
export function AvatarGroupCount({
  size = 'md',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> &
  StyleProp & { size?: AvatarSize }) {
  return <span {...props} {...stylex.props(s.groupCount, sizes[size], style)} />
}
