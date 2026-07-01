import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, shadowVar } from '#/styles/tokens.stylex'

export const sliderStyles = stylex.create({
  root: {},
  control: {
    display: 'flex',
    // ans: touchAction not supported in StyleX 0.19
    alignItems: 'center',
    userSelect: 'none'
  },
  track: {
    backgroundColor: colorVar.borderNeutralFaded,
    width: '100%',
    borderRadius: radiusVar.full,
    height: spaceVar['1.5'],
    '[data-orientation=vertical]': {
      height: '100%',
      width: spaceVar['1.5']
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5
    }
  },
  indicator: {
    backgroundColor: colorVar.bgPrimary,
    borderRadius: radiusVar.full
  },
  thumb: {
    backgroundColor: colorVar.bgPage,
    borderRadius: radiusVar.full,
    width: spaceVar[4],
    height: spaceVar[4],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderPrimaryFaded,
    boxShadow: shadowVar.raised,
    ':focus-visible': {
      outlineColor: colorVar.bgPrimary,
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid'
    },
    '[data-disabled]': {
      cursor: 'not-allowed'
    }
  }
})

export const sliderSizes = stylex.create({
  sm: { paddingTop: spaceVar[2], paddingBottom: spaceVar[2] },
  md: { paddingTop: spaceVar[3], paddingBottom: spaceVar[3] },
  lg: { paddingTop: spaceVar[4], paddingBottom: spaceVar[4] }
})
