import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import {
  container,
  fontFamily,
  fontLineHeight,
  fontSize,
  radius,
  stroke,
  unit
} from '#/styles/core/tokens.stylex'

// Tooltip follows the repo's elevated non-inverted card language (same
// surface as toast: overlay elevation + thin dimmed border, radius.medium).
// Legend and chrome text stay on `foregroundNeutral`. `minWidth` has no unit
// token — it mirrors shadcn's 8rem tooltip floor.

// Tooltip chrome follows the repo's elevated non-inverted card language (same
// surface as toast: overlay elevation + thin dimmed border, radius.medium),
// applied by redirecting the native surface's `--ts-chart-tooltip-*`
// variables. The native tooltip body provides its own internal layout.
// `chartPalette` is exported so standalone visualizations (bar list, tracker)
// can opt into the same categorical palette outside the chart host.

const chartPaletteOverrides = {
  '--ts-chart-1': colors.backgroundPrimary,
  '--ts-chart-2': colors.backgroundPositive,
  '--ts-chart-3': colors.backgroundWarning,
  '--ts-chart-4': colors.backgroundCritical,
  '--chart-foreground': colors.foregroundNeutral,
  '--chart-muted': colors.foregroundNeutralFaded,
  '--chart-grid': colors.borderNeutralFaded
}

const chartTooltipOverrides = {
  '--ts-chart-tooltip-background': colors.backgroundElevationOverlay,
  '--ts-chart-tooltip-border': `${stroke.ring1} solid ${colors.borderNeutralFaded}`,
  '--ts-chart-tooltip-border-radius': radius.medium,
  '--ts-chart-tooltip-color': colors.foregroundNeutral,
  '--ts-chart-tooltip-font': `500 ${fontSize.caption1}/${fontLineHeight.caption1} ${fontFamily.body}`,
  '--ts-chart-tooltip-max-width': container.small,
  '--ts-chart-tooltip-padding': `${unit.x1_5} ${unit.x3}`,
  '--ts-chart-tooltip-shadow': 'none'
}

export const chartStyles = stylex.create({
  palette: chartPaletteOverrides,
  root: {
    alignItems: 'stretch',
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    gap: unit.x3,
    width: '100%'
  },
  chart: {
    ...chartPaletteOverrides,
    ...chartTooltipOverrides,
    width: '100%'
  },
  legend: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x4,
    justifyContent: 'center'
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1_5
  },
  legendSwatch: {
    backgroundColor: 'var(--swatch-color, currentColor)',
    borderRadius: radius.xsmall,
    display: 'block',
    flexShrink: 0,
    height: unit.x2,
    width: unit.x2
  }
})
