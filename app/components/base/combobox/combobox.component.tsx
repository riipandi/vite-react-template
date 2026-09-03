/**
 * An input that suggests options as you type.
 *
 * @see: https://base-ui.com/react/components/combobox
 *
 * BaseUI Anatomy:
 * <Combobox.Root>
 *   <Combobox.Trigger>
 *     <Combobox.Value />
 *   </Combobox.Trigger>
 *   <Combobox.Portal>
 *     <Combobox.Backdrop />
 *     <Combobox.Positioner>
 *       <Combobox.Popup>
 *         <Combobox.Arrow />
 *         <Combobox.List>
 *           <Combobox.Item />
 *           <Combobox.Group>
 *             <Combobox.GroupLabel />
 *           </Combobox.Group>
 *         </Combobox.List>
 *       </Combobox.Popup>
 *     </Combobox.Positioner>
 *   </Combobox.Portal>
 * </Combobox.Root>
 */

import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/lib/tokens.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { comboboxStyles as s } from './combobox.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const Combobox = BaseCombobox.Root
export const ComboboxValue = BaseCombobox.Value
export const ComboboxCollection = BaseCombobox.Collection

function TriggerChevron() {
  return (
    <svg
      width='16'
      height='16'
      viewBox={`0 0 16 16`}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d={`m3 6 5 5 5-5`} />
    </svg>
  )
}

// Select-like trigger button — anchors the popup when the input lives inside
// ComboboxContent instead of the default input+trigger row (see ComboboxInput
// `showTrigger`).
export function ComboboxTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseCombobox.Trigger {...props} {...stylex.props(s.trigger, style)}>
      {children}
      <BaseCombobox.Icon {...stylex.props(s.triggerIcon)}>
        <TriggerChevron />
      </BaseCombobox.Icon>
    </BaseCombobox.Trigger>
  )
}

export function ComboboxInput({
  style,
  showTrigger = true,
  showClear = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Input>, 'className' | 'style'> &
  StyleProp & {
    /** Render the built-in dropdown trigger button. Set `false` when the
     * input is placed inside `ComboboxContent` and a `ComboboxTrigger`
     * elsewhere anchors the popup. */
    showTrigger?: boolean
    /** Render a clear button (`BaseCombobox.Clear`) before the trigger. */
    showClear?: boolean
  }) {
  return (
    <div {...stylex.props(s.inputWrap, style)}>
      <BaseCombobox.Input
        {...props}
        {...stylex.props(
          s.input,
          showTrigger && showClear
            ? s.inputPaddingButtons2
            : showTrigger || showClear
              ? s.inputPaddingButtons1
              : s.inputPaddingNone
        )}
      />
      {showClear && (
        <BaseCombobox.Clear
          aria-label='Clear value'
          tabIndex={-1}
          {...stylex.props(s.iconButton, showTrigger ? s.inputClearWithTrigger : s.inputClearAlone)}
        >
          <svg
            width='16'
            height='16'
            viewBox={`0 0 16 16`}
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden
          >
            <path d={`m4 4 8 8M12 4l-8 8`} />
          </svg>
        </BaseCombobox.Clear>
      )}
      {showTrigger && (
        <BaseCombobox.Trigger
          aria-label='Open list'
          tabIndex={-1}
          {...stylex.props(s.iconButton, s.inputTrigger)}
        >
          <TriggerChevron />
        </BaseCombobox.Trigger>
      )}
    </div>
  )
}

// Container for chips in a multi-select combobox — also serves as the popup
// anchor (pass a ref to `ComboboxContent`'s `anchor`), so it forwards `ref`.
export function ComboboxChips({
  style,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof BaseCombobox.Chips>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Chips {...props} {...stylex.props(s.chips, style)} />
}

export function ComboboxChip({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Chip>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseCombobox.Chip {...props} {...stylex.props(s.chip, style)}>
      {children}
      <BaseCombobox.ChipRemove aria-label='Remove' {...stylex.props(s.chipRemove)}>
        <svg
          width='10'
          height='10'
          viewBox={`0 0 10 10`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden
        >
          <path d={`M2.5 2.5l5 5M7.5 2.5l-5 5`} />
        </svg>
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  )
}

// Inline input rendered inside `ComboboxChips` — no border/background of its
// own, since the chips container already provides them.
export function ComboboxChipsInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Input {...props} {...stylex.props(s.chipsInput, style)} />
}

export interface ComboboxContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'anchor'
    >,
    StyleProp {}

export function ComboboxContent({
  style,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        {...stylex.props(s.positioner)}
      >
        <BaseCombobox.Popup
          {...props}
          {...stylex.props(s.popup, ring({ shadow: shadow.md }), style)}
        />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export function ComboboxList({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.List>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.List {...props} {...stylex.props(s.list, style)} />
}

export function ComboboxItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseCombobox.Item {...props} {...stylex.props(s.item, style)}>
      {children}
      <BaseCombobox.ItemIndicator render={<span {...stylex.props(s.indicator)} />}>
        <svg
          width='16'
          height='16'
          viewBox={`0 0 16 16`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden
        >
          <path d={`m3 8.5 3.5 3.5L13 4.5`} />
        </svg>
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

export function ComboboxGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Group>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Group {...props} {...stylex.props(style)} />
}

export function ComboboxLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.GroupLabel {...props} {...stylex.props(s.label, style)} />
}

export function ComboboxEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Empty {...props} {...stylex.props(s.empty, style)} />
}

export function ComboboxSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Separator {...props} {...stylex.props(s.separator, style)} />
}
