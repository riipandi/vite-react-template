import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontLineHeight, radius, unit } from '#/styles/core/tokens.stylex'
import { canvasDecorator, hpBooks } from './chart.samples'

const meta = {
  title: 'Visualizations/BarList',
  component: undefined,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// A BarList is a ranked row list, not an axis chart — pure markup keeps the
// rows accessible (list semantics) and the bars trivially themeable.

const styles = stylex.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5,
    minWidth: container.medium,
    width: '100%'
  },
  row: {
    display: 'grid',
    fontVariantNumeric: 'tabular-nums',
    gap: unit.x2,
    gridTemplateColumns: 'minmax(96px, 1fr) 3fr auto'
  },
  label: {
    fontVariantNumeric: 'tabular-nums',
    lineHeight: fontLineHeight.caption1,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  bar: {
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.small,
    display: 'flex',
    height: unit.x4,
    overflowX: 'hidden'
  },
  barFill: {
    backgroundColor: colors.backgroundPrimary,
    height: '100%'
  },
  barFillMuted: {
    backgroundColor: colors.backgroundNeutralHighlighted,
    height: '100%'
  },
  value: {
    fontVariantNumeric: 'tabular-nums',
    minWidth: unit.x8,
    textAlign: 'right'
  }
})

interface BarListProps {
  rows: readonly { title: string; pages: number }[]
  highlightFirst?: boolean
}

function BarList({ rows, highlightFirst = true }: BarListProps) {
  const max = Math.max(...rows.map((row) => row.pages))

  return (
    <div role='list' aria-label='Most borrowed Harry Potter books' {...stylex.props(styles.list)}>
      {rows.map((row, index) => (
        <div key={row.title} role='listitem' {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>{row.title}</span>
          <div {...stylex.props(styles.bar)}>
            <div
              {...stylex.props(
                highlightFirst && index === 0 ? styles.barFill : styles.barFillMuted
              )}
              style={{ width: `${(row.pages / max) * 100}%` }}
            />
          </div>
          <span {...stylex.props(styles.value)}>{row.pages}</span>
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  name: 'Most borrowed books',
  render: () => <BarList rows={hpBooks.toSorted((a, b) => b.pages - a.pages)} />,
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list', { name: 'Most borrowed Harry Potter books' })
    expect(list).toBeVisible()
    expect(canvas.getAllByRole('listitem').length).toBe(hpBooks.length)
    expect(canvas.getByText('Order of the Phoenix')).toBeVisible()
    expect(canvas.getByText('766')).toBeVisible()
  }
}

export const MutedBars: Story = {
  name: 'Without highlight',
  render: () => (
    <BarList rows={hpBooks.toSorted((a, b) => b.pages - a.pages)} highlightFirst={false} />
  ),
  play: async ({ canvas }) => {
    expect(canvas.getAllByRole('listitem').length).toBe(hpBooks.length)
  }
}
