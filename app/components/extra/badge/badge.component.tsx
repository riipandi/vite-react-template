/**
 * Badge component with Reshaped-inspired API.
 *
 * No Base UI equivalent — created from scratch using StyleX.
 * Uses `useRender` from Base UI for render prop polymorphism.
 *
 * Usage:
 *   <Badge>Label</Badge>
 *   <Badge color="primary" variant="faded">Primary</Badge>
 *   <Badge icon={<Icon />} rounded />
 *   <Badge onDismiss={() => {}} dismissAriaLabel="Dismiss" />
 *   <Badge render={<span />}>Custom element</Badge>
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { badgeStyles as s } from './badge.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BadgeSize = keyof typeof s.sizes
type BadgeVariant = keyof typeof s.variants
type BadgeColor = keyof typeof s.colorsSolid

type BadgeContainerPosition = 'top-end' | 'bottom-end'

type BadgeRenderProp =
  | React.ReactElement
  | ((
      props: React.HTMLAttributes<HTMLElement>,
      state: Record<string, unknown>
    ) => React.ReactElement)

type TagName = keyof React.JSX.IntrinsicElements

export type BadgeProps = Omit<React.ComponentProps<'span'>, 'style'> & {
  /** Node for inserting text or other content */
  children?: React.ReactNode
  /** Icon element for the start position */
  icon?: React.ReactNode
  /** Icon element for the end position */
  endIcon?: React.ReactNode
  /** Component color scheme */
  color?: BadgeColor
  /** Component size */
  size?: BadgeSize
  /** Component render variant */
  variant?: BadgeVariant
  /** Change border radius to fully rounded corners */
  rounded?: boolean
  /** Highlight the component when used for an active state */
  highlighted?: boolean
  /** Transition the component to hidden state */
  hidden?: boolean
  /** Callback triggered when the dismiss button is pressed */
  onDismiss?: () => void
  /** Aria label for the dismiss button */
  dismissAriaLabel?: string
  /** Click handler (makes badge actionable) */
  onClick?: (e: React.MouseEvent) => void
  /** URL to link to (makes badge a link) */
  href?: string
  /** Render prop for polymorphism */
  render?: BadgeRenderProp
  /** StyleX styles to apply */
  style?: stylex.StyleXStyles
}

export type BadgeContainerProps = Omit<React.ComponentProps<'div'>, 'style'> & {
  /** Position of the container relative to the parent element */
  position?: BadgeContainerPosition
  /** Move the badge closer to center to overlap with the child component */
  overlap?: boolean
  /** Render prop for polymorphism */
  render?: BadgeRenderProp
  /** StyleX styles to apply */
  style?: stylex.StyleXStyles
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

export function Badge({
  render,
  children,
  icon,
  endIcon,
  color = 'neutral',
  size = 'medium',
  variant = 'solid',
  rounded: isRounded = false,
  highlighted: isHighlighted = false,
  hidden: isHidden = false,
  onDismiss,
  dismissAriaLabel,
  onClick,
  href,
  style,
  className,
  ...otherProps
}: BadgeProps) {
  const hasText = children !== undefined && children !== null
  const isEmpty = !hasText && !icon && !endIcon

  const sx = stylex.props(
    s.base.root,
    s.sizes[size],
    isEmpty && s.empty[size],
    variant === 'solid' ? s.colorsSolid[color] : s.colorsFaded[color],
    isRounded && s.rounded.root,
    isHighlighted && s.highlighted.root,
    isHidden && s.hidden.root,
    style
  )

  const badgeContent = (
    <>
      {icon && (
        <span data-slot='badge-icon' {...stylex.props(s.icon[size])}>
          {(() => {
            const iconSvgSx = stylex.props(s.iconSvg[size])
            return React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<Record<string, unknown>>, {
                  className:
                    [iconSvgSx.className, (icon.props as Record<string, unknown>).className]
                      .filter(Boolean)
                      .join(' ') || undefined,
                  style: {
                    ...iconSvgSx.style,
                    ...((icon.props as Record<string, unknown>).style as React.CSSProperties)
                  }
                })
              : icon
          })()}
        </span>
      )}
      {hasText && (
        <span data-slot='badge-content' {...stylex.props(s.content.root)}>
          {children}
        </span>
      )}
      {endIcon && (
        <span data-slot='badge-end-icon' {...stylex.props(s.icon[size])}>
          {(() => {
            const iconSvgSx = stylex.props(s.iconSvg[size])
            return React.isValidElement(endIcon)
              ? React.cloneElement(endIcon as React.ReactElement<Record<string, unknown>>, {
                  className:
                    [iconSvgSx.className, (endIcon.props as Record<string, unknown>).className]
                      .filter(Boolean)
                      .join(' ') || undefined,
                  style: {
                    ...iconSvgSx.style,
                    ...((endIcon.props as Record<string, unknown>).style as React.CSSProperties)
                  }
                })
              : endIcon
          })()}
        </span>
      )}
      {onDismiss && (
        <button
          data-slot='badge-dismiss'
          type='button'
          aria-label={dismissAriaLabel}
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          {...stylex.props(s.dismiss.root, s.dismiss[size])}
        >
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 4L4 12M4 4l8 8'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}
    </>
  )

  const defaultProps = {
    'data-slot': 'badge',
    className: [sx.className, className].filter(Boolean).join(' ') || undefined,
    style: { ...sx.style, ...style },
    onClick,
    href,
    children: badgeContent
  }

  return useRender<Record<string, unknown>, HTMLSpanElement>({
    defaultTagName: 'span' as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

Badge.displayName = 'Badge'

// ---------------------------------------------------------------------------
// BadgeContainer
// ---------------------------------------------------------------------------

export function BadgeContainer({
  render,
  position = 'top-end',
  overlap = false,
  style,
  className,
  children,
  ...otherProps
}: BadgeContainerProps) {
  const sx = stylex.props(
    s.container.root,
    s.container[position],
    overlap && s.container.overlap,
    style
  )

  const defaultProps = {
    'data-slot': 'badge-container',
    className: [sx.className, className].filter(Boolean).join(' ') || undefined,
    style: { ...sx.style, ...style },
    children
  }

  return useRender<Record<string, unknown>, HTMLDivElement>({
    defaultTagName: 'div' as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

BadgeContainer.displayName = 'BadgeContainer'
