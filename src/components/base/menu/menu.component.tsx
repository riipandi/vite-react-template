/**
 * Displays a menu of options or commands.
 *
 * @see: https://base-ui.com/react/components/menu
 *
 * BaseUI Anatomy:
 * <Menu.Root>
 *   <Menu.Trigger />
 *   <Menu.Portal>
 *     <Menu.Backdrop />
 *     <Menu.Positioner>
 *       <Menu.Popup>
 *         <Menu.Arrow />
 *         <Menu.Item />
 *         <Menu.Separator />
 *         <Menu.Group>
 *           <Menu.GroupLabel />
 *         </Menu.Group>
 *         <Menu.RadioGroup>
 *           <Menu.RadioItem />
 *         </Menu.RadioGroup>
 *         <Menu.CheckboxItem />
 *         <Menu.SubmenuRoot>
 *           <Menu.SubmenuTrigger />
 *         </Menu.SubmenuRoot>
 *       </Menu.Popup>
 *     </Menu.Positioner>
 *   </Menu.Portal>
 * </Menu.Root>
 */

import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'

export const menuStyles = tv({
  slots: {
    popup: [
      'bg-background-elevation-overlay ring-border-neutral shadow-overlay origin-(--transform-origin) ring',
      'space-y-0 p-1.5 transition-[transform,scale,opacity] outline-none',
      'data-ending-style:scale-90 data-ending-style:opacity-0',
      'data-starting-style:scale-90 data-starting-style:opacity-0',
      'min-w-32 **:data-[slot=item]:p-0'
    ],
    item: [
      'text-foreground-neutral flex cursor-pointer items-center text-sm select-none',
      'data-highlighted:not-data-disabled:bg-background-neutral-faded data-selected:not-data-disabled:bg-background-neutral-faded',
      'data-popup-open:bg-background-neutral-faded',
      'focus-visible:outline-none',
      '[&_svg:not([class*=text-])]:text-foreground-neutral [&_svg:not([class*=size-])]:size-3.5',
      '*:data-[slot=switch]:ml-auto',
      'data-disabled:cursor-not-allowed data-disabled:opacity-70'
    ],
    separator: 'bg-border-neutral-faded h-px',
    submenuTrigger: [
      'text-foreground-neutral flex cursor-pointer items-center text-sm select-none',
      'data-highlighted:not-data-disabled:bg-background-neutral-faded data-selected:not-data-disabled:bg-background-neutral-faded',
      'data-popup-open:bg-background-neutral-faded focus-visible:outline-none',
      '[&_svg:not([class*=text-])]:text-foreground-neutral [&_svg:not([class*=size-])]:size-3',
      '*:data-[slot=switch]:ml-auto',
      'data-disabled:cursor-not-allowed data-disabled:opacity-70'
    ],
    groupLabel: 'text-foreground-neutral-faded px-2.5 py-1 text-sm font-medium',
    radioItem: [
      'text-foreground-neutral flex cursor-pointer items-center text-sm select-none',
      'data-highlighted:not-data-disabled:bg-background-neutral-faded data-selected:not-data-disabled:bg-background-neutral-faded',
      'data-popup-open:bg-background-neutral-faded focus-visible:outline-none',
      '[&_svg:not([class*=text-])]:text-foreground-neutral [&_svg:not([class*=size-])]:size-3.5',
      '*:data-[slot=switch]:ml-auto',
      'data-disabled:cursor-not-allowed data-disabled:opacity-70'
    ],
    radioItemIndicator: 'flex size-3 items-center justify-center rounded-full'
  },
  variants: {
    size: {
      compact: {
        separator: 'my-1',
        submenuTrigger: [
          'after:bg-chevron-right-dark dark:after:bg-chevron-right after:ml-auto after:size-3'
        ],
        popup: [
          'rounded-md',
          '**:data-[slot$=item]:gap-1.5',
          '**:data-[slot$=item]:px-3',
          '**:data-[slot$=item]:py-1.5',
          '**:data-[slot=menu-checkbox-item]:pl-5',
          '**:data-[slot=menu-checkbox-item]:data-checked:pl-1.5',
          '**:data-[slot$=item]:rounded-xs',
          '**:data-[slot=menu-submenu-trigger]:gap-1.5',
          '**:data-[slot=menu-submenu-trigger]:px-3',
          '**:data-[slot=menu-submenu-trigger]:py-1.5',
          '**:data-[slot=menu-submenu-trigger]:rounded-xs'
        ]
      },
      default: {
        separator: 'my-1.5',
        submenuTrigger: [
          'after:bg-chevron-right-dark dark:after:bg-chevron-right after:ml-auto after:size-3'
        ],
        popup: [
          'rounded-lg',
          '**:data-[slot$=item]:gap-2',
          '**:data-[slot$=item]:px-3',
          '**:data-[slot$=item]:py-2',
          '**:data-[slot=menu-checkbox-item]:pl-5',
          '**:data-[slot=menu-checkbox-item]:data-checked:pl-3',
          '**:data-[slot$=item]:rounded-sm',
          '**:data-[slot=menu-submenu-trigger]:gap-2',
          '**:data-[slot=menu-submenu-trigger]:px-3',
          '**:data-[slot=menu-submenu-trigger]:py-2',
          '**:data-[slot=menu-submenu-trigger]:rounded-sm'
        ]
      }
    },
    variant: {
      default: {},
      alternate: {
        radioItem: [
          '*:data-[slot=menu-radio-item-indicator]:order-last',
          '*:data-[slot=menu-radio-item-indicator]:ml-auto',
          '*:data-[slot=menu-radio-item-indicator]:ring',
          '*:data-[slot=menu-radio-item-indicator]:ring-border-neutral',
          '*:data-[slot=menu-radio-item-indicator]:bg-background-elevation-base'
        ]
      }
    }
  },
  defaultVariants: {
    size: 'default',
    variant: 'default'
  }
})

