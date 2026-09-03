/**
 * Toast component built on BaseUI React with configurable positioning.
 * Supports both stacked (notifications) and anchored (tooltips) toasts.
 *
 * @see: https://base-ui.com/react/components/toast
 *
 * BaseUI Anatomy:
 * <Toast.Provider>
 *   <Toast.Portal>
 *     <Toast.Viewport>
 *       // Stacked toasts
 *       <Toast.Root>
 *         <Toast.Content>
 *           <Toast.Title />
 *           <Toast.Description />
 *           <Toast.Action />
 *           <Toast.Close />
 *         </Toast.Content>
 *       </Toast.Root>
 *       // Anchored toasts
 *       <Toast.Positioner>
 *         <Toast.Root>
 *           <Toast.Arrow />
 *           <Toast.Content>
 *             <Toast.Title />
 *             <Toast.Description />
 *             <Toast.Action />
 *             <Toast.Close />
 *           </Toast.Content>
 *         </Toast.Root>
 *       </Toast.Positioner>
 *     </Toast.Viewport>
 *   </Toast.Portal>
 * </Toast.Provider>
 */

import { Toast as BaseToast } from '@base-ui/react/toast'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { toastStyles as s } from './toast.stylex'

/** The manager behind the imperative `toast` API — pass to `useToast` consumers if needed. */
export const toastManager = BaseToast.createToastManager()

type ToastAddOptions = Omit<Parameters<typeof toastManager.add>[0], 'title'>

function addToast(title: React.ReactNode, options?: ToastAddOptions & { type?: string }) {
  return toastManager.add({ title, ...options })
}

/**
 * Imperative API, callable anywhere — event handlers, stores, outside React:
 * `toast('Saved')`, `toast.error('Failed', { description: '…' })`,
 * `toast.promise(save(), { loading: '…', success: '…', error: '…' })`.
 * Requires `ToastProvider` + `Toaster` to be mounted (e.g. in the root layout).
 */
export const toast = Object.assign(addToast, {
  success: (title: React.ReactNode, options?: ToastAddOptions) =>
    addToast(title, { ...options, type: 'success' }),
  error: (title: React.ReactNode, options?: ToastAddOptions) =>
    addToast(title, { ...options, type: 'error' }),
  promise: toastManager.promise.bind(toastManager),
  update: toastManager.update.bind(toastManager),
  close: toastManager.close.bind(toastManager)
})

/** Hook form of the same API: `const t = useToast(); t.add({ title })`. */
export function useToast() {
  return BaseToast.useToastManager()
}

// Wired to the shared manager so the imperative `toast` reaches it; pass your
// own `toastManager` to opt out.
export function ToastProvider(props: React.ComponentPropsWithoutRef<typeof BaseToast.Provider>) {
  return <BaseToast.Provider toastManager={toastManager} {...props} />
}

function ToastList({
  swipeDirection
}: {
  swipeDirection: React.ComponentPropsWithoutRef<typeof BaseToast.Root>['swipeDirection']
}) {
  const { toasts } = BaseToast.useToastManager()
  return toasts.map((t) => (
    <BaseToast.Root key={t.id} toast={t} swipeDirection={swipeDirection} {...stylex.props(s.root)}>
      <div {...stylex.props(s.content)}>
        <div {...stylex.props(s.text)}>
          <BaseToast.Title {...stylex.props(s.title)} />
          <BaseToast.Description {...stylex.props(s.description)} />
        </div>
        <BaseToast.Action {...stylex.props(s.action)} />
        <BaseToast.Close aria-label='Close' {...stylex.props(s.close)}>
          <svg
            width='12'
            height='12'
            viewBox={`0 0 12 12`}
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            aria-hidden
          >
            <path d={`m2 2 8 8M10 2l-8 8`} />
          </svg>
        </BaseToast.Close>
      </div>
    </BaseToast.Root>
  ))
}

export interface ToasterProps {
  /** Direction(s) a toast can be swiped to dismiss. */
  swipeDirection?: React.ComponentPropsWithoutRef<typeof BaseToast.Root>['swipeDirection']
  /** StyleX styles for the viewport, merged last. */
  style?: stylex.StyleXStyles
}

/**
 * Mount once (inside ToastProvider) — renders the toast stack. Toasts pile up
 * behind the newest one; hovering or focusing the stack expands it. Swipe
 * down/right (touch or mouse) to dismiss.
 */
export function Toaster({ swipeDirection = ['down', 'right'], style }: ToasterProps) {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport {...stylex.props(s.viewport, style)}>
        <ToastList swipeDirection={swipeDirection} />
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}
