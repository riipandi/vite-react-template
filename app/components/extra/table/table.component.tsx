import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, font } from '#/lib/tokens.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function Table({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'table'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <table {...props} {...stylex.props(styles.table, style)} />
    </div>
  )
}

export function TableHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'thead'>, 'className' | 'style'> & StyleXStyleProps) {
  return <thead {...props} {...stylex.props(style)} />
}

export function TableBody({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'tbody'>, 'className' | 'style'> & StyleXStyleProps) {
  return <tbody {...props} {...stylex.props(style)} />
}

export function TableFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'tfoot'>, 'className' | 'style'> & StyleXStyleProps) {
  return <tfoot {...props} {...stylex.props(styles.footer, style)} />
}

export function TableRow({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'tr'>, 'className' | 'style'> & StyleXStyleProps) {
  return <tr {...props} {...stylex.props(styles.row, style)} />
}

export function TableHead({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'th'>, 'className' | 'style'> & StyleXStyleProps) {
  return <th {...props} {...stylex.props(styles.head, style)} />
}

export function TableCell({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'td'>, 'className' | 'style'> & StyleXStyleProps) {
  return <td {...props} {...stylex.props(styles.cell, style)} />
}

export function TableCaption({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'caption'>, 'className' | 'style'> & StyleXStyleProps) {
  return <caption {...props} {...stylex.props(styles.caption, style)} />
}

const styles = stylex.create({
  container: {
    overflowX: 'auto',
    position: 'relative',
    width: '100%'
  },
  table: {
    borderCollapse: 'collapse',
    captionSide: 'bottom',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.control,
    width: '100%'
  },
  row: {
    backgroundColor: {
      default: 'transparent',
      ':hover': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    // The header row keeps its bottom border; the last body row's border is
    // dropped on the last row.
    borderBottomColor: colors.border,
    borderBottomStyle: { default: 'solid', ':last-child': 'none' },
    borderBottomWidth: { default: stroke.border, ':last-child': 0 },
    transitionDuration: duration.fast,
    transitionProperty: 'background-color'
  },
  head: {
    // The header row is the :last-child of its <thead>, so the row-level
    // border removal would strip it — draw the header border on the cells
    // instead (border-collapse merges them into one line).
    borderBottomColor: colors.border,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    color: colors.foreground,
    fontWeight: fontWeight.medium,
    height: space.s10,
    paddingInline: space.s2,
    textAlign: 'left',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  },
  cell: {
    padding: space.s2,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  },
  footer: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    fontWeight: fontWeight.medium
  },
  caption: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    marginTop: space.s4
  }
})