export function Menu({ ...props }: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot='menu' {...props} />
}

export function MenuTrigger({ ...props }: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot='menu-trigger' {...props} />
}

export type MenuPopupProps = React.ComponentProps<typeof BaseMenu.Popup> &
  VariantProps<typeof menuStyles> & {
    align?: BaseMenu.Positioner.Props['align']
    alignOffset?: BaseMenu.Positioner.Props['alignOffset']
    side?: BaseMenu.Positioner.Props['side']
    sideOffset?: BaseMenu.Positioner.Props['sideOffset']
    anchor?: BaseMenu.Positioner.Props['anchor']
    sticky?: BaseMenu.Positioner.Props['sticky']
    positionMethod?: BaseMenu.Positioner.Props['positionMethod']
  }

export function MenuPopup({
  children,
  className,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  size,
  ...props
}: MenuPopupProps) {
  const styles = menuStyles({ size })
  return (
    <BaseMenu.Portal className='z-30'>
      <BaseMenu.Backdrop />
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 6}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BaseMenu.Popup data-slot='menu-popup' {...props} className={cx(styles.popup(), className)}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function MenuItem({ className, ...props }: React.ComponentProps<typeof BaseMenu.Item>) {
  const styles = menuStyles()
  return <BaseMenu.Item data-slot='menu-item' {...props} className={cx(styles.item(), className)} />
}

export function MenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  const styles = menuStyles()
  return (
    <BaseMenu.Separator
      data-slot='menu-separator'
      className={cx(styles.separator(), className)}
      {...props}
    />
  )
}

export function MenuSubmenu({ ...props }: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot data-slot='menu-submenu' {...props} />
}

export function MenuSubmenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  const styles = menuStyles()
  return (
    <BaseMenu.SubmenuTrigger
      data-slot='menu-submenu-trigger'
      {...props}
      className={cx(styles.submenuTrigger(), className)}
    />
  )
}

export type MenuSubmenuPopupProps = React.ComponentProps<typeof BaseMenu.Popup> &
  VariantProps<typeof menuStyles> & {
    align?: BaseMenu.Positioner.Props['align']
    alignOffset?: BaseMenu.Positioner.Props['alignOffset']
    side?: BaseMenu.Positioner.Props['side']
    sideOffset?: BaseMenu.Positioner.Props['sideOffset']
    anchor?: BaseMenu.Positioner.Props['anchor']
    sticky?: BaseMenu.Positioner.Props['sticky']
    positionMethod?: BaseMenu.Positioner.Props['positionMethod']
  }

export function MenuSubmenuPopup({
  align,
  alignOffset,
  side,
  sideOffset = 5,
  anchor,
  sticky,
  positionMethod,
  size,
  ...props
}: MenuSubmenuPopupProps) {
  return (
    <MenuPopup
      data-slot='menu-sub-popup'
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      anchor={anchor}
      sticky={sticky}
      positionMethod={positionMethod}
      size={size}
      {...props}
    />
  )
}

export function MenuGroup({ ...props }: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot='menu-group' {...props} />
}

export function MenuGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  const styles = menuStyles()
  return (
    <BaseMenu.GroupLabel
      data-slot='menu-group-label'
      className={cx(styles.groupLabel(), className)}
      {...props}
    />
  )
}

export function MenuCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  const styles = menuStyles()
  return (
    <BaseMenu.CheckboxItem
      data-slot='menu-checkbox-item'
      {...props}
      className={cx(styles.item(), className)}
    >
      <BaseMenu.CheckboxItemIndicator className='w-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          className='text-foreground-primary size-3.5'
          viewBox='0 0 24 24'
        >
          <title>Check</title>
          <path d='M20 6 9 17l-5-5' />
        </svg>
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

export function MenuRadioGroup({ ...props }: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup data-slot='menu-radio-group' {...props} />
}

export type MenuRadioItemProps = React.ComponentProps<typeof BaseMenu.RadioItem> &
  VariantProps<typeof menuStyles>

export function MenuRadioItem({ className, variant, children, ...props }: MenuRadioItemProps) {
  const styles = menuStyles({ variant })
  return (
    <BaseMenu.RadioItem
      data-slot='menu-radio-item'
      {...props}
      className={cx(styles.radioItem(), className)}
    >
      <div className={styles.radioItemIndicator()}>
        <BaseMenu.RadioItemIndicator>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='fill-foreground-primary stroke-foreground-primary mx-auto w-2!'
          >
            <title>Radio</title>
            <circle cx='12' cy='12' r='10' />
          </svg>
        </BaseMenu.RadioItemIndicator>
      </div>
      {children}
    </BaseMenu.RadioItem>
  )
}
