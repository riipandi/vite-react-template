import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { expect, userEvent } from 'storybook/test'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/extra/card'
import { unit } from '#/styles/core/tokens.stylex'
import { Calendar } from './calendar.component'

const meta = {
  title: 'Extra Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.maxWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

const styles = stylex.create({
  card: {
    width: 'fit-content',
    paddingTop: unit.x8
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const today = new Date()
const daysFromNow = (days: number) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  date.setDate(date.getDate() + days)
  return date
}

function SingleCalendar() {
  const [selected, setSelected] = React.useState<Date>()

  return <Calendar mode='single' selected={selected} onSelect={setSelected} />
}

function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange>()

  return <Calendar mode='range' selected={range} onSelect={setRange} />
}

export default meta

export const Single: Story = {
  render: () => (
    <Card style={styles.card}>
      <CardContent style={styles.cardContent}>
        <SingleCalendar />
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const day15 = canvas.getAllByRole('button').find((button) => button.textContent === '15')

    await userEvent.click(day15!)
    await expect(canvas.getByRole('grid').querySelector('.rdp-selected')).not.toBeNull()
  }
}

export const Range: Story = {
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Date range</CardTitle>
        <CardDescription>Pick a start and end date.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <RangeCalendar />
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button')
    const day10 = buttons.find((button) => button.textContent === '10')
    const day14 = buttons.find((button) => button.textContent === '14')

    await userEvent.click(day10!)
    await userEvent.click(day14!)

    await expect(canvas.getByRole('grid').querySelector('.rdp-range_start')).not.toBeNull()
    await expect(canvas.getByRole('grid').querySelector('.rdp-range_end')).not.toBeNull()
  }
}

export const Multiple: Story = {
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Multiple dates</CardTitle>
        <CardDescription>Select more than one date.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <Calendar mode='multiple' />
      </CardContent>
    </Card>
  )
}

export const DisabledWeekends: Story = {
  name: 'Disabled weekends',
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Disabled weekends</CardTitle>
        <CardDescription>Saturdays and Sundays cannot be selected.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <Calendar mode='single' disabled={{ dayOfWeek: [0, 6] }} />
      </CardContent>
    </Card>
  )
}

export const MinMax: Story = {
  name: 'Min and max',
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Bounded range</CardTitle>
        <CardDescription>Selection limited to a two-week window.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <Calendar mode='single' startMonth={daysFromNow(-7)} endMonth={daysFromNow(14)} />
      </CardContent>
    </Card>
  )
}

export const TwoMonths: Story = {
  name: 'Two months',
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Two months</CardTitle>
        <CardDescription>Browse two months side by side.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <Calendar mode='range' numberOfMonths={2} />
      </CardContent>
    </Card>
  )
}

export const Dropdown: Story = {
  render: () => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Dropdown navigation</CardTitle>
        <CardDescription>Jump quickly with month and year pickers.</CardDescription>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <Calendar mode='single' captionLayout='dropdown' />
      </CardContent>
    </Card>
  )
}
