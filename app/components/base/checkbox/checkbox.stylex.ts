import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontFamilyVar, fontSize, fontLineHeight, fontWeightVar } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { shadow } from '#/styles/core/shadow.stylex'
import { radius, unit } from '#/styles/core/size.stylex'

export const checkboxStyles = {
  // -------------------------------------------------------------------------
  // Root label wrapper
  // -------------------------------------------------------------------------

  root: stylex.create({
    label: {
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      cursor: 'pointer',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent'
    },
    labelDisabled: {
      cursor: 'not-allowed',
      color: colors.foregroundDisabled
    }
  }),

  // -------------------------------------------------------------------------
  // Size variants – box dimensions
  // -------------------------------------------------------------------------

  sizes: stylex.create({
    small: {
      width: fontLineHeight.caption1,
      height: fontLineHeight.caption1
    },
    medium: {
      width: fontLineHeight.body2,
      height: fontLineHeight.body2
    },
    large: {
      width: fontLineHeight.body1,
      height: fontLineHeight.body1
    }
  }),

  // -------------------------------------------------------------------------
  // Size variants – label gap
  // -------------------------------------------------------------------------

  gaps: stylex.create({
    small: {
      gap: unit['x1.5']
    },
    medium: {
      gap: unit.x2
    },
    large: {
      gap: unit.x2
    }
  }),

  // -------------------------------------------------------------------------
  // Checkbox box (Base UI Root)
  // -------------------------------------------------------------------------

  field: stylex.create({
    box: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxSizing: 'border-box',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: colors.borderNeutral,
      borderRadius: radius.small,
      backgroundColor: {
        default: colors.backgroundElevationBase,
        ':hover': colors.backgroundNeutralFaded
      },
      color: colors.onBackgroundPrimary,
      outline: 'none',
      boxShadow: {
        default: shadow.outline,
        ':focus-visible': `0 0 0 2px ${colors.backgroundPage}, 0 0 0 4px ${colors.borderPrimary}`
      },
      transitionProperty: 'background-color, border-color, box-shadow',
      transitionDuration: duration.fast,
      transitionTimingFunction: easing.standard
    },
    checked: {
      borderColor: {
        default: 'transparent',
        ':hover': 'transparent'
      },
      backgroundColor: {
        default: colors.backgroundPrimary,
        ':hover': colors.backgroundPrimary
      }
    },
    error: {
      borderColor: colors.borderCritical,
      borderWidth: '2px'
    },
    disabled: {
      backgroundColor: {
        default: colors.backgroundDisabledFaded,
        ':hover': colors.backgroundDisabledFaded
      },
      borderColor: {
        default: colors.borderDisabled,
        ':hover': colors.borderDisabled
      }
    },
    disabledChecked: {
      borderColor: {
        default: 'transparent',
        ':hover': 'transparent'
      },
      backgroundColor: {
        default: colors.backgroundDisabled,
        ':hover': colors.backgroundDisabled
      }
    }
  }),

  // -------------------------------------------------------------------------
  // Indicator (check / indeterminate marks)
  // -------------------------------------------------------------------------

  indicator: stylex.create({
    root: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: colors.onBackgroundPrimary,
      opacity: 0,
      transform: 'scale(0)',
      transitionProperty: 'opacity, transform',
      transitionDuration: duration.fast,
      transitionTimingFunction: easing.decelerate
    },
    visible: {
      opacity: 1,
      transform: 'scale(1)'
    },
    disabled: {
      color: colors.foregroundDisabled
    }
  }),

  dash: stylex.create({
    root: {
      width: '50%',
      height: '1.5px',
      borderRadius: radius.circular,
      backgroundColor: 'currentcolor'
    }
  }),

  icon: stylex.create({
    root: {
      width: '60%',
      height: '60%'
    }
  }),

  // -------------------------------------------------------------------------
  // Label text styles per size
  // -------------------------------------------------------------------------

  labelText: stylex.create({
    small: {
      fontFamily: fontFamilyVar.body,
      fontWeight: fontWeightVar.regular,
      fontSize: fontSize.caption1,
      lineHeight: fontLineHeight.caption1
    },
    medium: {
      fontFamily: fontFamilyVar.body,
      fontWeight: fontWeightVar.regular,
      fontSize: fontSize.body2,
      lineHeight: fontLineHeight.body2
    },
    large: {
      fontFamily: fontFamilyVar.body,
      fontWeight: fontWeightVar.regular,
      fontSize: fontSize.body1,
      lineHeight: fontLineHeight.body1
    }
  })
}
