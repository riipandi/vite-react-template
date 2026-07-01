import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  fontSizeVar,
  fontWeightVar,
  spaceVar,
  shadowVar,
  radiusVar
} from '#/styles/tokens.stylex'

export const cardStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: spaceVar[2],
    paddingInline: spaceVar[6],
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4]
    // ans: `paddingBlock` not supported in StyleX 0.19 — using paddingTop+Bottomas
    // ans: `has-[svg]`, `has-data-[slot=iconbox]`, `**:[...]` child selectors deferred
    // ans: `not-[:has([data-slot=iconbox])]:items-center` deferred
    // ans: `*:[[data-slot=card-title]:not(:has(+*))]:row-span-2` deferred
  },
  headerAction: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
    // ans: `gridColumn: 3, gridRow: span 2, gridRowStart: 1` not supported in StyleX 0.19
  },
  title: {
    fontSize: fontSizeVar.lg,
    lineHeight: 1.25,
    fontWeight: fontWeightVar.semibold
  },
  description: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.sm
  },
  body: {
    padding: spaceVar[6]
    // ans: child selectors for `*:data-[slot=item]`, `*:data-[slot=stack]` deferred
    // ans: `not-[:has(caption)]:[&_tbody>tr:last-child>td]` rounded corners deferred
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    backgroundColor: colorVar.bgElevationRaised,
    borderColor: colorVar.borderNeutralFaded,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    paddingInline: spaceVar[6],
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4]
    // ans: `borderBottomEndRadius`, `borderBottomStartRadius` not supported in StyleX 0.19
  }
})

export const cardVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    borderRadius: radiusVar.md,
    boxShadow: shadowVar.raised
  },
  ghost: {}
})

export const cardAligns = stylex.create({
  default: {},
  center: {
    justifyContent: 'center',
    textAlign: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  }
})
