import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { space, fontSize, lineHeight, fontWeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function ItemGroup({ style, ...props }: DivProps) {
  return <div role='list' {...props} {...stylex.props(styles.group, style)} />
}

export function ItemSeparator({ ...props }: React.ComponentPropsWithoutRef<typeof Separator>) {
  return <Separator orientation='horizontal' {...props} />
}

export type ItemVariant = 'default' | 'outline' | 'muted'
export type ItemSize = 'xs' | 'sm' | 'md'

export interface ItemProps
  extends Omit<useRender.ComponentProps<'div'>, 'className' | 'style'>, StyleProp {
  variant?: ItemVariant
  size?: ItemSize
}

export function Item({ variant = 'default', size = 'md', style, render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      stylex.props(styles.root, itemVariants[variant], itemSizes[size], style),
      props
    ),
    render
  })
}

export type ItemMediaVariant = 'default' | 'icon' | 'image'

export function ItemMedia({
  variant = 'default',
  style,
  ...props
}: DivProps & { variant?: ItemMediaVariant }) {
  return <div {...props} {...stylex.props(styles.media, mediaVariants[variant], style)} />
}

export function ItemContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}

export function ItemTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.title, style)} />
}

export function ItemDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> & StyleProp) {
  return <p {...props} {...stylex.props(styles.description, style)} />
}

export function ItemActions({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.actions, style)} />
}

export function ItemHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.headerFooter, style)} />
}

export function ItemFooter({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.headerFooter, style)} />
}

const styles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s4,
    width: '100%'
  },
  root: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.snug,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color',
    width: '100%'
  },
  media: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: space.s2,
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.s1
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.snug,
    width: 'fit-content'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    margin: 0,
    textAlign: 'left'
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s2
  },
  headerFooter: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: '100%',
    gap: space.s2,
    justifyContent: 'space-between'
  }
})

const itemVariants = stylex.create({
  default: {
    borderColor: 'transparent'
  },
  outline: {
    borderColor: colors.border
  },
  muted: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderColor: 'transparent'
  }
})

const itemSizes = stylex.create({
  xs: {
    gap: space.s2,
    paddingBlock: space.s2,
    paddingInline: space.s25
  },
  sm: {
    gap: space.s25,
    paddingBlock: space.s25,
    paddingInline: space.s3
  },
  md: {
    gap: space.s25,
    paddingBlock: space.s25,
    paddingInline: space.s3
  }
})

const mediaVariants = stylex.create({
  default: {},
  icon: {
    color: colors.foreground
  },
  image: {
    borderRadius: radius.sm,
    height: space.s10,
    overflow: 'hidden',
    width: space.s10
  }
})
