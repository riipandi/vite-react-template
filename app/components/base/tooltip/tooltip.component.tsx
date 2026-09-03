import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, z, duration, easing, container } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

// Instant tooltips by default (Base UI's own default is 600ms).
export function TooltipProvider({
  delay = 0,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider delay={delay} {...props} />
}

export const Tooltip = BaseTooltip.Root
export const TooltipTrigger = BaseTooltip.Trigger

export interface TooltipContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  style?: stylex.StyleXStyles
}

export function TooltipContent({
  style,
  children,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <BaseTooltip.Popup {...props} {...stylex.props(styles.popup, style)}>
          {children}
          <BaseTooltip.Arrow {...stylex.props(styles.arrow)} />
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
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
    backgroundColor: colors.foreground,
    borderRadius: radius.sm,
    color: colors.background,
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.snug,
    maxWidth: container.sm,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    paddingBlock: space.s15,
    paddingInline: space.s3,
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
    transitionTimingFunction: easing.out
  },
  // A rotated square, half tucked under the popup; Base UI positions it along
  // the anchor axis, we offset the cross axis per [data-side] — the rotated
  // corner peeks out just enough to bridge the default 4px sideOffset gap.
  arrow: {
    backgroundColor: colors.foreground,
    bottom: { default: null, '[data-side="top"]': `calc(-1 * ${space.s05})` },
    height: space.s25,
    left: {
      default: null,
      '[data-side="right"]': `calc(-1 * ${space.s05})`,
      '[data-side="inline-end"]': `calc(-1 * ${space.s05})`
    },
    position: 'absolute',
    right: {
      default: null,
      '[data-side="left"]': `calc(-1 * ${space.s05})`,
      '[data-side="inline-start"]': `calc(-1 * ${space.s05})`
    },
    top: { default: null, '[data-side="bottom"]': `calc(-1 * ${space.s05})` },
    transform: 'rotate(45deg)',
    width: space.s25
  }
})
