import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { defineChart } from '@tanstack/charts'
import { polar, radialArc } from '@tanstack/charts/polar'
import { expect } from 'storybook/test'
import { fontSize, fontWeight, unit } from '#/styles/core/tokens.stylex'
import { Chart, ChartContainer } from './chart.component'
import { canvasDecorator, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/ProgressCircle',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

const RING_INNER = 44
const RING_OUTER = 56

const styles = stylex.create({
  overlay: {
    alignItems: 'center',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute'
  },
  label: {
    fontSize: fontSize.featured6,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: 'tabular-nums'
  },
  relative: {
    position: 'relative'
  },
  galleryRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x5
  }
})

interface ProgressStoryProps {
  fraction: number
  label: string
}

function ProgressCircle({ fraction, label }: ProgressStoryProps) {
  const turns = Math.PI * 2
  const definition = defineChart({
    marks: [
      polar({
        scales: { angle: null, radius: null },
        marks: [
          radialArc([{ start: 0, end: turns }], {
            id: 'track',
            startAngle: 'start',
            endAngle: 'end',
            innerRadius: RING_INNER,
            outerRadius: RING_OUTER,
            fill: seriesColors.neutral
          }),
          radialArc([{ start: 0, end: turns * fraction }], {
            id: 'value',
            startAngle: 'start',
            endAngle: 'end',
            innerRadius: RING_INNER,
            outerRadius: RING_OUTER,
            cornerRadius: (RING_OUTER - RING_INNER) / 2,
            fill: seriesColors.brand
          })
        ]
      })
    ],
    scales: { x: null, y: null }
  })

  const percent = Math.round(fraction * 100)

  return (
    <ChartContainer config={{ value: { label: 'Progress', color: seriesColors.brand } }}>
      <div {...stylex.props(styles.relative)}>
        <Chart definition={definition} ariaLabel={label} height={120} width={120} />
        <div {...stylex.props(styles.overlay)}>
          <span {...stylex.props(styles.label)}>{percent}%</span>
        </div>
      </div>
    </ChartContainer>
  )
}

export const Default: Story = {
  name: 'Default',
  render: () => <ProgressCircle fraction={0.68} label='Shelves restocked' />,
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Shelves restocked' })
    expect(chart).toBeVisible()
    // Track plus value arc.
    expect(chart.querySelectorAll('path').length).toBeGreaterThanOrEqual(2)
    expect(canvas.getByText('68%')).toBeVisible()
  }
}

export const Gallery: Story = {
  name: 'Gallery',
  render: () => (
    <div {...stylex.props(styles.galleryRow)}>
      <ProgressCircle fraction={0.25} label='Circulation desk queue' />
      <ProgressCircle fraction={0.5} label='Overdue notices sent' />
      <ProgressCircle fraction={0.75} label='New acquisitions catalogued' />
      <ProgressCircle fraction={0.92} label='Reading challenge progress' />
    </div>
  ),
  play: async ({ canvas }) => {
    for (const label of [
      'Circulation desk queue',
      'Overdue notices sent',
      'New acquisitions catalogued',
      'Reading challenge progress'
    ]) {
      expect(canvas.getByRole('img', { name: label })).toBeVisible()
    }
  }
}
