import { Select as BaseSelect } from '@base-ui/react/select'
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

export const Select = BaseSelect.Root
export const SelectValue = BaseSelect.Value
export const SelectGroup = BaseSelect.Group

export function SelectTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseSelect.Trigger {...props} {...stylex.props(styles.trigger, style)}>
      {children}
      <BaseSelect.Icon {...stylex.props(styles.icon)}>
        <svg width='16' height='16' viewBox={`0 0 16 16`} fill='currentColor' aria-hidden>
          <path d={`M11 10H5l3 3.5zm0-4H5l3-3.5z`} />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

function ScrollArrow({ direction }: { direction: 'up' | 'down' }) {
  const Arrow = direction === 'up' ? BaseSelect.ScrollUpArrow : BaseSelect.ScrollDownArrow
  return (
    <Arrow
      {...stylex.props(
        styles.scrollArrow,
        direction === 'up' ? styles.scrollArrowUp : styles.scrollArrowDown
      )}
    >
      <svg width='12' height='12' viewBox={`0 0 12 12`} fill='currentColor' aria-hidden>
        {direction === 'up' ? <path d={`M9 7.5H3L6 4z`} /> : <path d={`M9 4.5H3L6 8z`} />}
      </svg>
    </Arrow>
  )
}

export interface SelectContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
    >,
    StyleProp {}

// alignItemWithTrigger defaults on (the popup
// overlays the trigger with the selected item aligned to it; the popup itself
// scrolls, with scroll arrows). Pass alignItemWithTrigger={false} for a
// plain anchored dropdown.
export function SelectContent({
  style,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <BaseSelect.Popup
          {...props}
          {...stylex.props(
            styles.popup,
            // Edge as a ring, not a border: Base UI's align-item-with-trigger
            // math ignores borders and would shift the aligned text.
            ring({ shadow: shadow.md }),
            // The align-with-trigger overlay repositions on open; a scale-in
            // animation fights that, so it only fades out. Anchored mode gets
            // the full closed pose on entry and exit.
            !alignItemWithTrigger && styles.popupAnchored,
            style
          )}
        >
          <ScrollArrow direction='up' />
          <BaseSelect.List {...stylex.props(styles.list)}>{children}</BaseSelect.List>
          <ScrollArrow direction='down' />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Item>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseSelect.Item {...props} {...stylex.props(styles.item, style)}>
      <BaseSelect.ItemText {...stylex.props(styles.itemText)}>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator {...stylex.props(styles.itemIndicator)}>
        <svg
          width='12'
          height='12'
          viewBox={`0 0 12 12`}
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden
        >
          <path d={`M2 6.5 4.5 9 10 3`} />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export function SelectLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>, 'className' | 'style'> &
  StyleProp) {
  return <BaseSelect.GroupLabel {...props} {...stylex.props(styles.label, style)} />
}

export function SelectSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseSelect.Separator {...props} {...stylex.props(styles.separator, style)} />
}

const styles = stylex.create({
  label: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    paddingBlock: space.s15,
    paddingInline: space.s3
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: space.s1
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: { default: colors.input, '[data-invalid]': colors.destructive },
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
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingInline: space.s3,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  icon: {
    color: colors.mutedForeground,
    display: 'flex'
  },
  positioner: {
    outline: 'none',
    zIndex: z.popup
  },
  popup: {
    backgroundColor: colors.popover,
    borderRadius: radius.md,
    color: colors.popoverForeground,
    fontFamily: font.sans,
    lineHeight: lineHeight.control,
    maxHeight: 'var(--available-height)',
    opacity: { default: 1, '[data-ending-style]': 0 },
    width: 'var(--anchor-width)',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.out
  },
  // Closed pose (anchored mode only — [data-side] sets the nudge direction,
  // [data-starting-style]/[data-ending-style] apply it).
  popupAnchored: {
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
    maxHeight: `min(${container.sm}, var(--available-height))`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    transform: {
      default: 'scale(1)',
      '[data-starting-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)',
      '[data-ending-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)'
    }
  },
  list: {
    paddingBlock: space.s1
  },
  scrollArrow: {
    alignItems: 'center',
    backgroundColor: colors.popover,
    color: colors.mutedForeground,
    cursor: 'default',
    display: 'flex',
    height: space.s4,
    justifyContent: 'center',
    position: 'sticky',
    width: '100%',
    zIndex: 1
  },
  scrollArrowUp: {
    top: 0
  },
  scrollArrowDown: {
    bottom: 0
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
    display: 'grid',
    fontSize: fontSize.sm,
    gap: space.s2,
    gridTemplateColumns: `1fr ${space.s4}`,
    marginInline: space.s1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    outline: 'none',
    paddingBlock: space.s15,
    paddingInline: space.s2,
    userSelect: 'none'
  },
  itemIndicator: {
    alignItems: 'center',
    display: 'flex',
    gridColumnStart: 2,
    justifyContent: 'center'
  },
  itemText: {
    gridColumnStart: 1
  }
})
