import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { HouseIcon, InfoIcon } from 'lucide-react'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { Switch } from '#/components/base/switch'
import { container } from '#/styles/core/tokens.stylex'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from './item.component'

const meta = {
  title: 'Extra Components/Item',
  component: Item,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline', 'muted'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Item>

type Story = StoryObj<typeof meta>

const activity = [
  { title: 'Deploy succeeded', description: 'Production · 2 minutes ago' },
  { title: 'New comment', description: 'On issue #482 · 1 hour ago' },
  { title: 'Build failed', description: 'staging branch · yesterday' }
]

const styles = stylex.create({
  icon: { height: 16, width: 16 },
  group: {
    maxWidth: container.xl
  }
})

export default meta

export const Playground: Story = {
  args: { variant: 'outline' },
  render: () => (
    <ItemGroup style={styles.group}>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Two-factor authentication</ItemTitle>
          <ItemDescription>Add an extra layer of security to your account.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch defaultChecked />
        </ItemActions>
      </Item>
      <Item variant='muted'>
        <ItemMedia variant='icon'>
          <InfoIcon {...stylex.props(styles.icon)} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Update available</ItemTitle>
          <ItemDescription>Version 2.4 is ready to install.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant='outline' size='sm'>
            Install
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

export const Variants: Story = {
  render: () => (
    <ItemGroup style={styles.group}>
      <Item variant='default'>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>A borderless row.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>A bordered row.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='muted'>
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>A tinted background row.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

export const Sizes: Story = {
  render: () => (
    <ItemGroup style={styles.group}>
      <Item variant='outline' size='xs'>
        <ItemContent>
          <ItemTitle>Extra small</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant='outline' size='sm'>
        <ItemContent>
          <ItemTitle>Small</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant='outline' size='md'>
        <ItemContent>
          <ItemTitle>Medium</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

export const WithAvatar: Story = {
  name: 'Avatar',
  render: () => (
    <ItemGroup style={styles.group}>
      <Item variant='outline'>
        <ItemMedia>
          <Avatar>
            <AvatarImage src='https://github.com/madeui.png' alt='@madeui' />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>madeui</ItemTitle>
          <ItemDescription>Left a comment on your pull request.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

export const Group: Story = {
  render: () => (
    <ItemGroup style={styles.group}>
      {activity.map((entry, index) => (
        <React.Fragment key={entry.title}>
          <Item>
            <ItemContent>
              <ItemTitle>{entry.title}</ItemTitle>
              <ItemDescription>{entry.description}</ItemDescription>
            </ItemContent>
          </Item>
          {index < activity.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  )
}

export const Link: Story = {
  render: () => (
    // The `render` prop swaps the underlying element — here an <a>, so hover and
    // focus states apply to the anchor.
    <Item variant='outline' render={<a href='#dashboard' />}>
      <ItemMedia variant='icon'>
        <HouseIcon {...stylex.props(styles.icon)} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Dashboard</ItemTitle>
        <ItemDescription>Overview of your account and activity.</ItemDescription>
      </ItemContent>
    </Item>
  )
}
