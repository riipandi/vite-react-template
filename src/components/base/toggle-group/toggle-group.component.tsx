import './style.css'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPremitive } from '@base-ui/react/toggle-group'
import * as React from 'react'

interface ToogleProps {
  variant?: 'ghost' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}

const ToggleGroupContext = React.createContext<ToogleProps>({})

function Toggle({
  variant = 'primary',
  size = 'md',
  ...props
}: TogglePrimitive.Props & ToogleProps) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-ui='toggle-group-item'
      data-variant={context.variant || variant}
      data-size={context.size || size}
      {...props}
    />
  )
}

type ToggleGroupProps = ToogleProps & {
  grouped?: boolean
}

function ToggleGroup({
  variant = 'primary',
  size = 'md',
  grouped = true,
  children,
  ...props
}: ToggleGroupPremitive.Props & ToggleGroupProps) {
  return (
    <ToggleGroupPremitive
      data-ui='toggle-group'
      data-variant={variant}
      data-grouped={grouped}
      data-size={size}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPremitive>
  )
}

export { ToggleGroup, Toggle as ToggleGroupItem }
