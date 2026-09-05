import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { addDays } from 'date-fns'
import { Clock2Icon } from 'lucide-react'
import * as React from 'react'
import type { DayButton } from 'react-day-picker'
import type { DateRange } from 'react-day-picker'
import { arSA, he } from 'react-day-picker/locale'
import { Button } from '#/components/base/button/button.component'
import { Field, FieldGroup, FieldLabel } from '#/components/base/field/field.component'
import { Card, CardContent, CardFooter } from '#/components/extra/card/card.component'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/extra/input-group'
import { colors } from '#/styles/core/colors.stylex'
import { unit } from '#/styles/core/tokens.stylex'
import { Calendar } from './calendar.component'
import { calendarStyles } from './calendar.stylex'

const storyStyles = stylex.create({
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x2
  },
  buttonGroupButton: {
    flex: 1
  },
  timeFooter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: unit.x2
  },
  timeInput: {
    appearance: 'none'
  },
  clockIcon: {
    color: colors.foregroundNeutralFaded,
    height: '1rem',
    pointerEvents: 'none',
    width: '1rem'
  },
  dayCustom: {
    fontSize: '0.8125rem',
    gap: unit.x0_5
  },
  dayCustomOutside: {
    opacity: 0.4
  },
  dayPrice: {
    fontSize: '0.625rem',
    lineHeight: 1
  },
  dayPriceMuted: {
    color: colors.foregroundNeutralFaded
  },
  dayPriceSelected: {
    color: colors.onBrand,
    opacity: 0.8
  },
  rtlWrap: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x4
  }
})

type DayButtonProps = Omit<React.ComponentProps<typeof DayButton>, 'style'>

const meta: Meta<typeof Calendar> = {
  title: 'Extra Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Basic: Story = {
  render: () => <Calendar mode='single' />
}

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <Calendar mode='single' selected={date} onSelect={setDate} />
  }
}

export const Range: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
    })
    return (
      <Calendar
        mode='range'
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
    )
  }
}

export const MultipleMonths: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      new Date(new Date().getFullYear(), 0, 12),
      new Date(new Date().getFullYear(), 0, 15),
      new Date(new Date().getFullYear(), 0, 20)
    ])
    return <Calendar mode='multiple' selected={dates} onSelect={setDates} numberOfMonths={3} />
  }
}

export const WithDropdowns: Story = {
  render: () => <Calendar mode='single' captionLayout='dropdown' />
}

export const WithPresets: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 1, 12)
    )
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )

    return (
      <Card size='sm'>
        <CardContent>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
          />
        </CardContent>
        <CardFooter>
          <div {...stylex.props(storyStyles.buttonGroup)}>
            {[
              { label: 'Today', value: 0 },
              { label: 'Tomorrow', value: 1 },
              { label: 'In 3 days', value: 3 },
              { label: 'In a week', value: 7 },
              { label: 'In 2 weeks', value: 14 }
            ].map((preset) => (
              <Button
                key={preset.value}
                variant='outline'
                size='sm'
                style={storyStyles.buttonGroupButton}
                onClick={() => {
                  const newDate = addDays(new Date(), preset.value)
                  setDate(newDate)
                  setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1))
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    )
  }
}

export const DateAndTime: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), new Date().getMonth(), 12)
    )

    return (
      <Card size='sm'>
        <CardContent>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </CardContent>
        <CardFooter>
          <FieldGroup style={storyStyles.timeFooter}>
            <Field>
              <FieldLabel htmlFor='time-from'>Start Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id='time-from'
                  type='time'
                  step={1}
                  defaultValue='10:30:00'
                  style={storyStyles.timeInput}
                />
                <InputGroupAddon align='inline-end'>
                  <Clock2Icon {...stylex.props(storyStyles.clockIcon)} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor='time-to'>End Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id='time-to'
                  type='time'
                  step={1}
                  defaultValue='12:30:00'
                  style={storyStyles.timeInput}
                />
                <InputGroupAddon align='inline-end'>
                  <Clock2Icon {...stylex.props(storyStyles.clockIcon)} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    )
  }
}

export const BookedDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 0, 6)
    )
    const bookedDays = Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 0, 12 + i)
    )

    return (
      <Card size='sm'>
        <CardContent>
          <Calendar
            mode='single'
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={bookedDays}
            modifiers={{ booked: bookedDays }}
            modifiersClassNames={{ booked: 'line-through opacity-100' }}
          />
        </CardContent>
      </Card>
    )
  }
}

export const CustomDays: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 11, 8),
      to: addDays(new Date(new Date().getFullYear(), 11, 8), 10)
    })

    return (
      <Card size='sm'>
        <CardContent>
          <Calendar
            mode='range'
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            captionLayout='dropdown'
            formatters={{
              formatMonthDropdown: (calendarDate) =>
                calendarDate.toLocaleString('default', { month: 'long' })
            }}
            components={{
              // Example-level custom day button with a weekend price badge.
              DayButton: ({ children, modifiers, day, ...dayBtnProps }: DayButtonProps) => {
                const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6
                const isSelectedSingle =
                  modifiers.selected &&
                  !modifiers.range_start &&
                  !modifiers.range_end &&
                  !modifiers.range_middle

                return (
                  <button
                    type='button'
                    data-day={day.date.toLocaleDateString()}
                    data-selected-single={isSelectedSingle}
                    data-range-start={modifiers.range_start}
                    data-range-end={modifiers.range_end}
                    data-range-middle={modifiers.range_middle}
                    {...stylex.props(
                      calendarStyles.dayBtnBase,
                      calendarStyles.dayBtnSelected && isSelectedSingle,
                      modifiers.focused && calendarStyles.dayBtnFocused,
                      modifiers.range_start && calendarStyles.dayBtnRangeStart,
                      modifiers.range_end && calendarStyles.dayBtnRangeEnd,
                      modifiers.range_middle && calendarStyles.dayBtnRangeMiddle,
                      storyStyles.dayCustom,
                      modifiers.outside && storyStyles.dayCustomOutside
                    )}
                    {...dayBtnProps}
                  >
                    {children}
                    {!modifiers.outside && (
                      <span
                        {...stylex.props(
                          storyStyles.dayPrice,
                          modifiers.selected
                            ? storyStyles.dayPriceSelected
                            : storyStyles.dayPriceMuted
                        )}
                      >
                        {isWeekend ? '$120' : '$100'}
                      </span>
                    )}
                  </button>
                )
              }
            }}
          />
        </CardContent>
      </Card>
    )
  }
}

export const WeekNumbers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 0, 12)
    )

    return (
      <Card size='sm'>
        <CardContent>
          <Calendar
            mode='single'
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showWeekNumber
          />
        </CardContent>
      </Card>
    )
  }
}

export const Rtl: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isRtl, setIsRtl] = React.useState(true)

    return (
      <div {...stylex.props(storyStyles.rtlWrap)}>
        <Button variant='outline' size='sm' onClick={() => setIsRtl((prev) => !prev)}>
          {isRtl ? 'Switch to LTR' : 'Switch to RTL'}
        </Button>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          dir={isRtl ? 'rtl' : 'ltr'}
          locale={isRtl ? arSA : undefined}
          captionLayout='dropdown'
        />
      </div>
    )
  }
}

export const Hebrew: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        dir='rtl'
        locale={he}
        captionLayout='dropdown'
      />
    )
  }
}

export const SixMonths: Story = {
  render: () => <Calendar mode='single' numberOfMonths={6} />
}
