/**
 * Shared fixtures for the chart storybook: a public library tracking two
 * rival franchises — Dan Brown's Robert Langdon novels and Harry Potter.
 *
 * Colors are concrete oklch strings (TanStack paints fills/strokes as SVG
 * presentation attributes, which do not resolve CSS variables) and mirror
 * the core palette from `#/styles/core/colors.stylex.ts`.
 */

import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import type { ChartConfig } from './chart.component'

// ---------------------------------------------------------------------------
// Series palettes
// ---------------------------------------------------------------------------

export const seriesColors = {
  langdon: 'oklch(0.55 0.24 262.67)', // brand blue
  potter: 'oklch(0.55 0.13 151.8)', // positive green
  brand: 'oklch(0.55 0.24 262.67)',
  green: 'oklch(0.55 0.13 151.8)',
  amber: 'oklch(0.82 0.22 80)',
  red: 'oklch(0.59 0.205 20.28)',
  neutral: 'oklch(0.9118 0 89.88)'
} as const

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
  gryffindor: { label: 'Gryffindor', color: 'oklch(0.53 0.2 20.28)' },
  slytherin: { label: 'Slytherin', color: 'oklch(0.55 0.13 151.8)' },
  ravenclaw: { label: 'Ravenclaw', color: 'oklch(0.55 0.24 262.67)' },
  hufflepuff: { label: 'Hufflepuff', color: 'oklch(0.82 0.22 80)' }
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
  available: seriesColors.green,
  low: seriesColors.amber,
  checkedOut: seriesColors.langdon,
  overdue: seriesColors.red
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
