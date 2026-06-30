/**
 * A menu bar component.
 *
 * @see: https://base-ui.com/react/components/menubar
 *
 * BaseUI Anatomy:
 * <Menubar.Root />
 */

import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { menubarStyles, menubarSizes } from './menubar.stylex'

export type MenubarSize = keyof typeof menubarSizes

export type MenubarProps = React.ComponentProps<typeof BaseMenubar> & {
  size?: MenubarSize
  xstyle?: StyleXStyles
}

export function Menubar({ size = 'default', xstyle, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      data-slot='menubar'
      {...stylex.props(menubarStyles.root, menubarSizes[size], xstyle)}
      {...props}
    />
  )
}
