import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
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
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Empty>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia aria-hidden>📭</EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>Conversations appear here once people message you.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline'>Start a conversation</Button>
      </EmptyContent>
    </Empty>
  )
}
