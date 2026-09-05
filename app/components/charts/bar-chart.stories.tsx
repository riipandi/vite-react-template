import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { barY, defineChart, fold, group, stack } from '@tanstack/charts'
import { barX } from '@tanstack/charts/bar'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import {
  barHoverStates,
  barMotion,
  barRadius,
  canvasDecorator,
  chartTheme,
  checkouts,
  checkoutConfig,
  checkoutScales,
  hpBooks,
  langdonNovels,
  seriesColors
} from './chart.samples'

const meta = {
  title: 'Visualizations/BarChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

export const Vertical: Story = {
  name: 'Vertical',
  render: () => {
    const definition = defineChart({
      marks: [
        barY(langdonNovels, {
          id: 'langdon',
          x: 'title',
          y: 'chapters',
          fill: seriesColors.langdon,
          radius: barRadius,
          states: barHoverStates()
        })
      ],
      scales: checkoutScales,
      theme: chartTheme,
      motion: barMotion,
      focus: 'nearest',
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart definition={definition} ariaLabel='Chapters per Robert Langdon novel' height={260} />
        <ChartLegend hide={['potter']} />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Chapters per Robert Langdon novel' })
    expect(chart).toBeVisible()
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(langdonNovels.length)
    expect(canvas.queryByText('Harry Potter')).toBeNull()
  }
}

export const Horizontal: Story = {
  name: 'Horizontal ranking',
  render: () => {
    const definition = defineChart({
      marks: [
        barX(hpBooks, {
          id: 'pages',
          x: 'pages',
          y: 'title',
          fill: seriesColors.brand,
          radius: barRadius,
          states: barHoverStates()
        })
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Pages' } },
        y: { scale: () => scaleBand<string>().padding(0.2) }
      },
      motion: barMotion,
      theme: chartTheme,
      focus: 'nearest',
      tooltip
    })

    return (
      <ChartContainer config={{ pages: { label: 'Pages', color: seriesColors.brand } }}>
        <Chart definition={definition} ariaLabel='Harry Potter books by page count' height={300} />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Harry Potter books by page count' })
    expect(chart).toBeVisible()
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(hpBooks.length)
  }
}

export const Stacked: Story = {
  name: 'Stacked',
  render: () => {
    const rows = fold(checkouts, {
      fields: ['langdon', 'potter'],
      as: { key: 'series', value: 'checkouts' }
    })
    const definition = defineChart({
      marks: [
        barY(rows, {
          id: 'stacked-bars',
          x: 'month',
          y: 'checkouts',
          z: 'series',
          color: 'series',
          layout: stack(),
          radius: barRadius,
          states: barHoverStates()
        })
      ],
      scales: checkoutScales,
      motion: barMotion,
      color: { domain: ['langdon', 'potter'], range: [seriesColors.langdon, seriesColors.potter] },
      theme: chartTheme,
      focus: 'nearest',
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
    // Two stacked segments per month.
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(checkouts.length * 2)
  }
}

export const Grouped: Story = {
  name: 'Grouped',
  render: () => {
    const rows = fold(checkouts, {
      fields: ['langdon', 'potter'],
      as: { key: 'series', value: 'checkouts' }
    })
    const definition = defineChart({
      marks: [
        barY(rows, {
          id: 'grouped-bars',
          x: 'month',
          y: 'checkouts',
          z: 'series',
          color: 'series',
          layout: group(),
          radius: barRadius,
          states: barHoverStates()
        })
      ],
      motion: barMotion,
      scales: checkoutScales,
      color: { domain: ['langdon', 'potter'], range: [seriesColors.langdon, seriesColors.potter] },
      theme: chartTheme,
      focus: 'nearest',
      tooltip
    })

    return (
      <ChartContainer config={checkoutConfig}>
        <Chart
          definition={definition}
          ariaLabel='Monthly checkouts grouped by series'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Monthly checkouts grouped by series' })
    expect(chart).toBeVisible()
    expect(chart.querySelectorAll('rect').length).toBeGreaterThanOrEqual(checkouts.length * 2)
  }
}
