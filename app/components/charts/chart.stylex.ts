import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import {
  container,
  fontFamily,
  fontLineHeight,
  fontSize,
  fontWeight,
  radius,
  stroke,
  unit
} from '#/styles/core/tokens.stylex'

// Tooltip follows the repo's elevated non-inverted card language (same
// surface as toast: overlay elevation + thin dimmed border, radius.medium).
// Legend and chrome text stay on `foregroundNeutral`. `minWidth` has no unit
// token — it mirrors shadcn's 8rem tooltip floor.

export const chartStyles = stylex.create({
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
    // Redirect the native tooltip surface chrome (see tooltip.js in
    // @tanstack/charts: it paints via these vars with Canvas fallbacks) to the
    // elevated card surface. The palette vars (--ts-chart-N) feed TanStack's
    // default categorical color scale; both chain into core theme vars, so
    // charts and tooltips stay theme-adaptive in dark mode.
    '--ts-chart-1': colors.backgroundPrimary,
    '--ts-chart-2': colors.backgroundPositive,
    '--ts-chart-3': colors.backgroundWarning,
    '--ts-chart-4': colors.backgroundCritical,
    '--chart-foreground': colors.foregroundNeutral,
    '--chart-muted': colors.foregroundNeutralFaded,
    '--chart-grid': colors.borderNeutralFaded,
    '--ts-chart-tooltip-background': colors.backgroundElevationOverlay,
    '--ts-chart-tooltip-border': `${stroke.ring1} solid ${colors.borderNeutralFaded}`,
    '--ts-chart-tooltip-border-radius': radius.medium,
    '--ts-chart-tooltip-color': colors.foregroundNeutral,
    '--ts-chart-tooltip-font': `500 ${fontSize.caption1}/${fontLineHeight.caption1} ${fontFamily.body}`,
    '--ts-chart-tooltip-max-width': container.small,
    '--ts-chart-tooltip-padding': `${unit.x1_5} ${unit.x3}`,
    '--ts-chart-tooltip-shadow': 'none',
    width: '100%'
  },
  // Body of the tooltip — chrome lives on the native surface above,
  // this only lays out the title and rows.
  tooltip: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5,
    lineHeight: fontLineHeight.caption1,
    minWidth: '8rem'
  },
  tooltipTitle: {
    color: colors.foregroundNeutralFaded,
    fontWeight: fontWeight.medium
  },
  tooltipRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    justifyContent: 'space-between'
  },
  tooltipLabel: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: fontWeight.regular,
    gap: unit.x1_5,
    minWidth: 0
  },
  tooltipSwatch: {
    backgroundColor: 'var(--swatch-color, currentColor)',
    borderRadius: radius.xsmall,
    display: 'block',
    flexShrink: 0,
    height: unit.x2,
    width: unit.x2
  },
  tooltipValue: {
    fontVariantNumeric: 'tabular-nums',
    fontWeight: fontWeight.medium
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
