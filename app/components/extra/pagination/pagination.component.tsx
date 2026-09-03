import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonSize } from '#/components/base/button'
import { space, fontSize } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

interface StyleXStyleProps {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function Pagination({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'nav'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      {...props}
      {...stylex.props(styles.nav, style)}
    />
  )
}

export function PaginationContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'ul'>, 'className' | 'style'> & StyleXStyleProps) {
  return <ul {...props} {...stylex.props(styles.content, style)} />
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
      style={[styles.previous, style]}
    >
      <Chevron direction='left' />
      <span {...stylex.props(styles.linkText)}>{text}</span>
    </PaginationLink>
  )
}

export function PaginationNext({
  text = 'Next',
  style,
  ...props
}: Omit<PaginationLinkProps, 'size'> & { text?: string }) {
  return (
    <PaginationLink aria-label='Go to next page' size='md' {...props} style={[styles.next, style]}>
      <span {...stylex.props(styles.linkText)}>{text}</span>
      <Chevron direction='right' />
    </PaginationLink>
  )
}

export function PaginationEllipsis({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleXStyleProps) {
  return (
    <span aria-hidden {...props} {...stylex.props(styles.ellipsis, style)}>
      <svg width='16' height='16' viewBox={`0 0 16 16`} fill='currentColor' aria-hidden>
        <circle cx='3' cy='8' r='1.25' />
        <circle cx='8' cy='8' r='1.25' />
        <circle cx='13' cy='8' r='1.25' />
      </svg>
      <span {...stylex.props(styles.srOnly)}>More pages</span>
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

const styles = stylex.create({
  nav: {
    display: 'flex',
    fontFamily: font.sans,
    justifyContent: 'center',
    marginInline: 'auto',
    width: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s05,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  previous: {
    paddingLeft: space.s15
  },
  next: {
    paddingRight: space.s15
  },
  linkText: {
    display: {
      default: 'none',
      '@media (min-width: 640px)': 'block'
    }
  },
  ellipsis: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.sm,
    height: space.s8,
    justifyContent: 'center',
    width: space.s8
  },
  srOnly: {
    clip: 'rect(0 0 0 0)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
})
