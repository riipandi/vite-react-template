import { Form as BaseForm } from '@base-ui/react/form'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

export interface FormProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseForm>,
  'className' | 'style'
> {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

/**
 * Built on Base UI Form: validates the Fields inside it (`validationMode`),
 * consolidates their errors, and accepts external errors — e.g. from a server
 * action — via the `errors` prop, keyed by Field `name`.
 */
export function Form({ style, ...props }: FormProps) {
  return <BaseForm {...props} {...stylex.props(styles.root, style)} />
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s5,
    width: '100%'
  }
})
