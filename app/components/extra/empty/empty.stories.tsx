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
        <EmptyTitle>No potions brewed</EmptyTitle>
        <EmptyDescription>
          You haven't brewed anything yet. Start with a simple Cure for Boils.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Brew a potion</Button>
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
        <EmptyTitle>No owls today</EmptyTitle>
        <EmptyDescription>No letters from Hogwarts. New post will show up here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' size='sm'>
          Check the owlery
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
            <AvatarImage src='https://github.com/madeui.png' alt='Luna Lovegood' />
            <AvatarFallback>LL</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>No aurors found</EmptyTitle>
        <EmptyDescription>Recruit members for the Order of the Phoenix.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Send an owl</Button>
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
        <EmptyTitle>No spells found</EmptyTitle>
        <EmptyDescription>Try a different incantation.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup>
          <InputGroupInput placeholder='Search spells…' />
          <InputGroupAddon>
            <SearchIcon {...stylex.props(styles.smallIcon)} />
          </InputGroupAddon>
        </InputGroup>
      </EmptyContent>
    </Empty>
  )
}
