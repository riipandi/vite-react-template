import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonState } from '@base-ui/react/button'
import * as stylex from '@stylexjs/stylex'

import {
  colors,
  fontSize,
  fontWeight,
  radius,
  shadow,
  space,
} from '../../../assets/styles/tokens.stylex'
import { cx } from '../utils'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon'
  disabled?: boolean
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string | ((state: ButtonState) => string | undefined)
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent) => void
}

const buttonStyles = stylex.create({
  base: {
    gap: space[2],
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[2],
    paddingBottom: space[2],
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    outlineWidth: 0,
    outlineStyle: 'solid',
    outlineColor: colors.blue600,
    outlineOffset: '2px',
    ':focus-visible': {
      outlineWidth: 2,
    },
  },
  primary: {
    backgroundColor: colors.primary600,
    color: colors.white,
    boxShadow: shadow.sm,
    ':hover': {
      backgroundColor: colors.primary700,
    },
    ':active': {
      backgroundColor: colors.primary800,
    },
  },
  secondary: {
    backgroundColor: colors.zinc100,
    color: colors.zinc800,
    ':hover': {
      backgroundColor: colors.zinc200,
    },
    ':active': {
      backgroundColor: colors.zinc300,
    },
  },
  destructive: {
    backgroundColor: colors.destructive600,
    color: colors.white,
    boxShadow: shadow.sm,
    ':hover': {
      backgroundColor: colors.destructive700,
    },
    ':active': {
      backgroundColor: colors.destructive800,
    },
  },
  icon: {
    borderWidth: 0,
    padding: space[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.zinc600,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  disabled: {
    backgroundColor: colors.zinc100,
    color: colors.zinc300,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: colors.zinc100,
    },
    ':active': {
      backgroundColor: colors.zinc100,
    },
  },
  iconDisabled: {
    backgroundColor: 'transparent',
    color: colors.zinc300,
    ':hover': {
      backgroundColor: 'transparent',
    },
    ':active': {
      backgroundColor: 'transparent',
    },
  },
})

export function Button({
  variant = 'primary',
  disabled,
  isDisabled,
  type = 'button',
  className,
  children,
  onClick,
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
      return cx(sx.className, className(state))
    }
    if (typeof className === 'string') {
      return cx(sx.className, className)
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
