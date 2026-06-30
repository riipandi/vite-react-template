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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { avatarStyles, avatarSizes } from './avatar.stylex'

export type AvatarVariant = keyof typeof avatarSizes

export type AvatarRootProps = React.ComponentProps<typeof BaseAvatar.Root> & {
  size?: AvatarVariant
  xstyle?: StyleXStyles
}
export type AvatarImageProps = React.ComponentProps<typeof BaseAvatar.Image> & {
  xstyle?: StyleXStyles
}
export type AvatarFallbackProps = React.ComponentProps<typeof BaseAvatar.Fallback> & {
  asInitial?: boolean
  xstyle?: StyleXStyles
}
export type AvatarIndicatorProps = React.ComponentProps<'span'> & {
  position?: 'top' | 'bottom'
  size?: AvatarVariant
  xstyle?: StyleXStyles
}

export function Avatar({ size, xstyle, ...props }: AvatarRootProps) {
  return (
    <BaseAvatar.Root
      data-slot='avatar'
      {...stylex.props(avatarStyles.base, size && avatarSizes[size], xstyle)}
      {...props}
    />
  )
}

export function AvatarImage({ xstyle, ...props }: AvatarImageProps) {
  return (
    <BaseAvatar.Image
      data-slot='avatar-image'
      {...stylex.props(avatarStyles.image, xstyle)}
      {...props}
    />
  )
}

export function AvatarFallback({
  asInitial = false,
  children,
  xstyle,
  ...props
}: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback
      data-slot='avatar-fallback'
      {...stylex.props(asInitial ? avatarStyles.fallbackInitial : avatarStyles.fallback, xstyle)}
      {...props}
    >
      {children}
    </BaseAvatar.Fallback>
  )
}

export function AvatarIndicator({ size, xstyle, ...props }: AvatarIndicatorProps) {
  return (
    <span
      data-slot='avatar-indicator'
      {...stylex.props(avatarStyles.indicator, size && avatarSizes[size], xstyle)}
      {...props}
    />
  )
}
