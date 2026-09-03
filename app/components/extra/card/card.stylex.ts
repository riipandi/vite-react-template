import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { shadow } from '#/styles/core/shadow.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

// `--card-spacing` lets `size` retune the paddings owned by the sections
// below without prop-drilling: `sizes.sm` sets it, every section's own
// padding reads it with a fallback. It's a plain per-variant value (not a
// Base UI attribute-conditional default), so the custom-property gotcha in
// STYLEX.md (conditional default beating a layered [data-*] rule) doesn't
// apply here.
export const cardStyles = stylex.create({
  root: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    boxShadow: shadow.outline,
    color: colors.cardForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: `var(--card-spacing, ${unit.x5})`,
    paddingBlock: `var(--card-spacing, ${unit.x5})`
  },
  header: {
    columnGap: unit.x2,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    paddingInline: `var(--card-spacing, ${unit.x5})`,
    rowGap: unit.x1_5
  },
  title: {
    fontSize: fontSize.body1,
    fontWeight: fontWeight.semibold,
    gridColumn: 1,
    lineHeight: fontLineHeight.body1,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    gridColumn: 1,
    lineHeight: fontLineHeight.body2,
    margin: 0
  },
  action: {
    alignSelf: 'start',
    gridColumn: 2,
    gridRow: 'span 2',
    justifySelf: 'end'
  },
  content: {
    paddingInline: `var(--card-spacing, ${unit.x5})`
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    paddingInline: `var(--card-spacing, ${unit.x5})`
  }
})

export const cardSizes = stylex.create({
  md: {},
  sm: { '--card-spacing': unit.x4 }
})
