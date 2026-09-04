import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { container } from '#/styles/core/tokens.stylex'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './card.component'

const meta = {
  title: 'Extra Components/Card',
  component: Card,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  card: {
    width: container.md
  },
  smallCard: {
    width: container.sm
  }
})

export default meta

export const Playground: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card {...args} style={styles.card}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder='Project name' />
      </CardContent>
      <CardFooter>
        <Button>Deploy</Button>
        <Button variant='ghost'>Cancel</Button>
      </CardFooter>
    </Card>
  )
}

export const Action: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card {...args} style={styles.card}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button size='sm' variant='ghost'>
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>New comment on your pull request.</p>
      </CardContent>
    </Card>
  )
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Card {...args} style={styles.smallCard}>
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Tighter padding for dense layouts.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size='sm'>Continue</Button>
      </CardFooter>
    </Card>
  )
}
