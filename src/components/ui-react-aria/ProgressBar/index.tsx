import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
} from 'react-aria-components'

import { Label } from '../Field'
import { ctrp } from '../utils'

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar {...props} className={ctrp(props.className, 'flex flex-col gap-1')}>
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span className="text-gray-600 text-sm dark:text-zinc-400">{valueText}</span>
          </div>
          <div className="-outline-offset-1 relative h-2 w-64 overflow-hidden rounded-full bg-gray-300 outline outline-1 outline-transparent dark:bg-zinc-700">
            <div
              className={`absolute top-0 h-full rounded-full bg-primary-600 dark:bg-primary-500 forced-colors:bg-[Highlight] ${
                isIndeterminate
                  ? 'slide-out-to-right-full repeat-infinite left-full animate-in duration-1000 ease-out [--tw-enter-translate-x:calc(-16rem-100%)]'
                  : 'left-0'
              }`}
              style={{ width: `${isIndeterminate ? 40 : percentage}%` }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  )
}
