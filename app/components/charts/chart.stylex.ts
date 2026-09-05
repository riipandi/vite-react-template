import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontWeight, radius, unit } from '#/styles/core/tokens.stylex'
import { fontFamily, fontLineHeight, fontSize } from '#/styles/core/tokens.stylex'

// Tooltip and legend follow the repo's anchored-popup language (see
// tooltip.stylex.ts / popup.stylex.ts): inverted surface, radius.small,
// caption1 typography, no border or shadow. `minWidth` has no unit token —
// it mirrors shadcn's 8rem tooltip floor.

export const chartStyles = stylex.create({
  root: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    gap: unit.x2,
    width: '100%'
  },
  chart: {
    width: '100%'
  },
  tooltip: {
    backgroundColor: colors.foregroundNeutral,
    borderRadius: radius.small,
    color: colors.backgroundPage,
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5,
    lineHeight: fontLineHeight.caption1,
    minWidth: '8rem',
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2
  },
  tooltipTitle: {
    color: colors.backgroundNeutral,
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
    gap: unit.x1_5,
    minWidth: 0
  },
  tooltipSwatch: {
    backgroundColor: 'currentColor',
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
    backgroundColor: 'currentColor',
    borderRadius: radius.xsmall,
    display: 'block',
    flexShrink: 0,
    height: unit.x2,
    width: unit.x2
  }
})
