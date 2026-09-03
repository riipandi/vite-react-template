import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight, stroke, container } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function Empty({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.root, style)} />
}

export function EmptyHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export type EmptyMediaVariant = 'default' | 'icon'

export function EmptyMedia({
  variant = 'default',
  style,
  ...props
}: DivProps & { variant?: EmptyMediaVariant }) {
  return <div {...props} {...stylex.props(styles.media, mediaVariants[variant], style)} />
}

export function EmptyTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.title, style)} />
}

export function EmptyDescription({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.description, style)} />
}

export function EmptyContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderStyle: 'dashed',
    borderWidth: stroke.border,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s4,
    justifyContent: 'center',
    minWidth: 0,
    padding: space.s6,
    textAlign: 'center',
    textWrap: 'balance',
    width: '100%'
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: space.s2,
    maxWidth: container.lg
  },
  media: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: space.s2
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.01em'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSize.sm,
    gap: space.s25,
    maxWidth: container.lg,
    minWidth: 0,
    width: '100%'
  }
})

const mediaVariants = stylex.create({
  default: {},
  icon: {
    backgroundColor: colors.muted,
    borderRadius: radius.lg,
    color: colors.foreground,
    height: space.s8,
    width: space.s8
  }
})
