import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { unit } from '#/styles/core/tokens.stylex'

export const fieldStyles = stylex.create({
  set: {
    borderStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x4,
    margin: 0,
    minWidth: 0,
    padding: 0
  },
  legend: {
    fontWeight: fontWeight.medium,
    marginBottom: unit.x1_5,
    padding: 0
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x5,
    width: '100%'
  },
  field: {
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: unit.x2,
    width: '100%'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: unit.x0_5,
    lineHeight: fontLineHeight.body2
  },
  labelBase: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    userSelect: 'none'
  },
  label: {
    color: { default: null, '[data-invalid]': colors.destructive },
    lineHeight: fontLineHeight.body2,
    width: 'fit-content'
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    lineHeight: fontLineHeight.body2,
    width: 'fit-content'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0,
    textAlign: 'left'
  },
  separator: {
    lineHeight: fontLineHeight.body2,
    height: unit.x5,
    marginBlock: `calc(-1 * ${unit.x2})`,
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
    paddingInline: unit.x2,
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
    gap: unit.x1,
    listStyle: 'disc',
    margin: 0,
    paddingLeft: unit.x4
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
