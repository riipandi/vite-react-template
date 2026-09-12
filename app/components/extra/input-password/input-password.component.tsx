/**
 * A password input with a visibility toggle, composed on top of InputGroup.
 *
 * @see: Base UI Input / InputGroup
 *
 * Anatomy:
 * <InputGroup>
 *   <InputGroupInput type="password|text" />
 *   <InputGroupAddon align="inline-end">
 *     <InputGroupButton aria-pressed={visible} aria-label=…>
 *       {visible ? hideIcon : showIcon}
 *     </InputGroupButton>
 *   </InputGroupAddon>
 * </InputGroup>
 */

import { Eye, EyeOff } from '@keyline-icons/react'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import type { buttonVariants } from '#/components/base/button'
import { Icon } from '#/components/extra/icon'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  type InputGroupButtonSize,
  InputGroupInput
} from '#/components/extra/input-group'

export interface InputPasswordProps extends Omit<
  React.ComponentPropsWithoutRef<typeof InputGroupInput>,
  'type' | 'style'
> {
  style?: stylex.StyleXStyles
  /** Controlled visibility state. When provided, the input becomes controlled. */
  visible?: boolean
  /** Initial visibility state when uncontrolled. Defaults to `false` (obscured). */
  defaultVisible?: boolean
  /** Fired when the user toggles visibility. */
  onVisibleChange?: (visible: boolean) => void
  /** Icon shown when the password is hidden (pressing it reveals the value). Defaults to an eye. */
  showIcon?: React.ReactNode
  /** Icon shown when the password is visible (pressing it hides the value). Defaults to a slashed eye. */
  hideIcon?: React.ReactNode
  /** Accessible label for the toggle when the password is hidden. */
  showAriaLabel?: string
  /** Accessible label for the toggle when the password is visible. */
  hideAriaLabel?: string
  /** Toggle button variant. Defaults to `ghost`. */
  toggleVariant?: keyof typeof buttonVariants
  /** Toggle button size. Defaults to `iconXs`. */
  toggleSize?: InputGroupButtonSize
}

const defaultShowIcon = <Icon svg={Eye} size={16} color='neutralFaded' />
const defaultHideIcon = <Icon svg={EyeOff} size={16} color='neutralFaded' />

/** Resolve a controlled or uncontrolled boolean. */
function useUncontrolledState(
  controlled: boolean | undefined,
  defaultState: boolean
): [boolean, (next: boolean) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultState)
  const isControlled = controlled !== undefined
  const value = isControlled ? (controlled as boolean) : uncontrolled
  const setValue = (next: boolean) => {
    if (!isControlled) setUncontrolled(next)
  }
  return [value, setValue]
}

export function InputPassword({
  style,
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  showIcon,
  hideIcon,
  showAriaLabel = 'Show password',
  hideAriaLabel = 'Hide password',
  toggleVariant = 'ghost',
  toggleSize = 'iconXs',
  ...props
}: InputPasswordProps) {
  const [visible, setVisible] = useUncontrolledState(visibleProp, defaultVisible)

  const toggle = React.useCallback(() => {
    const next = !visible
    setVisible(next)
    onVisibleChange?.(next)
  }, [visible, onVisibleChange, setVisible])

  const showIconNode = showIcon ?? defaultShowIcon
  const hideIconNode = hideIcon ?? defaultHideIcon

  return (
    <InputGroup {...stylex.props(style)}>
      <InputGroupInput
        type={visible ? 'text' : 'password'}
        autoComplete='new-password'
        {...props}
      />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          type='button'
          variant={toggleVariant}
          size={toggleSize}
          aria-pressed={visible}
          aria-label={visible ? hideAriaLabel : showAriaLabel}
          onClick={toggle}
        >
          {visible ? hideIconNode : showIconNode}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
