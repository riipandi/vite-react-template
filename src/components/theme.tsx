import * as Lucide from 'lucide-react'

import { useTheme } from '#/stores/app-store'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const theme = useTheme()
  const IconComponent = theme === 'dark' ? Lucide.Sun : Lucide.Moon

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        document.documentElement.classList.toggle('dark')
        window.localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
      }}
    >
      <IconComponent className="h-5 w-5" />
    </button>
  )
}
