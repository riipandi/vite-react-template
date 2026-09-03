import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { toast, ToastProvider, Toaster } from './toast.component'

const meta = {
  title: 'Base Components/Toast',
  component: ToastProvider,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ToastProvider>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <ToastProvider>
      <div {...stylex.props(atoms.display.flex, atoms.gap['8px'])}>
        <Button variant='outline' onClick={() => toast('Saved')}>
          Show toast
        </Button>
        <Button
          variant='outline'
          onClick={() => toast.success('Saved', { description: 'Changes persisted.' })}
        >
          Show success
        </Button>
        <Button
          variant='outline'
          onClick={() => toast.error('Failed', { description: 'Try again later.' })}
        >
          Show error
        </Button>
      </div>
      <Toaster />
    </ToastProvider>
  )
}
