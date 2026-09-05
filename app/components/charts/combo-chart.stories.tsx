import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { barY, defineChart, lineY, ruleY } from '@tanstack/charts'
import { tooltip } from '@tanstack/charts/tooltip'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import {
  canvasDecorator,
  checkouts,
  checkoutConfig,
  checkoutScales,
  seriesColors
} from './chart.samples'

const meta = {
  title: 'Visualizations/ComboChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

export const BarsWithTrendLine: Story = {
  name: 'Bars with trend line',
  parameters: {
    docs: {
      description: {
        story:
          'Langdon checkouts as bars with the Harry Potter trend layered on top. ' +
          'Both marks share the band x scale, so the line runs through the band centers.'
      }
    }
  },
  render: () => {
    const definition = defineChart({
      marks: [
        barY(checkouts, {
          id: 'langdon',
          x: 'month',
          y: 'langdon',
          fill: seriesColors.langdon,
          fillOpacity: 0.85
        }),
        lineY(checkouts, {
          id: 'potter',
          x: 'month',
          y: 'potter',
          stroke: seriesColors.potter,
          strokeWidth: 2,
          points: true
        }),
        ruleY([0])
      ],
      scales: checkoutScales,
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart
          definition={definition}
          ariaLabel='Langdon checkouts with Potter trend'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Langdon checkouts with Potter trend' })
    expect(chart).toBeVisible()
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(checkouts.length)
    // The trend line paints at least one path plus its point markers.
    expect(chart.querySelectorAll('path').length).toBeGreaterThanOrEqual(1)
    expect(canvas.getByText('Robert Langdon')).toBeVisible()
    expect(canvas.getByText('Harry Potter')).toBeVisible()
  }
}
