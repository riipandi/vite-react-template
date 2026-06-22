import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '#/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'destructive'],
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully!',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please check your input before submitting.',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'An error occurred while processing your request.',
  },
}
