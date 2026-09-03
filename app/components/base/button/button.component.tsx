import { Button as BaseButton } from '@base-ui/react/button'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { buttonSizes, buttonStyles, buttonVariants } from './button.stylex'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon' | 'iconXs' | 'iconSm' | 'iconLg'

export interface ButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseButton>,
  'className' | 'style'
> {
  variant?: ButtonVariant
  size?: ButtonSize
  style?: stylex.StyleXStyles
}

export function Button({ variant = 'primary', size = 'md', style, ...props }: ButtonProps) {
  return (
    <BaseButton
      {...props}
      {...stylex.props(buttonStyles.root, buttonVariants[variant], buttonSizes[size], style)}
    />
  )
}
