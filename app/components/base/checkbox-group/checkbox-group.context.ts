import React from 'react'

export interface CheckboxGroupContextValue {
  /** Show an error state on all children. */
  hasError?: boolean
  /** Disable all children. */
  disabled?: boolean
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)
