import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Avatar, AvatarFallback, AvatarImage } from './avatar.component'

const meta = {
  title: 'Base Components/Avatar',
  component: Avatar,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Avatar>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src='https://avatars.githubusercontent.com/u/6282082?v=4' alt='@riipandi' />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
  )
}
