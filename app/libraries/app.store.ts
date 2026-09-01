import { createStore, useSelector } from '@tanstack/react-store'

export interface AppState {
  /** Mobile drawer visibility. */
  sidebarOpen: boolean
  /** Desktop sidebar collapse (icon-only) state. */
  sidebarCollapsed: boolean
}

export const appStore = createStore<AppState>({
  sidebarOpen: false,
  sidebarCollapsed: false
})

export const toggleSidebar = () => {
  appStore.setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
}

export const toggleSidebarCollapsed = () => {
  appStore.setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }))
}

export function useSidebarOpen() {
  return useSelector(appStore, (state) => state.sidebarOpen)
}

export function useSidebarCollapsed() {
  return useSelector(appStore, (state) => state.sidebarCollapsed)
}
