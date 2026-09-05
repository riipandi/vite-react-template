import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { areaY, defineChart, lineY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { breakpoints, fontSize, fontWeight, radius, unit } from '#/styles/core/tokens.stylex'
import { Chart } from './chart.component'
import { canvasDecorator, checkouts, seriesColors } from './chart.samples'

const meta = {
  title: 'Visualizations/SparkChart',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Sparklines drop every guide: no grid, no axis, no tooltip — the number in
// the card carries the value, the spark carries the shape.
const sparkScales = {
  x: { scale: () => scaleBand<string>().padding(0.1) },
  y: { scale: scaleLinear, nice: true }
} as const

const sparkColors = [seriesColors.langdon, seriesColors.potter, seriesColors.amber] as const

const cards = [
  {
    label: 'Langdon · this half-year',
    value: '1,364',
    series: 'langdon' as const,
    kind: 'area' as const
  },
  {
    label: 'Potter · this half-year',
    value: '1,535',
    series: 'potter' as const,
    kind: 'area' as const
  },
  { label: 'Gap between series', value: '171', series: 'langdon' as const, kind: 'line' as const }
]

const styles = stylex.create({
  row: {
    display: 'grid',
    gap: unit.x3,
    // One column on mobile, three across from the medium breakpoint up.
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      [breakpoints.medium]: 'repeat(3, minmax(0, 1fr))'
    },
    width: '100%'
  },
  card: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutral,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    padding: unit.x3
  },
  label: {
    fontSize: fontSize.caption1
  },
  value: {
    fontSize: fontSize.featured5,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: 'tabular-nums'
  }
})

export const KpiRow: Story = {
  name: 'KPI sparkline row',
  render: () => (
    <div {...stylex.props(styles.row)}>
      {cards.map((card, index) => {
        const color = sparkColors[index]
        const definition = defineChart({
          marks: [
            card.kind === 'area'
              ? areaY(checkouts, {
                  id: card.series,
                  x: 'month',
                  y: card.series,
                  fill: color,
                  fillOpacity: 0.15,
                  stroke: color,
                  strokeWidth: 2
                })
              : lineY(checkouts, {
                  id: card.series,
                  x: 'month',
                  y: card.series,
                  stroke: color,
                  strokeWidth: 2
                })
          ],
          scales: sparkScales
        })

        return (
          <div key={card.label} {...stylex.props(styles.card)}>
            <span {...stylex.props(styles.label)}>{card.label}</span>
            <span {...stylex.props(styles.value)}>{card.value}</span>
            <Chart definition={definition} ariaLabel={`${card.label} sparkline`} height={48} />
          </div>
        )
      })}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const card of cards) {
      expect(canvas.getByRole('img', { name: `${card.label} sparkline` })).toBeVisible()
    }
    expect(canvas.getByText('1,364')).toBeVisible()
  }
}
