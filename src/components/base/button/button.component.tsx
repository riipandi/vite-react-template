import './style.css'
import { Button as ButtonPrimitive } from '@base-ui/react/button'

type Props = React.ComponentProps<typeof ButtonPrimitive> &
  Partial<{
    variant: 'primary' | 'neutral' | 'error' | 'link'
    mode: 'filled' | 'lighter' | 'ghost' | 'stroke'
    size: 'lg' | 'md' | 'sm'
    asIcon: boolean
    asRtl: boolean
  }>

export function Button({
  variant = 'primary',
  mode = 'filled',
  size = 'md',
  asRtl = false,
  asIcon = false,
  children,
  ...rest
}: Props) {
  return (
    <ButtonPrimitive
      data-ui='button'
      data-variant={variant}
      data-mode={mode}
      data-size={size}
      data-as-icon={asIcon}
      data-flip-icon-in-rtl={asRtl}
      {...rest}
    >
      {children}
    </ButtonPrimitive>
  )
}
