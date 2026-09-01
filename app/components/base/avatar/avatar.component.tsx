/**
 * Avatar component with Reshaped-inspired API.
 *
 * @see: https://base-ui.com/react/components/avatar
 *
 * Anatomy:
 *   <Avatar src="..." />
 *   <Avatar initials="JD" />
 *   <Avatar icon={<Icon />} />
 */

import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { avatarStyles as s } from './avatar.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AvatarSize = keyof typeof s.sizes
type AvatarVariant = keyof typeof s.variants
type AvatarColor = keyof typeof s.colorsSolid

export type AvatarProps = Omit<React.ComponentProps<typeof BaseAvatar.Root>, 'children'> & {
  /** Image URL */
  src?: string
  /** Image alt text */
  alt?: string
  /** Initials to display if no image is provided */
  initials?: string
  /** Icon element, used when no image is provided */
  icon?: React.ReactNode
  /** Change the shape to rounded square */
  squared?: boolean
  /** Visual variant */
  variant?: AvatarVariant
  /** Color scheme */
  color?: AvatarColor
  /** Size of the avatar */
  size?: AvatarSize
  /** Additional attributes for the image element */
  imageAttributes?: React.ComponentProps<typeof BaseAvatar.Image>
  /** Render prop for the image element, useful for integrating with third party image components */
  renderImage?: (
    props: React.ComponentProps<typeof BaseAvatar.Image> & { src: string; alt: string }
  ) => React.ReactNode
  /** Delay before showing fallback (ms) */
  fallbackDelay?: number
  /** StyleX styles to apply */
  xstyle?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function applyStylexProps(
  sx: ReturnType<typeof stylex.props>,
  props: Record<string, unknown>
): Record<string, unknown> {
  const { xstyle: _, ...rest } = props
  void _
  return { ...rest, ...sx }
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

export function Avatar({
  src,
  alt,
  initials,
  icon,
  squared = false,
  variant = 'solid',
  color = 'neutral',
  size = 'large',
  imageAttributes,
  renderImage,
  fallbackDelay,
  xstyle,
  ...props
}: AvatarProps) {
  // Base styles
  const sx = stylex.props(
    s.base.root,
    squared ? s.shape.rounded : s.shape.circular,
    s.variants[variant],
    variant === 'solid' ? s.colorsSolid[color] : s.colorsFaded[color],
    s.sizes[size],
    xstyle
  )

  const { className, style, ...restProps } = applyStylexProps(sx, props) as {
    className?: string
    style?: React.CSSProperties
    [key: string]: unknown
  }

  // Image props
  const imgAttrs = imageAttributes || {}
  const {
    className: imgClassName,
    style: imgStyle,
    ...imgRest
  } = imgAttrs as {
    className?: string
    style?: React.CSSProperties
    [key: string]: unknown
  }
  const imgSx = stylex.props(s.image.root)
  const imgClassNameFinal = [imgClassName, imgSx.className].filter(Boolean).join(' ') || undefined
  const imgStyleFinal = { ...imgStyle, ...imgSx.style }

  return (
    <BaseAvatar.Root data-slot='avatar' className={className} style={style} {...restProps}>
      {src ? (
        renderImage ? (
          renderImage({
            ...imgAttrs,
            src,
            alt: alt || '',
            className: imgClassNameFinal,
            style: imgStyleFinal,
            ...imgRest
          })
        ) : (
          <BaseAvatar.Image
            data-slot='avatar-image'
            src={src}
            alt={alt || ''}
            className={imgClassNameFinal}
            style={imgStyleFinal}
            {...imgRest}
          />
        )
      ) : (
        <BaseAvatar.Fallback
          data-slot='avatar-fallback'
          delay={fallbackDelay}
          {...(() => {
            const fbSx = stylex.props(s.fallback.root, s.fallback[size])
            const {
              className: fbClassName,
              style: fbStyle,
              ...fbRest
            } = fbSx as {
              className?: string
              style?: React.CSSProperties
              [key: string]: unknown
            }
            return { className: fbClassName, style: fbStyle, ...fbRest }
          })()}
        >
          {icon ? (
            <span data-slot='avatar-icon'>
              {(() => {
                const iconSx = stylex.props(s.icon.root, s.icon[size])
                const {
                  className: iconClassName,
                  style: iconStyle,
                  ...iconRest
                } = iconSx as {
                  className?: string
                  style?: React.CSSProperties
                  [key: string]: unknown
                }
                return (
                  <span
                    data-slot='avatar-icon-inner'
                    className={iconClassName}
                    style={iconStyle}
                    {...iconRest}
                  >
                    {icon}
                  </span>
                )
              })()}
            </span>
          ) : (
            initials
          )}
        </BaseAvatar.Fallback>
      )}
    </BaseAvatar.Root>
  )
}

Avatar.displayName = 'Avatar'
