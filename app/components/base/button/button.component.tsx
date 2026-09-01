/**
 * A button component that can be rendered as another HTML tag while remaining keyboard accessible.
 *
 * @see: https://base-ui.com/react/components/button
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Anatomy:
 * <Button />
 */

import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import {
  base,
  focus,
  sizes,
  iconOnly,
  colorVariantMap,
  variants,
  disabledVariants,
  raised,
  rounded,
  fullWidth,
  highlighted,
  loading,
  loadingContent,
  loadingIndicator,
  textWrapper,
  iconStyles,
  buttonGroup,
  buttonGroupItem
} from './button.stylex'

// ---------------------------------------------------------------------------
// Types – derived from style maps (StyleX canonical pattern)
// ---------------------------------------------------------------------------

type SolidColor = keyof typeof colorVariantMap.solid
type OutlineColor = keyof typeof colorVariantMap.outline
type GhostColor = keyof typeof colorVariantMap.ghost
type Color = SolidColor & OutlineColor & GhostColor
type Variant = keyof typeof colorVariantMap
type Size = keyof typeof sizes

export interface ButtonProps extends Omit<BaseButtonProps, 'style'> {
  /** Component color scheme. @default "neutral" */
  color?: Color
  /** Component render variant. @default "solid" */
  variant?: Variant
  /** Component size. @default "medium" */
  size?: Size
  /** SVG component for the start icon. */
  icon?: React.ReactNode
  /** SVG component for the end icon. */
  endIcon?: React.ReactNode
  /** Apply raised (elevated) styles. */
  raised?: boolean
  /** Change border radius to fully rounded corners. */
  rounded?: boolean
  /** Show loading state. */
  loading?: boolean
  /** aria-label attribute for the loading indicator. */
  loadingAriaLabel?: string
  /** Make the component take the full width of the parent. */
  fullWidth?: boolean
  /** Highlight the component (active state indicator). */
  highlighted?: boolean
  /** Stop event propagation on click. */
  stopPropagation?: boolean
  /** Additional class name. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export interface ButtonGroupProps {
  /** Child Button components. */
  children: React.ReactNode
  /** Additional class name. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

export function Button({
  color = 'neutral',
  variant = 'solid',
  size = 'medium',
  disabled = false,
  raised: isRaised = false,
  rounded: isRounded = false,
  loading: isLoading = false,
  fullWidth: isFullWidth = false,
  highlighted: isHighlighted = false,
  icon,
  endIcon,
  loadingAriaLabel,
  stopPropagation = false,
  className,
  style,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const isIconOnly = !children && !!icon

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) e.stopPropagation()
    onClick?.(e as Parameters<NonNullable<typeof onClick>>[0])
  }

  return (
    <BaseButton
      data-slot='button'
      disabled={disabled}
      focusableWhenDisabled
      aria-busy={isLoading || undefined}
      aria-label={isLoading ? loadingAriaLabel : undefined}
      {...stylex.props(
        base.root,
        focus.visible,
        sizes[size],
        colorVariantMap[variant][color],
        variants[variant],
        customClassName(className),
        // Conditional
        disabled && disabledVariants[variant],
        disabled && color !== 'media' && base.disabled,
        isRaised && raised[variant],
        isRounded && rounded.root,
        isFullWidth && fullWidth.root,
        isHighlighted && color in highlighted && highlighted[color as keyof typeof highlighted],
        isLoading && loading.root,
        isIconOnly && iconOnly.root,
        style
      )}
      onClick={handleClick}
      {...props}
    >
      {isLoading && <span {...stylex.props(loadingIndicator.root)}>Loading…</span>}
      <span
        {...stylex.props(
          textWrapper.root,
          (isLoading || (!children && !icon && !endIcon)) && loadingContent.root
        )}
      >
        {icon && <span {...stylex.props(iconStyles.start)}>{icon}</span>}
        {children}
      </span>
      {endIcon && (
        <span {...stylex.props(iconStyles.end, isLoading && loadingContent.root)}>{endIcon}</span>
      )}
    </BaseButton>
  )
}

// ---------------------------------------------------------------------------
// Button Group
// ---------------------------------------------------------------------------

export function ButtonGroup({ children, className, style: styleProp }: ButtonGroupProps) {
  const childArray = React.Children.toArray(children)
  const count = childArray.length

  return (
    <div
      data-slot='button-group'
      {...stylex.props(buttonGroup.root, customClassName(className), styleProp)}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        const isFirst = index === 0
        const isLast = index === count - 1

        const groupStyles = stylex.props(
          buttonGroupItem.root,
          isFirst && buttonGroupItem.first,
          isLast && buttonGroupItem.last
        )

        return (
          <>
            {React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
              className: groupStyles.className
                ? `${(child.props as Record<string, unknown>).className || ''} ${groupStyles.className}`.trim()
                : (child.props as Record<string, unknown>).className
            })}
            {!isLast && <span aria-hidden='true' {...stylex.props(buttonGroupItem.separator)} />}
          </>
        )
      })}
    </div>
  )
}
