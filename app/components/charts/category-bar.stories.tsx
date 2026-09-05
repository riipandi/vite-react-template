import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/base/tooltip'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight, radius, unit } from '#/styles/core/tokens.stylex'
import { houses, houseConfig } from './chart.samples'

const meta = {
  title: 'Visualizations/CategoryBar',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['659px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// Tremor-style category bar: a single pill-shaped strip showing a
// distribution, with cumulative boundary labels above and a marker that
// reports "where we are". Mirrors the Tremor reference:
// - track: h-2 (8px) pill, 2px gaps between square segments
// - labels: prefix sums at boundaries, hidden when they would collide
// - marker: 4x16 vertical pin with a page-colored ring, colored by the
//   segment it lands in.

const total = houses.reduce((sum, row) => sum + row.points, 0)
const houseColor = (house: string) => houseConfig[house.toLowerCase()]?.color ?? 'currentColor'

// Color of the segment that contains the marker value (prefix-sum lookup).
function markerColorAt(value: number): string {
  let prefix = 0
  for (const row of houses) {
    prefix += row.points
    if (prefix >= value) return houseColor(row.house)
  }
  return houseColor(houses[houses.length - 1]!.house)
}

// Which boundary labels to render — a boundary is skipped when its label
// would crowd the neighbors (Tremor's heuristic: keep boundaries with at
// least ~10% of the total on each side).
function visibleLabels(): (number | null)[] {
  let prefix = 0
  let hidden = 0
  return houses.map((row) => {
    prefix += row.points
    const show =
      (row.points >= 0.1 * total || hidden >= 0.09 * total) &&
      total - prefix >= 0.1 * total &&
      prefix >= 0.1 * total &&
      prefix < 0.9 * total
    hidden = show ? 0 : hidden + row.points
    return show ? prefix : null
  })
}

const labels = visibleLabels()
const markerValue = 664
const markerLeft = (markerValue / total) * 100

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    paddingInline: unit.x5,
    width: '100%'
  },
  labels: {
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    height: unit.x5,
    position: 'relative',
    fontVariantNumeric: 'tabular-nums'
  },
  labelsEdge: {
    alignItems: 'flex-end',
    bottom: 0,
    display: 'flex',
    position: 'absolute'
  },
  labelCell: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: unit.x0_5
  },
  labelValue: {
    display: 'block',
    transform: 'translateX(50%)'
  },
  // Tremor reference: relative h-2 row holding the pill bar and the
  // absolutely positioned marker.
  barRow: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x2,
    position: 'relative',
    width: '100%'
  },
  segments: {
    alignItems: 'center',
    borderRadius: radius.full,
    display: 'flex',
    flex: 1,
    gap: unit.x0_5,
    height: '100%',
    overflow: 'hidden'
  },
  segment: {
    backgroundColor: 'var(--seg-bg, currentColor)',
    height: '100%'
  },
  marker: {
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    height: unit.x7,
    justifyContent: 'center',
    left: 'var(--marker-left, 0%)',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: unit.x7
  },
  markerPin: {
    backgroundColor: 'var(--pin-bg, currentColor)',
    borderRadius: radius.full,
    boxShadow: `0 0 0 2px ${colors.backgroundPage}`,
    display: 'block',
    height: unit.x4,
    width: unit.x1
  }
})

export function CategoryBar() {
  return (
    <div
      role='img'
      aria-label={`House points distribution across ${houses.length} Hogwarts houses`}
      {...stylex.props(styles.wrapper)}
    >
      {/* Cumulative boundary labels: 0 on the left, the total on the right. */}
      <div {...stylex.props(styles.labels)}>
        <div {...stylex.props(styles.labelsEdge)} style={{ left: 0 }}>
          0
        </div>
        {houses.map((row, index) => (
          <div
            key={row.house}
            {...stylex.props(styles.labelCell)}
            style={{ width: `${((row.points / total) * 100).toFixed(2)}%` }}
          >
            {labels[index] !== null ? (
              <span {...stylex.props(styles.labelValue)}>{labels[index]}</span>
            ) : null}
          </div>
        ))}
        <div {...stylex.props(styles.labelsEdge)} style={{ right: 0 }}>
          {total}
        </div>
      </div>

      <div {...stylex.props(styles.barRow)}>
        <div {...stylex.props(styles.segments)}>
          {houses.map((row) => (
            <div
              key={row.house}
              data-house={row.house.toLowerCase()}
              {...stylex.props(styles.segment)}
              style={
                {
                  '--seg-bg': houseColor(row.house),
                  width: `${((row.points / total) * 100).toFixed(2)}%`
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger
            delay={60}
            render={<div />}
            data-marker
            {...stylex.props(styles.marker)}
            style={{ '--marker-left': `${markerLeft.toFixed(2)}%` } as React.CSSProperties}
          >
            <span
              {...stylex.props(styles.markerPin)}
              style={{ '--pin-bg': markerColorAt(markerValue) } as React.CSSProperties}
            />
          </TooltipTrigger>
          <TooltipContent>{`${markerValue} points`}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export const HouseDistribution: Story = {
  name: 'House points share',
  render: () => <CategoryBar />,
  play: async ({ canvas }) => {
    expect(canvas.getByRole('img', { name: /House points distribution/ })).toBeVisible()

    // Boundary labels and the total are rendered above the bar.
    expect(canvas.getByText('0')).toBeVisible()
    expect(canvas.getByText('472')).toBeVisible()
    expect(canvas.getByText(String(total))).toBeVisible()

    for (const house of houses) {
      expect(document.querySelector(`[data-house="${house.house.toLowerCase()}"`)).not.toBeNull()
    }

    // Hovering the marker opens the Base UI tooltip for its value.
    const marker = document.querySelector('[data-marker]')
    if (marker) {
      await userEvent.hover(marker)
      await waitFor(() => expect(within(document.body).getByText('664 points')).toBeVisible())
    }
  }
}
