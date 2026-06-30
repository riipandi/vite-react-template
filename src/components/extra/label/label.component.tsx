/**
 * A form label component for associating text with form controls.
 *
 * Anatomy:
 * <Label />
 */

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { labelStyles } from './label.stylex'

export type LabelProps = React.ComponentProps<'label'> & {
  xstyle?: StyleXStyles
}

export function Label({ xstyle, ...props }: LabelProps) {
  // oxlint-disable-next-line jsx-a11y/label-has-associated-control
  return <label data-slot='label' {...stylex.props(labelStyles.base, xstyle)} {...props} />
}
