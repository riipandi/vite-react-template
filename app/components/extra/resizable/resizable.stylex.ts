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
      ':active': colors.foregroundPrimary
    },
    cursor: 'col-resize',
    display: 'flex',
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color',
    userSelect: 'none',
    width: stroke.ring1
  },
  handleVerticalGroup: {
    cursor: 'row-resize',
    height: stroke.ring1,
    width: '100%'
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
      [stylex.when.ancestor(':active')]: colors.foregroundPrimary
    },
    borderRadius: radius.full,
    flexShrink: 0,
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, height, width, transform',
    transitionTimingFunction: easing.standard,
    zIndex: zIndex.relative
  },
  // ReUI c5 — animated pill indicator.
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
  // ReUI c6 — pill with spring scale on drag.
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
  // ReUI c7 — large capsule expansion on drag.
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
