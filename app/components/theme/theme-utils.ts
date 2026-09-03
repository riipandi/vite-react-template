import type { Attribute } from './types'

export const MEDIA = '(prefers-color-scheme: dark)'
export const isServer = typeof window === 'undefined'

export const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(document.createTextNode(`*,*::before,*::after{transition:none!important}`))
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
  if (isServer) return 'light'
  if (!e) e = window.matchMedia(MEDIA)
  return e.matches ? 'dark' : 'light'
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
