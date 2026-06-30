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
import { cx } from 'css-variants'
import * as React from 'react'

const fieldsetStyles = tv({
  base: [
    'flex flex-col gap-2',
    '*:data-[slot=text]:text-foreground-neutral-faded *:data-[slot=text]:mb-4',
    '[&_[data-slot="field"]:not([data-layout="inline"])]:not-last:mb-4'
  ],
  slots: {
    legend: 'text-foreground-neutral mb-1.5 text-sm font-semibold'
  }
})

export type FieldsetRootProps = React.ComponentProps<typeof BaseFieldset.Root>
export type FieldsetLegendProps = React.ComponentProps<typeof BaseFieldset.Legend>

export function Fieldset({ className, ...props }: FieldsetRootProps) {
  const styles = fieldsetStyles()
  return (
    <BaseFieldset.Root data-slot='fieldset' className={cx(styles.base(), className)} {...props} />
  )
}

export function FieldsetLegend({ className, ...props }: FieldsetLegendProps) {
  const styles = fieldsetStyles()
  return (
    <BaseFieldset.Legend
      data-slot='fieldset-legend'
      className={cx(styles.legend(), className)}
      {...props}
    />
  )
}
