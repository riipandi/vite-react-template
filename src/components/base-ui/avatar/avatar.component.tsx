'use client'

import './style.css'
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: number
  shape?: 'circle' | 'square'
}

const Avatar = ({ children, size = 40, shape = 'circle', ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      data-ui='avatar'
      data-shape={shape}
      tabIndex={0}
      style={{ '--avatar-size': `${size}px` } as React.CSSProperties}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
  )
}

const AvatarFallback = ({ children, ...props }: AvatarPrimitive.Fallback.Props) => {
  return (
    <AvatarPrimitive.Fallback data-ui='avatar-fallback' {...props}>
      {children}
    </AvatarPrimitive.Fallback>
  )
}

const AvatarImage = ({ children, ...props }: AvatarPrimitive.Image.Props) => {
  return (
    <AvatarPrimitive.Image data-ui='avatar-image' {...props}>
      {children}
    </AvatarPrimitive.Image>
  )
}

type AvatarBadgeProps = React.ComponentProps<'span'> & {
  status?: 'online' | 'offline' | 'busy' | 'away'
}

const AvatarBadge = ({ status = 'online', ...props }: AvatarBadgeProps) => {
  return <span data-ui='avatar-status' data-status={status} {...props} />
}

const AvatarGroupCount = ({ ...props }: React.ComponentProps<'div'>) => {
  return <div data-ui='avatar-group-count' {...props} />
}

const AvatarGroup = ({ ...props }: React.ComponentProps<'div'>) => {
  return <div data-ui='avatar-group' {...props} />
}

export { Avatar, AvatarFallback, AvatarImage, AvatarBadge, AvatarGroupCount, AvatarGroup }
