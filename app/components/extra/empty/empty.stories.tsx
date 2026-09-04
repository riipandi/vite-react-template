import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { PackageIcon, SearchIcon, TextIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/extra/input-group'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from './empty.component'

const meta = {
  title: 'Extra Components/Empty',
  component: Empty,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Empty>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { height: 16, width: 16 },
  smallIcon: { height: 14, width: 14 },
  solidBorder: {
    // A solid outline instead of the default dashed border.
    borderStyle: 'solid'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <PackageIcon {...stylex.props(styles.icon)} />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects. Get started by creating your first one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Create project</Button>
      </EmptyContent>
    </Empty>
  )
}

export const Outline: Story = {
  render: () => (
    <Empty style={styles.solidBorder}>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <TextIcon {...stylex.props(styles.icon)} />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>You're all caught up. New messages will show up here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' size='sm'>
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export const WithAvatar: Story = {
  name: 'Avatar',
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar size='lg'>
            <AvatarImage src='https://github.com/madeui.png' alt='@madeui' />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>Invite people to collaborate on this project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Invite members</Button>
      </EmptyContent>
    </Empty>
  )
}

export const WithInputGroup: Story = {
  name: 'Input group',
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <SearchIcon {...stylex.props(styles.icon)} />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try searching for a different keyword.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup>
          <InputGroupInput placeholder='Search…' />
          <InputGroupAddon>
            <SearchIcon {...stylex.props(styles.smallIcon)} />
          </InputGroupAddon>
        </InputGroup>
      </EmptyContent>
    </Empty>
  )
}
