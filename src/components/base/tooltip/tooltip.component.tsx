import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import './style.css'

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider {...props} />
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider delay={300}>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger {...props} />
}

function TooltipContent({
  align = 'center',
  alignOffset = 0,
  side = 'top',
  variant = 'dark',
  sideOffset = 6,
  size = 'md',
  children,
  ...props
}: TooltipPrimitive.Popup.Props & {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light'
} & Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <TooltipPrimitive.Portal data-ui='tooltip-portal'>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          data-ui='tooltip-content'
          data-size={size}
          data-variant={variant}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
