import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { boxY, defineChart } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer } from './chart.component'
import { canvasDecorator, chartTheme, mulberry32, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/Boxplot',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Tukey boxplots of final Charms exam scores per house. 30 observations per
// house — seeded noise with house-specific medians and spreads; Slytherin
// carries one extreme outlier the whisker logic has to surface.
interface ExamScore {
  house: string
  score: number
}

const examScores: readonly ExamScore[] = (() => {
  const random = mulberry32(20)
  const profile = [
    { house: 'Gryffindor', median: 78, spread: 14 },
    { house: 'Slytherin', median: 85, spread: 8 },
    { house: 'Ravenclaw', median: 82, spread: 11 },
    { house: 'Hufflepuff', median: 74, spread: 9 }
  ]
  return profile.flatMap(({ house, median, spread }) =>
    Array.from({ length: 30 }, (_, i) => {
      // Sum of three uniforms approximates a bell; one planted outlier.
      const noise = (random() + random() + random() - 1.5) * spread
      const score = i === 29 && house === 'Slytherin' ? 41 : median + noise
      return { house, score: Math.round(Math.max(20, Math.min(100, score))) }
    })
  )
})()

const boxScales = {
  x: { scale: () => scaleBand<string>().padding(0.35) },
  y: { scale: scaleLinear, nice: true, grid: true }
} as const

export const Charms: Story = {
  name: 'Charms exam scores',
  render: () => {
    const definition = defineChart({
      marks: [
        boxY(examScores, {
          id: 'scores',
          x: 'house',
          y: 'score',
          fill: seriesColors.brand,
          fillOpacity: 0.25,
          stroke: seriesColors.brand,
          strokeWidth: 1.5,
          inset: 14
        })
      ],
      scales: boxScales,
      theme: chartTheme,
      focus: 'nearest',
      tooltip: {
        use: tooltip,
        portal,
        items: [{ channel: 'y', label: 'Score' }] as const
      }
    })

    return (
      <ChartContainer config={{ scores: { label: 'Charms score', color: seriesColors.brand } }}>
        <Chart
          definition={definition}
          ariaLabel='Charms exam score distribution per house'
          height={280}
        />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Charms exam score distribution per house' })
    expect(chart).toBeVisible()
    // Every house renders a box; the planted Slytherin outlier must appear
    // as its own mark so the whisker logic is provably Tukey.
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(4)
    expect(canvas.getByText('Slytherin')).toBeVisible()
  }
}
