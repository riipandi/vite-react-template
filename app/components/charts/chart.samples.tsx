/**
 * Shared fixtures for the chart storybook: a public library tracking two
 * rival franchises — Dan Brown's Robert Langdon novels and Harry Potter.
 *
 * Series and chrome colors reference core theme tokens directly (defineVars
 * values are runtime var() strings), so every paint — SVG attributes and
 * HTML styles — follows light/dark themes through `themes.ts`.
 */

import * as stylex from '@stylexjs/stylex'
import type { ChartBarStateStyle, ChartMarkState, ChartMotionDefinition } from '@tanstack/charts'
import { stagger } from '@tanstack/charts/motion'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { colors } from '#/styles/core/colors.stylex'
import { breakpoints, container, unit } from '#/styles/core/tokens.stylex'
import type { ChartConfig } from './chart.component'

// ---------------------------------------------------------------------------
// Series palettes
// ---------------------------------------------------------------------------

// Series colors reference core theme tokens directly (defineVars values are
// runtime var() strings), so every paint — SVG attributes and HTML styles —
// follows light/dark themes through `themes.ts`.
export const seriesColors = {
  langdon: colors.backgroundPrimary, // brand blue
  potter: colors.backgroundPositive, // positive green
  brand: colors.backgroundPrimary,
  green: colors.backgroundPositive,
  amber: colors.backgroundWarning,
  red: colors.backgroundCritical,
  neutral: colors.backgroundNeutralHighlighted
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
// Motion policies — consumed by the `motion()` renderer selected in the Chart
// wrapper. Timing mirrors the core motion tokens: 200ms (duration.medium) for
// geometry, ease-out approximating `easing.decelerate`. The stagger delays
// make multi-series and multi-bar entrances read as one choreographed wave.
// ---------------------------------------------------------------------------

export const chartMotion: ChartMotionDefinition = {
  transition: { type: 'tween', duration: 200, easing: 'ease-out' },
  path: { update: 'rolling', x: 'shift' },
  ...stagger({ each: 40, by: 'series', phase: 'enter' })
}

export const barMotion: ChartMotionDefinition = {
  transition: { type: 'tween', duration: 200, easing: 'ease-out' },
  ...stagger({ each: 18, by: 'datum', phase: 'enter' })
}

/**
 * Active-bar interaction: the focused bar stays solid while the others dim.
 * Pair with `focus: 'nearest'` on the definition; state transitions ride the
 * motion renderer (reduced-motion aware).
 */
export function barHoverStates<TDatum>(): readonly ChartMarkState<
  TDatum,
  ChartBarStateStyle<TDatum>
>[] {
  // Hover runs faster than entrance (mirrors `duration.fast`, 150ms) and the
  // recede stays gentle — 0.7 keeps unfocused bars readable.
  const hoverTransition = { type: 'tween', duration: 150, easing: 'ease-out' } as const
  return [
    { when: { focus: 'primary' }, style: { fillOpacity: 1 }, transition: hoverTransition },
    { when: { focus: 'unmatched' }, style: { opacity: 0.7 }, transition: hoverTransition }
  ]
}

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
  gryffindor: { label: 'Gryffindor', color: colors.backgroundCritical },
  slytherin: { label: 'Slytherin', color: colors.backgroundPositive },
  ravenclaw: { label: 'Ravenclaw', color: colors.backgroundPrimary },
  hufflepuff: { label: 'Hufflepuff', color: colors.backgroundWarning }
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
  available: colors.backgroundPositive,
  low: colors.backgroundWarning,
  checkedOut: colors.backgroundPrimary,
  overdue: colors.backgroundCritical
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
// Story decorator — centers every visualization on a roomy canvas. The 448px
// floor (`container.xlarge`) only applies from the medium breakpoint up, so
// stories shrink freely on mobile viewports.
// ---------------------------------------------------------------------------

const canvasStyle = stylex.create({
  canvas: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    minWidth: { default: 0, [breakpoints.medium]: container.xlarge },
    padding: { default: unit.x3, [breakpoints.medium]: unit.x5 },
    width: '100%'
  }
})

export const canvasDecorator = (Story: React.ComponentType) => (
  <div {...stylex.props(canvasStyle.canvas)}>
    <Story />
  </div>
)
