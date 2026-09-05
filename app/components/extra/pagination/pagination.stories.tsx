import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './pagination.component'

const meta = {
  title: 'Extra Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  iconOnly: {
    paddingInline: 8,
    width: 36
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#' isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: ({ canvas }) => {
    // Links render as buttons; the active page carries aria-current.
    expect(canvas.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
    expect(canvas.getByRole('button', { name: '1' }).getAttribute('aria-current')).toBeNull()
    expect(canvas.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument()
    expect(canvas.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument()
  }
}

export const Simple: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href='#' isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export const IconsOnly: Story = {
  name: 'Icons only',
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' text='' style={styles.iconOnly} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' text='' style={styles.iconOnly} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
