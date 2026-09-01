import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontFamilyVar, fontWeightVar, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { shadow } from '#/styles/core/shadow.stylex'
import { radius, unit, zIndex } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Base styles
// ---------------------------------------------------------------------------

export const base = stylex.create({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    isolation: 'isolate',
    flexShrink: 0,
    borderStyle: 'solid',
    borderWidth: 0,
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    boxSizing: 'border-box',
    textAlign: 'initial',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: 'normal',
    transform: {
      default: 'none',
      ':active': 'scale(0.985) translateZ(0)'
    },
    transitionProperty: 'background-color, box-shadow, border-color, color, transform, opacity',
    transitionDuration: duration.fast,
    transitionTimingFunction: easing.standard
  },
  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }
})

// ---------------------------------------------------------------------------
// Focus ring
// ---------------------------------------------------------------------------

export const focus = stylex.create({
  visible: {
    boxShadow: {
      default: 'none',
      ':focus-visible': `0 0 0 2px ${colors.backgroundPage}, 0 0 0 4px ${colors.borderPrimary}`
    }
  }
})

// ---------------------------------------------------------------------------
// Size variants
// ---------------------------------------------------------------------------

export const sizes = stylex.create({
  small: {
    paddingBlock: unit.x1,
    paddingInline: unit.x2,
    gap: unit['x1.5'],
    borderRadius: radius.small,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.medium,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    letterSpacing: 'normal',
    minHeight: '1.5rem',
    minWidth: '1.5rem'
  },
  medium: {
    paddingBlock: unit.x2,
    paddingInline: unit.x3,
    gap: unit.x2,
    borderRadius: radius.medium,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.medium,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    letterSpacing: 'normal',
    minHeight: '2.25rem',
    minWidth: '2.25rem'
  },
  large: {
    paddingBlock: unit.x3,
    paddingInline: unit.x4,
    gap: unit.x2,
    borderRadius: radius.medium,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.medium,
    fontSize: fontSize.body1,
    lineHeight: fontLineHeight.body1,
    letterSpacing: 'normal',
    minHeight: '2.75rem',
    minWidth: '2.75rem'
  },
  xlarge: {
    paddingBlock: unit.x4,
    paddingInline: unit.x5,
    gap: unit.x3,
    borderRadius: radius.medium,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.medium,
    fontSize: fontSize.featured6,
    lineHeight: fontLineHeight.featured6,
    letterSpacing: 'normal',
    minHeight: '3.25rem',
    minWidth: '3.25rem'
  }
})

// ---------------------------------------------------------------------------
// Icon-only: reduce padding to keep square shape
// ---------------------------------------------------------------------------

export const iconOnly = stylex.create({
  root: {
    paddingInline: unit.x1
  }
})

// ---------------------------------------------------------------------------
// Color variants – solid
// ---------------------------------------------------------------------------

export const solidColors = stylex.create({
  neutral: {
    backgroundColor: {
      default: colors.backgroundNeutral,
      ':hover': colors.backgroundNeutralHighlighted
    },
    color: colors.onBackgroundNeutral
  },
  primary: {
    backgroundColor: {
      default: colors.backgroundPrimary,
      ':hover': colors.backgroundPrimaryHighlighted
    },
    color: colors.onBackgroundPrimary
  },
  critical: {
    backgroundColor: {
      default: colors.backgroundCritical,
      ':hover': colors.backgroundCriticalHighlighted
    },
    color: colors.onBackgroundCritical
  },
  positive: {
    backgroundColor: {
      default: colors.backgroundPositive,
      ':hover': colors.backgroundPositiveHighlighted
    },
    color: colors.onBackgroundPositive
  },
  warning: {
    backgroundColor: {
      default: colors.backgroundWarning,
      ':hover': colors.backgroundWarningHighlighted
    },
    color: colors.onBackgroundWarning
  },
  media: {
    backgroundColor: {
      default: colors.white,
      ':hover': 'rgba(255, 255, 255, 0.88)'
    },
    color: colors.black
  },
  inherit: {
    backgroundColor: {
      default: 'currentcolor',
      ':hover': 'currentcolor'
    },
    color: 'inherit'
  }
})

// ---------------------------------------------------------------------------
// Color variants – outline
// ---------------------------------------------------------------------------

export const outlineColors = stylex.create({
  neutral: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundNeutralHighlightedFaded
    },
    color: colors.foregroundNeutral,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  primary: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundPrimaryHighlightedFaded
    },
    color: colors.foregroundPrimary,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  critical: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundCriticalHighlightedFaded
    },
    color: colors.foregroundCritical,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  positive: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundPositiveHighlightedFaded
    },
    color: colors.foregroundPositive,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  warning: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundWarningHighlightedFaded
    },
    color: colors.foregroundWarning,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  media: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': 'rgba(0, 0, 0, 0.04)'
    },
    color: colors.foregroundNeutral,
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  },
  inherit: {
    backgroundColor: {
      default: colors.backgroundElevationBase,
      ':hover': colors.backgroundNeutralHighlightedFaded
    },
    color: 'currentcolor',
    borderColor: colors.borderNeutral,
    borderWidth: '1px'
  }
})

// ---------------------------------------------------------------------------
// Color variants – ghost
// ---------------------------------------------------------------------------

