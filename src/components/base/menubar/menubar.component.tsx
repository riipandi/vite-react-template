/**
 * A menu bar component.
 *
 * @see: https://base-ui.com/react/components/menubar
 *
 * BaseUI Anatomy:
 * <Menubar>
 *   <Menu.Root>
 *     <Menu.Trigger />
 *     <Menu.Portal>
 *       <Menu.Backdrop />
 *       <Menu.Positioner>
 *         <Menu.Popup>
 *           <Menu.Arrow />
 *           <Menu.Item />
 *           <Menu.Separator />
 *           <Menu.Group>
 *             <Menu.GroupLabel />
 *           </Menu.Group>
 *           <Menu.RadioGroup>
 *             <Menu.RadioItem />
 *           </Menu.RadioGroup>
 *           <Menu.CheckboxItem />
 *         </Menu.Popup>
 *       </Menu.Positioner>
 *     </Menu.Portal>
 *   </Menu.Root>
 * </Menubar>
 */

import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'

export const menubarStyles = tv({
  base: 'bg-background-page ring-border-neutral flex items-center rounded-lg ring',
  variants: {
    size: {
      default: 'p-1',
      compact: 'p-0.5'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type MenubarProps = React.ComponentProps<typeof BaseMenubar> &
  VariantProps<typeof menubarStyles>

export function Menubar({ className, size, ...props }: MenubarProps) {
  const styles = menubarStyles({ size })
  return <BaseMenubar className={cx(styles, className)} {...props} />
}
