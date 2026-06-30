/**
 * A container component for grouping related content and actions.
 *
 * Anatomy:
 * <Card>
 *   <CardHeader>
 *     <CardTitle />
 *     <CardDescription />
 *   </CardHeader>
 *   <CardBody />
 *   <CardFooter />
 * </Card>
 */

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cardAligns, cardStyles, cardVariants } from './card.stylex'

export type CardVariant = keyof typeof cardVariants
export type CardAlign = keyof typeof cardAligns

export type CardProps = React.ComponentProps<'div'> & {
  variant?: CardVariant
  xstyle?: StyleXStyles
}
export type CardHeaderProps = React.ComponentProps<'header'> & {
  align?: CardAlign
  xstyle?: StyleXStyles
}

export function Card({ variant = 'default', xstyle, ...props }: CardProps) {
  return (
    <div
      data-slot='card'
      {...stylex.props(cardStyles.base, cardVariants[variant], xstyle)}
      {...props}
    />
  )
}

export function CardHeader({ align = 'default', xstyle, ...props }: CardHeaderProps) {
  return (
    <header
      data-slot='card-header'
      {...stylex.props(cardStyles.header, cardAligns[align], xstyle)}
      {...props}
    />
  )
}

export function CardHeaderAction({
  xstyle,
  ...props
}: React.ComponentProps<'div'> & { xstyle?: StyleXStyles }) {
  return (
    <div
      data-slot='card-header-action'
      {...stylex.props(cardStyles.headerAction, xstyle)}
      {...props}
    />
  )
}

export function CardTitle({
  children,
  xstyle,
  ...props
}: React.ComponentProps<'h3'> & { xstyle?: StyleXStyles }) {
  return (
    <h3 data-slot='card-title' {...stylex.props(cardStyles.title, xstyle)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({
  xstyle,
  ...props
}: React.ComponentProps<'p'> & { xstyle?: StyleXStyles }) {
  return (
    <p data-slot='card-description' {...stylex.props(cardStyles.description, xstyle)} {...props} />
  )
}

export function CardBody({
  xstyle,
  ...props
}: React.ComponentProps<'div'> & { xstyle?: StyleXStyles }) {
  return <div data-slot='card-body' {...stylex.props(cardStyles.body, xstyle)} {...props} />
}

export function CardFooter({
  xstyle,
  ...props
}: React.ComponentProps<'div'> & { xstyle?: StyleXStyles }) {
  return <div data-slot='card-footer' {...stylex.props(cardStyles.footer, xstyle)} {...props} />
}
