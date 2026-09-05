import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight, radius, unit } from '#/styles/core/tokens.stylex'
import { canvasDecorator, houses, houseConfig } from './chart.samples'

const meta = {
  title: 'Visualizations/CategoryBar',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Tremor-style category bar: a single segmented bar showing a distribution,
// with an optional marker for "where we are". Pure markup — the values are
// household shares, not an axis.

const total = houses.reduce((sum, row) => sum + row.points, 0)

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    minWidth: '24rem',
    width: '100%'
  },
  markerTrack: {
    position: 'relative',
    height: unit.x2
  },
  marker: {
    position: 'absolute',
    transform: 'translateX(-50%)'
  },
  markerIcon: {
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightWidth: 4,
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
    borderTopWidth: 5,
    borderTopStyle: 'solid',
    borderTopColor: colors.foregroundNeutral,
    display: 'block'
  },
  segments: {
    display: 'flex',
    height: unit.x4,
    overflowX: 'hidden'
  },
  segment: {
    backgroundColor: 'var(--seg-bg, currentColor)',
    display: 'flex',
    height: '100%',
    width: 'var(--seg-width, auto)'
  },
  segmentFirst: {
    borderTopLeftRadius: radius.full,
    borderBottomLeftRadius: radius.full
  },
  segmentLast: {
    borderTopRightRadius: radius.full,
    borderBottomRightRadius: radius.full
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: fontSize.caption1,
    gap: unit.x3
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    fontVariantNumeric: 'tabular-nums',
    gap: unit.x1_5
  },
  swatch: {
    backgroundColor: 'currentColor',
    borderRadius: radius.xsmall,
    display: 'block',
    flexShrink: 0,
    height: unit.x2,
    width: unit.x2
  },
  value: {
    fontWeight: fontWeight.medium
  }
})

export function CategoryBar() {
  const markerLeft = 38.6 // Gryffindor's cumulative share, in percent.

  return (
    <div
      role='img'
      aria-label={`House points distribution across ${houses.length} Hogwarts houses`}
      {...stylex.props(styles.wrapper)}
    >
      <div {...stylex.props(styles.markerTrack)}>
        <div {...stylex.props(styles.marker)} style={{ left: `${markerLeft}%` }}>
          <span {...stylex.props(styles.markerIcon)} />
        </div>
      </div>
      <div {...stylex.props(styles.segments)}>
        {houses.map((row, index) => {
          return (
            <div
              key={row.house}
              data-house={row.house.toLowerCase()}
              title={`${row.house}: ${row.points} points`}
              {...stylex.props(
                styles.segment,
                index === 0 && styles.segmentFirst,
                index === houses.length - 1 && styles.segmentLast
              )}
              style={
                {
                  '--seg-bg': houseConfig[row.house.toLowerCase()]?.color,
                  '--seg-width': `${((row.points / total) * 100).toFixed(2)}%`
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>
      <div {...stylex.props(styles.legend)}>
        {houses.map((row) => (
          <div key={row.house} {...stylex.props(styles.legendItem)}>
            <span
              {...stylex.props(styles.swatch)}
              style={{ color: houseConfig[row.house.toLowerCase()]?.color }}
            />
            {row.house}
            <span {...stylex.props(styles.value)}>{Math.round((row.points / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const HouseDistribution: Story = {
  name: 'House points share',
  render: () => <CategoryBar />,
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: /House points distribution/ })).toBeVisible()
    for (const house of houses) {
      expect(canvas.getByTitle(`${house.house}: ${house.points} points`)).toBeVisible()
    }
    expect(canvas.getByText('27%')).toBeVisible()
  }
}
