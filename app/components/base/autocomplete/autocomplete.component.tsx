import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
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

/**
 * Free-text input with a filtered suggestion popup — unlike Combobox, any
 * typed value is allowed; the list only suggests. Pass `items` to the root;
 * `AutocompleteList` accepts a render function over the filtered items.
 */
export const Autocomplete = BaseAutocomplete.Root
export const AutocompleteValue = BaseAutocomplete.Value
export const AutocompleteCollection = BaseAutocomplete.Collection

export function AutocompleteInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Input {...props} {...stylex.props(styles.input, style)} />
}

export interface AutocompleteContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'anchor'
    >,
    StyleProp {}

export function AutocompleteContent({
  style,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        {...stylex.props(styles.positioner)}
      >
        <BaseAutocomplete.Popup
          {...props}
          {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
        />
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}

export function AutocompleteList({
  style,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.List>,
  'className' | 'style' | 'children'
> &
  StyleProp & {
    /** Static items, or a render function over the filtered items. */
    // oxlint-disable-next-line typescript/no-explicit-any
    children?: React.ReactNode | ((item: any) => React.ReactNode)
  }) {
  return <BaseAutocomplete.List {...props} {...stylex.props(styles.list, style)} />
}

export function AutocompleteItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Item {...props} {...stylex.props(styles.item, style)} />
}

export function AutocompleteGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Group {...props} {...stylex.props(style)} />
}

export function AutocompleteLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.GroupLabel>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.GroupLabel {...props} {...stylex.props(styles.label, style)} />
}

export function AutocompleteEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Empty {...props} {...stylex.props(styles.empty, style)} />
}

export function AutocompleteSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Separator {...props} {...stylex.props(styles.separator, style)} />
}

const styles = stylex.create({
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
    paddingInline: space.s3,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: container.sm,
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
    paddingInline: space.s2,
    userSelect: 'none'
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
