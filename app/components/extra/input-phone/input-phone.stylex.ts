import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { unit, radius, container } from '#/styles/core/tokens.stylex'

export const inputPhoneStyles = stylex.create({
  // The digits sit right of the country selector inside the group. The bare
  // Input ships its own border/focus ring — neutralize both (border transparent
  // in every state, outline gone) so the InputGroup is the single source of
  // border + focus-within ring. Radius is flat: the group owns rounding.
  control: {
    borderColor: {
      default: 'transparent',
      ':focus-visible': 'transparent',
      '[data-invalid]': 'transparent'
    },
    borderRadius: 0,
    outline: {
      default: 'none',
      ':focus-visible': 'none'
    }
  },
  // Country trigger shown inside the group, left of the digits. Ghost button
  // look — the InputGroup owns the border and focus ring (via :focus-within).
  // Sized to content: overrides the ComboboxTrigger's select-like
  // `minWidth`/`space-between` since only a flag icon is shown.
  countryTrigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    fontFamily: 'inherit',
    gap: unit.x1,
    height: '100%',
    justifyContent: 'center',
    minWidth: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    paddingInline: unit.x2,
    position: 'relative',
    // Visually separate the selector from the digits with a divider.
    '::after': {
      backgroundColor: colors.borderNeutralFaded,
      content: '""',
      height: unit.x5,
      position: 'absolute',
      right: 0,
      width: 1
    }
  },
  flag: {
    alignItems: 'center',
    borderRadius: radius.small,
    display: 'flex',
    height: unit.x4,
    justifyContent: 'center',
    overflow: 'hidden',
    width: unit.x4
  },
  flagFallback: {
    height: unit.x4,
    opacity: 0.6,
    width: unit.x4
  },
  countryLabel: {
    flex: 1
  },
  countryCode: {
    color: colors.foregroundNeutralFaded
  },
  // Popup width follows the container token (not the anchor trigger, which is
  // only as wide as the flag).
  popup: {
    width: container.xsmall
  },
  // Popup search input — full width of the popup, sits above the list.
  countrySearch: {
    paddingBlock: unit.x1_5,
    width: '100%'
  }
})
