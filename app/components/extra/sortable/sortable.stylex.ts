import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { duration, easing, radius, stroke, unit, zIndex } from '#/styles/core/tokens.stylex'

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
    transitionDuration: duration.fast,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.standard
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
    borderColor: colors.borderPrimary
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
      ':active': colors.foregroundPrimary,
      ':focus-visible': colors.foregroundPrimary
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
      default: 0.6,
      ':hover': 1,
      ':focus-visible': 1,
      ':active': 1,
      '@media (pointer: coarse)': 1
    },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    touchAction: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'color, opacity',
    transitionTimingFunction: easing.standard,
    width: unit.x6
  },
  handleDragging: {
    color: colors.foregroundPrimary,
    cursor: 'grabbing',
    opacity: 1
  },
  handleHiddenDuringDrag: {
    opacity: {
      default: 0,
      ':hover': 0,
      ':focus-visible': 0,
      ':active': 0,
      '@media (pointer: coarse)': 0
    }
  },
  handleDisabled: {
    color: colors.foregroundDisabled,
    cursor: 'not-allowed',
    opacity: 0.5
  },
  overlayContent: {
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    minWidth: 0,
    pointerEvents: 'none',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': '0ms'
    },
    transitionProperty: 'transform',
    transitionTimingFunction: easing.standard
  }
})
