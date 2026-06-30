/**
 * A toggle button component.
 *
 * @see: https://base-ui.com/react/components/toggle
 *
 * BaseUI Anatomy:
 * <Toggle />
 */

import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { toggleModes, toggleSizes, toggleStyles, toggleVariants } from './toggle.stylex'

export type ToggleVariant = keyof typeof toggleVariants
export type ToggleSize = keyof typeof toggleSizes
export type ToggleMode = keyof typeof toggleModes

export type ToggleProps = React.ComponentProps<typeof BaseToggle> & {
  variant?: ToggleVariant
  size?: ToggleSize
  mode?: ToggleMode
  xstyle?: StyleXStyles
}

export function Toggle({ variant = 'default', size, mode, xstyle, ...props }: ToggleProps) {
  return (
    <BaseToggle
      data-slot='toggle'
      {...stylex.props(
        toggleStyles.base,
        toggleVariants[variant],
        size && toggleSizes[size],
        mode && toggleModes[mode],
        xstyle
      )}
      {...props}
    />
  )
}
