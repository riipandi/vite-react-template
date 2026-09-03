/**
 * A radio button component for selecting one option from a group.
 *
 * @see: https://base-ui.com/react/components/radio
 * @see: https://base-ui.com/react/components/radio-group
 *
 * BaseUI Anatomy:
 * <RadioGroup>
 *   <Radio.Root>
 *     <Radio.Indicator />
 *   </Radio.Root>
 * </RadioGroup>
 */

import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { radioStyles as s } from './radio.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function RadioGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseRadioGroup>, 'className' | 'style'> & StyleProp) {
  return <BaseRadioGroup {...props} {...stylex.props(s.group, style)} />
}

export function RadioGroupItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Radio.Root>, 'className' | 'style'> & StyleProp) {
  return (
    <Radio.Root {...props} {...stylex.props(s.item, style)}>
      <Radio.Indicator {...stylex.props(s.indicator)} />
    </Radio.Root>
  )
}
