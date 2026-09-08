import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { easing, stroke, unit, zIndex } from '#/styles/core/tokens.stylex'
import { container, duration, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

/**
 * Styles for the Kanban primitive set (dnd-kit based).
 */
export const kanbanStyles = stylex.create({
  root: {
    touchAction: 'manipulation'
  },
  rootDragging: {
    cursor: 'grabbing',
    userSelect: 'none'
  },
  board: {
    display: 'grid',
    gap: unit.x4,
    gridAutoColumns: 'minmax(0, 1fr)',
    gridAutoFlow: 'column',
    '@media (max-width: 659px)': {
      gridAutoFlow: 'row',
      gridTemplateColumns: '1fr'
    }
  },
  column: {
    backgroundColor: colors.backgroundElevationBase,
    borderRadius: radius.large,
    borderColor: colors.borderNeutralFaded,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxShadow: shadow.outline,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x2,
    lineHeight: fontLineHeight.body2,
    maxWidth: container.xlarge,
    minWidth: container.small,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    paddingBlock: unit.x3,
    paddingInline: unit.x3,
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, border-color, box-shadow, transform, opacity',
    transitionTimingFunction: easing.decelerate,
    transform: 'translateY(0)',
    '@media (max-width: 659px)': {
      fontSize: fontSize.body2,
      maxWidth: '100%',
      minWidth: 0,
      paddingBlock: unit.x2,
      paddingInline: unit.x2
    }
  },
  columnDragging: {
    opacity: 0.5,
    zIndex: zIndex.absolute
  },
  columnDisabled: {
    opacity: 0.5
  },
  columnHandle: {
    alignItems: 'center',
    borderRadius: radius.small,
    color: {
      default: colors.foregroundNeutral,
      ':hover': colors.foregroundPrimary,
      ':active': colors.foregroundPrimary
    },
    cursor: {
      default: 'grab',
      ':active': 'grabbing'
    },
    display: 'flex',
    flexShrink: 0,
    height: unit.x6,
    justifyContent: 'center',
    opacity: 0,
    outline: 'none',
    padding: unit.x1,
    transitionDuration: duration.medium,
    transitionProperty: 'color, opacity, transform',
    transitionTimingFunction: easing.decelerate,
    width: unit.x6,
    transform: 'scale(1)',
    ':hover': {
      opacity: 1,
      transform: 'scale(1.05)'
    },
    ':active': {
      transform: 'scale(0.95)'
    },
    '@media (max-width: 659px)': {
      height: unit.x7,
      width: unit.x7
    }
  },
  columnHandleGrab: {
    cursor: 'grab'
  },
  columnHandleDragging: {
    cursor: 'grabbing'
  },
  item: {
    backgroundColor: colors.backgroundPage,
    borderRadius: radius.medium,
    borderColor: colors.borderNeutralFaded,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    paddingBlock: unit.x3,
    paddingInline: unit.x3,
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, border-color, box-shadow, transform, opacity',
    transitionTimingFunction: easing.decelerate,
    transform: 'translateY(0)',
    ':hover': {
      backgroundColor: colors.backgroundNeutralHighlightedFaded,
      borderColor: colors.borderNeutral,
      boxShadow: shadow.outline,
      transform: 'translateY(-1px)'
    },
    ':active': {
      transform: 'translateY(0)',
      backgroundColor: colors.backgroundNeutralFaded
    },
    '@media (max-width: 659px)': {
      paddingBlock: unit.x2,
      paddingInline: unit.x2
    }
  },
  itemDragging: {
    opacity: 0.5,
    zIndex: zIndex.absolute
  },
  itemDisabled: {
    opacity: 0.5
  },
  itemHandle: {
    alignItems: 'center',
    borderRadius: radius.small,
    color: {
      default: colors.foregroundNeutral,
      ':hover': colors.foregroundPrimary,
      ':active': colors.foregroundPrimary
    },
    cursor: {
      default: 'grab',
      ':active': 'grabbing'
    },
    display: 'flex',
    flexShrink: 0,
    height: unit.x6,
    justifyContent: 'center',
    outline: 'none',
    padding: unit.x1,
    transitionDuration: duration.medium,
    transitionProperty: 'color, opacity, transform',
    transitionTimingFunction: easing.decelerate,
    width: unit.x6,
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.05)'
    },
    ':active': {
      transform: 'scale(0.95)'
    },
    '@media (max-width: 659px)': {
      height: unit.x7,
      width: unit.x7
    }
  },
  itemHandleGrab: {
    cursor: 'grab'
  },
  itemHandleDragging: {
    cursor: 'grabbing'
  },
  columnContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: unit.x2,
    minHeight: 0,
    overflowY: 'auto',
    '@media (max-width: 659px)': {
      gap: unit.x1
    }
  },
  overlayContent: {
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    opacity: 0.85,
    pointerEvents: 'none',
    transitionDuration: duration.medium,
    transitionProperty: 'transform, box-shadow',
    transitionTimingFunction: easing.decelerate,
    transform: 'scale(1.02)',
    '@media (max-width: 659px)': {
      opacity: 0.9,
      transform: 'scale(1.01)'
    }
  }
})
