import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { duration, easing, radius, stroke, unit, zIndex } from '#/styles/core/tokens.stylex'

/**
 * Naming follows the group's `orientation` prop (the panel flow direction).
 * The separator bar itself is always perpendicular to that flow:
 * - horizontal group (panels side by side) → vertical bar, cursor `col-resize`
 * - vertical group (panels stacked) → horizontal bar, cursor `row-resize`
 * This mirrors the separator's `aria-orientation`, which the library reports
 * as the bar's own orientation (the inverse of the group's `orientation`).
 */
export const resizableStyles = stylex.create({
  group: {
    height: '100%',
    width: '100%'
  },
  handle: {
    alignItems: 'center',
    backgroundColor: {
      default: colors.borderNeutral,
      ':hover': colors.foregroundNeutralFaded,
      ':active': colors.foregroundPrimary,
      ':focus-visible': colors.foregroundPrimary
    },
    borderRadius: radius.full,
    boxShadow: {
      default: 'none',
      ':focus-visible': `0 0 0 ${stroke.ring3} color-mix(in srgb, ${colors.foregroundPrimary} 50%, transparent)`
    },
    cursor: 'col-resize',
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, box-shadow',
    transitionTimingFunction: easing.decelerate,
    userSelect: 'none',
    width: stroke.ring1
  },
  handleVerticalGroup: {
    cursor: 'row-resize',
    height: stroke.ring1,
    width: '100%'
  },
  handleHitArea: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: zIndex.relative
  },
  handleHitAreaHorizontalGroup: {
    bottom: 0,
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    width: unit.x2
  },
  handleHitAreaVerticalGroup: {
    height: unit.x2,
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  handleCapsule: {
    backgroundColor: {
      ':active': `color-mix(in srgb, ${colors.backgroundPrimary} 20%, transparent)`
    },
    transitionDuration: duration.medium
  },
  handleIndicator: {
    backgroundColor: {
      default: colors.borderNeutral,
      [stylex.when.ancestor(':hover')]: colors.foregroundNeutralFaded,
      [stylex.when.ancestor(':active')]: colors.foregroundPrimary,
      [stylex.when.ancestor(':focus-visible')]: colors.foregroundPrimary
    },
    borderRadius: radius.full,
    flexShrink: 0,
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, height, width, transform',
    transitionTimingFunction: easing.standard,
    zIndex: zIndex.relative
  },
  pillHorizontalGroup: {
    height: {
      default: unit.x6,
      [stylex.when.ancestor(':hover')]: unit.x8,
      [stylex.when.ancestor(':active')]: unit.x12
    },
    width: {
      default: unit.x1,
      [stylex.when.ancestor(':active')]: unit.x1_5
    }
  },
  pillVerticalGroup: {
    height: {
      default: unit.x1,
      [stylex.when.ancestor(':active')]: unit.x1_5
    },
    width: {
      default: unit.x6,
      [stylex.when.ancestor(':hover')]: unit.x8,
      [stylex.when.ancestor(':active')]: unit.x12
    }
  },
  springHorizontalGroup: {
    height: {
      default: unit.x8,
      [stylex.when.ancestor(':active')]: unit.x14
    },
    transform: {
      default: 'scaleY(0.75)',
      [stylex.when.ancestor(':hover')]: 'scaleY(1)',
      [stylex.when.ancestor(':active')]: 'scaleY(1)'
    },
    width: {
      default: unit.x1,
      [stylex.when.ancestor(':active')]: unit.x1_5
    }
  },
  springVerticalGroup: {
    height: {
      default: unit.x1,
      [stylex.when.ancestor(':active')]: unit.x1_5
    },
    transform: {
      default: 'scaleX(0.75)',
      [stylex.when.ancestor(':hover')]: 'scaleX(1)',
      [stylex.when.ancestor(':active')]: 'scaleX(1)'
    },
    width: {
      default: unit.x8,
      [stylex.when.ancestor(':active')]: unit.x14
    }
  },
  capsuleHorizontalGroup: {
    height: {
      default: unit.x6,
      [stylex.when.ancestor(':hover')]: unit.x10,
      [stylex.when.ancestor(':active')]: unit.x20
    },
    width: {
      default: unit.x1,
      [stylex.when.ancestor(':hover')]: unit.x1_5
    }
  },
  capsuleVerticalGroup: {
    height: {
      default: unit.x1,
      [stylex.when.ancestor(':hover')]: unit.x1_5
    },
    width: {
      default: unit.x6,
      [stylex.when.ancestor(':hover')]: unit.x10,
      [stylex.when.ancestor(':active')]: unit.x20
    }
  }
})
