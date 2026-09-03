import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { ring } from '#/lib/stylex-utils'
import { colors, font, radius } from '#/lib/tokens.stylex'

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
  return <BaseAvatar.Root {...props} {...stylex.props(styles.root, sizes[size], style)} />
}

export function AvatarImage({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAvatar.Image {...props} {...stylex.props(styles.image, style)} />
}

export function AvatarFallback({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAvatar.Fallback {...props} {...stylex.props(styles.fallback, style)} />
}

/** Status indicator anchored to the bottom-right corner of an `Avatar`. */
export function AvatarBadge({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.badge, style)} />
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
    <div {...props} {...stylex.props(styles.group, style)}>
      {items.map((child, index) => (
        <span
          key={index}
          {...stylex.props(
            styles.groupItem,
            index > 0 && styles.groupItemOverlap,
            styles.groupItemStack(items.length - index),
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
  return <span {...props} {...stylex.props(styles.groupCount, sizes[size], style)} />
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    display: 'inline-flex',
    // Fixed-size chrome: never let a flex row squeeze the avatar.
    flexShrink: 0,
    fontFamily: font.sans,
    justifyContent: 'center',
    // No overflow:hidden here — it would clip AvatarBadge at the corner;
    // the image and fallback round themselves instead.
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle'
  },
  image: {
    borderRadius: radius.full,
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  fallback: {
    alignItems: 'center',
    borderRadius: radius.full,
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.focus,
    color: colors.primaryForeground,
    display: 'flex',
    insetInlineEnd: 0,
    insetBlockEnd: 0,
    justifyContent: 'center',
    minHeight: space.s4,
    minWidth: space.s4,
    position: 'absolute'
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  groupItem: {
    borderRadius: radius.full,
    display: 'inline-flex'
  },
  groupItemOverlap: {
    marginInlineStart: `calc(-1 * ${space.s2})`
  },
  groupItemStack: (order: number) => ({
    zIndex: order
  }),
  groupCount: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    color: colors.mutedForeground,
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    justifyContent: 'center'
  }
})

const sizes = stylex.create({
  sm: { height: space.s8, width: space.s8 },
  md: { height: space.s10, width: space.s10 },
  lg: { height: space.s12, width: space.s12 }
})
