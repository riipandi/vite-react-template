import { createStore, useSelector } from '@tanstack/react-store'

export interface AppState {
  /** Mobile drawer visibility. */
  sidebarOpen: boolean
  /** Desktop sidebar collapse (icon-only) state. */
  sidebarCollapsed: boolean
}

// ── Internal localStorage helpers ──────────────────────────────────────────

const SIDEBAR_STORAGE_KEY = 'app.sidebarCollapsed'

function getStoredSidebarCollapsed(): boolean {
  if (typeof window === 'undefined') return false
  const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY)
  return stored === 'true'
}

function persistSidebarCollapsed(collapsed: boolean) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
}

// ── Store ──────────────────────────────────────────────────────────────────

/** Hydrate from localStorage so the collapsed state survives page reloads. */
export const appStore = createStore<AppState>({
  sidebarOpen: false,
  sidebarCollapsed: getStoredSidebarCollapsed()
})

export const toggleSidebar = () => {
  appStore.setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
}

export const toggleSidebarCollapsed = () => {
  appStore.setState((prev) => {
    const next = !prev.sidebarCollapsed
    persistSidebarCollapsed(next)
    return { ...prev, sidebarCollapsed: next }
  })
}

export function useSidebarOpen() {
  return useSelector(appStore, (state) => state.sidebarOpen)
}

export function useSidebarCollapsed() {
  return useSelector(appStore, (state) => state.sidebarCollapsed)
}
