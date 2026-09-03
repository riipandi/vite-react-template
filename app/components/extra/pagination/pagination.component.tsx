import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonSize } from '#/components/base/button'
import { paginationStyles as s } from './pagination.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function Pagination({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'nav'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <nav role='navigation' aria-label='pagination' {...props} {...stylex.props(s.nav, style)} />
  )
}

export function PaginationContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'ul'>, 'className' | 'style'> & StyleXStyleProps) {
  return <ul {...props} {...stylex.props(s.content, style)} />
}

export function PaginationItem({ ...props }: React.ComponentPropsWithoutRef<'li'>) {
  return <li {...props} />
}

export interface PaginationLinkProps
  extends Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'style'>, StyleXStyleProps {
  isActive?: boolean
  size?: ButtonSize
}

export function PaginationLink({ isActive, size = 'icon', style, ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      nativeButton={false}
      render={<a aria-current={isActive ? 'page' : undefined} {...props} />}
      style={style}
    />
  )
}

export function PaginationPrevious({
  text = 'Previous',
  style,
  ...props
}: Omit<PaginationLinkProps, 'size'> & { text?: string }) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='md'
      {...props}
      style={[s.previous, style]}
    >
      <Chevron direction='left' />
      <span {...stylex.props(s.linkText)}>{text}</span>
    </PaginationLink>
  )
}

export function PaginationNext({
  text = 'Next',
  style,
  ...props
}: Omit<PaginationLinkProps, 'size'> & { text?: string }) {
  return (
    <PaginationLink aria-label='Go to next page' size='md' {...props} style={[s.next, style]}>
      <span {...stylex.props(s.linkText)}>{text}</span>
      <Chevron direction='right' />
    </PaginationLink>
  )
}

export function PaginationEllipsis({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <span aria-hidden {...props} {...stylex.props(s.ellipsis, style)}>
      <svg width='16' height='16' viewBox={`0 0 16 16`} fill='currentColor' aria-hidden>
        <circle cx='3' cy='8' r='1.25' />
        <circle cx='8' cy='8' r='1.25' />
        <circle cx='13' cy='8' r='1.25' />
      </svg>
      <span {...stylex.props(s.srOnly)}>More pages</span>
    </span>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width='16'
      height='16'
      viewBox={`0 0 16 16`}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d={direction === 'left' ? `m10 3-5 5 5 5` : `m6 3 5 5-5 5`} />
    </svg>
  )
}
