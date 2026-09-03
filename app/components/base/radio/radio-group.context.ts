import React from 'react'

export interface RadioGroupContextValue {
  /** Show an error state on all children. */
  hasError?: boolean
  /** Disable all children. */
  disabled?: boolean
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)
