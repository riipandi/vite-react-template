/**
 * A group of toggle buttons.
 *
 * @see: https://base-ui.com/react/components/toggle-group
 *
 * BaseUI Anatomy:
 * <ToggleGroup.Root />
 */

import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  toggleGroupModes,
  toggleGroupOrientations,
  toggleGroupSizes,
  toggleGroupStyles,
  toggleGroupVariants
} from './toggle-group.stylex'

export type ToggleGroupVariant = keyof typeof toggleGroupVariants
export type ToggleGroupSize = keyof typeof toggleGroupSizes
export type ToggleGroupMode = keyof typeof toggleGroupModes
export type ToggleGroupOrientation = keyof typeof toggleGroupOrientations

export type ToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup> & {
  variant?: ToggleGroupVariant
  size?: ToggleGroupSize
  mode?: ToggleGroupMode
  orientation?: ToggleGroupOrientation
  xstyle?: StyleXStyles
}

export function ToggleGroup({
  variant = 'default',
  size,
  mode,
  orientation,
  xstyle,
  ...props
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      data-slot='toggle-group'
      {...stylex.props(
        toggleGroupStyles.root,
        toggleGroupVariants[variant],
        size && toggleGroupSizes[size],
        mode && toggleGroupModes[mode],
        orientation && toggleGroupOrientations[orientation],
        xstyle
      )}
      {...props}
    />
  )
}
