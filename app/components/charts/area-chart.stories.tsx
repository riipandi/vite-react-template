import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { areaY, defineChart, fold, stack } from '@tanstack/charts'
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
  title: 'Visualizations/AreaChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

export const Overlaid: Story = {
  name: 'Overlaid',
  render: () => {
    const definition = defineChart({
      marks: [
        areaY(checkouts, {
          id: 'langdon',
          x: 'month',
          y: 'langdon',
          fill: seriesColors.langdon,
          fillOpacity: 0.15,
          stroke: seriesColors.langdon,
          strokeWidth: 2,
          states: [
            {
              when: { focus: 'unmatched' },
              style: { fillOpacity: 0.04, strokeOpacity: 0.3 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        }),
        areaY(checkouts, {
          id: 'potter',
          x: 'month',
          y: 'potter',
          fill: seriesColors.potter,
          fillOpacity: 0.15,
          stroke: seriesColors.potter,
          strokeWidth: 2,
          states: [
            {
              when: { focus: 'unmatched' },
              style: { fillOpacity: 0.04, strokeOpacity: 0.3 },
              transition: { type: 'tween', duration: 150, easing: 'ease-out' }
            }
          ]
        })
      ],
      scales: checkoutScales,
      theme: chartTheme,
      // Nearest-x focus: the hovered series stays solid while the other fades
      // out via its unmatched state.
      focus: 'nearest-x',
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart definition={definition} ariaLabel='Monthly checkouts by series' height={260} />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: 'Monthly checkouts by series' })).toBeVisible()
    expect(canvas.getByText('Robert Langdon')).toBeVisible()
    expect(canvas.getByText('Harry Potter')).toBeVisible()
  }
}

export const Stacked: Story = {
  name: 'Stacked',
  parameters: {
    docs: {
      description: {
        story:
          'Wide rows folded into series with `fold`, then stacked with `layout: stack()`. ' +
          'The series color comes from the definition-level color scale.'
      }
    }
  },
  render: () => {
    const rows = fold(checkouts, {
      fields: ['langdon', 'potter'],
      as: { key: 'series', value: 'checkouts' }
    })
    const definition = defineChart({
      marks: [
        areaY(rows, {
          id: 'stacked-areas',
          x: 'month',
          y: 'checkouts',
          z: 'series',
          color: 'series',
          fillOpacity: 0.6,
          layout: stack()
        })
      ],
      scales: checkoutScales,
      color: { domain: ['langdon', 'potter'], range: [seriesColors.langdon, seriesColors.potter] },
      theme: chartTheme,
      motion: chartMotion,
      focus: 'group-x',
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart
          definition={definition}
          ariaLabel='Monthly checkouts stacked by series'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Monthly checkouts stacked by series' })
    expect(chart).toBeVisible()
    // One layered shape per series — area scenes paint as paths.
    expect(chart.querySelectorAll('path').length).toBeGreaterThanOrEqual(2)
  }
}
