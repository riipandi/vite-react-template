import { useMemo, useState } from 'react'

/**
 * A custom React hook for managing state in localStorage.
 *
 * @param keyName - The key under which the value will be stored in localStorage.
 * @param defaultValue - The default value to use if no value is found in localStorage.
 * @returns A tuple containing the current value and a function to update it.
 *
 * @example
 *   const [savedTheme, setSavedTheme] = useLocalStorage('ui_theme', null)
 */
export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        return JSON.parse(value)
      }
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
      return defaultValue
    } catch (_err) {
      return defaultValue
    }
  })

  const setValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(keyName, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${keyName}":`, error)
    }
  }

  const memoizedStoredValue = useMemo(() => storedValue, [storedValue])

  return [memoizedStoredValue, setValue]
}
