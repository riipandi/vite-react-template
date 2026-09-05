import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb.component'

const meta = {
  title: 'Extra Components/Breadcrumb',
  component: Breadcrumb,
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
} satisfies Meta<typeof Breadcrumb>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  trigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    padding: 0
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Louvre</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='/docs/components'>Sistine Chapel</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Vatican Archives</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  // The current page carries aria-current; ancestors are plain links.
  play: ({ canvas }) => {
    expect(canvas.getByRole('link', { name: 'Louvre' })).toBeInTheDocument()
    const current = canvas.getByRole('link', { name: 'Vatican Archives' })
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).toHaveAttribute('aria-disabled', 'true')
  }
}

export const Ellipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Great Hall</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Potions classroom</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const Dropdown: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Hogwarts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label='Collapsed breadcrumb levels'
              {...stylex.props(styles.trigger)}
            >
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem>Marauder's Map</DropdownMenuItem>
              <DropdownMenuItem>Daily Prophet</DropdownMenuItem>
              <DropdownMenuItem>Gringotts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='/docs/components'>Diagon Alley</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Honeydukes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Collapsed breadcrumb levels' }))
    await body.findByRole('menu')
    expect(body.getByRole('menuitem', { name: "Marauder's Map" })).toBeInTheDocument()

    await userEvent.click(body.getByRole('menuitem', { name: 'Gringotts' }))
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull())
  }
}

export const CustomSeparator: Story = {
  name: 'Custom separator',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Hogsmeade</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href='/docs'>Zonko's Joke Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Honeydukes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
