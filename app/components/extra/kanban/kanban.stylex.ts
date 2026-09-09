import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { easing, stroke, unit, zIndex } from '#/styles/core/tokens.stylex'
import { container, duration, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

/**
 * Styles for the Kanban primitive set (dnd-kit based).
 *
 * Mirrors `sortable.stylex.ts` for shared drag affordances (handles, drop
 * feedback, overlay) so both primitives feel identical.
 *
 * The `defaultMarker` lives ONLY on `KanbanColumn` (and its handle) so the
 * handle's `when.ancestor(':hover')` reveal fires per column — hovering
 * another column or the board gaps must not reveal handles.
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
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
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
    maxWidth: container.xxlarge,
    minWidth: container.small,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    paddingBlock: unit.x3,
    paddingInline: unit.x3,
    touchAction: 'manipulation',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': '0ms'
    },
    transitionProperty: 'background-color, border-color, box-shadow, transform, opacity',
    transitionTimingFunction: easing.decelerate,
    '@media (max-width: 659px)': {
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
  columnOver: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
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
    outline: 'none',
    padding: unit.x1,
    touchAction: 'none',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': '0ms'
    },
    transitionProperty: 'color, opacity',
    transitionTimingFunction: easing.decelerate,
    width: unit.x6,
    '@media (max-width: 659px)': {
      height: unit.x7,
      width: unit.x7
    }
  },
  columnHandleVisible: {
    opacity: {
      default: 0,
      [stylex.when.ancestor(':hover')]: 1,
      ':hover': 1,
      ':focus-visible': 1,
      ':active': 1,
      '@media (pointer: coarse)': 1
    }
  },
  columnHandleGrab: {
    cursor: 'grab'
  },
  columnHandleDragging: {
    color: colors.foregroundPrimary,
    cursor: 'grabbing',
    opacity: 1
  },
  columnHandleHiddenDuringDrag: {
    opacity: 0
  },
  columnHandleDisabled: {
    color: colors.foregroundDisabled,
    cursor: 'not-allowed',
    opacity: 0.5
  },
  columnContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: unit.x2,
    minHeight: unit.x12,
    overflowY: 'auto',
    '@media (max-width: 659px)': {
      gap: unit.x1
    }
  },
  item: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
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
    touchAction: 'manipulation',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': '0ms'
    },
    transitionProperty: 'background-color, border-color, box-shadow, transform, opacity',
    transitionTimingFunction: easing.decelerate,
    ':hover': {
      backgroundColor: colors.backgroundNeutralHighlightedFaded,
      borderColor: colors.borderNeutral,
      boxShadow: shadow.outline
    },
    ':active': {
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
  itemOver: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  itemDisabled: {
    opacity: 0.5
  },
  overlayContent: {
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    opacity: 0.85,
    pointerEvents: 'none'
  }
})
