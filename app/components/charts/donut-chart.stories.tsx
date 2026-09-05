import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { defineChart } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight, unit } from '#/styles/core/tokens.stylex'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartMotion, chartTheme, houses, houseConfig } from './chart.samples'

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
          z: 'house',
          innerRadius: 56,
          outerRadius: 96,
          fill: (datum) => houseConfig[datum.house.toLowerCase()]?.color ?? 'transparent'
        })
      ]
    })
  ],
  scales: { x: null, y: null },
  theme: chartTheme,
  motion: chartMotion,
  tooltip: {
    use: tooltip,
    portal,
    items: [
      { field: 'house', label: 'House' },
      { field: 'points', label: 'Points' }
    ] as const
  }
})

const styles = stylex.create({
  // Overlays sit on top of the chart surface without stealing pointer events.
  centerOverlay: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    inset: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute'
  },
  centerTotal: {
    fontSize: fontSize.featured5,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1.2
  },
  centerCaption: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    marginTop: unit.x0_5
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
