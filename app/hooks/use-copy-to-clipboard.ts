import { useEffect, useRef, useState } from 'react'

interface UseCopyToClipboardOptions {
  /** Reset delay for `isCopied` in ms; 0 disables the auto-reset. */
  timeout?: number
  onCopy?: () => void
}

interface UseCopyToClipboardResult {
  copyToClipboard: (value: string) => void
  isCopied: boolean
}

const DEFAULT_TIMEOUT = 2000

export function useCopyToClipboard({
  timeout = DEFAULT_TIMEOUT,
  onCopy
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutIdRef = useRef<number | null>(null)

  const copyToClipboard = (value: string): void => {
    if (typeof window === 'undefined' || !navigator.clipboard.writeText) {
      return
    }
    if (!value) return

    navigator.clipboard.writeText(value).then(
      () => {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current)
        }
        setIsCopied(true)
        onCopy?.()
        if (timeout !== 0) {
          timeoutIdRef.current = window.setTimeout(() => {
            setIsCopied(false)
            timeoutIdRef.current = null
          }, timeout)
        }
      },
      (error: unknown) => {
        console.error('Failed to copy to clipboard', error)
      }
    )
  }

  // Cleanup timeout on unmount.
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  return { copyToClipboard, isCopied }
}
