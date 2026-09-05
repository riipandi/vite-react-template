import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/base/tooltip'
import { duration, easing, fontSize, radius, unit } from '#/styles/core/tokens.stylex'
import { shelfStatuses, statusColors, statusLabels, type AvailabilityStatus } from './chart.samples'

const meta = {
  title: 'Visualizations/Tracker',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['659px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
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
    paddingInline: unit.x5,
    width: '100%'
  },
  // Tremor reference: h-8 flex row — a 32px strip, equal-width segments.
  track: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x8,
    width: '100%'
  },
  // Each segment is a full-height clipped cell; the 1px gap between neighbors
  // comes from 0.5px side padding (dropped on the outer ends), and the strip
  // reads as a pill because the first/last cells carry the outer rounding.
  segment: {
    cursor: 'default',
    display: 'block',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
    minWidth: 0,
    overflow: 'hidden',
    paddingLeft: 0.5,
    paddingRight: 0.5,
    ':first-child': {
      borderBottomLeftRadius: radius.small,
      borderTopLeftRadius: radius.small,
      paddingLeft: 0
    },
    ':last-child': {
      borderBottomRightRadius: radius.small,
      borderTopRightRadius: radius.small,
      paddingRight: 0
    },
    // Subtle feedback only — the segment colors carry the information.
    opacity: { default: 1, ':hover': 0.75 },
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.decelerate
  },
  bar: {
    backgroundColor: 'var(--seg-color, currentColor)',
    borderRadius: 1,
    height: '100%',
    width: '100%'
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
              delay={10}
              data-status={status}
              render={<div />}
              {...stylex.props(styles.segment)}
              style={{ '--seg-color': statusColors[status] } as React.CSSProperties}
            >
              <div {...stylex.props(styles.bar)} />
            </TooltipTrigger>
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
