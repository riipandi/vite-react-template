import type { BuiltInStorage, ThemeStorage } from './types'

export const localStorageAdapter: ThemeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Unsupported
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Unsupported
    }
  },
  subscribe: (key, callback) => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        callback(e.newValue)
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }
}

const isServer = typeof window === 'undefined'

export const cookieStorageAdapter: ThemeStorage = {
  getItem: (key) => {
    if (isServer) return null
    const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
    return match?.[2] ?? null
  },
  setItem: (key, value) => {
    if (isServer) return
    document.cookie = `${key}=${value};path=/;max-age=31536000;SameSite=Lax`
  },
  removeItem: (key) => {
    if (isServer) return
    document.cookie = `${key}=;path=/;max-age=0`
  }
}

export const isBuiltInStorage = (
  storage: BuiltInStorage | ThemeStorage | undefined
): storage is BuiltInStorage => {
  return storage === undefined || storage === 'localStorage' || storage === 'cookie'
}

export const getStorageAdapter = (
  storage: BuiltInStorage | ThemeStorage = 'localStorage'
): ThemeStorage => {
  if (!isBuiltInStorage(storage)) {
    return storage
  }
  switch (storage) {
    case 'cookie':
      return cookieStorageAdapter
    case 'localStorage':
    default:
      return localStorageAdapter
  }
}
