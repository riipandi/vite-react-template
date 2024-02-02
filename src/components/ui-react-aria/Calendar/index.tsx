import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell,
  CalendarProps as AriaCalendarProps,
  DateValue,
  Heading,
  Text,
  useLocale,
} from 'react-aria-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Button } from '../Button'
import { focusRing } from '../utils'

const cellStyles = tv({
  extend: focusRing,
  base: 'w-9 h-9 text-sm cursor-default rounded-full flex items-center justify-center forced-color-adjust-none',
  variants: {
    isSelected: {
      false:
        'text-zinc-900 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-700 pressed:bg-gray-200 dark:pressed:bg-zinc-600',
      true: 'bg-primary-600 invalid:bg-destructive-600 text-white forced-colors:bg-[Highlight] forced-colors:invalid:bg-[Mark] forced-colors:text-[HighlightText]',
    },
    isDisabled: {
      true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
  },
})

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, 'visibleDuration'> {
  errorMessage?: string
}

export function Calendar<T extends DateValue>({ errorMessage, ...props }: CalendarProps<T>) {
  return (
    <AriaCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid>
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className={cellStyles} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot='errorMessage' className='text-sm text-destructive-600'>
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  )
}

export function CalendarHeader() {
  const { direction } = useLocale()

  return (
    <header className='flex w-full items-center gap-1 px-1 pb-4'>
      <Button variant='icon' slot='previous'>
        {direction === 'rtl' ? <ChevronRight aria-hidden /> : <ChevronLeft aria-hidden />}
      </Button>
      <Heading className='mx-2 flex-1 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-200' />
      <Button variant='icon' slot='next'>
        {direction === 'rtl' ? <ChevronLeft aria-hidden /> : <ChevronRight aria-hidden />}
      </Button>
    </header>
  )
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className='text-xs font-semibold text-gray-500'>
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
