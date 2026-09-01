import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { shadow } from '#/styles/core/shadow.stylex'
import { radius, unit, zIndex } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Gap
// ---------------------------------------------------------------------------

const gap = stylex.create({
  '0': { gap: 0 },
  '0.5': { gap: unit['x0.5'] },
  '1': { gap: unit.x1 },
  '1.5': { gap: unit['x1.5'] },
  '2': { gap: unit.x2 },
  '3': { gap: unit.x3 },
  '4': { gap: unit.x4 },
  '5': { gap: unit.x5 },
  '6': { gap: unit.x6 },
  '8': { gap: unit.x8 },
  '10': { gap: unit.x10 },
  '12': { gap: unit.x12 },
  '16': { gap: unit.x16 },
  '20': { gap: unit.x20 }
})

// ---------------------------------------------------------------------------
// Direction
// ---------------------------------------------------------------------------

const direction = stylex.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' }
})

// ---------------------------------------------------------------------------
// Align
// ---------------------------------------------------------------------------

const align = stylex.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' }
})

// ---------------------------------------------------------------------------
// Justify
// ---------------------------------------------------------------------------

const justify = stylex.create({
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' }
})

// ---------------------------------------------------------------------------
// Wrap
// ---------------------------------------------------------------------------

const wrap = stylex.create({
  wrap: { flexWrap: 'wrap' },
  nowrap: { flexWrap: 'nowrap' }
})

// ---------------------------------------------------------------------------
// Padding
// ---------------------------------------------------------------------------

const padding = stylex.create({
  '0': { padding: 0 },
  '0.5': { paddingBlock: unit['x0.5'], paddingInline: unit['x0.5'] },
  '1': { paddingBlock: unit.x1, paddingInline: unit.x1 },
  '1.5': { paddingBlock: unit['x1.5'], paddingInline: unit['x1.5'] },
  '2': { paddingBlock: unit.x2, paddingInline: unit.x2 },
  '3': { paddingBlock: unit.x3, paddingInline: unit.x3 },
  '4': { paddingBlock: unit.x4, paddingInline: unit.x4 },
  '5': { paddingBlock: unit.x5, paddingInline: unit.x5 },
  '6': { paddingBlock: unit.x6, paddingInline: unit.x6 },
  '8': { paddingBlock: unit.x8, paddingInline: unit.x8 },
  '10': { paddingBlock: unit.x10, paddingInline: unit.x10 },
  '12': { paddingBlock: unit.x12, paddingInline: unit.x12 },
  '16': { paddingBlock: unit.x16, paddingInline: unit.x16 }
})

// ---------------------------------------------------------------------------
// Individual padding
// ---------------------------------------------------------------------------

const paddingTop = stylex.create({
  '0': { paddingTop: 0 },
  '1': { paddingTop: unit.x1 },
  '2': { paddingTop: unit.x2 },
  '3': { paddingTop: unit.x3 },
  '4': { paddingTop: unit.x4 },
  '6': { paddingTop: unit.x6 },
  '8': { paddingTop: unit.x8 },
  '10': { paddingTop: unit.x10 },
  '12': { paddingTop: unit.x12 },
  '16': { paddingTop: unit.x16 }
})

const paddingBottom = stylex.create({
  '0': { paddingBottom: 0 },
  '1': { paddingBottom: unit.x1 },
  '2': { paddingBottom: unit.x2 },
  '3': { paddingBottom: unit.x3 },
  '4': { paddingBottom: unit.x4 },
  '6': { paddingBottom: unit.x6 },
  '8': { paddingBottom: unit.x8 },
  '10': { paddingBottom: unit.x10 },
  '12': { paddingBottom: unit.x12 },
  '16': { paddingBottom: unit.x16 }
})

const paddingStart = stylex.create({
  '0': { paddingInlineStart: 0 },
  '1': { paddingInlineStart: unit.x1 },
  '2': { paddingInlineStart: unit.x2 },
  '3': { paddingInlineStart: unit.x3 },
  '4': { paddingInlineStart: unit.x4 },
  '6': { paddingInlineStart: unit.x6 },
  '8': { paddingInlineStart: unit.x8 },
  '10': { paddingInlineStart: unit.x10 },
  '12': { paddingInlineStart: unit.x12 },
  '16': { paddingInlineStart: unit.x16 }
})

