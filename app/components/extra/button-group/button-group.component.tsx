import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { buttonGroupStyles as s } from './button-group.stylex'
import { buttonGroupOrientations as orientations } from './button-group.stylex'
import { buttonGroupJoined as joined } from './button-group.stylex'

interface StyleProp {
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
  const items = React.Children.toArray(children).filter(
    (node): node is React.ReactElement<StyleProp> => React.isValidElement(node)
  )
  return (
    <div role='group' {...props} {...stylex.props(s.root, orientations[orientation], style)}>
      {items.map((child, index) => {
        const position =
          items.length === 1
            ? null
            : index === 0
              ? 'first'
              : index === items.length - 1
                ? 'last'
                : 'middle'
        const childStyle = child.props.style
        return React.cloneElement(child, {
          key: child.key ?? index,
          style: [position && joined[`${orientation}-${position}`], childStyle]
        })
      })}
    </div>
  )
}

export function ButtonGroupText({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(s.text, style)} />
}

export function ButtonGroupSeparator({
  orientation = 'vertical',
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return <Separator orientation={orientation} {...props} style={[s.separator, style]} />
}