export const ghostColors = stylex.create({
  neutral: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralHighlightedFaded
    },
    color: colors.foregroundNeutral
  },
  primary: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundPrimaryHighlightedFaded
    },
    color: colors.foregroundPrimary
  },
  critical: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundCriticalHighlightedFaded
    },
    color: colors.foregroundCritical
  },
  positive: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundPositiveHighlightedFaded
    },
    color: colors.foregroundPositive
  },
  warning: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundWarningHighlightedFaded
    },
    color: colors.foregroundWarning
  },
  media: {
    backgroundColor: {
      default: 'rgba(0, 0, 0, 0.28)',
      ':hover': 'rgba(0, 0, 0, 0.12)'
    },
    color: colors.white
  },
  inherit: {
    backgroundColor: {
      default: 'transparent',
      ':hover': 'rgba(0, 0, 0, 0.04)'
    },
    color: 'inherit'
  }
})

// ---------------------------------------------------------------------------
// Variant structural styles
// ---------------------------------------------------------------------------

export const variants = stylex.create({
  solid: {
    borderWidth: 0
  },
  outline: {
    borderWidth: 0
  },
  ghost: {
    borderWidth: 0,
    transitionDuration: duration.rapid
  }
})

// ---------------------------------------------------------------------------
// Disabled states per variant
// ---------------------------------------------------------------------------

export const disabledVariants = stylex.create({
  solid: {
    color: colors.foregroundDisabled,
    backgroundColor: {
      default: colors.backgroundDisabled,
      ':hover': colors.backgroundDisabled
    }
  },
  outline: {
    color: colors.foregroundDisabled,
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent'
    },
    borderColor: colors.borderDisabled
  },
  ghost: {
    color: colors.foregroundDisabled,
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent'
    }
  },
  media: {
    opacity: 0.6
  }
})

// ---------------------------------------------------------------------------
// Raised (elevated shadow)
// ---------------------------------------------------------------------------

export const raised = stylex.create({
  solid: {
    boxShadow: shadow.outline
  },
  outline: {
    boxShadow: shadow.outline
  },
  ghost: {
    boxShadow: shadow.raised
  }
})

// ---------------------------------------------------------------------------
// Rounded (circular radius)
// ---------------------------------------------------------------------------

export const rounded = stylex.create({
  root: {
    borderRadius: radius.circular
  }
})

// ---------------------------------------------------------------------------
// Full width
// ---------------------------------------------------------------------------

export const fullWidth = stylex.create({
  root: {
    width: '100%',
    textAlign: 'center'
  }
})

// ---------------------------------------------------------------------------
// Highlighted (active state)
// ---------------------------------------------------------------------------

export const highlighted = stylex.create({
  neutral: {
    zIndex: zIndex.relative,
    backgroundColor: colors.backgroundNeutralHighlighted
  },
  primary: {
    zIndex: zIndex.relative,
    backgroundColor: colors.backgroundPrimaryHighlighted
  },
  critical: {
    zIndex: zIndex.relative,
    backgroundColor: colors.backgroundCriticalHighlighted
  },
  positive: {
    zIndex: zIndex.relative,
    backgroundColor: colors.backgroundPositiveHighlighted
  },
  warning: {
    zIndex: zIndex.relative,
    backgroundColor: colors.backgroundWarningHighlighted
  }
})

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

export const loading = stylex.create({
  root: {
    cursor: 'default',
    pointerEvents: 'none'
  }
})

// Hide button content during loading
export const loadingContent = stylex.create({
  root: {
    visibility: 'hidden'
  }
})

// Loading indicator overlay
export const loadingIndicator = stylex.create({
  root: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
    pointerEvents: 'none',
    zIndex: zIndex.relative
  }
})

// ---------------------------------------------------------------------------
// Text wrapper (used when icon/endIcon are present)
// ---------------------------------------------------------------------------

export const textWrapper = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 'inherit',
    minWidth: 0
  }
})

// ---------------------------------------------------------------------------
// Icon styles
// ---------------------------------------------------------------------------

export const iconStyles = stylex.create({
  start: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '1em',
    height: '1em'
  },
  end: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '1em',
    height: '1em',
    marginInlineStart: unit['x0.5']
  }
})

// ---------------------------------------------------------------------------
// Button group
// ---------------------------------------------------------------------------

export const buttonGroup = stylex.create({
  root: {
    display: 'inline-flex',
    position: 'relative'
  },
  fullWidth: {
    display: 'flex'
  }
})

// Group item: reset border-radius on inner edges, add separator
export const buttonGroupItem = stylex.create({
  root: {
    flexShrink: 0,
    width: 'auto',
    borderRadius: 0,
    ':active': {
      transform: 'none'
    }
  },
  first: {
    borderStartStartRadius: radius.medium,
    borderEndStartRadius: radius.medium
  },
  last: {
    borderStartEndRadius: radius.medium,
    borderEndEndRadius: radius.medium
  },
  separator: {
    position: 'absolute',
    width: '1px',
    insetBlock: unit.x1,
    insetInlineStart: '-0.5px',
    borderRadius: radius.circular,
    backgroundColor: colors.borderNeutralFaded,
    pointerEvents: 'none',
    zIndex: zIndex.relative
  }
})

// ---------------------------------------------------------------------------
// Color map selector – maps variant → color styles
// ---------------------------------------------------------------------------

export const colorVariantMap = {
  solid: solidColors,
  outline: outlineColors,
  ghost: ghostColors
} as const
