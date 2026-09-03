import * as stylex from '@stylexjs/stylex'
import { space, lineHeight } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'

export const fieldStyles = stylex.create({
  set: {
    borderStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s4,
    margin: 0,
    minWidth: 0,
    padding: 0
  },
  legend: {
    fontWeight: fontWeight.medium,
    marginBottom: space.s15,
    padding: 0
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s5,
    width: '100%'
  },
  field: {
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: space.s2,
    width: '100%'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.s05,
    lineHeight: lineHeight.snug
  },
  labelBase: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    userSelect: 'none'
  },
  label: {
    color: { default: null, '[data-invalid]': colors.destructive },
    lineHeight: lineHeight.snug,
    width: 'fit-content'
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.snug,
    width: 'fit-content'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: lineHeight.normal,
    margin: 0,
    textAlign: 'left'
  },
  separator: {
    fontSize: fontSize.body2,
    height: space.s5,
    marginBlock: `calc(-1 * ${space.s2})`,
    position: 'relative'
  },
  separatorLine: {
    inset: 0,
    position: 'absolute',
    top: '50%'
  },
  separatorContent: {
    backgroundColor: colors.background,
    color: colors.mutedForeground,
    display: 'block',
    marginInline: 'auto',
    paddingInline: space.s2,
    position: 'relative',
    width: 'fit-content'
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.body2
  },
  errorList: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s1,
    listStyle: 'disc',
    margin: 0,
    paddingLeft: space.s4
  }
})

export const fieldLegendVariants = stylex.create({
  legend: {
    fontSize: fontSize.body1
  },
  label: {
    fontSize: fontSize.body2
  }
})

export const fieldOrientations = stylex.create({
  vertical: {
    flexDirection: 'column'
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
