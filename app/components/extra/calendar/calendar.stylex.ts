import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { radius, unit, stroke } from '#/styles/core/tokens.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'

const cellSize = '1.75rem'

export const calendarStyles = stylex.create({
  buttonNav: {
    height: cellSize,
    opacity: {
      ':disabled': 0.5,
      default: 1
    },
    padding: 0,
    userSelect: 'none',
    width: cellSize
  },
  captionLabel: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    userSelect: 'none'
  },
  captionLabelDropdown: {
    alignItems: 'center',
    borderRadius: radius.medium,
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x1,
    pointerEvents: 'none',
    userSelect: 'none'
  },
  chevron: {
    ':dir(rtl)': {
      transform: 'scaleX(-1)'
    },
    height: '1rem',
    width: '1rem'
  },
  day: {
    aspectRatio: '1 / 1',
    borderRadius: radius.medium,
    height: '100%',
    padding: 0,
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    width: '100%'
  },
  dayBtnBase: {
    alignItems: 'center',
    aspectRatio: '1 / 1',
    backgroundColor: {
      ':hover': colors.backgroundNeutralFaded,
      default: 'transparent'
    },
    borderColor: 'transparent',
    borderRadius: radius.medium,
    borderStyle: 'none',
    borderWidth: 0,
    color: {
      ':hover': colors.foregroundNeutral,
      default: colors.foregroundNeutral
    },
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.regular,
    gap: unit.x1,
    height: '100%',
    isolation: 'isolate',
    justifyContent: 'center',
    lineHeight: 1,
    minWidth: cellSize,
    position: 'relative',
    width: '100%',
    zIndex: 10
  },
  dayBtnFocused: {
    boxShadow: `0 0 0 ${stroke.ring2} color-mix(in oklab, ${colors.borderPrimaryFaded} 50%, transparent)`,
    position: 'relative',
    zIndex: 10
  },
  dayBtnRangeEnd: {
    backgroundColor: {
      ':hover': colors.backgroundPrimary,
      default: colors.backgroundPrimary
    },
    borderBottomRightRadius: radius.medium,
    borderTopRightRadius: radius.medium,
    color: {
      ':hover': colors.onBrand,
      default: colors.onBrand
    }
  },
  dayBtnRangeMiddle: {
    backgroundColor: {
      ':hover': colors.backgroundNeutralFaded,
      default: colors.backgroundNeutralFaded
    },
    borderRadius: 0,
    color: {
      ':hover': colors.foregroundNeutral,
      default: colors.foregroundNeutral
    }
  },
  dayBtnRangeStart: {
    backgroundColor: {
      ':hover': colors.backgroundPrimary,
      default: colors.backgroundPrimary
    },
    borderBottomLeftRadius: radius.medium,
    borderTopLeftRadius: radius.medium,
    color: {
      ':hover': colors.onBrand,
      default: colors.onBrand
    }
  },
  dayBtnSelected: {
    backgroundColor: {
      ':hover': colors.backgroundPrimary,
      default: colors.backgroundPrimary
    },
    borderRadius: radius.medium,
    color: {
      ':hover': colors.onBrand,
      default: colors.onBrand
    }
  },
  disabled: {
    color: colors.foregroundNeutralFaded,
    opacity: 0.5
  },
  dropdown: {
    cursor: 'pointer',
    height: '100%',
    inset: 0,
    opacity: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 10
  },
  dropdownRoot: {
    alignItems: 'center',
    borderRadius: radius.medium,
    display: 'inline-flex',
    position: 'relative'
  },
  dropdowns: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x1_5,
    height: cellSize,
    justifyContent: 'center',
    width: '100%'
  },
  hidden: {
    visibility: 'hidden'
  },
  month: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x4,
    width: '100%'
  },
  monthCaption: {
    alignItems: 'center',
    display: 'flex',
    height: cellSize,
    justifyContent: 'center',
    paddingInline: 0,
    width: '100%'
  },
  monthGrid: {
    borderCollapse: 'collapse',
    width: '100%'
  },
  months: {
    display: 'flex',
    flexDirection: {
      '@media (min-width: 768px)': 'row',
      default: 'column'
    },
    gap: unit.x4,
    position: 'relative'
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
    zIndex: 1
  },
  outside: {
    color: colors.foregroundNeutralFaded
  },
  rangeEnd: {
    '::after': {
      backgroundColor: colors.backgroundNeutralFaded,
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '1rem'
    },
    backgroundColor: colors.backgroundNeutralFaded,
    borderBottomRightRadius: radius.medium,
    borderTopRightRadius: radius.medium,
    isolation: 'isolate',
    position: 'relative',
    zIndex: 0
  },
  rangeMiddle: {
    borderRadius: 0
  },
  rangeStart: {
    '::after': {
      backgroundColor: colors.backgroundNeutralFaded,
      bottom: 0,
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '1rem'
    },
    backgroundColor: colors.backgroundNeutralFaded,
    borderBottomLeftRadius: radius.medium,
    borderTopLeftRadius: radius.medium,
    isolation: 'isolate',
    position: 'relative',
    zIndex: 0
  },
  root: {
    backgroundColor: colors.backgroundPage,
    padding: unit.x2,
    position: 'relative'
  },
  today: {
    backgroundColor: colors.backgroundNeutralFaded,
    borderRadius: radius.medium,
    color: colors.foregroundNeutral
  },
  week: {
    display: 'flex',
    marginTop: unit.x2,
    width: '100%'
  },
  weekNumber: {
    color: colors.foregroundNeutralFaded,
    fontSize: '0.8rem',
    userSelect: 'none'
  },
  weekNumberCell: {
    alignItems: 'center',
    display: 'flex',
    height: cellSize,
    justifyContent: 'center',
    textAlign: 'center',
    width: cellSize
  },
  weekNumberHeader: {
    userSelect: 'none',
    width: cellSize
  },
  weekday: {
    borderRadius: radius.medium,
    color: colors.foregroundNeutralFaded,
    flex: 1,
    fontSize: '0.8rem',
    fontWeight: fontWeight.regular,
    textAlign: 'center',
    userSelect: 'none'
  },
  weekdays: {
    display: 'flex'
  }
})
