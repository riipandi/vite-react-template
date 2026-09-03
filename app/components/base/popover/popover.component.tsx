import { Popover as BasePopover } from '@base-ui/react/popover'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  space,
  fontSize,
  lineHeight,
  fontWeight,
  z,
  duration,
  easing,
  container
} from '#/lib/constants.stylex'
import { ring } from '#/lib/stylex-utils'
import { colors, font, radius, shadow } from '#/lib/tokens.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const Popover = BasePopover.Root
export const PopoverTrigger = BasePopover.Trigger
export const PopoverClose = BasePopover.Close

export interface PopoverContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  style?: stylex.StyleXStyles
}

export function PopoverContent({
  style,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <BasePopover.Popup
          {...props}
          {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

/** Layout wrapper for `PopoverTitle` + `PopoverDescription` inside `PopoverContent`. */
export function PopoverHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export function PopoverTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Title>, 'className' | 'style'> &
  StyleProp) {
  return <BasePopover.Title {...props} {...stylex.props(styles.title, style)} />
}

export function PopoverDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BasePopover.Description {...props} {...stylex.props(styles.description, style)} />
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
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    padding: space.s4,
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
    width: container.sm
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s15
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    margin: 0
  }
})
