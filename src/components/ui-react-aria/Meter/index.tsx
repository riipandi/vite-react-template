import * as Lucide from 'lucide-react'
import { Meter as AriaMeter, type MeterProps as AriaMeterProps } from 'react-aria-components'

import { Label } from '../Field'
import { ctrp } from '../utils'

export interface MeterProps extends AriaMeterProps {
  label?: string
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <AriaMeter {...props} className={ctrp(props.className, 'flex flex-col gap-1')}>
      {({ percentage }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span
              className={`text-sm ${
                percentage >= 80
                  ? 'text-destructive-600 dark:text-destructive-500'
                  : 'text-gray-600 dark:text-zinc-400'
              }`}
            >
              {percentage >= 80 && (
                <Lucide.AlertTriangle
                  aria-label="Alert"
                  className="inline-block h-4 w-4 align-text-bottom"
                />
              )}
              {' ${valueText}'}
            </span>
          </div>
          <div className="-outline-offset-1 relative h-2 w-64 rounded-full bg-gray-300 outline outline-1 outline-transparent dark:bg-zinc-700">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${getColor(
                percentage
              )} forced-colors:bg-[Highlight]`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </AriaMeter>
  )
}

function getColor(percentage: number) {
  if (percentage < 70) {
    return 'bg-green-600'
  }

  if (percentage < 80) {
    return 'bg-orange-500'
  }

  return 'bg-destructive-600'
}
