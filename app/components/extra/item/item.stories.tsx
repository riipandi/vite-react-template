import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { HouseIcon, InfoIcon } from 'lucide-react'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
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
  { title: 'Patronus received', description: "Headmaster's office · 2 minutes ago" },
  { title: 'Howler received', description: 'On essay #482 · 1 hour ago' },
  { title: 'Polyjuice failed', description: "Moody's flask · yesterday" }
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
          <ItemTitle>Protego Totalum</ItemTitle>
          <ItemDescription>Add an extra layer of protection to the Burrow.</ItemDescription>
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
          <ItemTitle>Broom in stock</ItemTitle>
          <ItemDescription>Nimbus 2.4 is ready to order.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant='outline' size='sm'>
            Order
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
  play: async ({ canvas }) => {
    // Embedded controls stay interactive inside items.
    const protection = canvas.getByRole('switch')
    await userEvent.click(protection)
    expect(protection).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(canvas.getByRole('button', { name: 'Order' }))
  }
}

export const Variants: Story = {
  render: () => (
    <ItemGroup style={styles.group}>
      <Item variant='default'>
        <ItemContent>
          <ItemTitle>Madam Malkin's robes</ItemTitle>
          <ItemDescription>Standard fit, no embellishments.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Quidditch robes</ItemTitle>
          <ItemDescription>House colours with a bold border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='muted'>
        <ItemContent>
          <ItemTitle>Dress robes</ItemTitle>
          <ItemDescription>Soft tones for the Yule Ball.</ItemDescription>
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
          <ItemTitle>House-elf size</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant='outline' size='sm'>
        <ItemContent>
          <ItemTitle>First-year size</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant='outline' size='md'>
        <ItemContent>
          <ItemTitle>Hagrid size</ItemTitle>
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
            <AvatarImage src='https://github.com/madeui.png' alt='Luna Lovegood' />
            <AvatarFallback>LL</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Luna Lovegood</ItemTitle>
          <ItemDescription>Left a note in your Advanced Potion-Making.</ItemDescription>
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
        <ItemTitle>Marauder's Map</ItemTitle>
        <ItemDescription>Every corridor of Hogwarts, live on parchment.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /marauder's map/i })
    expect(link).toHaveAttribute('href', '#dashboard')
  }
}
