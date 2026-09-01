import { useRender } from '@base-ui/react'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { customClassName } from '#/styles/core/utils.stylex'
import { buttonSizeStyles, buttonStyles, buttonVariantStyles } from './button.stylex'
import type { ButtonSize, ButtonVariant } from './button.stylex'

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  render?: useRender.RenderProp
}

const Button = ({
  className,
  style,
  variant = 'default',
  size = 'default',
  render,
  ...props
}: ButtonProps) =>
  useRender({
    props: {
      ...stylex.props(
        buttonStyles.base,
        buttonStyles.focusable,
        buttonVariantStyles[variant],
        buttonSizeStyles[size],
        customClassName(className),
        style as StyleXStyles
      ),
      'data-size': size,
      'data-slot': 'button',
      'data-variant': variant,
      ...props
    },
    render: render ?? <button type='button' />
  })

export { Button }
