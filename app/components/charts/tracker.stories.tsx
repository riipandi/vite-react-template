import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { fontSize, unit } from '#/styles/core/tokens.stylex'
import {
  canvasDecorator,
  shelfStatuses,
  statusColors,
  statusLabels,
  type AvailabilityStatus
} from './chart.samples'

const meta = {
  title: 'Visualizations/Tracker',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Tremor-style tracker: one small segment per day, colored by shelf status.
// Native title attributes double as the tooltip; a real integration would
// swap them for the base tooltip component.

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    minWidth: '24rem',
    width: '100%'
  },
  track: {
    display: 'flex',
    gap: 2
  },
  segment: {
    backgroundColor: 'currentColor',
    borderRadius: 2,
    display: 'block',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    height: unit.x4,
    minWidth: 0
  },
  weekLabels: {
    display: 'flex',
    fontSize: fontSize.caption1,
    justifyContent: 'space-between'
  }
})

const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

function Tracker() {
  return (
    <div
      role='img'
      aria-label={`Shelf status for The Da Vinci Code across ${shelfStatuses.length} days`}
      {...stylex.props(styles.wrapper)}
    >
      <div {...stylex.props(styles.track)}>
        {shelfStatuses.map((status: AvailabilityStatus, day) => (
          <span
            key={day}
            data-status={status}
            title={`Day ${day + 1}: ${statusLabels[status]}`}
            {...stylex.props(styles.segment)}
            style={{ color: statusColors[status] }}
          />
        ))}
      </div>
      <div {...stylex.props(styles.weekLabels)}>
        {weeks.map((week) => (
          <span key={week}>{week}</span>
        ))}
      </div>
    </div>
  )
}

export const ShelfAvailability: Story = {
  name: 'Shelf availability',
  render: () => <Tracker />,
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: /Shelf status for The Da Vinci Code/ })).toBeVisible()
    expect(canvas.getAllByTitle(/Day \d+/).length).toBe(shelfStatuses.length)
    expect(document.querySelectorAll('[data-status="overdue"]').length).toBeGreaterThan(0)
  }
}
