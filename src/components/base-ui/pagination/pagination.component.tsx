// oxlint-disable jsx-a11y/anchor-has-content

import './style.css'
import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../button'

function Pagination({
  rounded = false,
  ...props
}: React.ComponentProps<'nav'> & {
  rounded?: boolean
}) {
  return <nav aria-label='pagination' data-ui='pagination' data-rounded={rounded} {...props} />
}

function PaginationContent({ ...props }: React.ComponentProps<'ul'>) {
  return <ul data-ui='pagination-content' {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-ui='pagination-item' {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'asIcon'> &
  React.ComponentProps<'a'>

function PaginationLink({ isActive, asIcon = true, ...props }: PaginationLinkProps) {
  return (
    <Button
      mode='stroke'
      variant='neutral'
      data-active={isActive}
      size='md'
      asIcon={asIcon}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? 'page' : undefined}
          data-slot='pagination-link'
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({ children, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot='pagination-previous'
      aria-label='Go to previous page'
      asIcon={!children}
      {...props}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} />
      {children}
    </PaginationLink>
  )
}

function PaginationNext({ children, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot='pagination-next'
      aria-label='Go to next page'
      asIcon={!children}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} />
    </PaginationLink>
  )
}

function PaginationEllipsis({ ...props }: React.ComponentProps<'span'>) {
  return (
    <Button
      asIcon
      size='md'
      variant='neutral'
      mode='stroke'
      nativeButton={false}
      data-slot='pagination-ellipsis'
      render={
        <span aria-hidden {...props}>
          <HugeiconsIcon icon={MoreHorizontalIcon} />
        </span>
      }
    />
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
