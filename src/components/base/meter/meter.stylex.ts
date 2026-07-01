import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const meterStyles = stylex.create({
  root: {
    display: 'grid',
    width: '100%',
    rowGap: spaceVar[2],
    gridTemplateColumns: '1fr 1fr'
  },
  label: {
    color: colorVar.fgNeutral,
    fontWeight: fontWeightVar.medium
  },
  value: {
    color: colorVar.fgNeutralFaded,
    textAlign: 'right'
  },
  track: {
    backgroundColor: colorVar.borderNeutralFaded,
    // ans: gridColumn not supported in StyleX 0.19
    overflow: 'hidden',
    borderRadius: radiusVar.full
  },
  indicator: {
    display: 'block',
    height: '100%',
    transitionProperty: 'width, height, transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out'
  }
})

export const meterSizes = stylex.create({
  xs: { fontSize: fontSizeVar.xs, height: spaceVar[1] },
  sm: { fontSize: fontSizeVar.sm, height: spaceVar['1.5'] },
  md: { fontSize: fontSizeVar.sm, height: spaceVar[2] },
  lg: { fontSize: fontSizeVar.md, height: spaceVar['2.5'] },
  xl: { fontSize: fontSizeVar.md, height: spaceVar[3] }
})

export const meterColors = stylex.create({
  primary: { backgroundColor: colorVar.bgPrimary },
  neutral: { backgroundColor: colorVar.fgNeutral },
  positive: { backgroundColor: colorVar.bgPositive },
  warning: { backgroundColor: colorVar.bgWarning },
  critical: { backgroundColor: colorVar.bgCritical }
})
