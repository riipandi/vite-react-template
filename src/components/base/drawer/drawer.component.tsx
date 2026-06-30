/**
 * A panel that slides in from the edge of the screen.
 *
 * @see: https://base-ui.com/react/components/drawer
 *
 * Anatomy:
 * <Drawer.Root>
 *   <Drawer.Trigger />
 *   <Drawer.Portal>
 *     <Drawer.Backdrop />
 *     <Drawer.Viewport>
 *       <Drawer.Popup>
 *         <Drawer.Content>
 *           <Drawer.Title />
 *           <Drawer.Description />
 *           <Drawer.Close />
 *         </Drawer.Content>
 *       </Drawer.Popup>
 *     </Drawer.Viewport>
 *   </Drawer.Portal>
 * </Drawer.Root>
 */

import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { createContext, use } from 'react'
import { drawerStyles, drawerSwipeDirections } from './drawer.stylex'

const DrawerContext = createContext<BaseDrawer.Root.Props['swipeDirection']>('down')

export type DrawerSwipeDirection = keyof typeof drawerSwipeDirections

export type DrawerRootProps = BaseDrawer.Root.Props & {
  swipeDirection?: DrawerSwipeDirection
  xstyle?: StyleXStyles
}
export type DrawerTriggerProps = BaseDrawer.Trigger.Props & {
  xstyle?: StyleXStyles
}
export type DrawerPortalProps = BaseDrawer.Portal.Props & {
  xstyle?: StyleXStyles
}
export type DrawerCloseProps = BaseDrawer.Close.Props & {
  xstyle?: StyleXStyles
}
export type DrawerContentProps = BaseDrawer.Content.Props & {
  xstyle?: StyleXStyles
}
export type DrawerPopupProps = BaseDrawer.Popup.Props & {
  xstyle?: StyleXStyles
}
export type DrawerViewportProps = BaseDrawer.Viewport.Props & {
  xstyle?: StyleXStyles
}
export type DrawerTitleProps = BaseDrawer.Title.Props & {
  xstyle?: StyleXStyles
}
export type DrawerDescriptionProps = BaseDrawer.Description.Props & {
  xstyle?: StyleXStyles
}
export type DrawerBackdropProps = BaseDrawer.Backdrop.Props & {
  xstyle?: StyleXStyles
}

export function Drawer({ swipeDirection = 'down', xstyle, ...props }: DrawerRootProps) {
  return (
    <DrawerContext value={swipeDirection}>
      <BaseDrawer.Root
        data-slot='drawer'
        swipeDirection={swipeDirection}
        {...stylex.props(drawerStyles.root, drawerSwipeDirections[swipeDirection], xstyle)}
        {...props}
      />
    </DrawerContext>
  )
}

export function DrawerTrigger({ xstyle, ...props }: DrawerTriggerProps) {
  return (
    <BaseDrawer.Trigger
      data-slot='drawer-trigger'
      {...stylex.props(drawerStyles.trigger, xstyle)}
      {...props}
    />
  )
}

export function DrawerPortal({ xstyle, ...props }: DrawerPortalProps) {
  return (
    <BaseDrawer.Portal
      data-slot='drawer-portal'
      {...stylex.props(drawerStyles.portal, xstyle)}
      {...props}
    />
  )
}

export function DrawerClose({ xstyle, ...props }: DrawerCloseProps) {
  return (
    <BaseDrawer.Close
      data-slot='drawer-close'
      {...stylex.props(drawerStyles.close, xstyle)}
      {...props}
    />
  )
}

export function DrawerBackdrop({ xstyle, ...props }: DrawerBackdropProps) {
  return (
    <BaseDrawer.Backdrop
      data-slot='drawer-backdrop'
      {...stylex.props(drawerStyles.backdrop, xstyle)}
      {...props}
    />
  )
}

export function DrawerViewport({ xstyle, ...props }: DrawerViewportProps) {
  const dir = use(DrawerContext)
  return (
    <BaseDrawer.Viewport
      data-slot='drawer-viewport'
      {...stylex.props(
        drawerStyles.viewport,
        dir && drawerSwipeDirections[dir as DrawerSwipeDirection],
        xstyle
      )}
      {...props}
    />
  )
}

export function DrawerPopup({ children, xstyle, ...props }: DrawerPopupProps) {
  const dir = use(DrawerContext)
  return (
    <BaseDrawer.Popup
      data-slot='drawer-popup'
      {...stylex.props(
        drawerStyles.popup,
        dir && drawerSwipeDirections[dir as DrawerSwipeDirection],
        xstyle
      )}
      {...props}
    >
      {dir === 'down' && <div data-slot='drawer-handle' {...stylex.props(drawerStyles.handle)} />}
      {children}
    </BaseDrawer.Popup>
  )
}

export function DrawerContent({ xstyle, ...props }: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPopup>
          <BaseDrawer.Content
            data-slot='drawer-content'
            {...stylex.props(drawerStyles.content, xstyle)}
            {...props}
          />
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  )
}

export function DrawerTitle({ xstyle, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title
      data-slot='drawer-title'
      {...stylex.props(drawerStyles.title, xstyle)}
      {...props}
    />
  )
}

export function DrawerDescription({ xstyle, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      data-slot='drawer-description'
      {...stylex.props(drawerStyles.description, xstyle)}
      {...props}
    />
  )
}
