import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { barY, defineChart, fold, group, ruleX, ruleY } from '@tanstack/charts'
import { barX } from '@tanstack/charts/bar'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
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

// Tooltip labels for the internal channels; the portal keeps the surface
// visible inside clipped containers.
const verticalItems = [
  { channel: 'x', label: 'Novel' },
  { channel: 'y', label: 'Chapters' }
] as const
const horizontalItems = [
  { channel: 'x', label: 'Pages' },
  { channel: 'y', label: 'Book' }
] as const

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
        }),
        // Bars can only round all four corners — an opaque baseline rule
        // covers the bottom rounding so only the tips read as rounded.
        ruleY([0], { stroke: colors.backgroundPage, strokeWidth: 6 })
      ],
      scales: checkoutScales,
      theme: chartTheme,
      motion: barMotion,
      focus: 'nearest',
      tooltip: { use: tooltip, portal, items: verticalItems }
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
        }),
        // Covers the left rounding so bars meet the baseline squarely.
        ruleX([0], { stroke: colors.backgroundPage, strokeWidth: 6 })
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Pages' } },
        y: { scale: () => scaleBand<string>().padding(0.2) }
      },
      motion: barMotion,
      theme: chartTheme,
      focus: 'nearest',
      tooltip: { use: tooltip, portal, items: horizontalItems }
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
    // Rounded stack tips without junction notches: the top series paints
    // first with all-corner rounding, then the square bottom series paints
    // over it and hides the rounded lower corners. The overlap is invisible,
    // so the visible junction stays at the true cumulative value.
    const overlap = 24 // data units — clears the 4px radius at every plot height
    const definition = defineChart({
      marks: [
        barY(checkouts, {
          id: 'stacked-potter',
          x: 'month',
          y1: (d) => d.langdon - overlap,
          y2: (d) => d.langdon + d.potter,
          z: () => 'Harry Potter',
          fill: seriesColors.potter,
          radius: barRadius,
          states: barHoverStates()
        }),
        barY(checkouts, {
          id: 'stacked-langdon',
          x: 'month',
          y: 'langdon',
          z: () => 'Robert Langdon',
          fill: seriesColors.langdon,
          states: barHoverStates()
        })
      ],
      scales: checkoutScales,
      motion: barMotion,
      color: {
        domain: ['Robert Langdon', 'Harry Potter'],
        range: [seriesColors.langdon, seriesColors.potter]
      },
      theme: chartTheme,
      focus: 'nearest',
      tooltip: { use: tooltip, portal, items: [{ channel: 'y', label: 'Checkouts' }] as const }
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
    // Rename folded series keys to their display labels so focus state,
    // tooltips, and the color scale all speak the same names.
    const rows = fold(checkouts, {
      fields: ['langdon', 'potter'],
      as: { key: 'series', value: 'checkouts' }
    }).map((row) => ({ ...row, series: checkoutConfig[row.series]?.label ?? row.series }))
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
        }),
        ruleY([0], { stroke: colors.backgroundPage, strokeWidth: 6 })
      ],
      motion: barMotion,
      scales: checkoutScales,
      color: {
        domain: ['Robert Langdon', 'Harry Potter'],
        range: [seriesColors.langdon, seriesColors.potter]
      },
      theme: chartTheme,
      focus: 'nearest',
      tooltip: { use: tooltip, portal, items: [{ channel: 'y', label: 'Checkouts' }] as const }
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
