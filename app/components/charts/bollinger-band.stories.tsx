import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { areaY, crosshair, defineChart, lineY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { tooltip } from '@tanstack/charts/tooltip'
import { portal } from '@tanstack/charts/tooltip/portal'
import { expect } from 'storybook/test'
import { Chart, ChartContainer, ChartLegend } from './chart.component'
import { canvasDecorator, chartTheme, mulberry32, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/BollingerBand',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Bollinger band over 45 sessions of moonstone powder prices in Galleons.
// Deterministic seeded noise on a slow seasonal drift. A SMA-10 ± 2σ window
// gives the band; the first WINDOW - 1 sessions have no band yet — the marks
// skip null channels.
interface PriceDay {
  day: string
  price: number
  sma: number | null
  upper: number | null
  lower: number | null
}

const WINDOW = 10

const priceRows: readonly PriceDay[] = (() => {
  const random = mulberry32(42)
  const prices: number[] = []
  for (let i = 0; i < 45; i++) {
    const drift = 14 + 3 * Math.sin(i / 7) + i * 0.05
    prices.push(drift + (random() - 0.5) * 2.4)
  }
  return prices.map((price, i) => {
    const day = `Day ${i + 1}`
    if (i < WINDOW - 1) return { day, price, sma: null, upper: null, lower: null }
    const window = prices.slice(i - WINDOW + 1, i + 1)
    const mean = window.reduce((sum, value) => sum + value, 0) / window.length
    const sd = Math.sqrt(
      window.reduce((sum, value) => sum + (value - mean) ** 2, 0) / window.length
    )
    return { day, price, sma: mean, upper: mean + 2 * sd, lower: mean - 2 * sd }
  })
})()

const priceConfig = {
  price: { label: 'Price', color: seriesColors.langdon },
  sma: { label: 'SMA-10', color: seriesColors.neutral },
  band: { label: '±2σ band', color: seriesColors.brand }
} as const

const priceScales = {
  x: { scale: () => scalePoint<string>().padding(0.4) },
  y: { scale: scaleLinear, nice: true, grid: true }
} as const

export const Moonstone: Story = {
  name: 'Moonstone price',
  render: () => {
    const definition = defineChart({
      marks: [
        // Band first so the price line paints on top of the translucent fill.
        areaY(priceRows, {
          id: 'band',
          x: 'day',
          y1: 'lower',
          y2: 'upper',
          fill: seriesColors.brand,
          fillOpacity: 0.12,
          stroke: 'none'
        }),
        lineY(priceRows, {
          id: 'sma',
          x: 'day',
          y: 'sma',
          stroke: seriesColors.neutral,
          strokeWidth: 1.5,
          strokeDasharray: '4 3'
        }),
        lineY(priceRows, {
          id: 'price',
          x: 'day',
          y: 'price',
          stroke: seriesColors.langdon,
          strokeWidth: 2
        }),
        crosshair({ x: { label: true }, y: false, marker: true })
      ],
      scales: priceScales,
      theme: chartTheme,
      focus: 'nearest-x',
      tooltip: {
        use: tooltip,
        portal,
        items: [{ channel: 'y', label: 'Galleons' }] as const
      }
    })

    return (
      <ChartContainer config={priceConfig}>
        <Chart
          definition={definition}
          ariaLabel='Moonstone powder price with Bollinger band'
          height={260}
        />
        <ChartLegend />
      </ChartContainer>
    )
  },
  play: async ({ canvas }) => {
    const chart = canvas.getByRole('img', { name: 'Moonstone powder price with Bollinger band' })
    expect(chart).toBeVisible()
    // One band area plus two line paths at minimum.
    expect(chart.querySelectorAll('path').length).toBeGreaterThanOrEqual(3)
    expect(canvas.getByText('SMA-10')).toBeVisible()
    expect(canvas.getByText('±2σ band')).toBeVisible()
  }
}