const paddingEnd = stylex.create({
  '0': { paddingInlineEnd: 0 },
  '1': { paddingInlineEnd: unit.x1 },
  '2': { paddingInlineEnd: unit.x2 },
  '3': { paddingInlineEnd: unit.x3 },
  '4': { paddingInlineEnd: unit.x4 },
  '6': { paddingInlineEnd: unit.x6 },
  '8': { paddingInlineEnd: unit.x8 },
  '10': { paddingInlineEnd: unit.x10 },
  '12': { paddingInlineEnd: unit.x12 },
  '16': { paddingInlineEnd: unit.x16 }
})

const paddingInline = stylex.create({
  '0': { paddingInline: 0 },
  '1': { paddingInline: unit.x1 },
  '2': { paddingInline: unit.x2 },
  '3': { paddingInline: unit.x3 },
  '4': { paddingInline: unit.x4 },
  '6': { paddingInline: unit.x6 },
  '8': { paddingInline: unit.x8 },
  '10': { paddingInline: unit.x10 },
  '12': { paddingInline: unit.x12 },
  '16': { paddingInline: unit.x16 }
})

const paddingBlock = stylex.create({
  '0': { paddingBlock: 0 },
  '1': { paddingBlock: unit.x1 },
  '2': { paddingBlock: unit.x2 },
  '3': { paddingBlock: unit.x3 },
  '4': { paddingBlock: unit.x4 },
  '6': { paddingBlock: unit.x6 },
  '8': { paddingBlock: unit.x8 },
  '10': { paddingBlock: unit.x10 },
  '12': { paddingBlock: unit.x12 },
  '16': { paddingBlock: unit.x16 }
})

// ---------------------------------------------------------------------------
// Background color
// ---------------------------------------------------------------------------

const bgColor = stylex.create({
  page: { backgroundColor: colors.backgroundPage },
  'page-faded': { backgroundColor: colors.backgroundPageFaded },
  neutral: { backgroundColor: colors.backgroundNeutral },
  'neutral-faded': { backgroundColor: colors.backgroundNeutralFaded },
  critical: { backgroundColor: colors.backgroundCritical },
  'critical-faded': { backgroundColor: colors.backgroundCriticalFaded },
  positive: { backgroundColor: colors.backgroundPositive },
  'positive-faded': { backgroundColor: colors.backgroundPositiveFaded },
  warning: { backgroundColor: colors.backgroundWarning },
  'warning-faded': { backgroundColor: colors.backgroundWarningFaded },
  primary: { backgroundColor: colors.backgroundPrimary },
  'primary-faded': { backgroundColor: colors.backgroundPrimaryFaded },
  'elevation-base': { backgroundColor: colors.backgroundElevationBase },
  'elevation-raised': { backgroundColor: colors.backgroundElevationRaised },
  'elevation-overlay': { backgroundColor: colors.backgroundElevationOverlay },
  disabled: { backgroundColor: colors.backgroundDisabled },
  'disabled-faded': { backgroundColor: colors.backgroundDisabledFaded }
})

// ---------------------------------------------------------------------------
// Border
// ---------------------------------------------------------------------------

const border = stylex.create({
  none: { borderWidth: 0 },
  faded: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutralFaded
  },
  strong: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutral
  }
})

// ---------------------------------------------------------------------------
// Individual border
// ---------------------------------------------------------------------------

const borderTop = stylex.create({
  faded: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.borderNeutralFaded
  },
  strong: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.borderNeutral
  }
})

const borderBottom = stylex.create({
  faded: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderNeutralFaded
  },
  strong: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderNeutral
  }
})

const borderStart = stylex.create({
  faded: {
    borderInlineStartWidth: 1,
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colors.borderNeutralFaded
  },
  strong: {
    borderInlineStartWidth: 1,
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colors.borderNeutral
  }
})

const borderEnd = stylex.create({
  faded: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: colors.borderNeutralFaded
  },
  strong: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: colors.borderNeutral
  }
})

const borderInline = stylex.create({
  faded: {
    borderInlineWidth: 1,
    borderInlineStyle: 'solid',
    borderInlineColor: colors.borderNeutralFaded
  },
  strong: {
    borderInlineWidth: 1,
    borderInlineStyle: 'solid',
    borderInlineColor: colors.borderNeutral
  }
})

const borderBlock = stylex.create({
  faded: {
    borderBlockWidth: 1,
    borderBlockStyle: 'solid',
    borderBlockColor: colors.borderNeutralFaded
  },
  strong: {
    borderBlockWidth: 1,
    borderBlockStyle: 'solid',
    borderBlockColor: colors.borderNeutral
  }
})

// ---------------------------------------------------------------------------
// Border color
// ---------------------------------------------------------------------------

