/**
 * A button component that can be rendered as another HTML tag while remaining keyboard accessible.
 *
 * @see: https://base-ui.com/react/components/button
 *
 * BaseUI Anatomy:
 * <Button />
 */

import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonState, ButtonProps as BaseButtonProps } from '@base-ui/react/button'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'
import { buttonColors, buttonSizes, buttonStyles, buttonVariants } from './button.stylex'

/**
 * Types derived from StyleX object.
 */
export type ButtonVariant = keyof typeof buttonVariants
export type ButtonColor = keyof typeof buttonColors
export type ButtonSize = keyof typeof buttonSizes

export interface ButtonProps extends BaseButtonProps {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  asIcon?: boolean
  block?: boolean
  pill?: boolean
  className?: string | ((state: ButtonState) => string | undefined)
  xstyle?: StyleXStyles
}

export function Button({
  color = 'neutral',
  variant = 'solid',
  size = 'md',
  asIcon = false,
  pill = false,
  block = false,
  className,
  xstyle,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot='button'
      focusableWhenDisabled
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(
        buttonStyles.base,
        buttonSizes[size],
        buttonColors[color],
        buttonVariants[variant],
        asIcon && buttonStyles.asIcon,
        pill && buttonStyles.pill,
        block && buttonStyles.block,
        xstyle
      )}
      {...props}
    />
  )
}
