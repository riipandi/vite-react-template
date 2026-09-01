import { useRender } from '@base-ui/react'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { customClassName } from '#/styles/core/utils.stylex'
import { buttonStyles } from './button.stylex';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

const variantStyles: Record<ButtonVariant, StyleXStyles> = {
  default: buttonStyles.default,
  destructive: buttonStyles.destructive,
  ghost: buttonStyles.ghost,
  link: buttonStyles.link,
  outline: buttonStyles.outline,
  secondary: buttonStyles.secondary
}

const sizeStyles: Record<ButtonSize, StyleXStyles> = {
  default: buttonStyles.sizeDefault,
  icon: buttonStyles.sizeIcon,
  'icon-lg': buttonStyles.sizeIconLg,
  'icon-sm': buttonStyles.sizeIconSm,
  lg: buttonStyles.sizeLg,
  sm: buttonStyles.sizeSm
}

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  /** Render as a different element (Base UI render API). */
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
        variantStyles[variant],
        sizeStyles[size],
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
