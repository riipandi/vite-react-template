import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonState } from '@base-ui/react/button'
import * as stylex from '@stylexjs/stylex'
import { buttonStyles } from './button.stylex'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon'
  disabled?: boolean
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: stylex.StyleXStyles
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent) => void
}

export function Button({
  variant = 'primary',
  disabled,
  isDisabled,
  type = 'button',
  style,
  children,
  onClick
}: ButtonProps) {
  const resolvedDisabled = disabled ?? isDisabled

  const getClassName = (state: ButtonState) =>
    stylex.props(
      buttonStyles.base,
      variant === 'primary' && buttonStyles.primary,
      variant === 'secondary' && buttonStyles.secondary,
      variant === 'destructive' && buttonStyles.destructive,
      variant === 'icon' && buttonStyles.icon,
      state.disabled && variant !== 'icon' && buttonStyles.disabled,
      state.disabled && variant === 'icon' && buttonStyles.iconDisabled,
      style
    ).className

  return (
    <BaseButton
      disabled={resolvedDisabled}
      type={type}
      onClick={onClick}
      className={(state) => getClassName(state)}
    >
      {children}
    </BaseButton>
  )
}
