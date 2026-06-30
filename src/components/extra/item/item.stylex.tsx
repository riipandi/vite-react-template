import * as stylex from '@stylexjs/stylex'

export const itemStyles = stylex.create({
  base: {},
  content: {},
  title: {},
  description: {},
  meta: {},
  media: {},
  action: {}
})

export const itemVariants = stylex.create({
  default: {},
  outline: {},
  ghost: {},
  primary: {},
  'primary-outline': {},
  danger: {},
  'danger-outline': {},
  info: {},
  'info-outline': {},
  success: {},
  'success-outline': {},
  warning: {},
  'warning-outline': {},
  secondary: {},
  'secondary-outline': {}
})

export const itemSizes = stylex.create({
  sm: {},
  md: {},
  lg: {}
})

export const itemDirections = stylex.create({
  row: {},
  column: {}
})
