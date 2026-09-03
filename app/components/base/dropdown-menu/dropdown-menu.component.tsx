import { Menu as BaseMenu } from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  space,
  fontSize,
  fontWeight,
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

export const DropdownMenu = BaseMenu.Root
export const DropdownMenuTrigger = BaseMenu.Trigger
export const DropdownMenuGroup = BaseMenu.Group
export const DropdownMenuPortal = BaseMenu.Portal
export const DropdownMenuSub = BaseMenu.SubmenuRoot
export const DropdownMenuRadioGroup = BaseMenu.RadioGroup

export interface DropdownMenuContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    >,
    StyleProp {}

export function DropdownMenuContent({
  style,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  ...props
}: DropdownMenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <BaseMenu.Popup
          {...props}
          {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export type DropdownMenuItemVariant = 'default' | 'destructive'

export interface DropdownMenuItemProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'className' | 'style'>,
    StyleProp {
  variant?: DropdownMenuItemVariant
  /** Indents the item to align with checkbox/radio item labels. */
  inset?: boolean
}

export function DropdownMenuItem({
  style,
  variant = 'default',
  inset,
  ...props
}: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      {...props}
      {...stylex.props(
        styles.item,
        inset && styles.itemInset,
        variant === 'destructive' && styles.itemDestructive,
        style
      )}
    />
  )
}

function IndicatorCheck() {
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
      <path d={`m3 8.5 3.5 3.5L13 4.5`} />
    </svg>
  )
}

export function DropdownMenuCheckboxItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseMenu.CheckboxItem {...props} {...stylex.props(styles.item, styles.indicatorItem, style)}>
      <span {...stylex.props(styles.indicator)}>
        <BaseMenu.CheckboxItemIndicator>
          <IndicatorCheck />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

export function DropdownMenuRadioItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseMenu.RadioItem {...props} {...stylex.props(styles.item, styles.indicatorItem, style)}>
      <span {...stylex.props(styles.indicator)}>
        <BaseMenu.RadioItemIndicator>
          <IndicatorCheck />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

export function DropdownMenuSubTrigger({
  style,
  inset,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>, 'className' | 'style'> &
  StyleProp & { inset?: boolean }) {
  return (
    <BaseMenu.SubmenuTrigger
      {...props}
      {...stylex.props(styles.item, styles.subTrigger, inset && styles.itemInset, style)}
    >
      {children}
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
        {...stylex.props(styles.subTriggerChevron)}
      >
        <path d={`m6 3 5 5-5 5`} />
      </svg>
    </BaseMenu.SubmenuTrigger>
  )
}

export function DropdownMenuSubContent({
  style,
  sideOffset = 0,
  alignOffset = -4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
      style={[styles.subPopup, style]}
    />
  )
}

export function DropdownMenuShortcut({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(styles.shortcut, style)} />
}

export function DropdownMenuSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMenu.Separator {...props} {...stylex.props(styles.separator, style)} />
}

export function DropdownMenuLabel({
  style,
  inset,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>, 'className' | 'style'> &
  StyleProp & { inset?: boolean }) {
  return (
    <BaseMenu.GroupLabel
      {...props}
      {...stylex.props(styles.label, inset && styles.itemInset, style)}
    />
  )
}

const styles = stylex.create({
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
    fontFamily: font.sans,
    maxHeight: 'var(--available-height)',
    minWidth: container.xs,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBlock: space.s1,
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
  // Submenus anchor to their trigger item — the anchor width is the item, not
  // the menu, so size to content instead.
  subPopup: {
    minWidth: container.xs,
    width: 'max-content'
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
    marginInline: space.s1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    outline: 'none',
    paddingBlock: space.s15,
    paddingInline: space.s2,
    userSelect: 'none'
  },
  // Submenu triggers also light up while their submenu is open.
  subTrigger: {
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.accent,
      '[data-popup-open]': colors.accent
    },
    color: {
      default: null,
      '[data-highlighted]': colors.accentForeground,
      '[data-popup-open]': colors.accentForeground,
      '[data-disabled]': colors.mutedForeground
    }
  },
  itemInset: {
    paddingLeft: space.s7
  },
  // Reserve room for the trailing check indicator (absolute, right-aligned).
  indicatorItem: {
    paddingRight: space.s8,
    position: 'relative'
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
  itemDestructive: {
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': `color-mix(in srgb, ${colors.destructive} 10%, transparent)`
    },
    color: {
      default: colors.destructive,
      '[data-disabled]': colors.mutedForeground
    }
  },
  subTriggerChevron: {
    color: colors.mutedForeground,
    flexShrink: 0,
    marginLeft: 'auto'
  },
  shortcut: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: space.s1
  },
  label: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    paddingBlock: space.s15,
    paddingInline: space.s3
  }
})
