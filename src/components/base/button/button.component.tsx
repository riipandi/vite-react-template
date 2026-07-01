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
import type { ButtonVariant, ButtonColor, ButtonSize } from './button.stylex'

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
  disabled = false,
  className,
  xstyle,
  ...props
}: ButtonProps) {
  const sx = stylex.props(
    buttonStyles.base,
    buttonSizes[size],
    buttonColors[color],
    buttonVariants[variant],
    asIcon && buttonStyles.asIcon,
    pill && buttonStyles.pill,
    block && buttonStyles.block,
    disabled && buttonStyles.disabled,
    xstyle
  )

  return (
    <BaseButton
      data-slot='button'
      disabled={disabled}
      focusableWhenDisabled
      className={(state) =>
        cx(sx.className, typeof className === 'function' ? className(state) : className)
      }
      {...sx}
      {...props}
    />
  )
}
