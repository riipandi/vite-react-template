import './style.css'
import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

function Switch(props: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root data-ui='switch' {...props}>
      <SwitchPrimitive.Thumb data-ui='thumb' />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
