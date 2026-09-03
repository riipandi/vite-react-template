import { Separator as BaseSeparator } from '@base-ui/react/separator'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'

export interface SeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSeparator>,
  'className' | 'style'
> {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function Separator({ orientation = 'horizontal', style, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      {...stylex.props(styles.root, orientations[orientation], style)}
    />
  )
}

const styles = stylex.create({
  root: {
    backgroundColor: colors.border,
    flexShrink: 0
  }
})

const orientations = stylex.create({
  horizontal: {
    height: stroke.border,
    width: '100%'
  },
  vertical: {
    alignSelf: 'stretch',
    width: stroke.border
  }
})
