import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { CheckIcon } from 'lucide-react'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from './avatar.component'

const meta = {
  title: 'Base Components/Avatar',
  component: Avatar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Avatar>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  badgeIcon: { height: 12, width: 12 }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://github.com/madeui.png' alt='@harry.potter' />
      <AvatarFallback>HP</AvatarFallback>
    </Avatar>
  )
}

export const Sizes: Story = {
  render: () => (
    <div
      {...stylex.props(
        atoms.display.flex,
        atoms.alignItems.center,
        atoms.flexWrap.wrap,
        atoms.gap['8px']
      )}
    >
      <Avatar size='sm'>
        <AvatarFallback>HP</AvatarFallback>
      </Avatar>
      <Avatar size='md'>
        <AvatarFallback>RW</AvatarFallback>
      </Avatar>
      <Avatar size='lg'>
        <AvatarFallback>HG</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://example.com/broken.png' alt='Vanished portrait' />
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  )
}

export const Badge: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.gap['24px'])}>
      <Avatar>
        <AvatarImage src='https://github.com/madeui.png' alt='@luna.lovegood' />
        <AvatarFallback>LL</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarImage src='https://github.com/github.png' alt='@hermione.granger' />
        <AvatarFallback>HG</AvatarFallback>
        <AvatarBadge>
          <CheckIcon {...stylex.props(styles.badgeIcon)} />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src='https://github.com/madeui.png' alt='@harry.potter' />
        <AvatarFallback>HP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src='https://github.com/github.png' alt='@ron.weasley' />
        <AvatarFallback>RW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src='https://github.com/vercel.png' alt='@hermione.granger' />
        <AvatarFallback>HG</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}

export const GroupCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src='https://github.com/madeui.png' alt='@harry.potter' />
        <AvatarFallback>HP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src='https://github.com/github.png' alt='@ron.weasley' />
        <AvatarFallback>RW</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
