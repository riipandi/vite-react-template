import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { defineChart, dot, link, text } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/Slopegraph',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Slopegraph: house cup standings at Christmas versus year end. One line per
// house spans the two instants, with the values printed at each end so the
// deltas read without an axis. Ravenclaw overtakes Hufflepuff mid-story.
interface HouseRow {
  house: string
  christmas: number
  yearEnd: number
  color: string
}

const houses: readonly HouseRow[] = [
  { house: 'Gryffindor', christmas: 312, yearEnd: 472, color: seriesColors.langdon },
  { house: 'Slytherin', christmas: 385, yearEnd: 415, color: seriesColors.green },
  { house: 'Ravenclaw', christmas: 298, yearEnd: 426, color: seriesColors.amber },
  { house: 'Hufflepuff', christmas: 276, yearEnd: 301, color: seriesColors.red }
]

const slopeScales = {
  x: { scale: () => scalePoint<string>().padding(0.5) },
  y: { scale: scaleLinear, nice: true, grid: false }
} as const

export const HouseCup: Story = {
  name: 'House cup',
  render: () => {
    const definition = defineChart({
      marks: [
        link(houses, {
          id: 'slope',
          x1: () => 'Christmas',
          y1: 'christmas',
          x2: () => 'Year end',
          y2: 'yearEnd',
          stroke: (d) => d.color,
          strokeWidth: 2
        }),
        // `dot.fill` is a plain string, so each house paints its own pair.
        ...houses.flatMap((h) => [
          dot([h], {
            id: `${h.house} christmas`,
            x: () => 'Christmas',
            y: 'christmas',
            r: 4,
            fill: h.color
          }),
          dot([h], {
            id: `${h.house} yearEnd`,
            x: () => 'Year end',
            y: 'yearEnd',
            r: 4,
            fill: h.color
          })
        ]),
        // End labels double as the y read-out; no axis ticks needed.
        text(houses, {
          id: 'christmasLabel',
          x: () => 'Christmas',
          y: 'christmas',
          text: 'christmas',
          anchor: 'end',
          dx: -8,
          fontSize: 11,
          fill: (d) => d.color
        }),
        text(houses, {
          id: 'yearEndLabel',
          x: () => 'Year end',
          y: 'yearEnd',
          text: 'yearEnd',
          anchor: 'start',
          dx: 8,
          fontSize: 11,
          fill: (d) => d.color
        })
      ],
      scales: slopeScales,
      theme: chartTheme,
      focus: 'nearest-x',
      tooltip: {
        use: tooltip,
        portal,
        anchor: 'group-center',
        items: [{ channel: 'y', label: 'Points' }] as const
      }
    })

    return (
      <ChartContainer
        config={{
          Gryffindor: { label: 'Gryffindor', color: seriesColors.langdon },
          Slytherin: { label: 'Slytherin', color: seriesColors.green },
          Ravenclaw: { label: 'Ravenclaw', color: seriesColors.amber },
          Hufflepuff: { label: 'Hufflepuff', color: seriesColors.red }
        }}
      >
        <Chart
          definition={definition}
          ariaLabel='House cup points at Christmas versus year end'
          height={280}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'House cup points at Christmas versus year end' })
    expect(chart).toBeVisible()
    // Value labels at both ends plus all four houses in the legend.
    expect(canvas.getByText('472')).toBeVisible()
    expect(canvas.getByText('276')).toBeVisible()
    expect(canvas.getByText('Hufflepuff')).toBeVisible()
  }
}
