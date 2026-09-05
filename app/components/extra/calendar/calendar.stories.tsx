import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { addDays } from 'date-fns'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '#/components/base/button/button.component'
import { Card, CardContent, CardFooter } from '#/components/extra/card/card.component'
import { unit } from '#/styles/core/tokens.stylex'
import { Calendar } from './calendar.component'

const buttonGroupStyle = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x2
  },
  button: {
    flex: 1
  }
})

const meta: Meta<typeof Calendar> = {
  title: 'Extra/Calendar',
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

export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      new Date(new Date().getFullYear(), 0, 12),
      new Date(new Date().getFullYear(), 0, 15),
      new Date(new Date().getFullYear(), 0, 20)
    ])
    return <Calendar mode='multiple' selected={dates} onSelect={setDates} />
  }
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
          <div {...stylex.props(buttonGroupStyle.root)}>
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
                style={buttonGroupStyle.button}
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

export const DisabledDays: Story = {
  render: () => {
    const disabledDays = [
      new Date(new Date().getFullYear(), 0, 15),
      new Date(new Date().getFullYear(), 0, 20),
      {
        from: new Date(new Date().getFullYear(), 0, 25),
        to: new Date(new Date().getFullYear(), 0, 30)
      }
    ]
    return <Calendar mode='single' disabled={disabledDays} />
  }
}

export const WeekNumbers: Story = {
  render: () => <Calendar mode='single' showWeekNumber />
}

export const WithDropdowns: Story = {
  render: () => <Calendar mode='single' captionLayout='dropdown' />
}

export const SixMonths: Story = {
  render: () => <Calendar mode='single' numberOfMonths={6} />
}
