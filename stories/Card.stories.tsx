import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '#/components/ui/card'
import { Container } from '#/components/ui/container'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'This is a card with default styling.',
  },
}

export const InsideContainer: Story = {
  render: (args) => (
    <Container>
      <Card {...args} />
    </Container>
  ),
  args: {
    children: 'A card placed inside a container component.',
  },
}
