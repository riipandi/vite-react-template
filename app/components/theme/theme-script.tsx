import { ScriptOnce } from '@tanstack/react-router'
import { memo } from 'react'
import { isBuiltInStorage } from './theme-storage'
import type { ThemeProviderProps, ThemeScriptType, BuiltInStorage, ThemeStorage } from './types'

export const localStorageScript: ThemeScriptType = (
  attribute,
  storageKey,
  defaultTheme,
  forcedTheme,
  themes,
  value,
  enableSystem,
  enableColorScheme
) => {
  const el = document.documentElement
  const systemThemes = ['light', 'dark']
  function updateDOM(theme: string) {
    const attributes =
      attribute !== undefined ? (Array.isArray(attribute) ? attribute : [attribute]) : []

    attributes.forEach((attr) => {
      const isClass = attr === 'class'
      const classes = isClass && value ? (themes ?? []).map((t: string) => value[t] || t) : themes
      if (isClass) {
        el.classList.remove(...(classes ?? []))
        el.classList.add(value && value[theme] ? value[theme] : theme)
      } else {
        el.setAttribute(attr as string, theme)
      }
    })

    setColorScheme(theme)
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme
    }
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
  } else {
    try {
      const themeName = localStorage.getItem(storageKey ?? 'theme') || defaultTheme || 'light'
      const isSystem = enableSystem && themeName === 'system'
      const theme = isSystem ? getSystemTheme() : themeName
      updateDOM(theme)
    } catch {
      //
    }
  }
}

export const cookieStorageScript: ThemeScriptType = (
  attribute,
  storageKey,
  defaultTheme,
  forcedTheme,
  themes,
  value,
  enableSystem,
  enableColorScheme
) => {
  const el = document.documentElement
  const systemThemes = ['light', 'dark']
  function updateDOM(theme: string) {
    const attributes =
      attribute !== undefined ? (Array.isArray(attribute) ? attribute : [attribute]) : []

    attributes.forEach((attr) => {
      const isClass = attr === 'class'
      const classes = isClass && value ? (themes ?? []).map((t: string) => value[t] || t) : themes
      if (isClass) {
        el.classList.remove(...(classes ?? []))
        el.classList.add(value && value[theme] ? value[theme] : theme)
      } else {
        el.setAttribute(attr as string, theme)
      }
    })

    setColorScheme(theme)
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme
    }
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
  } else {
    try {
      const themeName = getCookie(storageKey ?? 'theme') || defaultTheme || 'light'
      const isSystem = enableSystem && themeName === 'system'
      const theme = isSystem ? getSystemTheme() : themeName
      updateDOM(theme)
    } catch {
      //
    }
  }
}

const getStorageScript = (storage: BuiltInStorage | ThemeStorage | undefined) => {
  const type = isBuiltInStorage(storage) ? storage : undefined
  switch (type) {
    case 'cookie':
      return cookieStorageScript
    case 'localStorage':
      return localStorageScript
    case undefined:
    default:
      return undefined
  }
}

export const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themes,
    storage = 'localStorage'
  }: Omit<ThemeProviderProps, 'children'> & {
    defaultTheme: string
  }) => {
    const script = getStorageScript(storage)
    if (!script) {
      return
    }
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme
    ]).slice(1, -1)
    return <ScriptOnce children={`(${script.toString()})(${scriptArgs})`} />
  }
)
