import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius, shadow } from '#/lib/tokens.stylex'

interface DivProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles
}

export type CardSize = 'md' | 'sm'

export function Card({ size = 'md', style, ...props }: DivProps & { size?: CardSize }) {
  return <div {...props} {...stylex.props(styles.root, sizes[size], style)} />
}

export function CardHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export function CardTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'h3'>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <h3 {...props} {...stylex.props(styles.title, style)} />
}

export function CardDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <p {...props} {...stylex.props(styles.description, style)} />
}

/** Slot for a header-level action (e.g. a button), pinned top-right. */
export function CardAction({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.action, style)} />
}

export function CardContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}

export function CardFooter({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.footer, style)} />
}

// `--card-spacing` lets `size` retune the paddings owned by the sections
// below without prop-drilling: `sizes.sm` sets it, every section's own
// padding reads it with a fallback. It's a plain per-variant value (not a
// Base UI attribute-conditional default), so the custom-property gotcha in
// STYLEX.md (conditional default beating a layered [data-*] rule) doesn't
// apply here.
const styles = stylex.create({
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
    fontFamily: font.sans,
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

const sizes = stylex.create({
  md: {},
  sm: { '--card-spacing': space.s4 }
})
