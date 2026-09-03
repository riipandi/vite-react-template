/**
 * A simple element used for visual separation of content.
 *
 * @see: https://base-ui.com/react/components/separator
 *
 * BaseUI Anatomy:
 * <Separator />
 */

import { Separator as BaseSeparator } from '@base-ui/react/separator'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { separatorStyles as s } from './separator.stylex'
import { separatorOrientations as orientations } from './separator.stylex'

export interface SeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSeparator>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Separator({ orientation = 'horizontal', style, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      {...stylex.props(s.root, orientations[orientation], style)}
    />
  )
}
