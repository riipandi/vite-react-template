/**
 * Shared fixtures for the chart storybook: a public library tracking two
 * rival franchises — Dan Brown's Robert Langdon novels and Harry Potter.
 *
 * Series and chrome colors reference the categorical palette variables that
 * `chartStyles.chart` chains to the core theme tokens (see chart.stylex.ts).
 * The SVG renderer resolves var() in presentation attributes, so every paint
 * follows light/dark themes through `themes.ts`.
 */

import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import type { ChartConfig } from './chart.component'

// ---------------------------------------------------------------------------
// Series palettes
// ---------------------------------------------------------------------------

// Series colors reference the categorical palette variables defined on the
// chart container (see chartStyles.chart). They chain into core theme vars,
// so marks, legend swatches, and tooltip rows stay theme-adaptive in dark
// mode — the SVG renderer resolves var() in presentation attributes.
export const seriesColors = {
  langdon: 'var(--ts-chart-1)', // brand blue
  potter: 'var(--ts-chart-2)', // positive green
  brand: 'var(--ts-chart-1)',
  green: 'var(--ts-chart-2)',
  amber: 'var(--ts-chart-3)',
  red: 'var(--ts-chart-4)',
  neutral: 'var(--chart-grid, currentColor)'
} as const

/**
 * Chart chrome (axis lines, tick labels, grid hairlines) mirroring the core
 * tokens via the container variables defined in `chart` — theme-adaptive.
 */
export const chartTheme = {
  foreground: 'var(--chart-foreground, currentColor)',
  muted: 'var(--chart-muted, currentColor)',
  grid: 'var(--chart-grid, currentColor)',
  background: 'transparent'
} as const

/** Rounded bar corners — mirrors `radius.xsmall` (4px). */
export const barRadius = 4

// ---------------------------------------------------------------------------
// Monthly checkouts (area / line / combo / stacked charts)
// ---------------------------------------------------------------------------

export interface CheckoutRow {
  month: string
  langdon: number
  potter: number
}

export const checkouts: readonly CheckoutRow[] = [
  { month: 'Jan', langdon: 186, potter: 240 },
  { month: 'Feb', langdon: 305, potter: 198 },
  { month: 'Mar', langdon: 237, potter: 272 },
  { month: 'Apr', langdon: 173, potter: 312 },
  { month: 'May', langdon: 209, potter: 248 },
  { month: 'Jun', langdon: 254, potter: 265 }
]

export const checkoutConfig = {
  langdon: { label: 'Robert Langdon', color: seriesColors.langdon },
  potter: { label: 'Harry Potter', color: seriesColors.potter }
} satisfies ChartConfig

export const checkoutScales = {
  x: { scale: () => scaleBand<string>().padding(0.2) },
  y: { scale: scaleLinear, nice: true, grid: true }
} as const

// ---------------------------------------------------------------------------
// Novels
// ---------------------------------------------------------------------------

/** Chapters per Robert Langdon novel. */
export const langdonNovels = [
  { title: 'Angels & Demons', chapters: 137 },
  { title: 'The Da Vinci Code', chapters: 105 },
  { title: 'The Lost Symbol', chapters: 133 },
  { title: 'Inferno', chapters: 108 },
  { title: 'Origin', chapters: 104 }
]

/** Page counts for the Harry Potter series (UK first editions). */
export const hpBooks = [
  { title: 'Philosopher’s Stone', pages: 223 },
  { title: 'Chamber of Secrets', pages: 251 },
  { title: 'Prisoner of Azkaban', pages: 317 },
  { title: 'Goblet of Fire', pages: 636 },
  { title: 'Order of the Phoenix', pages: 766 },
  { title: 'Half-Blood Prince', pages: 607 },
  { title: 'Deathly Hallows', pages: 607 }
]

// ---------------------------------------------------------------------------
// Hogwarts house points (donut / category bar)
// ---------------------------------------------------------------------------

export const houses = [
  { house: 'Gryffindor', points: 472 },
  { house: 'Slytherin', points: 452 },
  { house: 'Ravenclaw', points: 426 },
  { house: 'Hufflepuff', points: 371 }
]

export const houseConfig: ChartConfig = {
  gryffindor: { label: 'Gryffindor', color: 'var(--ts-chart-4)' },
  slytherin: { label: 'Slytherin', color: 'var(--ts-chart-2)' },
  ravenclaw: { label: 'Ravenclaw', color: 'var(--ts-chart-1)' },
  hufflepuff: { label: 'Hufflepuff', color: 'var(--ts-chart-3)' }
}

/** Weekly Quidditch pitch availability for the tracker stories. */
export type AvailabilityStatus = 'available' | 'low' | 'checkedOut' | 'overdue'

export const statusLabels: Record<AvailabilityStatus, string> = {
  available: 'On the shelf',
  low: 'Last copies',
  checkedOut: 'Checked out',
  overdue: 'Overdue'
}

export const statusColors: Record<AvailabilityStatus, string> = {
  available: 'var(--ts-chart-2)',
  low: 'var(--ts-chart-3)',
  checkedOut: 'var(--ts-chart-1)',
  overdue: 'var(--ts-chart-4)'
}

/** Four weeks of shelf status for a single popular title. */
export const shelfStatuses: readonly AvailabilityStatus[] = Array.from({ length: 28 }, (_, day) => {
  const week = Math.floor(day / 7)
  if (day % 7 === 6) return 'available'
  if (week === 0) return day % 3 === 0 ? 'low' : 'available'
  if (week === 1) return day % 2 === 0 ? 'checkedOut' : 'low'
  if (week === 2) return day % 4 === 3 ? 'overdue' : 'checkedOut'
  return day % 2 === 0 ? 'available' : 'checkedOut'
})

// ---------------------------------------------------------------------------
// Story decorator — centers every visualization on a roomy canvas
// ---------------------------------------------------------------------------

export const canvasDecorator = (Story: React.ComponentType) => (
  <div
    {...stylex.props(
      atoms.display.flex,
      atoms.justifyContent.center,
      atoms.padding['20px'],
      atoms.minWidth['448px'],
      atoms.width['100%']
    )}
  >
    <Story />
  </div>
)