const borderColor = stylex.create({
  faded: { borderColor: colors.borderNeutralFaded },
  strong: { borderColor: colors.borderNeutral },
  critical: { borderColor: colors.borderCritical },
  positive: { borderColor: colors.borderPositive },
  primary: { borderColor: colors.borderPrimary },
  warning: { borderColor: colors.borderWarning }
})

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

const borderRadius = stylex.create({
  none: { borderRadius: radius.none },
  small: { borderRadius: radius.small },
  medium: { borderRadius: radius.medium },
  large: { borderRadius: radius.large },
  circular: { borderRadius: radius.circular }
})

// ---------------------------------------------------------------------------
// Overflow
// ---------------------------------------------------------------------------

const overflow = stylex.create({
  hidden: { overflow: 'hidden' },
  auto: { overflow: 'auto' },
  scroll: { overflow: 'scroll' }
})

// ---------------------------------------------------------------------------
// Shadow
// ---------------------------------------------------------------------------

const shadowStyles = stylex.create({
  outline: { boxShadow: shadow.outline },
  'outline-intense': { boxShadow: shadow['outline-intense'] },
  raised: { boxShadow: shadow.raised },
  'raised-intense': { boxShadow: shadow['raised-intense'] },
  overlay: { boxShadow: shadow.overlay },
  'overlay-intense': { boxShadow: shadow['overlay-intense'] }
})

// ---------------------------------------------------------------------------
// Text align
// ---------------------------------------------------------------------------

const textAlign = stylex.create({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' }
})

// ---------------------------------------------------------------------------
// Position
// ---------------------------------------------------------------------------

const position = stylex.create({
  static: { position: 'static' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  sticky: { position: 'sticky' }
})

// ---------------------------------------------------------------------------
// Inset
// ---------------------------------------------------------------------------

const inset = stylex.create({
  '0': { inset: 0 },
  auto: { inset: 'auto' }
})

const insetTop = stylex.create({
  '0': { top: 0 },
  auto: { top: 'auto' }
})

const insetBottom = stylex.create({
  '0': { bottom: 0 },
  auto: { bottom: 'auto' }
})

const insetStart = stylex.create({
  '0': { insetInlineStart: 0 },
  auto: { insetInlineStart: 'auto' }
})

const insetEnd = stylex.create({
  '0': { insetInlineEnd: 0 },
  auto: { insetInlineEnd: 'auto' }
})

const insetInline = stylex.create({
  '0': { insetInline: 0 },
  auto: { insetInline: 'auto' }
})

const insetBlock = stylex.create({
  '0': { insetBlock: 0 },
  auto: { insetBlock: 'auto' }
})

// ---------------------------------------------------------------------------
// Animated
// ---------------------------------------------------------------------------

const animated = stylex.create({
  root: {
    transitionProperty: 'color, background-color, border-color, box-shadow, opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out'
  }
})

// ---------------------------------------------------------------------------
// Divided (adds border between children)
// ---------------------------------------------------------------------------

const divided = stylex.create({
  root: {},
  row: {}
})

const dividedChild = stylex.create({
  root: {
    borderBlockStartWidth: 1,
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: colors.borderNeutralFaded
  },
  row: {
    borderInlineStartWidth: 1,
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colors.borderNeutralFaded
  }
})

// ---------------------------------------------------------------------------
// Bleed (negative margin with border)
// ---------------------------------------------------------------------------

const bleed = stylex.create({
  '2': {
    marginInline: `-${unit.x2}`,
    borderInlineWidth: 1,
    borderInlineStyle: 'solid',
    borderInlineColor: colors.borderNeutralFaded
  },
  '4': {
    marginInline: `-${unit.x4}`,
    borderInlineWidth: 1,
    borderInlineStyle: 'solid',
    borderInlineColor: colors.borderNeutralFaded
  }
})

// ---------------------------------------------------------------------------
// Z-index
// ---------------------------------------------------------------------------

const zIndexStyle = stylex.create({
  relative: { zIndex: zIndex.relative },
  absolute: { zIndex: zIndex.absolute },
  fixed: { zIndex: zIndex.fixed }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const viewStyles = {
  gap,
  direction,
  align,
  justify,
  wrap,
  padding,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  paddingInline,
  paddingBlock,
  backgroundColor: bgColor,
  border,
  borderTop,
  borderBottom,
  borderStart,
  borderEnd,
  borderInline,
  borderBlock,
  borderColor,
  borderRadius,
  overflow,
  shadow: shadowStyles,
  textAlign,
  position,
  inset,
  insetTop,
  insetBottom,
  insetStart,
  insetEnd,
  insetInline,
  insetBlock,
  zIndex: zIndexStyle,
  animated,
  divided,
  dividedChild,
  bleed
} as const
