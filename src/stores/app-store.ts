import { Store } from '@tanstack/store'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  sidebarOpen: boolean
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const appStore = new Store<AppState>({
  theme: getInitialTheme(),
  sidebarOpen: false,
})

export const toggleTheme = () => {
  const next = appStore.state.theme === 'light' ? 'dark' : 'light'
  appStore.setState((prev) => ({ ...prev, theme: next }))
  window.localStorage.setItem('theme', next)
  document.documentElement.classList.toggle('dark', next === 'dark')
}

export const toggleSidebar = () => {
  appStore.setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
}
