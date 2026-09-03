import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, stroke } from '#/lib/constants.stylex'
import { colors, radius, shadow } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight } from '#/styles/core/font.stylex'

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
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    boxShadow: shadow.sm,
    color: colors.cardForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: `var(--card-spacing, ${space.s5})`,
    paddingBlock: `var(--card-spacing, ${space.s5})`
  },
  header: {
    columnGap: space.s2,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    paddingInline: `var(--card-spacing, ${space.s5})`,
    rowGap: space.s15
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    gridColumn: 1,
    lineHeight: lineHeight.tight,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    gridColumn: 1,
    lineHeight: lineHeight.normal,
    margin: 0
  },
  action: {
    alignSelf: 'start',
    gridColumn: 2,
    gridRow: 'span 2',
    justifySelf: 'end'
  },
  content: {
    paddingInline: `var(--card-spacing, ${space.s5})`
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s2,
    paddingInline: `var(--card-spacing, ${space.s5})`
  }
})

export const cardSizes = stylex.create({
  md: {},
  sm: { '--card-spacing': space.s4 }
})
