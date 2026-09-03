import * as stylex from '@stylexjs/stylex'
import { space, stroke, container } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { radius } from '#/styles/core/size.stylex'

export const commandStyles = stylex.create({
  root: {
    backgroundColor: colors.popover,
    borderRadius: radius.xlarge,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    height: '100%',
    overflow: 'hidden',
    padding: space.s1,
    width: '100%'
  },
  dialogContent: {
    borderRadius: radius.xlarge,
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
    borderRadius: radius.large,
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
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
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
    fontSize: fontSize.body2,
    paddingBlock: space.s6,
    textAlign: 'center'
  },
  groupLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.caption1,
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
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.foreground,
      '[data-disabled]': colors.mutedForeground
    },
    cursor: 'default',
    display: 'flex',
    fontSize: fontSize.body2,
    gap: space.s2,
    lineHeight: fontLineHeight.body2,
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
    fontSize: fontSize.caption1,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  }
})
