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
// Heatmap datasets (Sep 1991 – Aug 1992, the Hogwarts school year).
// Both are deterministic seeded values so tests and snapshots stay stable:
// - `spellingDays` paints RIIPANDI into the week grid with a natural mix of
//   light and heavy reading days.
// - `readingDays` is a full year of organic activity with momentum streaks,
//   rest days, and longer weekend sessions.
// ---------------------------------------------------------------------------

export interface ReadingDay {
  /** Short display label, e.g. 'Mar 3'. */
  date: string
  year: number
  /** 0 = Monday … 6 = Sunday. */
  weekday: number
  /** Week column index, Monday-based. */
  week: number
  chapters: number
  level: 0 | 1 | 2 | 3 | 4
}

export const readingPalette: Record<1 | 2 | 3 | 4, string> = {
  1: '#c9ecd2',
  2: '#7dd8a0',
  3: '#33b06a',
  4: '#167a3f'
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** 0 = Monday … 6 = Sunday. */
const weekdayOf = (d: Date) => (d.getDay() + 6) % 7

function makeDay(d: Date, weekday: number, week: number, chapters: number): ReadingDay {
  const level = chapters === 0 ? 0 : chapters <= 2 ? 1 : chapters <= 4 ? 2 : chapters <= 7 ? 3 : 4
  return {
    date: `${MONTHS[d.getMonth()]} ${d.getDate()}`,
    year: d.getFullYear(),
    weekday,
    week,
    chapters,
    level
  }
}

/** Weighted chapter counts — most days mid-scale, weekends run longer. */
function drawChapters(random: () => number, weekday: number): number {
  const roll = random()
  let chapters: number
  if (roll < 0.1) chapters = 1 + Math.floor(random() * 2)
  else if (roll < 0.35) chapters = 3 + Math.floor(random() * 2)
  else if (roll < 0.7) chapters = 5 + Math.floor(random() * 3)
  else chapters = 8 + Math.floor(random() * 3)
  return weekday >= 5 ? chapters + 2 : chapters
}

export const readingDays: ReadingDay[] = (() => {
  const random = mulberry32(1991)
  const days: ReadingDay[] = []
  // Monday, Sep 2 1991 — the first full week of the school year.
  let momentum = false
  for (let i = 0; i < 365; i++) {
    const d = new Date(1991, 8, 2 + i)
    const weekday = weekdayOf(d)
    // Momentum: keeping a streak alive is easier than starting one.
    const skipChance = momentum ? 0.12 : 0.3
    let chapters = 0
    if (random() >= skipChance) chapters = drawChapters(random, weekday)
    momentum = chapters > 0
    days.push(makeDay(d, weekday, Math.floor(i / 7), chapters))
  }
  return days
})()

export const readingWeeks = Math.max(...readingDays.map((d) => d.week)) + 1
export const readingTotal = readingDays.reduce((sum, d) => sum + d.chapters, 0)

const GLYPHS: Record<string, readonly string[]> = {
  R: ['XXX.', 'X..X', 'XXX.', 'X.X.', 'X..X'],
  I: ['X', 'X', 'X', 'X', 'X'],
  P: ['XXX.', 'X..X', 'XXX.', 'X...', 'X...'],
  A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'],
  N: ['X..X', 'XX.X', 'X.XX', 'X..X', 'X..X'],
  D: ['XXX.', 'X..X', 'X..X', 'X..X', 'XXX.']
}

const ART_ROWS = 7
const ART_TOP = 1
const NAME = 'RIIPANDI'

/** One boolean column per week: which weekday cells are part of the art. */
const artColumns: readonly (readonly boolean[])[] = (() => {
  const columns: boolean[][] = []
  ;[...NAME].forEach((char, index) => {
    if (index > 0) columns.push([false, false, false, false, false, false, false])
    const glyph = GLYPHS[char]!
    const width = glyph[0]!.length
    for (let c = 0; c < width; c++) {
      columns.push(
        Array.from(
          { length: ART_ROWS },
          (_, row) => row >= ART_TOP && row < ART_TOP + 5 && glyph[row - ART_TOP]![c] === 'X'
        )
      )
    }
  })
  return columns
})()

export const spellingDays: ReadingDay[] = (() => {
  const random = mulberry32(1991)
  const days: ReadingDay[] = []
  // Monday, Sep 2 1991 — the first full week of the school year.
  for (let week = 0; week < artColumns.length; week++) {
    for (let weekday = 0; weekday < ART_ROWS; weekday++) {
      const d = new Date(1991, 8, 2 + week * 7 + weekday)
      const filled = artColumns[week]![weekday]!
      days.push(makeDay(d, weekday, week, filled ? drawChapters(random, weekday) : 0))
    }
  }
  return days
})()

export const spellingWeeks = Math.max(...spellingDays.map((d) => d.week)) + 1
export const spellingTotal = spellingDays.reduce((sum, d) => sum + d.chapters, 0)

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
