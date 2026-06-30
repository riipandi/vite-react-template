import './style.css'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'

interface ToogleProps {
  variant?: 'ghost' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}

function Toggle({
  variant = 'primary',
  size = 'md',
  ...props
}: TogglePrimitive.Props & ToogleProps) {
  return <TogglePrimitive data-ui='toggle' data-variant={variant} data-size={size} {...props} />
}

export { Toggle }
