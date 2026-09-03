import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

export interface BadgeProps extends Omit<useRender.ComponentProps<'span'>, 'className' | 'style'> {
  variant?: BadgeVariant
  style?: stylex.StyleXStyles
}

export function Badge({ variant = 'primary', style, render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(stylex.props(styles.root, variants[variant], style), props),
    render
  })
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.full,
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    lineHeight: lineHeight.none,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: stroke.focus,
    paddingBlock: space.s1,
    paddingInline: space.s25,
    whiteSpace: 'nowrap'
  }
})

const variants = stylex.create({
  primary: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground
  },
  outline: {
    borderColor: colors.border,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.foreground
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveForeground
  }
})
