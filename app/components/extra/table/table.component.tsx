import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { tableStyles as s } from './table.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function Table({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'table'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <div {...stylex.props(s.container)}>
      <table {...props} {...stylex.props(s.table, style)} />
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
  return <tfoot {...props} {...stylex.props(s.footer, style)} />
}

export function TableRow({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'tr'>, 'className' | 'style'> & StyleXStyleProps) {
  return <tr {...props} {...stylex.props(s.row, style)} />
}

export function TableHead({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'th'>, 'className' | 'style'> & StyleXStyleProps) {
  return <th {...props} {...stylex.props(s.head, style)} />
}

export function TableCell({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'td'>, 'className' | 'style'> & StyleXStyleProps) {
  return <td {...props} {...stylex.props(s.cell, style)} />
}

export function TableCaption({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'caption'>, 'className' | 'style'> & StyleXStyleProps) {
  return <caption {...props} {...stylex.props(s.caption, style)} />
}
