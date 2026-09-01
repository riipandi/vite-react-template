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
  backgroundColor: bgColor,
  border,
  borderRadius,
  overflow,
  shadow: shadowStyles,
  textAlign,
  position,
  zIndex: zIndexStyle
} as const
