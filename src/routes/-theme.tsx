import { ThemeProvider as LonikThemer, useTheme } from '@lonik/themer'
import * as Lucide from 'lucide-react'
import { Activity } from 'react'
import { clx } from '#/libraries/utils'

export function ThemeProvider(props: React.PropsWithChildren) {
  return (
    <LonikThemer
      themes={['light', 'dark']}
      attribute='data-theme'
      defaultTheme='system'
      disableTransitionOnChange={true}
      enableColorScheme={true}
      enableSystem={true}
      storage='localStorage'
    >
      {props.children}
    </LonikThemer>
  )
}

const cycle: Record<string, string> = { light: 'dark', dark: 'system', system: 'light' }
const labels: Record<string, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to system mode',
  system: 'Switch to light mode'
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const current = theme ?? 'system'

  return (
    <div className={clx(className)}>
      <button
        type='button'
        onClick={() => setTheme(cycle[current] ?? 'light')}
        className='rounded-lg p-2 text-foreground-neutral-faded transition hover:bg-background-neutral-faded hover:text-foreground-neutral'
        aria-label={labels[current]}
      >
        <Activity mode={current === 'light' ? 'visible' : 'hidden'}>
          <Lucide.Sun className='size-4' />
        </Activity>
        <Activity mode={current === 'dark' ? 'visible' : 'hidden'}>
          <Lucide.Moon className='size-4' />
        </Activity>
        <Activity mode={current === 'system' ? 'visible' : 'hidden'}>
          <Lucide.Monitor className='size-4' />
        </Activity>
      </button>
    </div>
  )
}
