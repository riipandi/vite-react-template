import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '#/components/base/dialog'
import { space, fontSize, lineHeight, fontWeight, stroke, container } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export interface CommandProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Root>,
      'className' | 'style' | 'inline' | 'open'
    >,
    StyleProp {
  children?: React.ReactNode
}

/**
 * Command palette built on Base UI Autocomplete in `inline open` mode: the
 * filtered list renders in place (no popup), like cmdk. Pass `items` to the
 * root; `CommandList` accepts a render function over the filtered items.
 */
export function Command({ style, children, ...props }: CommandProps) {
  return (
    <BaseAutocomplete.Root inline open autoHighlight {...props}>
      <div {...stylex.props(styles.root, style)}>{children}</div>
    </BaseAutocomplete.Root>
  )
}

export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run…',
  children,
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Dialog>, 'children'> &
  StyleProp & {
    title?: string
    description?: string
    children: React.ReactNode
  }) {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false} style={[styles.dialogContent, style]}>
        <DialogTitle style={styles.srOnly}>{title}</DialogTitle>
        <DialogDescription style={styles.srOnly}>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function CommandInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>, 'className' | 'style'> &
  StyleProp) {
  return (
    <div {...stylex.props(styles.inputWrap, style)}>
      <svg
        width='16'
        height='16'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        aria-hidden
        {...stylex.props(styles.inputIcon)}
      >
        <circle cx='7' cy='7' r='4.5' />
        <path d={`m10.5 10.5 3 3`} />
      </svg>
      <BaseAutocomplete.Input {...props} {...stylex.props(styles.input)} />
    </div>
  )
}

export function CommandList({
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

export function CommandEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Empty {...props} {...stylex.props(styles.empty, style)} />
}

export function CommandGroup({
  heading,
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>, 'className' | 'style'> &
  StyleProp & { heading?: React.ReactNode }) {
  return (
    <BaseAutocomplete.Group {...props} {...stylex.props(style)}>
      {heading && (
        <BaseAutocomplete.GroupLabel {...stylex.props(styles.groupLabel)}>
          {heading}
        </BaseAutocomplete.GroupLabel>
      )}
      {children}
    </BaseAutocomplete.Group>
  )
}

export function CommandItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Item {...props} {...stylex.props(styles.item, style)} />
}

export function CommandSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Separator {...props} {...stylex.props(styles.separator, style)} />
}

export function CommandShortcut({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(styles.shortcut, style)} />
}

const styles = stylex.create({
  root: {
    backgroundColor: colors.popover,
    borderRadius: radius.xl,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    height: '100%',
    overflow: 'hidden',
    padding: space.s1,
    width: '100%'
  },
  dialogContent: {
    borderRadius: radius.xl,
    gap: 0,
    overflow: 'hidden',
    padding: 0,
    top: '33%',
    transform: 'translate(-50%, 0)'
  },
  srOnly: {
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: `calc(-1 * ${stroke.border})`,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: `color-mix(in srgb, ${colors.input} 30%, transparent)`,
    borderColor: `color-mix(in srgb, ${colors.input} 30%, transparent)`,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    gap: space.s2,
    height: space.s8,
    margin: space.s1,
    marginBottom: 0,
    paddingInline: space.s2
  },
  inputIcon: {
    flexShrink: 0,
    opacity: 0.5
  },
  input: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foreground,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    height: '100%',
    outline: 'none',
    padding: 0,
    width: '100%',
    '::placeholder': { color: colors.mutedForeground }
  },
  list: {
    maxHeight: container.sm,
    outline: 'none',
    overflowY: 'auto',
    padding: space.s1,
    scrollPaddingBlock: space.s1
  },
  empty: {
    // Base UI renders the element with no children while results exist —
    // hide it then so its padding doesn't reserve space.
    display: { default: 'block', ':empty': 'none' },
    fontSize: fontSize.sm,
    paddingBlock: space.s6,
    textAlign: 'center'
  },
  groupLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    paddingBlock: space.s15,
    paddingInline: space.s2
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.muted
    },
    borderRadius: radius.sm,
    color: {
      default: null,
      '[data-highlighted]': colors.foreground,
      '[data-disabled]': colors.mutedForeground
    },
    cursor: 'default',
    display: 'flex',
    fontSize: fontSize.sm,
    gap: space.s2,
    lineHeight: lineHeight.control,
    outline: 'none',
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: space.s15,
    paddingInline: space.s2,
    position: 'relative',
    userSelect: 'none'
  },
  separator: {
    backgroundColor: colors.border,
    height: stroke.border,
    marginBlock: space.s1,
    marginInline: `calc(-1 * ${space.s1})`
  },
  shortcut: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  }
})
