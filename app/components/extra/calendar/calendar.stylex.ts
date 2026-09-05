import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { stroke, unit, radius, zIndex } from '#/styles/core/tokens.stylex'

export const calendarStyles = stylex.create({
  root: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    padding: unit.x2,
    position: 'relative',
    width: 'fit-content'
  },
  months: {
    display: 'flex',
    flexDirection: { default: 'column', '@media (min-width: 660px)': 'row' },
    gap: unit.x4
  },
  month: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3,
    width: '100%'
  },
  monthCaption: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x8,
    justifyContent: 'center',
    width: '100%'
  },
  captionLabel: {
    color: colors.foregroundNeutral,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    userSelect: 'none'
  },
  captionLabelDropdown: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x1,
    pointerEvents: 'none',
    userSelect: 'none'
  },
  nav: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1,
    insetInline: 0,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: zIndex.relative
  },
  chevron: {
    height: unit.x4,
    width: unit.x4
  },
  monthGrid: {
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: '100%'
  },
  weekday: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.regular,
    height: unit.x8,
    textAlign: 'center',
    userSelect: 'none',
    verticalAlign: 'middle'
  },
  day: {
    padding: 0,
    position: 'relative',
    textAlign: 'center'
  },
  hidden: {
    visibility: 'hidden'
  },
  weekNumber: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.regular,
    textAlign: 'center',
    userSelect: 'none'
  },
  weekNumberHeader: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.regular,
    textAlign: 'center',
    userSelect: 'none'
  },
  dropdowns: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1,
    height: unit.x8,
    justifyContent: 'center',
    width: '100%'
  },
  dropdownRoot: {
    alignItems: 'center',
    borderRadius: radius.medium,
    display: 'inline-flex',
    position: 'relative'
  },
  dropdown: {
    cursor: 'pointer',
    height: '100%',
    inset: 0,
    opacity: 0,
    position: 'absolute',
    width: '100%'
  }
})

export const calendarDayButtonStyles = stylex.create({
  base: {
    alignItems: 'center',
    aspectRatio: '1 / 1',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.backgroundNeutralFaded
    },
    borderRadius: radius.medium,
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.regular,
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    position: 'relative',
    userSelect: 'none',
    width: '100%'
  },
  today: {
    color: colors.foregroundPrimary,
    fontWeight: fontWeight.medium
  },
  focused: {
    boxShadow: `0 0 0 ${stroke.ring3} color-mix(in srgb, ${colors.foregroundPrimary} 50%, transparent)`
  },
  selected: {
    backgroundColor: {
      default: colors.backgroundPrimary,
      ':hover:not(:disabled)': `color-mix(in srgb, ${colors.backgroundPrimary} 90%, transparent)`
    },
    color: colors.onBrand
  },
  outside: {
    color: colors.foregroundNeutralFaded
  }
})
