/**
 * A switch component that can be on or off.
 *
 * @see: https://base-ui.com/react/components/switch
 *
 * BaseUI Anatomy:
 * <Switch.Root>
 *   <Switch.Thumb />
 * </Switch.Root>
 */

import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { switchStyles, switchSizes } from './switch.stylex'

export type SwitchSize = keyof typeof switchSizes

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> & {
  size?: SwitchSize
  xstyle?: StyleXStyles
}

export function Switch({ size, xstyle, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot='switch'
      {...stylex.props(switchStyles.root, size && switchSizes[size], xstyle)}
      {...props}
    />
  )
}
