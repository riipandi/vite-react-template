import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const itemStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    textAlign: 'left',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    fontSize: fontSizeVar.sm,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colorVar.borderNeutralFaded
    }
    // ans: child selectors `[a]:cursor-pointer`, `[a,button]:hover:bg-*` deferred
    // ans: `has-data-checked:*` compound selectors deferred
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spaceVar[1]
  },
  title: {
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  description: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.xs,
    lineHeight: 1.75
  },
  meta: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.xs,
    lineHeight: 1.75
  },
  media: {
    flexShrink: 0
    // ans: child selector `*:data-[slot=iconbox]:size-8` deferred
    // ans: child selector `[&_svg:not([class*=size-])]:size-4` deferred
  },
  action: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
    // ans: child selector `[&_svg:not([class*=size-])]:size-3.5` deferred
  }
})

export const itemVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase,
    borderWidth: 1,
    borderColor: colorVar.borderNeutral
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutralFaded
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  primary: {
    backgroundColor: colorVar.bgPrimaryFaded
  },
  'primary-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderPrimaryFaded
  },
  danger: {
    backgroundColor: colorVar.bgCriticalFaded
  },
  'danger-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderCriticalFaded
  },
  info: {
    backgroundColor: colorVar.bgPrimaryFaded
  },
  'info-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutralFaded
  },
  success: {
    backgroundColor: colorVar.bgPositiveFaded
  },
  'success-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderPositiveFaded
  },
  warning: {
    backgroundColor: colorVar.bgWarningFaded
  },
  'warning-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderWarningFaded
  },
  secondary: {
    backgroundColor: colorVar.bgNeutralFaded
  },
  'secondary-outline': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral
  }
})

export const itemSizes = stylex.create({
  sm: {
    gap: spaceVar[2],
    padding: spaceVar[3],
    borderRadius: radiusVar.sm
  },
  md: {
    gap: spaceVar[2],
    padding: spaceVar['3.5'],
    borderRadius: radiusVar.lg
  },
  lg: {
    gap: spaceVar[2],
    padding: spaceVar[4],
    borderRadius: radiusVar.xl
  }
})

export const itemDirections = stylex.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  }
})
