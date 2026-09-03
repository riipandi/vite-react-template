import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { darkThemeClass } from '#/styles/core/themes'
import { ThemeScript } from './theme-script'
import { getStorageAdapter } from './theme-storage'
import { disableAnimation, getSystemTheme, handleAttribute, isServer, MEDIA } from './theme-utils'
import type { ThemeProviderProps, UseThemeProps } from './types'

const colorSchemes = ['light', 'dark']
const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] }

export const useTheme = () => useContext(ThemeContext) ?? defaultContext

export const ThemeProvider = ({
  themes = ['light', 'dark'],
  disableTransitionOnChange = false,
  enableColorScheme = true,
  enableSystem = true,
  defaultTheme = 'system',
  attribute = 'data-theme',
  storage = 'localStorage',
  children,
  forcedTheme,
  storageKey,
  value
}: ThemeProviderProps) => {
  const context = useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <>{children}</>

  return (
    <Theme
      themes={themes}
      forcedTheme={forcedTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      enableColorScheme={enableColorScheme}
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      attribute={attribute}
      value={value}
      storage={storage}
    >
      {children}
    </Theme>
  )
}

const defaultThemes = ['light', 'dark']

const Theme = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'class',
  value,
  children,
  storage = 'localStorage'
}: ThemeProviderProps) => {
  const storageAdapter = useMemo(() => getStorageAdapter(storage), [storage])

  const [theme, setThemeState] = useState(() => {
    if (isServer) return defaultTheme
    return storageAdapter.getItem(storageKey) || defaultTheme
  })
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === 'system' ? getSystemTheme() : theme
  )
  const attrs = useMemo(() => (!value ? themes : Object.values(value)), [themes, value])

  const applyTheme = useCallback(
    (rawTheme: string) => {
      let resolved = rawTheme
      if (!resolved) return

      // If theme is system, resolve it before setting theme
      if (rawTheme === 'system' && enableSystem) {
        resolved = getSystemTheme()
      }

      const name = value ? value[resolved] : resolved
      const enable = disableTransitionOnChange ? disableAnimation() : null
      const d = document.documentElement

      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => handleAttribute(attr, d, attrs, name))
      } else {
        handleAttribute(attribute, d, attrs, name)
      }

      // Toggle the compiled dark theme class. Themes are applied to the root
      // element (not a wrapper): dialogs and popovers portal out and would
      // escape a subtree theme. Light values are the `defineVars` defaults,
      // so the class is only needed when dark.
      for (const cls of darkThemeClass.split(' ')) {
        if (cls) d.classList.toggle(cls, resolved === 'dark')
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null
        const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback
        // @ts-expect-error -- colorScheme is `''` for non light/dark themes
        d.style.colorScheme = colorScheme
      }

      enable?.()
    },
    [
      enableSystem,
      value,
      disableTransitionOnChange,
      attribute,
      attrs,
      enableColorScheme,
      defaultTheme
    ]
  )

  const setTheme = useCallback(
    (nextTheme: string | ((prev: string) => string)) => {
      if (typeof nextTheme === 'function') {
        setThemeState((prevTheme) => {
          const newTheme = nextTheme(prevTheme)
          storageAdapter.setItem(storageKey, newTheme)
          return newTheme
        })
      } else {
        setThemeState(nextTheme)
        storageAdapter.setItem(storageKey, nextTheme)
      }
    },
    [storageAdapter, storageKey]
  )

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme, enableSystem, applyTheme]
  )

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA)

    media.addEventListener('change', handleMediaQuery)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery])

  // Cross-tab sync via storage adapter's subscribe method
  useEffect(() => {
    if (!storageAdapter.subscribe) return

    return storageAdapter.subscribe(storageKey, (newValue) => {
      // If default theme set, use it if storage === null (happens on storage manual deletion)
      if (!newValue) {
        setTheme(defaultTheme)
      } else {
        setThemeState(newValue) // Direct state update to avoid loops
      }
    })
  }, [storageAdapter, storageKey, defaultTheme, setTheme])

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme, applyTheme])

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === 'system' ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, 'system'] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          storage
        }}
      />

      {children}
    </ThemeContext.Provider>
  )
}
