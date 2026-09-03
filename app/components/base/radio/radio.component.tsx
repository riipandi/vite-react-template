/**
 * A radio button component with dot indicator and size variants.
 *
 * @see: https://base-ui.com/react/components/radio
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Anatomy:
 * <label>
 *   <Radio.Root>         // span[role=radio] + hidden input
 *     <Radio.Indicator>  // dot
 *   </Radio.Root>
 *   {children}
 * </label>
 */

import { Radio as BaseRadio } from '@base-ui/react/radio'
import type { RadioRootProps } from '@base-ui/react/radio'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { RadioGroupContext } from './radio-group.context'
import { radioStyles } from './radio.stylex'

type Size = keyof typeof radioStyles.sizes

export interface RadioProps extends Omit<RadioRootProps<string>, 'className' | 'style'> {
  /** Node for inserting the label. */
  children?: React.ReactNode
  /** Component size. @default "medium" */
  size?: Size
  /** Show an error state. */
  hasError?: boolean
  /** Additional attributes for the root label element. */
  attributes?: React.ComponentProps<'label'>
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function Radio({
  size = 'medium',
  hasError = false,
  disabled = false,
  attributes,
  className,
  style,
  children,
  ...props
}: RadioProps) {
  const groupContext = React.useContext(RadioGroupContext)
  const isDisabled = disabled || groupContext?.disabled
  const showError = hasError || groupContext?.hasError

  return (
    <label
      data-slot='radio'
      {...attributes}
      {...stylex.props(
        radioStyles.root.label,
        radioStyles.gaps[size],
        isDisabled && radioStyles.root.labelDisabled,
        customClassName(className),
        style
      )}
    >
      <BaseRadio.Root
        disabled={isDisabled}
        className={(state) =>
          stylex.props(
            radioStyles.field.box,
            radioStyles.sizes[size],
            state.checked && radioStyles.field.checked,
            showError && !state.checked && radioStyles.field.error,
            state.disabled && radioStyles.field.disabled,
            state.disabled && state.checked && radioStyles.field.disabledChecked
          ).className
        }
        {...props}
      >
        <BaseRadio.Indicator
          keepMounted
          render={(renderProps, state) => (
            <span
              {...renderProps}
              {...stylex.props(
                radioStyles.indicator.root,
                state.checked && radioStyles.indicator.visible,
                state.disabled && radioStyles.indicator.disabled
              )}
            >
              <span {...stylex.props(radioStyles.dot.root)} />
            </span>
          )}
        />
      </BaseRadio.Root>
      {children && (
        <span
          data-slot='radio-label'
          {...stylex.props(
            radioStyles.labelText[size],
            isDisabled && radioStyles.root.labelDisabled
          )}
        >
          {children}
        </span>
      )}
    </label>
  )
}
