import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { defineChart, dot, link } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/Dumbbell',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Dumbbell comparison: OWL vs NEWT average grade per subject. One connector
// per subject with a dot at each exam; the gap reads as progress between the
// fifth and seventh year. Sorted by OWL score descending.
interface SubjectRow {
  subject: string
  owl: number
  newt: number
}

const subjects: readonly SubjectRow[] = [
  { subject: 'Potions', owl: 62, newt: 88 },
  { subject: 'Charms', owl: 71, newt: 90 },
  { subject: 'Transfiguration', owl: 66, newt: 84 },
  { subject: 'Herbology', owl: 74, newt: 81 },
  { subject: 'Defence Against the Dark Arts', owl: 58, newt: 92 },
  { subject: 'History of Magic', owl: 49, newt: 47 }
]

const dumbbellConfig = {
  owl: { label: 'OWL average', color: seriesColors.amber },
  newt: { label: 'NEWT average', color: seriesColors.langdon }
} as const

const dumbbellScales = {
  x: { scale: scaleLinear, nice: true, grid: true },
  y: { scale: () => scaleBand<string>().padding(0.4) }
} as const

export const OwlVsNewt: Story = {
  name: 'OWL vs NEWT',
  render: () => {
    const definition = defineChart({
      marks: [
        link(subjects, {
          id: 'gap',
          x1: 'owl',
          y1: 'subject',
          x2: 'newt',
          y2: 'subject',
          stroke: seriesColors.neutral,
          strokeWidth: 3,
          lineCap: 'round',
          strokeOpacity: 0.5
        }),
        dot(subjects, {
          id: 'owl',
          x: 'owl',
          y: 'subject',
          r: 5,
          fill: dumbbellConfig.owl.color,
          states: [
            {
              when: { focus: 'primary' },
              style: { r: 7 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        }),
        dot(subjects, {
          id: 'newt',
          x: 'newt',
          y: 'subject',
          r: 5,
          fill: dumbbellConfig.newt.color,
          states: [
            {
              when: { focus: 'primary' },
              style: { r: 7 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        })
      ],
      scales: dumbbellScales,
      theme: chartTheme,
      focus: 'nearest',
      tooltip: { use: tooltip, portal }
    })

    return (
      <ChartContainer config={dumbbellConfig}>
        <Chart
          definition={definition}
          ariaLabel='OWL versus NEWT average grade per subject'
          height={280}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'OWL versus NEWT average grade per subject' })
    expect(chart).toBeVisible()
    // Two dots per subject plus crosshair markers; connectors per subject.
    expect(chart.querySelectorAll('circle').length).toBeGreaterThanOrEqual(subjects.length * 2)
    expect(canvas.getByText('OWL average')).toBeVisible()
    expect(canvas.getByText('NEWT average')).toBeVisible()
    expect(canvas.getByText('Defence Against the Dark Arts')).toBeVisible()
  }
}
