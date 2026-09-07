import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { shadow } from '#/styles/core/colors.stylex'
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
  // While a drag is active the whole surface switches to the grabbing cursor.
  rootDragging: {
    cursor: 'grabbing'
  },
  item: {
    position: 'relative',
    touchAction: 'manipulation'
  },
  itemDragging: {
    opacity: 0.5,
    zIndex: zIndex.fixed
  },
  itemDisabled: {
    opacity: 0.5
  },
  overlay: {
    zIndex: zIndex.fixed
  },
  // The default handle: a grip affordance. Invisible until the item is
  // hovered so lists of items do not grow extra chrome.
  handle: {
    alignItems: 'center',
    borderRadius: radius.small,
    color: colors.foregroundNeutralFaded,
    cursor: 'grab',
    display: 'flex',
    flexShrink: 0,
    height: unit.x6,
    justifyContent: 'center',
    opacity: {
      default: 0,
      ':hover': 1,
      ':focus-visible': 1
    },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    touchAction: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'opacity, color',
    transitionTimingFunction: easing.standard,
    width: unit.x6,
    '@media (pointer: coarse)': {
      opacity: 1
    }
  },
  handleDragging: {
    color: colors.foregroundNeutral,
    cursor: 'grabbing',
    opacity: 1
  },
  handleDisabled: {
    color: colors.foregroundDisabled,
    cursor: 'not-allowed',
    opacity: 0.5
  },
  // Overlay content floats above everything and carries the raised shadow so
  // the dragged card reads as lifted off the list.
  overlayContent: {
    boxShadow: shadow.raised,
    cursor: 'grabbing',
    pointerEvents: 'none'
  }
})
