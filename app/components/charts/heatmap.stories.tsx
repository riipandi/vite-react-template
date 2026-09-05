import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/base/tooltip'
import { breakpoints, fontSize, fontWeight, unit } from '#/styles/core/tokens.stylex'
import {
  canvasDecorator,
  readingDays,
  readingPalette,
  readingTotal,
  spellingDays,
  spellingTotal,
  type ReadingDay
} from './chart.samples'

const meta = {
  title: 'Visualizations/Heatmap',
  component: undefined,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [canvasDecorator]
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

// GitHub-style activity heatmap: one column per week (Monday-based),
// one row per weekday, fresh green intensity by chapters read.

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

function cellLabel(day: ReadingDay): string {
  const noun = day.chapters === 1 ? 'chapter' : 'chapters'
  const value = day.chapters === 0 ? 'No reading' : `${day.chapters} ${noun}`
  return `${value} · ${day.date}, ${day.year}`
}

interface HeatmapProps {
  days: readonly ReadingDay[]
  label: string
  summary: string
}

export function Heatmap({ days, label, summary }: HeatmapProps) {
  const weeks = Math.max(...days.map((day) => day.week)) + 1

  // One label per week column, merged while the month stays the same. Columns
  // shorter than two weeks drop their label, like GitHub.
  const monthSpans = (() => {
    const spans: { label: string; span: number }[] = []
    for (const day of days) {
      if (day.weekday !== 0) continue
      const month = day.date.split(' ')[0]!
      const last = spans[spans.length - 1]
      if (last?.label === month) last.span += 1
      else spans.push({ label: month, span: 1 })
    }
    return spans.filter((s) => s.span >= 2)
  })()

  return (
    <div role='img' aria-label={label} {...stylex.props(styles.wrapper)}>
      {/* Month labels share the cell grid's column geometry. */}
      <div {...stylex.props(styles.monthsRow)}>
        <div {...stylex.props(styles.dayLabels)} aria-hidden='true' />
        <div
          {...stylex.props(styles.months)}
          style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
        >
          {monthSpans.map((month) => (
            <span key={month.label + month.span} style={{ gridColumn: `span ${month.span}` }}>
              {month.label}
            </span>
          ))}
        </div>
      </div>

      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.dayLabels)} aria-hidden='true'>
          {DAY_LABELS.map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </div>

        <div {...stylex.props(styles.cells)}>
          {days.map((day) => (
            <Tooltip key={day.date + day.year}>
              <TooltipTrigger
                render={<div />}
                data-level={day.level}
                aria-hidden='true'
                {...stylex.props(styles.cell)}
                style={
                  {
                    '--cell-bg':
                      day.level === 0
                        ? 'var(--colors-background-neutral)'
                        : readingPalette[day.level as 1 | 2 | 3 | 4]
                  } as React.CSSProperties
                }
              />
              <TooltipContent>{cellLabel(day)}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div {...stylex.props(styles.legend)}>
        <span {...stylex.props(styles.summary)}>{summary}</span>
        <div {...stylex.props(styles.legendScale)}>
          <span>Less</span>
          <div {...stylex.props(styles.swatches)}>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                {...stylex.props(styles.swatch)}
                style={
                  {
                    '--swatch-bg':
                      level === 0
                        ? 'var(--colors-background-neutral)'
                        : readingPalette[level as 1 | 2 | 3 | 4]
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

type PlayContext = Parameters<NonNullable<StoryObj['play']>>[0]

async function expectHeatmapStory(
  { canvas }: PlayContext,
  days: readonly ReadingDay[],
  labelPattern: RegExp,
  summaryText: string
) {
  expect(canvas.getByRole('img', { name: labelPattern })).toBeVisible()
  expect(document.querySelectorAll('[data-level]').length).toBe(days.length)
  expect(canvas.getByText(summaryText)).toBeVisible()

  // Hovering a heavy-reading day opens the Base UI tooltip for that date.
  const denseDay = days.find((day) => day.level === 4)
  const cell = denseDay ? document.querySelector('[data-level="4"]') : null
  if (denseDay && cell) {
    await userEvent.hover(cell)
    await waitFor(() => expect(within(document.body).getByText(cellLabel(denseDay))).toBeVisible())
  }
}

export const Playground: Story = {
  name: 'Playground',
  render: () => (
    <Heatmap
      days={spellingDays}
      label={`Daily reading activity spelling the mantra, ${spellingTotal} chapters total`}
      summary={`${spellingTotal} chapters read spelling the mantra`}
    />
  ),
  play: async (context) => {
    await expectHeatmapStory(
      context,
      spellingDays,
      /Daily reading activity spelling the mantra/,
      `${spellingTotal} chapters read spelling the mantra`
    )
  }
}

export const ReadingLog: Story = {
  name: 'Reading log',
  render: () => (
    <Heatmap
      days={readingDays}
      label={`Daily reading activity across the 1991–1992 Hogwarts school year, ${readingTotal} chapters total`}
      summary={`${readingTotal} chapters read in the first year`}
    />
  ),
  play: async (context) => {
    await expectHeatmapStory(
      context,
      readingDays,
      /Daily reading activity across the 1991–1992/,
      `${readingTotal} chapters read in the first year`
    )
  }
}

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3,
    paddingInline: unit.x5,
    width: '100%'
  },
  monthsRow: {
    display: 'flex',
    gap: unit.x2,
    width: '100%'
  },
  months: {
    display: 'grid',
    flex: 1,
    fontSize: fontSize.caption1,
    gap: { default: unit.x0_5, [breakpoints.medium]: unit.x1 },
    minWidth: 0
  },
  body: {
    display: 'flex',
    gap: unit.x2,
    width: '100%'
  },
  dayLabels: {
    alignSelf: 'stretch',
    display: 'grid',
    fontSize: fontSize.caption1,
    gap: { default: unit.x0_5, [breakpoints.medium]: unit.x1 },
    gridTemplateRows: 'repeat(7, 1fr)',
    width: unit.x7
  },
  cells: {
    display: 'grid',
    flex: 1,
    gap: { default: unit.x0_5, [breakpoints.medium]: unit.x1 },
    gridAutoColumns: 'minmax(0, 1fr)',
    gridAutoFlow: 'column',
    gridTemplateRows: 'repeat(7, auto)',
    minWidth: 0
  },
  cell: {
    aspectRatio: '1',
    backgroundColor: 'var(--cell-bg, currentColor)',
    borderRadius: 2,
    cursor: 'default',
    minWidth: 0,
    width: '100%'
  },
  legend: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.caption1,
    gap: unit.x3,
    justifyContent: 'space-between'
  },
  legendScale: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2
  },
  swatches: {
    display: 'flex',
    gap: unit.x0_5
  },
  swatch: {
    backgroundColor: 'var(--swatch-bg, currentColor)',
    borderRadius: 2,
    display: 'block',
    height: unit.x2,
    width: unit.x2
  },
  summary: {
    fontWeight: fontWeight.medium
  }
})
