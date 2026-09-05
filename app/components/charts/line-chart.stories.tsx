import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { crosshair, defineChart, lineY } from '@tanstack/charts'
import { focusGroupX } from '@tanstack/charts/focus'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { UIProvider } from '#/components/base/provider'
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
// labeled vertical crosshair guide, so the tooltip rows compare series
// directly. The portal keeps the tooltip visible inside clipped containers.
const interaction = {
  focus: focusGroupX,
  marks: [crosshair({ x: { label: true }, y: false, marker: true })]
}

const groupedTooltipOptions = {
  use: tooltip,
  portal,
  anchor: 'group-center',
  placement: ['top', 'right', 'left', 'bottom'],
  sort: 'color-domain'
} as const

export const Multiple: Story = {
  name: 'Multiple series',
  render: () => {
    const definition = defineChart({
      marks: [
        lineY(checkouts, {
          id: 'Robert Langdon',
          x: 'month',
          y: 'langdon',
          stroke: seriesColors.langdon,
          strokeWidth: 2
        }),
        lineY(checkouts, {
          id: 'Harry Potter',
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
      tooltip: groupedTooltipOptions
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
          id: 'Robert Langdon',
          x: 'month',
          y: 'langdon',
          stroke: seriesColors.langdon,
          strokeWidth: 2,
          points: true
        }),
        lineY(checkouts, {
          id: 'Harry Potter',
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
      tooltip: groupedTooltipOptions
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

// RTL smoke check: the chart renders inside Base UI's DirectionProvider with
// the right-to-left direction, and pointer inspection keeps working.
export const Rtl: Story = {
  name: 'RTL smoke',
  render: () => {
    const definition = defineChart({
      marks: [
        lineY(checkouts, {
          id: 'langdon',
          x: 'month',
          y: 'langdon',
          stroke: seriesColors.langdon,
          strokeWidth: 2
        })
      ],
      scales: checkoutScales,
      theme: chartTheme,
      tooltip
    })

    return (
      <UIProvider direction='rtl'>
        <ChartContainer config={checkoutConfig}>
          <Chart definition={definition} ariaLabel='Monthly checkouts trend (RTL)' height={260} />
        </ChartContainer>
      </UIProvider>
    )
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: 'Monthly checkouts trend (RTL)' })).toBeVisible()
  }
}
