import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { ring } from '#/lib/stylex-utils'
import { shadow } from '#/lib/tokens.stylex'
import { dialogStyles as s } from './dialog.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export const Dialog = BaseDialog.Root
export const DialogTrigger = BaseDialog.Trigger
export const DialogPortal = BaseDialog.Portal
export const DialogClose = BaseDialog.Close

export function DialogOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Backdrop {...props} {...stylex.props(s.overlay, style)} />
}

export function DialogContent({
  style,
  children,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'className' | 'style'> &
  StyleXStyleProps & { showCloseButton?: boolean }) {
  return (
    <BaseDialog.Portal>
      <DialogOverlay />
      <BaseDialog.Popup {...props} {...stylex.props(s.content, ring({ shadow: shadow.lg }), style)}>
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

export function DialogHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export function DialogFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.footer, style)} />
}

export function DialogTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Title {...props} {...stylex.props(s.title, style)} />
}

export function DialogDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Description {...props} {...stylex.props(s.description, style)} />
}
