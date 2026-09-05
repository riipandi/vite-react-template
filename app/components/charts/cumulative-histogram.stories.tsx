import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { binX, cumulative, defineChart, rect } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, mulberry32, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/CumulativeHistogram',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Cumulative histogram of 120 OWL Potions scores. `binX` counts students per
// 5-point band, `cumulative` folds the counts into a running total so the
// final bar reaches the full cohort.
interface Score {
  score: number
}

const observations: readonly Score[] = (() => {
  const random = mulberry32(11)
  // Mild bell around 68 with a strict-grader tail below 50.
  return Array.from({ length: 120 }, () => {
    const bell = 68 + (random() + random() + random() - 1.5) * 16
    return { score: Math.max(18, Math.min(100, Math.round(bell))) }
  })
})()

const bins = binX(observations, { value: 'score', thresholds: 20 })
const cumBins = cumulative(bins, { outputs: { cumulative: { value: 'value', reduce: 'sum' } } })

const scoreScales = {
  x: { scale: scaleLinear, nice: true, grid: true },
  y: { scale: scaleLinear, nice: true, grid: true }
} as const

export const OwlPotions: Story = {
  name: 'OWL Potions scores',
  render: () => {
    const definition = defineChart({
      marks: [
        rect(cumBins, {
          id: 'cumulative',
          x1: 'x1',
          x2: 'x2',
          y1: () => 0,
          y2: 'cumulative',
          fill: seriesColors.green,
          fillOpacity: 0.8,
          stroke: 'none',
          inset: 0.5,
          states: [
            {
              when: { focus: 'primary' },
              style: { fillOpacity: 1 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        })
      ],
      scales: scoreScales,
      theme: chartTheme,
      focus: 'nearest',
      tooltip: {
        use: tooltip,
        portal,
        items: [{ channel: 'y', label: 'Students so far' }] as const
      }
    })

    return (
      <ChartContainer
        config={{ cumulative: { label: 'Cumulative students', color: seriesColors.green } }}
      >
        <Chart
          definition={definition}
          ariaLabel='Cumulative histogram of OWL Potions scores'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Cumulative histogram of OWL Potions scores' })
    expect(chart).toBeVisible()
    // One bar per bin; the running total only ever grows, so bar heights
    // should form a non-decreasing staircase left to right.
    const bars = [...chart.querySelectorAll('rect')]
    expect(bars.length).toBeGreaterThanOrEqual(12)
    expect(canvas.getByText('Cumulative students')).toBeVisible()
  }
}
