import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonProps } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { Textarea } from '#/components/extra/textarea'
import { space, fontSize, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function InputGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div role='group' {...props} {...stylex.props(styles.root, style)} />
}

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

export function InputGroupAddon({
  align = 'inline-start',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> &
  StyleProp & { align?: InputGroupAddonAlign }) {
  return (
    <div
      role='group'
      // Read by the group root's :has() to switch to a column layout for block-aligned addons.
      data-align={align}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        event.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus()
      }}
      {...props}
      {...stylex.props(styles.addon, addonAligns[align], style)}
    />
  )
}

export type InputGroupButtonSize = 'xs' | 'iconXs' | 'iconSm'

export function InputGroupButton({
  variant = 'ghost',
  size = 'xs',
  style,
  ...props
}: Omit<ButtonProps, 'size'> & { size?: InputGroupButtonSize }) {
  return <Button type='button' variant={variant} {...props} style={[buttonSizes[size], style]} />
}

export function InputGroupText({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(styles.text, style)} />
}

export function InputGroupInput({ style, ...props }: React.ComponentPropsWithoutRef<typeof Input>) {
  return <Input {...props} style={[styles.control, style]} />
}

export function InputGroupTextarea({
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea>) {
  return <Textarea {...props} style={[styles.control, styles.textarea, style]} />
}

const styles = stylex.create({
  root: {
    // Block-aligned addons (textarea groups) stack the group vertically.
    alignItems: {
      default: 'center',
      ':has([data-align^="block"])': 'stretch'
    },
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    flexDirection: {
      default: 'row',
      ':has([data-align^="block"])': 'column'
    },
    fontFamily: font.sans,
    minWidth: 0,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%'
  },
  addon: {
    alignItems: 'center',
    color: colors.mutedForeground,
    cursor: 'text',
    display: 'flex',
    fontSize: fontSize.sm,
    gap: space.s2,
    justifyContent: 'center',
    paddingBlock: space.s15,
    userSelect: 'none'
  },
  text: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.sm,
    gap: space.s2
  },
  // The group draws the border and focus ring; the control inside goes bare.
  control: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    flex: 1,
    outline: 'none'
  },
  textarea: {
    paddingBlock: space.s2,
    resize: 'none'
  }
})

const addonAligns = stylex.create({
  'inline-start': {
    order: -1,
    paddingLeft: space.s2
  },
  'inline-end': {
    order: 9,
    paddingRight: space.s2
  },
  'block-start': {
    justifyContent: 'flex-start',
    order: -1,
    paddingInline: space.s25,
    paddingTop: space.s2,
    width: '100%'
  },
  'block-end': {
    justifyContent: 'flex-start',
    order: 9,
    paddingBottom: space.s2,
    paddingInline: space.s25,
    width: '100%'
  }
})

const buttonSizes = stylex.create({
  xs: {
    borderRadius: radius.sm,
    gap: space.s1,
    height: space.s6,
    paddingInline: space.s15
  },
  iconXs: {
    borderRadius: radius.sm,
    height: space.s6,
    paddingInline: 0,
    width: space.s6
  },
  iconSm: {
    height: space.s8,
    paddingInline: 0,
    width: space.s8
  }
})
