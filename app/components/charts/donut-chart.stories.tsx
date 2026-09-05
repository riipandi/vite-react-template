import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { defineChart } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { tooltip } from '@tanstack/charts/tooltip'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, houses, houseConfig } from './chart.samples'

const meta = {
  title: 'Visualizations/DonutChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

const donutDefinition = defineChart({
  marks: [
    polar({
      scales: { angle: null, radius: null },
      marks: [
        radialArc(pie(houses, { value: 'points' }), {
          id: 'house',
          innerRadius: 56,
          outerRadius: 96,
          fill: (datum) => houseConfig[datum.house.toLowerCase()]?.color ?? 'transparent'
        })
      ]
    })
  ],
  scales: { x: null, y: null },
  theme: chartTheme,
  tooltip
})

const styles = stylex.create({
  // Overlays sit on top of the chart surface without stealing pointer events.
  centerOverlay: {
    alignItems: 'center',
    display: 'grid',
    inset: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'relative'
  },
  centerTotal: {
    fontSize: '1.25rem',
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
    position: 'absolute'
  },
  centerCaption: {
    fontSize: '0.75rem',
    position: 'absolute',
    transform: 'translateY(1.25rem)'
  },
  relative: {
    position: 'relative'
  }
})

export const HousePoints: Story = {
  name: 'House points',
  render: () => (
    <ChartContainer config={houseConfig}>
      <Chart definition={donutDefinition} ariaLabel='Hogwarts house points' height={220} />
      <ChartLegend />
    </ChartContainer>
  ),
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Hogwarts house points' })
    expect(chart).toBeVisible()
    expect(chart.querySelectorAll('path').length).toBeGreaterThanOrEqual(houses.length)
  }
}

export const WithCenterTotal: Story = {
  name: 'With center total',
  parameters: {
    docs: {
      description: {
        story:
          'The center label is plain markup overlaid on the chart surface — ' +
          'the donut itself stays a plain TanStack definition.'
      }
    }
  },
  render: () => {
    const total = houses.reduce((sum, row) => sum + row.points, 0)

    return (
      <ChartContainer config={houseConfig}>
        <div {...stylex.props(stylex.create({ relative: { position: 'relative' } }).relative)}>
          <Chart
            definition={donutDefinition}
            ariaLabel='Hogwarts house points with total'
            height={220}
          />
          <div {...stylex.props(styles.centerOverlay)}>
            <span {...stylex.props(styles.centerTotal)}>{total}</span>
            <span {...stylex.props(styles.centerCaption)}>points</span>
          </div>
        </div>
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: 'Hogwarts house points with total' })).toBeVisible()
    expect(canvas.getByText('1721')).toBeVisible()
  }
}
