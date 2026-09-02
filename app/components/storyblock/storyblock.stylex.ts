import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontFamilyVar, fontWeightVar, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Example styles
// ---------------------------------------------------------------------------

const example = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit['x0.5'],
    padding: unit.x4,
    backgroundColor: colors.backgroundPage,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutralFaded
  },
  title: {
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.semibold,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    color: colors.foregroundNeutral,
    marginBlock: 0,
    marginInline: 0
  }
})

// ---------------------------------------------------------------------------
// ExampleItem styles
// ---------------------------------------------------------------------------

const exampleItem = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit['x0.5']
  },
  title: {
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.regular,
    fontSize: fontSize.caption2,
    lineHeight: fontLineHeight.caption2,
    marginBlock: 0,
    marginInline: 0
  },
  titleNeutral: {
    color: colors.foregroundNeutral
  },
  titleFaded: {
    color: colors.foregroundNeutralFaded
  }
})

// ---------------------------------------------------------------------------
// Placeholder styles
// ---------------------------------------------------------------------------

const placeholder = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundNeutralFaded,
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamilyVar.body,
    fontWeight: fontWeightVar.regular,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    borderRadius: radius.small,
    overflow: 'hidden'
  },
  inverted: {
    backgroundColor: colors.backgroundPrimaryFaded,
    color: colors.foregroundPrimary
  }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const storyblockStyles = {
  example,
  exampleItem,
  placeholder
} as const
