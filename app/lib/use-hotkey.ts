'use client'

import * as React from 'react'

export interface UseHotkeyOptions {
  /** Require ⌘ (macOS) or Ctrl (elsewhere) to be held. Defaults to true. */
  mod?: boolean
  /** Set false to temporarily disable the shortcut. */
  enabled?: boolean
}

/**
 * Global keyboard shortcut. Typical use — a ⌘K command palette:
 *
 * ```tsx
 * const [open, setOpen] = React.useState(false);
 * useHotkey('k', () => setOpen((o) => !o));
 * ```
 *
 * Skips the shortcut while an input, textarea, or contenteditable element has
 * focus, unless `mod` is required (cmdk-style behavior).
 */
export function useHotkey(
  key: string,
  onTrigger: (event: KeyboardEvent) => void,
  { mod = true, enabled = true }: UseHotkeyOptions = {}
) {
  const handlerRef = React.useRef(onTrigger)
  React.useEffect(() => {
    handlerRef.current = onTrigger
  })

  React.useEffect(() => {
    if (!enabled) return
    const listener = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      if (mod && !(event.metaKey || event.ctrlKey)) return
      if (!mod) {
        const target = event.target as HTMLElement | null
        if (
          target &&
          (target.isContentEditable ||
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT')
        ) {
          return
        }
      }
      event.preventDefault()
      handlerRef.current(event)
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [key, mod, enabled])
}
