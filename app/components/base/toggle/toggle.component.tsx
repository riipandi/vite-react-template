/**
 * A toggle button component.
 *
 * @see: https://base-ui.com/react/components/toggle
 *
 * BaseUI Anatomy:
 * <Toggle />
 */

import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { toggleStyles as s } from './toggle.stylex'
import { toggleVariants, toggleSizes } from './toggle.stylex'

export type ToggleVariant = 'default' | 'outline'
export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggle>,
  'className' | 'style'
> {
  variant?: ToggleVariant
  size?: ToggleSize

  style?: stylex.StyleXStyles
}

export function Toggle({ variant = 'default', size = 'md', style, ...props }: ToggleProps) {
  return (
    <BaseToggle
      {...props}
      {...stylex.props(s.root, toggleVariants[variant], toggleSizes[size], style)}
    />
  )
}
