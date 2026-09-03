import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { shadow } from '#/styles/core/shadow.stylex'
import { radius, unit, zIndex } from '#/styles/core/size.stylex'

export const cardStyles = {
  // -------------------------------------------------------------------------
  // Root surface
  // -------------------------------------------------------------------------

  root: stylex.create({
    base: {
      display: 'block',
      position: 'relative',
      boxSizing: 'border-box',
      textAlign: 'initial',
      color: colors.foregroundNeutral,
      backgroundColor: colors.backgroundElevationBase,
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: colors.borderNeutralFaded,
      textDecoration: 'none',
      boxShadow: {
        default: shadow.outline,
        ':focus-visible': `0 0 0 2px ${colors.backgroundPage}, 0 0 0 4px ${colors.borderPrimary}`
      }
    },
    actionable: {
      cursor: 'pointer',
      outline: 'none',
      backgroundColor: {
        default: colors.backgroundElevationBase,
        ':hover': colors.backgroundNeutralFaded
      }
    },
    actionableSelected: {
      cursor: 'pointer',
      outline: 'none'
    },
    raised: {
      backgroundColor: colors.backgroundElevationRaised,
      boxShadow: { default: shadow.raised }
    }
  }),

  // -------------------------------------------------------------------------
  // Border radius variants
  // -------------------------------------------------------------------------

  radii: stylex.create({
    none: { borderRadius: radius.none },
    small: { borderRadius: radius.small },
    medium: { borderRadius: radius.medium },
    large: { borderRadius: radius.large }
  }),

  // -------------------------------------------------------------------------
  // Padding scale
  // -------------------------------------------------------------------------

  paddings: stylex.create({
    0: { padding: '0' },
    1: { padding: unit.x1 },
    2: { padding: unit.x2 },
    3: { padding: unit.x3 },
    4: { padding: unit.x4 },
    5: { padding: unit.x5 },
    6: { padding: unit.x6 },
    7: { padding: unit.x7 },
    8: { padding: unit.x8 }
  }),

  // -------------------------------------------------------------------------
  // Bleed (negative margin) scale
  // -------------------------------------------------------------------------

  bleeds: stylex.create({
    1: { marginBlock: '-4px', marginInline: '-4px' },
    2: { marginBlock: '-8px', marginInline: '-8px' },
    3: { marginBlock: '-12px', marginInline: '-12px' },
    4: { marginBlock: '-16px', marginInline: '-16px' },
    5: { marginBlock: '-20px', marginInline: '-20px' },
    6: { marginBlock: '-24px', marginInline: '-24px' },
    7: { marginBlock: '-28px', marginInline: '-28px' },
    8: { marginBlock: '-32px', marginInline: '-32px' }
  }),

  // -------------------------------------------------------------------------
  // Height scale
  // -------------------------------------------------------------------------

  heights: stylex.create({
    1: { height: unit.x1 },
    2: { height: unit.x2 },
    3: { height: unit.x3 },
    4: { height: unit.x4 },
    5: { height: unit.x5 },
    6: { height: unit.x6 },
    7: { height: unit.x7 },
    8: { height: unit.x8 },
    full: { height: '100%' }
  }),

  // -------------------------------------------------------------------------
  // Flex layout
  // -------------------------------------------------------------------------

  directions: stylex.create({
    row: { flexDirection: 'row' },
    column: { flexDirection: 'column' }
  }),

  gaps: stylex.create({
    1: { gap: unit.x1 },
    2: { gap: unit.x2 },
    3: { gap: unit.x3 },
    4: { gap: unit.x4 },
    5: { gap: unit.x5 },
    6: { gap: unit.x6 },
    7: { gap: unit.x7 },
    8: { gap: unit.x8 }
  }),

  alignments: stylex.create({
    start: { alignItems: 'flex-start' },
    center: { alignItems: 'center' },
    end: { alignItems: 'flex-end' },
    stretch: { alignItems: 'stretch' },
    baseline: { alignItems: 'baseline' }
  }),

  justifications: stylex.create({
    start: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    end: { justifyContent: 'flex-end' },
    'space-between': { justifyContent: 'space-between' },
    'space-around': { justifyContent: 'space-around' },
    'space-evenly': { justifyContent: 'space-evenly' }
  }),

  // -------------------------------------------------------------------------
  // Content wrapper
  // -------------------------------------------------------------------------

  content: stylex.create({
    root: {
      display: 'block',
      height: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      borderRadius: 'inherit'
    },
    flex: {
      display: 'flex'
    }
  }),

  // -------------------------------------------------------------------------
  // Overlays (selected ring / hover tint) – real elements instead of pseudo
  // -------------------------------------------------------------------------

  overlay: stylex.create({
    ring: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      boxShadow: `0 0 0 2px ${colors.borderPrimary} inset`,
      pointerEvents: 'none',
      zIndex: zIndex.relative
    },
    hover: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: colors.backgroundNeutralFaded,
      opacity: {
        default: 0,
        ':hover': 1
      },
      transitionProperty: 'opacity',
      transitionDuration: duration.fast,
      transitionTimingFunction: easing.standard,
      pointerEvents: 'none',
      zIndex: zIndex.relative
    }
  })
}
