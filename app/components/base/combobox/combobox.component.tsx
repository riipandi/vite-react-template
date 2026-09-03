import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  space,
  fontSize,
  fontWeight,
  lineHeight,
  z,
  duration,
  easing,
  stroke,
  container
} from '#/lib/constants.stylex'
import { ring } from '#/lib/stylex-utils'
import { colors, font, radius, shadow } from '#/lib/tokens.stylex'

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
    <BaseCombobox.Trigger {...props} {...stylex.props(styles.trigger, style)}>
      {children}
      <BaseCombobox.Icon {...stylex.props(styles.triggerIcon)}>
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
    <div {...stylex.props(styles.inputWrap, style)}>
      <BaseCombobox.Input
        {...props}
        {...stylex.props(
          styles.input,
          showTrigger && showClear
            ? styles.inputPaddingButtons2
            : showTrigger || showClear
              ? styles.inputPaddingButtons1
              : styles.inputPaddingNone
        )}
      />
      {showClear && (
        <BaseCombobox.Clear
          aria-label='Clear value'
          tabIndex={-1}
          {...stylex.props(
            styles.iconButton,
            showTrigger ? styles.inputClearWithTrigger : styles.inputClearAlone
          )}
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
          {...stylex.props(styles.iconButton, styles.inputTrigger)}
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
  return <BaseCombobox.Chips {...props} {...stylex.props(styles.chips, style)} />
}

export function ComboboxChip({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Chip>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseCombobox.Chip {...props} {...stylex.props(styles.chip, style)}>
      {children}
      <BaseCombobox.ChipRemove aria-label='Remove' {...stylex.props(styles.chipRemove)}>
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
  return <BaseCombobox.Input {...props} {...stylex.props(styles.chipsInput, style)} />
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
        {...stylex.props(styles.positioner)}
      >
        <BaseCombobox.Popup
          {...props}
          {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
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
  return <BaseCombobox.List {...props} {...stylex.props(styles.list, style)} />
}

export function ComboboxItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseCombobox.Item {...props} {...stylex.props(styles.item, style)}>
      {children}
      <BaseCombobox.ItemIndicator render={<span {...stylex.props(styles.indicator)} />}>
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
  return <BaseCombobox.GroupLabel {...props} {...stylex.props(styles.label, style)} />
}

export function ComboboxEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Empty {...props} {...stylex.props(styles.empty, style)} />
}

export function ComboboxSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCombobox.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseCombobox.Separator {...props} {...stylex.props(styles.separator, style)} />
}

const styles = stylex.create({
  inputWrap: {
    position: 'relative',
    width: container.sm
  },
  input: {
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-visible': colors.ring },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    height: space.s9,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingLeft: space.s3,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.mutedForeground }
  },
  // Right padding reserves room for the trigger/clear buttons overlaid on
  // the input — one button width each, none when both are hidden.
  inputPaddingNone: { paddingRight: space.s3 },
  inputPaddingButtons1: { paddingRight: space.s8 },
  inputPaddingButtons2: { paddingRight: space.s16 },
  // Shared box for the absolutely-positioned icon buttons overlaid on the
  // input (trigger, clear).
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.mutedForeground,
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    outline: 'none',
    padding: 0,
    position: 'absolute',
    top: 0,
    width: space.s8
  },
  inputTrigger: {
    right: 0
  },
  inputClearAlone: {
    right: 0
  },
  inputClearWithTrigger: {
    right: space.s8
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.input,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    gap: space.s2,
    height: space.s9,
    justifyContent: 'space-between',
    lineHeight: lineHeight.control,
    minWidth: container.xs,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingInline: space.s3,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  triggerIcon: {
    color: colors.mutedForeground,
    display: 'flex'
  },
  chips: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.s1,
    minHeight: space.s9,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingBlock: space.s1,
    paddingInline: space.s2,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: container.sm
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: radius.sm,
    color: colors.secondaryForeground,
    display: 'inline-flex',
    fontSize: fontSize.xs,
    gap: space.s1,
    lineHeight: lineHeight.none,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: space.s1,
    paddingLeft: space.s2,
    paddingRight: space.s1
  },
  chipRemove: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radius.sm,
    borderStyle: 'none',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    height: space.s4,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    padding: 0,
    width: space.s4
  },
  chipsInput: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foreground,
    flexBasis: 0,
    flexGrow: 1,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.control,
    minWidth: space.s16,
    outline: 'none',
    padding: 0,
    '::placeholder': { color: colors.mutedForeground }
  },
  positioner: {
    outline: 'none',
    zIndex: z.popup
  },
  // Closed pose (Base UI's [data-starting-style]/[data-ending-style] frames):
  // faded, slightly shrunk, nudged toward the anchor. [data-side] sets the
  // nudge direction; the transition animates entry and exit through it.
  popup: {
    // No `default` for conditional custom properties: StyleX emits the
    // default rule unlayered (beating the layered [data-*] rules); the
    // var() fallback covers the unset case instead.
    '--popup-shift-x': {
      default: null,
      '[data-side="left"]': space.s2,
      '[data-side="right"]': `calc(-1 * ${space.s2})`,
      '[data-side="inline-start"]': space.s2,
      '[data-side="inline-end"]': `calc(-1 * ${space.s2})`
    },
    '--popup-shift-y': {
      default: null,
      '[data-side="top"]': space.s2,
      '[data-side="bottom"]': `calc(-1 * ${space.s2})`
    },
    backgroundColor: colors.popover,
    borderRadius: radius.md,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    maxHeight: `min(${container.sm}, var(--available-height))`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    overflow: 'hidden',
    transform: {
      default: 'scale(1)',
      '[data-starting-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)',
      '[data-ending-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)'
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.out,
    width: 'var(--anchor-width)'
  },
  list: {
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    paddingBlock: space.s1
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.accent
    },
    borderRadius: radius.sm,
    color: {
      default: null,
      '[data-highlighted]': colors.accentForeground,
      '[data-disabled]': colors.mutedForeground
    },
    cursor: 'default',
    display: 'flex',
    fontSize: fontSize.sm,
    gap: space.s2,
    lineHeight: lineHeight.control,
    marginInline: space.s1,
    outline: 'none',
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: space.s15,
    paddingLeft: space.s2,
    paddingRight: space.s8,
    position: 'relative',
    userSelect: 'none'
  },
  indicator: {
    alignItems: 'center',
    display: 'flex',
    height: space.s4,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    right: space.s2,
    width: space.s4
  },
  label: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    paddingBlock: space.s15,
    paddingInline: space.s3
  },
  empty: {
    color: colors.mutedForeground,
    // Base UI renders the element with no children while results exist —
    // hide it then so its padding doesn't reserve space.
    display: { default: 'block', ':empty': 'none' },
    fontSize: fontSize.sm,
    paddingBlock: space.s2,
    textAlign: 'center'
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: space.s1
  }
})
