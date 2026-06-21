import { createStore, useSelector } from '@tanstack/react-store'

export type Theme = 'light' | 'dark'

export interface AppState {
  theme: Theme
  sidebarOpen: boolean
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const appStore = createStore<AppState>({
  theme: getInitialTheme(),
  sidebarOpen: false,
})

export const toggleTheme = () => {
  const next = appStore.state.theme === 'light' ? 'dark' : 'light'
  appStore.setState((prev) => ({ ...prev, theme: next }))
  window.localStorage.setItem('theme', next)
  // ponytail: dark class no longer needed — handled via stylex.createTheme
}

export const toggleSidebar = () => {
  appStore.setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
}

export function useTheme() {
  return useSelector(appStore, (state) => state.theme)
}

export function useSidebarOpen() {
  return useSelector(appStore, (state) => state.sidebarOpen)
}
