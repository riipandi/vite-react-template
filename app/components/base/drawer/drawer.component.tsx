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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { drawerStyles as s } from './drawer.stylex'
import { drawerDirections as directions, drawerSwipeHandles as swipeHandles } from './drawer.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export type DrawerSwipeDirection = 'up' | 'right' | 'down' | 'left'

interface DrawerContextValue {
  modal: boolean
  showSwipeHandle: boolean
  swipeDirection: DrawerSwipeDirection
}

const DrawerContext = React.createContext<DrawerContextValue>({
  modal: true,
  showSwipeHandle: false,
  swipeDirection: 'down'
})

export function Drawer({
  modal = true,
  showSwipeHandle = false,
  swipeDirection = 'down',
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDrawer.Root> & {
  showSwipeHandle?: boolean
}) {
  const contextValue = React.useMemo(
    () => ({ modal: modal === true, showSwipeHandle, swipeDirection }),
    [modal, showSwipeHandle, swipeDirection]
  )
  return (
    <DrawerContext.Provider value={contextValue}>
      <BaseDrawer.Root modal={modal} swipeDirection={swipeDirection} {...props} />
    </DrawerContext.Provider>
  )
}

export const DrawerTrigger = BaseDrawer.Trigger
export const DrawerClose = BaseDrawer.Close
export const DrawerPortal = BaseDrawer.Portal

export function DrawerOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Backdrop {...props} {...stylex.props(s.overlay, style)} />
}

export function DrawerContent({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Popup>, 'className' | 'style'> &
  StyleProp) {
  const { modal, showSwipeHandle, swipeDirection } = React.useContext(DrawerContext)
  return (
    <BaseDrawer.Portal>
      {modal && <DrawerOverlay />}
      <BaseDrawer.Viewport {...stylex.props(s.viewport, modal && s.viewportModal)}>
        <BaseDrawer.Popup {...props} {...stylex.props(s.popup, directions[swipeDirection], style)}>
          {showSwipeHandle && <DrawerSwipeHandle />}
          <BaseDrawer.Content {...stylex.props(s.content)}>{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

export function DrawerSwipeHandle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  const { swipeDirection } = React.useContext(DrawerContext)
  return (
    <div
      aria-hidden
      {...props}
      {...stylex.props(s.swipeHandle, swipeHandles[swipeDirection], style)}
    />
  )
}

export function DrawerHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  const { swipeDirection } = React.useContext(DrawerContext)
  const vertical = swipeDirection === 'up' || swipeDirection === 'down'
  return <div {...props} {...stylex.props(s.header, vertical && s.headerCentered, style)} />
}

export function DrawerFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(s.footer, style)} />
}

export function DrawerTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Title>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Title {...props} {...stylex.props(s.title, style)} />
}

export function DrawerDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Description {...props} {...stylex.props(s.description, style)} />
}
