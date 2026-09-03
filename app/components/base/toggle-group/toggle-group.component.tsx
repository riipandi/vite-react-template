/**
 * A group of toggle buttons.
 *
 * @see: https://base-ui.com/react/components/toggle-group
 *
 * BaseUI Anatomy:
 * <ToggleGroup.Root />
 */

import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Toggle } from '#/components/base/toggle'
import type { ToggleSize, ToggleVariant, ToggleProps } from '#/components/base/toggle'
import { toggleGroupStyles as styles } from './toggle-group.stylex'
import { toggleGroupOrientations as orientations } from './toggle-group.stylex'
import { toggleGroupJoinedItems as joinedItems } from './toggle-group.stylex'
import { toggleGroupJoinedOutline as joinedOutline } from './toggle-group.stylex'

interface ToggleGroupContextValue {
  variant: ToggleVariant
  size: ToggleSize
  joined: boolean
  orientation: 'horizontal' | 'vertical'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'md',
  joined: false,
  orientation: 'horizontal'
})

export interface ToggleGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
  'className' | 'style'
> {
  variant?: ToggleVariant
  size?: ToggleSize
  /** Item gap. `joined` fuses the items into one segmented control. */
  spacing?: 'gap' | 'joined'

  style?: stylex.StyleXStyles
}

export function ToggleGroup({
  variant = 'default',
  size = 'md',
  spacing = 'gap',
  orientation = 'horizontal',
  style,
  children,
  ...props
}: ToggleGroupProps) {
  const joined = spacing === 'joined'
  return (
    <BaseToggleGroup
      orientation={orientation}
      {...props}
      {...stylex.props(styles.root, orientations[orientation], !joined && styles.gap, style)}
    >
      <ToggleGroupContext.Provider value={{ variant, size, joined, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </BaseToggleGroup>
  )
}

export function ToggleGroupItem({ style, ...props }: ToggleProps) {
  const { variant, size, joined, orientation } = React.useContext(ToggleGroupContext)
  return (
    <Toggle
      variant={props.variant ?? variant}
      size={props.size ?? size}
      {...props}
      style={[
        styles.item,
        joined && joinedItems[orientation],
        joined && variant === 'outline' && joinedOutline[orientation],
        style
      ]}
    />
  )
}
