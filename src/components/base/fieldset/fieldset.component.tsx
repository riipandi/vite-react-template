/**
 * A native fieldset element with an easily stylable legend.
 *
 * @see: https://base-ui.com/react/components/fieldset
 *
 * BaseUI Anatomy:
 * <Fieldset.Root>
 *   <Fieldset.Legend />
 * </Fieldset.Root>
 */

import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { fieldsetStyles } from './fieldset.stylex'

export type FieldsetRootProps = React.ComponentProps<typeof BaseFieldset.Root> & {
  xstyle?: StyleXStyles
}
export type FieldsetLegendProps = React.ComponentProps<typeof BaseFieldset.Legend> & {
  xstyle?: StyleXStyles
}

export function Fieldset({ xstyle, ...props }: FieldsetRootProps) {
  return (
    <BaseFieldset.Root
      data-slot='fieldset'
      {...stylex.props(fieldsetStyles.base, xstyle)}
      {...props}
    />
  )
}

export function FieldsetLegend({ xstyle, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      data-slot='fieldset-legend'
      {...stylex.props(fieldsetStyles.legend, xstyle)}
      {...props}
    />
  )
}
