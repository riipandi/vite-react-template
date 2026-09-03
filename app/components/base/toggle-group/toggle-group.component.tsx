import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Toggle,
  type ToggleSize,
  type ToggleVariant,
  type ToggleProps
} from '#/components/base/toggle'
import { space, stroke } from '#/lib/constants.stylex'
import { radius } from '#/lib/tokens.stylex'

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

const styles = stylex.create({
  root: {
    display: 'flex',
    width: 'fit-content'
  },
  gap: {
    gap: space.s2
  },
  item: {
    flexShrink: 0
  }
})

const orientations = stylex.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column'
  }
})

const joinedItems = stylex.create({
  horizontal: {
    borderBottomLeftRadius: { default: 0, ':first-child': radius.lg },
    borderBottomRightRadius: { default: 0, ':last-child': radius.lg },
    borderTopLeftRadius: { default: 0, ':first-child': radius.lg },
    borderTopRightRadius: { default: 0, ':last-child': radius.lg },
    paddingInline: space.s2
  },
  vertical: {
    borderBottomLeftRadius: { default: 0, ':last-child': radius.lg },
    borderBottomRightRadius: { default: 0, ':last-child': radius.lg },
    borderTopLeftRadius: { default: 0, ':first-child': radius.lg },
    borderTopRightRadius: { default: 0, ':first-child': radius.lg },
    paddingInline: space.s2
  }
})

// Joined outline items share edges — drop the leading border on every item
// but the first so adjacent borders don't double up.
const joinedOutline = stylex.create({
  horizontal: {
    borderLeftWidth: { default: 0, ':first-child': stroke.border }
  },
  vertical: {
    borderTopWidth: { default: 0, ':first-child': stroke.border }
  }
})
