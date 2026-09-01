import type { Attribute } from './types'

export const MEDIA = '(prefers-color-scheme: dark)'
export const isServer = typeof window === 'undefined'

export const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  return ssrSafeAction(
    () => {
      if (!e) e = window.matchMedia(MEDIA)
      const isDark = e.matches
      const systemTheme = isDark ? 'dark' : 'light'
      return systemTheme
    },
    () => 'light'
  )
}

export const handleAttribute = (
  attr: Attribute,
  el: HTMLElement,
  attrs: string[],
  name: string | undefined
) => {
  if (attr === 'class') {
    el.classList.remove(...attrs)
    if (name) el.classList.add(name)
  } else if (attr.startsWith('data-')) {
    if (name) {
      el.setAttribute(attr, name)
    } else {
      el.removeAttribute(attr)
    }
  }
}

export const ssrSafeAction = <T>(action: () => T, fallback: () => T): T => {
  if (isServer) {
    return fallback()
  }
  return action()
}
