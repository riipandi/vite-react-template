import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
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
  stroke
} from '#/lib/constants.stylex'
import { ring } from '#/lib/stylex-utils'
import { colors, font, radius, shadow } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function NavigationMenu({
  style,
  children,
  align = 'start',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>, 'className' | 'style'> &
  Pick<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>, 'align'> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Root {...props} {...stylex.props(styles.root, style)}>
      {children}
      <NavigationMenuPositioner align={align} />
    </BaseNavigationMenu.Root>
  )
}

export function NavigationMenuList({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.List>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.List {...props} {...stylex.props(styles.list, style)} />
}

export function NavigationMenuItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Item {...props} {...stylex.props(styles.item, style)} />
}

export function NavigationMenuTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Trigger {...props} {...stylex.props(styles.trigger, style)}>
      {children}
      <svg
        width='12'
        height='12'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
        {...stylex.props(styles.triggerChevron)}
      >
        <path d={`m3 6 5 5 5-5`} />
      </svg>
    </BaseNavigationMenu.Trigger>
  )
}

export function NavigationMenuContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Content {...props} {...stylex.props(styles.content, style)} />
}

export function NavigationMenuLink({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Link {...props} {...stylex.props(styles.link, style)} />
}

export function NavigationMenuPositioner({
  style,
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  alignOffset = 0,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>,
  'className' | 'style'
> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...props}
        {...stylex.props(styles.positioner, style)}
      >
        <BaseNavigationMenu.Popup {...stylex.props(styles.popup, ring({ shadow: shadow.md }))}>
          <BaseNavigationMenu.Viewport {...stylex.props(styles.viewport)} />
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  )
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: font.sans,
    justifyContent: 'center',
    maxWidth: 'max-content',
    position: 'relative'
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s1,
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: {
    position: 'relative'
  },
  trigger: {
    // Read by the chevron below — StyleX has no child selectors, so the
    // trigger's [data-popup-open] state travels via a custom property.
    // No `default` here: StyleX emits it unlayered, beating the layered
    // [data-*] rule; the chevron's var() fallback covers the closed state.
    '--navigation-menu-chevron-rotation': {
      default: null,
      '[data-popup-open]': '180deg'
    },
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-popup-open]': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    borderRadius: radius.lg,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    height: space.s9,
    justifyContent: 'center',
    lineHeight: lineHeight.control,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    paddingBlock: space.s15,
    paddingInline: space.s25,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, color',
    userSelect: 'none',
    width: 'max-content'
  },
  triggerChevron: {
    marginTop: '1px',
    transform: 'rotate(var(--navigation-menu-chevron-rotation, 0deg))',
    transitionDuration: duration.slow,
    transitionProperty: 'transform',
    transitionTimingFunction: easing.out
  },
  content: {
    padding: space.s1
  },
  link: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-active]': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    borderRadius: radius.md,
    color: colors.foreground,
    display: 'flex',
    fontSize: fontSize.sm,
    gap: space.s2,
    lineHeight: lineHeight.control,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    padding: space.s2,
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color'
  },
  positioner: {
    height: 'var(--positioner-height)',
    maxWidth: 'var(--available-width)',
    transitionDuration: duration.slow,
    transitionProperty: {
      default: 'top, left, right, bottom',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    // Must match the popup's curve — positioner and popup move as one
    // surface during the trigger-to-trigger morph.
    transitionTimingFunction: easing.out,
    width: 'var(--positioner-width)',
    zIndex: z.popup
  },
  popup: {
    backgroundColor: colors.popover,
    borderRadius: radius.lg,
    color: colors.popoverForeground,
    height: 'var(--popup-height)',
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    position: 'relative',
    transform: {
      default: 'scale(1)',
      '[data-starting-style]': 'scale(0.97)',
      '[data-ending-style]': 'scale(0.97)'
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.slow,
    transitionProperty: {
      default: 'opacity, transform, width, height',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.out,
    width: 'var(--popup-width)'
  },
  viewport: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  }
})
