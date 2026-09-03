import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { sheetStyles as s, sheetSides as sides } from './sheet.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export const Sheet = BaseDialog.Root
export const SheetTrigger = BaseDialog.Trigger
export const SheetClose = BaseDialog.Close
export const SheetPortal = BaseDialog.Portal

export function SheetOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Backdrop {...props} {...stylex.props(s.overlay, style)} />
}

export function SheetContent({
  style,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'className' | 'style'> &
  StyleXStyleProps & { side?: SheetSide; showCloseButton?: boolean }) {
  return (
    <BaseDialog.Portal>
      <SheetOverlay />
      <BaseDialog.Popup {...props} {...stylex.props(s.content, sides[side], style)}>
        {children}
        {showCloseButton && (
          <BaseDialog.Close aria-label='Close' {...stylex.props(s.close)}>
            <svg
              width='16'
              height='16'
              viewBox={`0 0 16 16`}
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              aria-hidden
            >
              <path d={`m3 3 10 10M13 3 3 13`} />
            </svg>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export function SheetHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export function SheetFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.footer, style)} />
}

export function SheetTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Title {...props} {...stylex.props(s.title, style)} />
}

export function SheetDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Description {...props} {...stylex.props(s.description, style)} />
}
