/**
 * Context provider for managing CSP and direction settings across the application.
 *
 * @see: https://base-ui.com/react/utils/csp-provider
 * @see: https://base-ui.com/react/utils/direction-provider
 *
 * Anatomy:
 * <UIProvider>
 *   {children}
 * </UIProvider>
 */

import { CSPProvider } from '@base-ui/react/csp-provider'
import { DirectionProvider, type TextDirection } from '@base-ui/react/direction-provider'
import React from 'react'

interface UIProviderProps extends React.PropsWithChildren {
  nonce?: string
  disableStyleElements?: boolean
  direction?: TextDirection
}

export function UIProvider(props: UIProviderProps) {
  return (
    <CSPProvider nonce={props.nonce} disableStyleElements={props.disableStyleElements}>
      <DirectionProvider direction={props.direction}>{props.children}</DirectionProvider>
    </CSPProvider>
  )
}
