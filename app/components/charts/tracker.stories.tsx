import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/base/tooltip'
import { duration, easing, fontSize, unit } from '#/styles/core/tokens.stylex'
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
// Each segment is a Base UI Tooltip trigger, so the popup follows the design
// system instead of relying on native `title` attributes.

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
    backgroundColor: 'var(--seg-color, currentColor)',
    borderRadius: 2,
    cursor: 'default',
    display: 'block',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    height: unit.x2,
    minWidth: 0,
    // Subtle feedback only — the segment colors carry the information.
    opacity: { default: 1, ':hover': 0.6 },
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.decelerate
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
          <Tooltip key={day}>
            <TooltipTrigger
              data-status={status}
              {...stylex.props(styles.segment)}
              style={{ '--seg-color': statusColors[status] } as React.CSSProperties}
            />
            <TooltipContent>{`Day ${day + 1}: ${statusLabels[status]}`}</TooltipContent>
          </Tooltip>
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
    expect(document.querySelectorAll('[data-status]').length).toBe(shelfStatuses.length)
    expect(document.querySelectorAll('[data-status="overdue"]').length).toBeGreaterThan(0)

    // Hovering a segment opens the Base UI tooltip for that day.
    const firstSegment = document.querySelector('[data-status="low"]')
    if (firstSegment) {
      await userEvent.hover(firstSegment)
      await waitFor(() =>
        expect(within(document.body).getByText('Day 1: Last copies')).toBeVisible()
      )
    }
  }
}
