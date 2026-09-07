import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { duration, easing, radius, unit, zIndex } from '#/styles/core/tokens.stylex'

/**
 * Styles for the Sortable primitive set (dnd-kit based).
 *
 * Layout of the list/grid itself stays a caller concern (pass a `style` prop
 * to `Sortable`); these styles cover drag states, the drag overlay, and the
 * default handle affordance.
 */
export const sortableStyles = stylex.create({
  root: {
    touchAction: 'manipulation'
  },
  rootDragging: {
    cursor: 'grabbing',
    userSelect: 'none'
  },
  item: {
    position: 'relative',
    touchAction: 'manipulation',
    transitionDuration: duration.medium,
    transitionProperty: 'opacity, transform, background-color, border-color, box-shadow',
    transitionTimingFunction: easing.decelerate
  },
  itemFaded: {
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-dragging="true"]')]: 0.4
    }
  },
  itemDragging: {
    opacity: 1,
    zIndex: zIndex.absolute
  },
  itemOver: {
    backgroundColor: colors.backgroundPrimaryFaded,
    borderColor: colors.borderPrimary,
    transform: 'scale(1.01)'
  },
  itemDisabled: {
    opacity: 0.5
  },
  handle: {
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
    opacity: {
      default: 0.8,
      ':hover': 1,
      ':active': 1,
      '@media (pointer: coarse)': 1
    },
    outline: 'none',
    touchAction: 'none',
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
    }
  },
  handleDragging: {
    color: colors.foregroundPrimary,
    cursor: 'grabbing',
    opacity: 1,
    transform: 'scale(1.1)'
  },
  handleHiddenDuringDrag: {
    opacity: {
      default: 0,
      ':hover': 0,
      ':focus-visible': 0,
      ':active': 0,
      '@media (pointer: coarse)': 0
    },
    transform: 'scale(0.8)'
  },
  handleDisabled: {
    color: colors.foregroundDisabled,
    cursor: 'not-allowed',
    opacity: 0.5,
    transform: 'scale(1)'
  },
  overlayContent: {
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    opacity: 0.85,
    minWidth: 0,
    pointerEvents: 'none',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': '0ms'
    },
    transitionProperty: 'transform, box-shadow',
    transitionTimingFunction: easing.decelerate,
    transform: 'scale(1.02)'
  }
})
