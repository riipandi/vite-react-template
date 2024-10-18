import { useMemo, useState } from 'react'

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

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error setting localStorage:', err)
      }
    }
    setStoredValue(newValue)
  }

  const memoizedStoredValue = useMemo(() => storedValue, [storedValue])

  return [memoizedStoredValue, setValue]
}
