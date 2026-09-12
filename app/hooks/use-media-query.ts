import { use, useCallback, useSyncExternalStore } from 'react'
import { browser } from 'react-dom'

/**
 * Viewport breakpoints, aligned with the design-system media-query consts in
 * `#/styles/core/tokens.stylex.ts` (`breakpoints`: small <660, medium 660,
 * large 900, xlarge 1280). Values are restated here because hooks run at
 * runtime and cannot import StyleX compiled constants.
 */
const BREAKPOINTS = {
  small: 660,
  medium: 660,
  large: 900,
  xlarge: 1280
} as const

type Breakpoint = keyof typeof BREAKPOINTS

/**
 - `"medium"`       → `(min-width: 660px)`
 - `"max-medium"`   → `(max-width: 659px)`
 - `"medium:max-large"` → min medium AND max large
 - object input     → `{ min, max, pointer }` combined with `and`
 - raw string       → passed to `matchMedia` as-is when it starts with `(`
 */
type BreakpointQuery = Breakpoint | `max-${Breakpoint}` | `${Breakpoint}:max-${Breakpoint}`

function resolveMin(value: Breakpoint | number): string {
  const px = typeof value === 'number' ? value : BREAKPOINTS[value]
  return `(min-width: ${px}px)`
}

function resolveMax(value: Breakpoint | number): string {
  const px = typeof value === 'number' ? value : BREAKPOINTS[value]
  return `(max-width: ${px - 1}px)`
}

function parseQuery(query: BreakpointQuery | MediaQueryInput | (string & {})): string {
  if (typeof query !== 'string') {
    const parts: string[] = []
    if (query.min != null) parts.push(resolveMin(query.min))
    if (query.max != null) parts.push(resolveMax(query.max))
    if (query.pointer === 'coarse') parts.push('(pointer: coarse)')
    if (query.pointer === 'fine') parts.push('(pointer: fine)')
    if (parts.length === 0) return '(min-width: 0px)'
    return parts.join(' and ')
  }

  if (query.startsWith('(')) return query

  const parts: string[] = []
  for (const segment of query.split(':')) {
    if (segment.startsWith('max-')) {
      const bp = segment.slice(4)
      if (bp in BREAKPOINTS) parts.push(resolveMax(bp as Breakpoint))
    } else if (segment in BREAKPOINTS) {
      // Named breakpoints are lower bounds in this system; the bare form
      // resolves to the matching range boundary defined by `breakpoints`
      // (small is <660 only, so "small" as a min falls through to raw passthrough).
      parts.push(resolveMin(segment as Breakpoint))
    }
  }
  return parts.length > 0 ? parts.join(' and ') : query
}

function getServerSnapshot(): boolean {
  return false
}

export interface MediaQueryInput {
  min?: Breakpoint | number
  max?: Breakpoint | number
  /** Touch-like input (finger). Use "fine" for mouse/trackpad. */
  pointer?: 'coarse' | 'fine'
}

/** Cache MediaQueryList instances — `matchMedia` allocates a fresh object on every call. */
const mqlCache = new Map<string, MediaQueryList>()

function getMql(query: string): MediaQueryList | null {
  use(browser()) // opt out of server-side rendering
  let mql = mqlCache.get(query)
  if (!mql) {
    mql = window.matchMedia(query)
    mqlCache.set(query, mql)
  }
  return mql
}

export function useMediaQuery(query: BreakpointQuery | MediaQueryInput | (string & {})): boolean {
  const mediaQuery = parseQuery(query)

  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = getMql(mediaQuery)
      if (!mql) return () => {}
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [mediaQuery]
  )

  const getSnapshot = useCallback(() => {
    return getMql(mediaQuery)?.matches ?? false
  }, [mediaQuery])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Viewport is below the `small`/`medium` boundary (660px). */
export function useIsMobile(): boolean {
  return useMediaQuery('max-small')
}
