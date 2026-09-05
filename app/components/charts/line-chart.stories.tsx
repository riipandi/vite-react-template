import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { crosshair, defineChart, lineY } from '@tanstack/charts'
import { focusGroupX } from '@tanstack/charts/focus'
import { tooltip } from '@tanstack/charts/tooltip'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import {
  canvasDecorator,
  chartMotion,
  chartTheme,
  checkouts,
  checkoutConfig,
  checkoutScales,
  seriesColors
} from './chart.samples'

const meta = {
  title: 'Visualizations/LineChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Grouped x-focus: hovering shows every series at the nearest band plus a
// vertical crosshair guide, so the tooltip rows compare series directly.
const interaction = {
  focus: focusGroupX,
  marks: [crosshair({ x: true, y: false, marker: true })]
}

export const Multiple: Story = {
  name: 'Multiple series',
  render: () => {
    const definition = defineChart({
      marks: [
        lineY(checkouts, {
          id: 'langdon',
          x: 'month',
          y: 'langdon',
          stroke: seriesColors.langdon,
          strokeWidth: 2
        }),
        lineY(checkouts, {
          id: 'potter',
          x: 'month',
          y: 'potter',
          stroke: seriesColors.potter,
          strokeWidth: 2
        }),
        ...interaction.marks
      ],
      scales: checkoutScales,
      theme: chartTheme,
      motion: chartMotion,
      focus: interaction.focus,
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart definition={definition} ariaLabel='Monthly checkouts trend' height={260} />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: 'Monthly checkouts trend' })).toBeVisible()
    expect(canvas.getByText('Robert Langdon')).toBeVisible()
    expect(canvas.getByText('Harry Potter')).toBeVisible()
  }
}

export const WithDots: Story = {
  name: 'With dots',
  render: () => {
    const definition = defineChart({
      marks: [
        lineY(checkouts, {
          id: 'langdon',
          x: 'month',
          y: 'langdon',
          stroke: seriesColors.langdon,
          strokeWidth: 2,
          points: true
        }),
        lineY(checkouts, {
          id: 'potter',
          x: 'month',
          y: 'potter',
          stroke: seriesColors.potter,
          strokeWidth: 2,
          points: true
        }),
        ...interaction.marks
      ],
      scales: checkoutScales,
      theme: chartTheme,
      motion: chartMotion,
      focus: interaction.focus,
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart
          definition={definition}
          ariaLabel='Monthly checkouts trend with markers'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Monthly checkouts trend with markers' })
    expect(chart).toBeVisible()
    // One dot per datum per series.
    expect(chart.querySelectorAll('circle').length).toBeGreaterThanOrEqual(checkouts.length * 2)
  }
}
