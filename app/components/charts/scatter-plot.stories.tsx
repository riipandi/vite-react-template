import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { defineChart, dot, linearRegressionY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, mulberry32, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/ScatterPlot',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Practice hours versus spell power for 48 students, split into two cohorts.
// A dashed least-squares line summarizes the positive correlation; a couple
// of low outliers keep the point cloud from looking too synthetic.
interface StudentRow {
  hours: number
  power: number
  cohort: 'Day class' | 'Night study'
}

const students: readonly StudentRow[] = (() => {
  const random = mulberry32(33)
  return Array.from({ length: 48 }, (_, i) => {
    const hours = Math.round(random() * 20 * 2) / 2
    const power = 24 + hours * 3.4 + (random() - 0.5) * 18
    return {
      hours,
      power: i === 47 ? 22 : Math.round(Math.max(10, Math.min(100, power))),
      cohort: i % 2 === 0 ? 'Day class' : 'Night study'
    }
  })
})()

const dayStudents = students.filter((s) => s.cohort === 'Day class')
const nightStudents = students.filter((s) => s.cohort === 'Night study')

const scatterConfig = {
  day: { label: 'Day class', color: seriesColors.langdon },
  night: { label: 'Night study', color: seriesColors.potter }
} as const

const scatterScales = {
  x: { scale: scaleLinear, nice: true, grid: true },
  y: { scale: scaleLinear, nice: true, grid: true }
} as const

export const Practice: Story = {
  name: 'Practice vs power',
  render: () => {
    const definition = defineChart({
      marks: [
        linearRegressionY(students, {
          id: 'trend',
          x: 'hours',
          y: 'power',
          stroke: seriesColors.neutral,
          strokeWidth: 1.5,
          strokeDasharray: '5 4'
        }),
        dot(dayStudents, {
          id: 'day',
          x: 'hours',
          y: 'power',
          r: 4,
          fill: scatterConfig.day.color,
          fillOpacity: 0.85,
          states: [
            {
              when: { focus: 'primary' },
              style: { r: 6 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        }),
        dot(nightStudents, {
          id: 'night',
          x: 'hours',
          y: 'power',
          r: 4,
          fill: scatterConfig.night.color,
          fillOpacity: 0.85,
          states: [
            {
              when: { focus: 'primary' },
              style: { r: 6 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        })
      ],
      scales: scatterScales,
      theme: chartTheme,
      focus: 'nearest',
      tooltip: {
        use: tooltip,
        portal,
        items: [
          { channel: 'x', label: 'Hours' },
          { channel: 'y', label: 'Power' }
        ] as const
      }
    })

    return (
      <ChartContainer config={scatterConfig}>
        <Chart
          definition={definition}
          ariaLabel='Practice hours versus spell power with trend line'
          height={280}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', {
      name: 'Practice hours versus spell power with trend line'
    })
    expect(chart).toBeVisible()
    // All 48 students as dots, plus the trend line.
    expect(chart.querySelectorAll('circle').length).toBeGreaterThanOrEqual(students.length)
    expect(canvas.getByText('Day class')).toBeVisible()
    expect(canvas.getByText('Night study')).toBeVisible()
  }
}
