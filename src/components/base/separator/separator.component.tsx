/**
 * A simple element used for visual separation of content.
 *
 * @see: https://base-ui.com/react/components/separator
 *
 * BaseUI Anatomy:
 * <Separator />
 */

import { Separator as BaseSeparator } from '@base-ui/react/separator'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Activity } from 'react'
import { separatorStyles, separatorOrientations } from './separator.stylex'

export type SeparatorProps = React.ComponentProps<typeof BaseSeparator> & {
  orientation?: 'horizontal' | 'vertical'
  contentSide?: 'center' | 'left' | 'right'
  xstyle?: StyleXStyles
}

export function Separator({
  children,
  orientation = 'horizontal',
  xstyle,
  ...props
}: SeparatorProps) {
  // ans: contentSide styling deferred — omitted from placeholder stylex
  return (
    <BaseSeparator
      data-slot='separator'
      {...stylex.props(separatorStyles.base, separatorOrientations[orientation], xstyle)}
      {...props}
    >
      <Activity mode={children ? 'visible' : 'hidden'}>
        <span {...stylex.props(separatorStyles.label)}>{children}</span>
      </Activity>
    </BaseSeparator>
  )
}
