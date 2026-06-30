/**
 * An easily stylable checkbox component.
 *
 * @see: https://base-ui.com/react/components/checkbox
 * @see: https://base-ui.com/react/components/checkbox-group
 *
 * BaseUI Anatomy for Checkbox:
 * <Checkbox.Root>
 *   <Checkbox.Indicator />
 * </Checkbox.Root>
 *
 * BaseUI Anatomy for Checkbox Group:
 * <CheckboxGroup>
 *   <Checkbox.Root />
 * </CheckboxGroup>
 */

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { useRender } from '@base-ui/react/use-render'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { checkboxStyles } from './checkbox.stylex'

export type CheckboxGroupProps = React.ComponentProps<typeof BaseCheckboxGroup> & {
  xstyle?: StyleXStyles
}
export type CheckboxGroupLabelProps = useRender.ComponentProps<'span'>
export type CheckboxRootProps = React.ComponentProps<typeof BaseCheckbox.Root> & {
  xstyle?: StyleXStyles
}

export function CheckboxGroup({ xstyle, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      data-slot='checkbox-group'
      {...stylex.props(checkboxStyles.group, xstyle)}
      {...props}
    />
  )
}

export function CheckboxGroupLabel({ render, ...props }: CheckboxGroupLabelProps) {
  return useRender({
    defaultTagName: 'span',
    render,
    props: {
      'data-slot': 'checkbox-group-label',
      ...stylex.props(checkboxStyles.groupLabel),
      ...props
    }
  })
}

export function Checkbox({ xstyle, ...props }: CheckboxRootProps) {
  return (
    <BaseCheckbox.Root
      data-slot='checkbox'
      {...stylex.props(checkboxStyles.root, xstyle)}
      {...props}
    >
      <BaseCheckbox.Indicator
        {...stylex.props(checkboxStyles.indicator)}
        render={(indicatorProps, state) => (
          <span {...indicatorProps}>
            {state.indeterminate ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                viewBox='0 0 24 24'
              >
                <path d='M20 6 9 17l-5-5' />
              </svg>
            )}
          </span>
        )}
      />
    </BaseCheckbox.Root>
  )
}
