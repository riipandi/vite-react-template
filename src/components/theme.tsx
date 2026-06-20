import * as Lucide from 'lucide-react'
import { useCallback } from 'react'
import { useLocalStorage } from '#/context/hooks/useLocalStorage'

import { Button, ctrp } from './ui-react-aria'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [savedTheme, setSavedTheme] = useLocalStorage('ui_theme', null)
  const isDark = savedTheme === 'dark'
  const IconComponent = isDark ? Lucide.Sun : Lucide.Moon

  const toggleTheme = useCallback(() => {
    if (savedTheme === 'light') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setSavedTheme(savedTheme === 'light' ? 'dark' : 'light')
  }, [savedTheme, setSavedTheme])

  return (
    <Button className={ctrp(className, 'px-2')} variant="icon" onClick={toggleTheme}>
      <IconComponent className="h-5 w-5" />
    </Button>
  )
}
