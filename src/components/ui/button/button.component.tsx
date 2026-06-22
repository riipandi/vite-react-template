import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonState } from '@base-ui/react/button'
import * as stylex from '@stylexjs/stylex'
import { clx } from '#/libraries/utils'
import { buttonStyles } from './button.stylex'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon'
  disabled?: boolean
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string | ((state: ButtonState) => string | undefined)
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent) => void
}

export function Button({
  variant = 'primary',
  disabled,
  isDisabled,
  type = 'button',
  className,
  children,
  onClick
}: ButtonProps) {
  const resolvedDisabled = disabled ?? isDisabled

  const getStyles = (state: ButtonState) => {
    const sx = stylex.props(
      buttonStyles.base,
      variant === 'primary' && buttonStyles.primary,
      variant === 'secondary' && buttonStyles.secondary,
      variant === 'destructive' && buttonStyles.destructive,
      variant === 'icon' && buttonStyles.icon,
      state.disabled && variant !== 'icon' && buttonStyles.disabled,
      state.disabled && variant === 'icon' && buttonStyles.iconDisabled
    )

    if (typeof className === 'function') {
      return clx(sx.className, className(state))
    }
    if (typeof className === 'string') {
      return clx(sx.className, className)
    }
    return sx.className
  }

  return (
    <BaseButton
      disabled={resolvedDisabled}
      type={type}
      onClick={onClick}
      className={(state) => getStyles(state)}
    >
      {children}
    </BaseButton>
  )
}
