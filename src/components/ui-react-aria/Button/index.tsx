import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonState } from '@base-ui/react/button'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon'
  disabled?: boolean
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string | ((state: ButtonState) => string | undefined)
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent) => void
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white',
  secondary:
    'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:active:bg-zinc-400 dark:text-zinc-100',
  destructive: 'bg-destructive-700 hover:bg-destructive-800 active:bg-destructive-900 text-white',
  icon: 'border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] active:bg-black/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:active:bg-white/20 disabled:bg-transparent',
}

const disabledStyle =
  'bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5'

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

  return (
    <BaseButton
      disabled={resolvedDisabled}
      type={type}
      onClick={onClick}
      className={(state) => {
        const base = [
          'rounded-md border border-black/10 px-4 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none',
          'outline outline-0 outline-offset-2 outline-blue-600 focus-visible:outline-2 dark:outline-blue-500 forced-colors:outline-[Highlight]',
          variantStyles[variant],
          state.disabled ? disabledStyle : '',
        ]
        if (typeof className === 'function') {
          base.push(className(state) ?? '')
        } else if (typeof className === 'string') {
          base.push(className)
        }
        return base.filter(Boolean).join(' ')
      }}
    >
      {children}
    </BaseButton>
  )
}
