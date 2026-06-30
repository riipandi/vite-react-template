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

import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radioStyles } from './radio.stylex'

export type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup> & {
  xstyle?: StyleXStyles
}
export type RadioRootProps = React.ComponentProps<typeof BaseRadio.Root> & {
  xstyle?: StyleXStyles
}

export function RadioGroup({ xstyle, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot='radio-group'
      {...stylex.props(radioStyles.group, xstyle)}
      {...props}
    />
  )
}

export function Radio({ xstyle, ...props }: RadioRootProps) {
  return <BaseRadio.Root data-slot='radio' {...stylex.props(radioStyles.root, xstyle)} {...props} />
}
