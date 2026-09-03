import { ScriptOnce } from '@tanstack/react-router'
import { memo } from 'react'
import { darkThemeClass } from '#/styles/core/themes'
import { isBuiltInStorage } from './theme-storage'
import type { ThemeProviderProps } from './types'

/**
 * Inline script that applies the theme before first paint. Runs the same
 * logic as `applyTheme` in theme.tsx: sets the theme attribute, toggles the
 * compiled dark theme classes, and sets `color-scheme`. The storage mode is
 * passed as an argument because custom storage adapters cannot be serialized
 * (and skip the script entirely — see `getStorageScript`).
 */
function themeScript(
  attribute: ThemeProviderProps['attribute'],
  storageKey: ThemeProviderProps['storageKey'],
  defaultTheme: ThemeProviderProps['defaultTheme'],
  forcedTheme: ThemeProviderProps['forcedTheme'],
  themes: ThemeProviderProps['themes'],
  value: ThemeProviderProps['value'],
  enableSystem: ThemeProviderProps['enableSystem'],
  enableColorScheme: ThemeProviderProps['enableColorScheme'],
  themeClass: string,
  storageMode: 'localStorage' | 'cookie'
) {
  const el = document.documentElement
  const systemThemes = ['light', 'dark']
  const themeClasses = (themeClass ?? '').split(' ').filter(Boolean)

  function getStoredTheme(key: string) {
    if (storageMode === 'cookie') {
      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
      return match ? match[2] : null
    }
    return localStorage.getItem(key)
  }

  function updateDOM(theme: string) {
    const attributes =
      attribute !== undefined ? (Array.isArray(attribute) ? attribute : [attribute]) : []

    attributes.forEach((attr) => {
      if (attr === 'class') {
        const classes = value ? (themes ?? []).map((t: string) => value[t] || t) : themes
        el.classList.remove(...(classes ?? []))
        el.classList.add(value && value[theme] ? value[theme] : theme)
      } else {
        el.setAttribute(attr, theme)
      }
    })

    for (const cls of themeClasses) {
      el.classList.toggle(cls, theme === 'dark')
    }

    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme
    }
  }

  if (forcedTheme) {
    updateDOM(forcedTheme)
    return
  }

  try {
    const themeName = getStoredTheme(storageKey ?? 'theme') || defaultTheme || 'light'
    const isSystem = enableSystem && themeName === 'system'
    const theme = isSystem
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeName
    updateDOM(theme)
  } catch {
    // Storage unavailable (private mode, blocked cookies) — keep defaults
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
    const mode = isBuiltInStorage(storage) ? (storage ?? 'localStorage') : undefined
    if (!mode) {
      // Custom storage adapters cannot be serialized into an inline script
      return null
    }

    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme,
      darkThemeClass,
      mode
    ]).slice(1, -1)

    return <ScriptOnce children={`(${themeScript.toString()})(${scriptArgs})`} />
  }
)
