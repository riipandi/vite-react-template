import { Moon, SunDim } from 'lucide-react'
import { useCallback } from 'react'

import { useLocalStorage } from '#/hooks/useLocalStorage'

import { Button, ctrp } from './ui-react-aria'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [savedTheme, setSavedTheme] = useLocalStorage('ui_theme', null)
  const IconComponent = savedTheme === 'dark' ? Moon : SunDim

  const toggleTheme = useCallback(() => {
    if (savedTheme === 'light') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setSavedTheme(savedTheme === 'light' ? 'dark' : 'light')
  }, [savedTheme, setSavedTheme])

  return (
    <Button className={ctrp(className, 'px-2')} variant="icon" onPress={toggleTheme}>
      <IconComponent className="h-5 w-5" />
    </Button>
  )
}
