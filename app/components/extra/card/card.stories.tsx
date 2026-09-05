import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
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
    width: container.xl
  },
  smallCard: {
    width: container.md
  }
})

export default meta

export const Playground: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card {...args} style={styles.card}>
      <CardHeader>
        <CardTitle>Submit to the Prophet</CardTitle>
        <CardDescription>Publish your story in the Daily Prophet with one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder='Headline' />
      </CardContent>
      <CardFooter>
        <Button>Publish</Button>
        <Button variant='ghost'>Discard</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvas }) => {
    expect(canvas.getByRole('heading', { name: 'Submit to the Prophet' })).toBeInTheDocument()

    // The form inside the card accepts typing.
    const input = canvas.getByPlaceholderText('Headline')
    await userEvent.type(input, 'Snape Walks the Aisles')
    expect(input).toHaveValue('Snape Walks the Aisles')
  }
}

export const Action: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card {...args} style={styles.card}>
      <CardHeader>
        <CardTitle>Howlers</CardTitle>
        <CardDescription>You have 3 unread howlers.</CardDescription>
        <CardAction>
          <Button size='sm' variant='ghost'>
            Burn all howlers
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>A red letter is smoking on the kitchen table.</p>
      </CardContent>
    </Card>
  )
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Card {...args} style={styles.smallCard}>
      <CardHeader>
        <CardTitle>Chocolate Frog card</CardTitle>
        <CardDescription>Tighter padding for your collectibles.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size='sm'>Collect</Button>
      </CardFooter>
    </Card>
  )
}
