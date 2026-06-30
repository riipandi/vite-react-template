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

import './style.css'
import { Toast } from '@base-ui/react/toast'
// import type { StyleXStyles } from '@stylexjs/stylex'
// import * as stylex from '@stylexjs/stylex'
// import { cx } from 'css-variants'
import * as Lucide from 'lucide-react'
import { Spinner } from '../../extra/spinner'

type ToastOptions = Partial<Omit<Toast.Root.ToastObject, 'type'>>

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning' | 'loading'

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type ToastManager = ReturnType<typeof Toast.createToastManager>

interface StackedToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition
}

const toastManager = Toast.createToastManager()
const anchoredToastManager = Toast.createToastManager()

function getIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return <Lucide.CheckCircle2 size={20} />
    case 'error':
      return <Lucide.CircleX size={20} />
    case 'info':
      return <Lucide.CircleAlert size={20} />
    case 'warning':
      return <Lucide.TriangleAlert size={20} />
    case 'loading':
      return <Spinner size='sm' />
    default:
      return null
  }
}

function createToastApi(manager: ToastManager) {
  function createTypedToast(type: ToastType) {
    return (input: string | ToastOptions) => {
      const opts = typeof input === 'string' ? { description: input } : input
      return manager.add({ ...opts, type })
    }
  }

  return {
    default: createTypedToast('default'),
    success: createTypedToast('success'),
    error: createTypedToast('error'),
    info: createTypedToast('info'),
    warning: createTypedToast('warning'),
    loading: createTypedToast('loading'),
    update: manager.update,
    remove: manager.close,
    promise: manager.promise,
    add: manager.add
  }
}

function StackedToastProvider({
  children,
  position = 'bottom-right',
  ...props
}: StackedToastProviderProps) {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <StackedToasts position={position} />
    </Toast.Provider>
  )
}

function StackedToasts({ position }: { position: ToastPosition }) {
  const { toasts } = Toast.useToastManager()
  const isTop = position.startsWith('top')

  return (
    <Toast.Portal>
      <Toast.Viewport data-ui='toast-stacked-viewport' data-position={position}>
        {toasts.map((toast) => {
          const icon = getIcon(toast.type as ToastType)
          return (
            <Toast.Root
              data-ui='toast-stacked-root'
              data-position={position}
              key={toast.id}
              toast={toast}
              swipeDirection={
                position.includes('center')
                  ? [isTop ? 'up' : 'down']
                  : position.includes('left')
                    ? ['left', isTop ? 'up' : 'down']
                    : ['right', isTop ? 'up' : 'down']
              }
            >
              <Toast.Content data-ui='toast-stacked-content'>
                {icon && <div data-ui='toast-icon'>{icon}</div>}

                <div data-ui='toast-body'>
                  <Toast.Title data-ui='toast-title' />
                  <Toast.Description data-ui='toast-description' />
                  <Toast.Action data-ui='toast-action' />
                </div>

                <Toast.Close data-slot='toast-close'>
                  <Lucide.X size={16} />
                </Toast.Close>
              </Toast.Content>
            </Toast.Root>
          )
        })}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

function AnchoredToastProvider({ children, ...props }: Toast.Provider.Props) {
  return (
    <Toast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <AnchoredToasts />
    </Toast.Provider>
  )
}

function AnchoredToasts() {
  const { toasts } = Toast.useToastManager()

  return (
    <Toast.Portal>
      <Toast.Viewport data-ui='toast-anchored-viewport'>
        {toasts.map((toast) => {
          const icon = getIcon(toast.type as ToastType)
          const positionerProps = toast.positionerProps

          if (!positionerProps?.anchor) {
            return null
          }

          return (
            <Toast.Positioner
              key={toast.id}
              toast={toast}
              sideOffset={positionerProps.sideOffset ?? 8}
              data-ui='toast-anchored-positioner'
            >
              <Toast.Root toast={toast} data-ui='toast-anchored-root' data-type={toast.type}>
                <Toast.Content data-ui='toast-anchored-content'>
                  {icon && <div data-ui='toast-icon'>{icon}</div>}
                  <div data-ui='toast-body'>
                    <Toast.Title data-ui='toast-title' />
                    <Toast.Description data-ui='toast-description' />
                    <Toast.Action data-ui='toast-action' />
                  </div>
                </Toast.Content>
              </Toast.Root>
            </Toast.Positioner>
          )
        })}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

const stackedToast = createToastApi(toastManager)
const anchoredToast = createToastApi(anchoredToastManager)

export type { ToastType, ToastOptions, ToastPosition, StackedToastProviderProps }
export { stackedToast, anchoredToast, toastManager, anchoredToastManager }
export { StackedToastProvider, AnchoredToastProvider }
