import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '#/components/base/breadcrumb'

const meta = {
  title: 'Component/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Breadcrumb id='breadcrumb-playground'>
      <BreadcrumbList id='breadcrumb-playground-list'>
        <BreadcrumbItem id='breadcrumb-playground-item-1'>
          <BreadcrumbLink id='breadcrumb-playground-link-1' href='#'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-playground-sep-1' />
        <BreadcrumbItem id='breadcrumb-playground-item-2'>
          <BreadcrumbLink id='breadcrumb-playground-link-2' href='#'>
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-playground-sep-2' />
        <BreadcrumbItem id='breadcrumb-playground-item-3'>
          <BreadcrumbLink id='breadcrumb-playground-link-3' href='#'>
            Category
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-playground-sep-3' />
        <BreadcrumbItem id='breadcrumb-playground-item-4'>
          <BreadcrumbLink id='breadcrumb-playground-link-4' href='#'>
            Item
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <Breadcrumb id='breadcrumb-default'>
      <BreadcrumbList id='breadcrumb-default-list'>
        <BreadcrumbItem id='breadcrumb-default-item-1'>
          <BreadcrumbLink id='breadcrumb-default-link-1' href='#'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-default-sep-1' />
        <BreadcrumbItem id='breadcrumb-default-item-2'>
          <BreadcrumbEllipsis id='breadcrumb-default-ellipsis' />
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-default-sep-2' />
        <BreadcrumbItem id='breadcrumb-default-item-3'>
          <BreadcrumbLink id='breadcrumb-default-link-3' href='#'>
            Category
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator id='breadcrumb-default-sep-3' />
        <BreadcrumbItem id='breadcrumb-default-item-4'>
          <BreadcrumbLink id='breadcrumb-default-link-4' href='#'>
            Item
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
