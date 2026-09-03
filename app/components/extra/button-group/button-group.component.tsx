import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export interface ButtonGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>, StyleProp {
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Fuses its direct children (Buttons, Inputs, …) into one segmented control.
 * StyleX has no child selectors, so the group clones each child and passes
 * position styles through the child's `style` prop — children must accept it
 * (every component in this library does).
 */
export function ButtonGroup({
  orientation = 'horizontal',
  style,
  children,
  ...props
}: ButtonGroupProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement)
  return (
    <div role='group' {...props} {...stylex.props(styles.root, orientations[orientation], style)}>
      {items.map((child, index) => {
        const position =
          items.length === 1
            ? null
            : index === 0
              ? 'first'
              : index === items.length - 1
                ? 'last'
                : 'middle'
        const childStyle = (child.props as StyleProp).style
        return React.cloneElement(child as React.ReactElement<StyleProp>, {
          key: child.key ?? index,
          style: [
            position && joined[`${orientation}-${position}` as keyof typeof joined],
            childStyle
          ]
        })
      })}
    </div>
  )
}

export function ButtonGroupText({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.text, style)} />
}

export function ButtonGroupSeparator({
  orientation = 'vertical',
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return <Separator orientation={orientation} {...props} style={[styles.separator, style]} />
}

const styles = stylex.create({
  root: {
    alignItems: 'stretch',
    display: 'flex',
    fontFamily: font.sans,
    width: 'fit-content'
  },
  text: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    paddingInline: space.s25
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.input
  }
})

const orientations = stylex.create({
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  }
})

const joined = stylex.create({
  'horizontal-first': {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  'horizontal-middle': {
    borderLeftWidth: 0,
    borderRadius: 0
  },
  'horizontal-last': {
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0
  },
  'vertical-first': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  'vertical-middle': {
    borderRadius: 0,
    borderTopWidth: 0
  },
  'vertical-last': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0
  }
})
