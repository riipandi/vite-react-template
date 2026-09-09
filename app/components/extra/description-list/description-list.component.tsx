/**
 * A definition list of key-value rows with hairline separators.
 *
 * Anatomy:
 * <DescriptionList>
 *   <DescriptionTerm>...</DescriptionTerm>
 *   <DescriptionDetails>...</DescriptionDetails>
 * </DescriptionList>
 *
 * Each term/details pair occupies one grid row: the term is the muted key,
 * the details the emphasized value. Terms and details must stay direct
 * children of the list for the grid layout and separators to line up.
 *
 * All three parts support the Base UI `render` prop for polymorphic output.
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import { descriptionListStyles as s } from './description-list.stylex'

export interface DescriptionListProps extends Omit<
  useRender.ComponentProps<'dl'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function DescriptionList({ style, render, ...props }: DescriptionListProps) {
  return useRender({
    defaultTagName: 'dl',
    render,
    props: mergeProps<'dl'>(stylex.props(s.root, style), props)
  })
}

export interface DescriptionTermProps extends Omit<
  useRender.ComponentProps<'dt'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function DescriptionTerm({ style, render, ...props }: DescriptionTermProps) {
  return useRender({
    defaultTagName: 'dt',
    render,
    props: mergeProps<'dt'>(stylex.props(s.term, style), props)
  })
}

export interface DescriptionDetailsProps extends Omit<
  useRender.ComponentProps<'dd'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function DescriptionDetails({ style, render, ...props }: DescriptionDetailsProps) {
  return useRender({
    defaultTagName: 'dd',
    render,
    props: mergeProps<'dd'>(stylex.props(s.details, style), props)
  })
}
