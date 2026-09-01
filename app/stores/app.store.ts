import { createStore, useSelector } from '@tanstack/react-store'

export interface AppState {
  sidebarOpen: boolean
}

export const appStore = createStore<AppState>({
  sidebarOpen: false
})

export const toggleSidebar = () => {
  appStore.setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
}

export function useSidebarOpen() {
  return useSelector(appStore, (state) => state.sidebarOpen)
}
