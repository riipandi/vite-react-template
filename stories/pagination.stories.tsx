import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from '#/components/base/pagination'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: {
    rounded: { control: 'boolean' }
  },
  tags: [],
  args: {}
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center',
    minWidth: '20rem'
  }
})

export const Playground: Story = {
  args: { rounded: false },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='pagination-playground-wrapper'>
      <Pagination id='pagination-playground' {...args}>
        <PaginationContent id='pagination-content-playground'>
          <PaginationItem id='pagination-item-prev-playground'>
            <PaginationPrevious id='pagination-prev-playground' href='#' />
          </PaginationItem>
          <PaginationItem id='pagination-item-1-playground'>
            <PaginationLink id='pagination-link-1-playground' href='#' isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-2-playground'>
            <PaginationLink id='pagination-link-2-playground' href='#'>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-3-playground'>
            <PaginationLink id='pagination-link-3-playground' href='#'>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-ellipsis-playground'>
            <PaginationEllipsis id='pagination-ellipsis-playground' />
          </PaginationItem>
          <PaginationItem id='pagination-item-8-playground'>
            <PaginationLink id='pagination-link-8-playground' href='#'>
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-9-playground'>
            <PaginationLink id='pagination-link-9-playground' href='#'>
              9
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-10-playground'>
            <PaginationLink id='pagination-link-10-playground' href='#'>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-next-playground'>
            <PaginationNext id='pagination-next-playground' href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='pagination-default-wrapper'>
      <Pagination id='pagination-default'>
        <PaginationContent id='pagination-content-default'>
          <PaginationItem id='pagination-item-prev-default'>
            <PaginationPrevious id='pagination-prev-default' href='#' />
          </PaginationItem>
          <PaginationItem id='pagination-item-1-default'>
            <PaginationLink id='pagination-link-1-default' href='#' isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-2-default'>
            <PaginationLink id='pagination-link-2-default' href='#'>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-3-default'>
            <PaginationLink id='pagination-link-3-default' href='#'>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-ellipsis-default'>
            <PaginationEllipsis id='pagination-ellipsis-default' />
          </PaginationItem>
          <PaginationItem id='pagination-item-8-default'>
            <PaginationLink id='pagination-link-8-default' href='#'>
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-9-default'>
            <PaginationLink id='pagination-link-9-default' href='#'>
              9
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-10-default'>
            <PaginationLink id='pagination-link-10-default' href='#'>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem id='pagination-item-next-default'>
            <PaginationNext id='pagination-next-default' href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
