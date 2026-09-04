import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { toast, ToastProvider, Toaster, useToast } from './toast.component'

const meta = {
  title: 'Base Components/Toast',
  component: ToastProvider,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ToastProvider>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  topLeft: {
    bottom: null,
    right: null,
    left: 16,
    top: 16
  }
})

function save() {
  return new Promise<void>((resolve) => setTimeout(resolve, 2000))
}

function DurationButton() {
  const toastApi = useToast()

  return (
    <Button
      variant='outline'
      onClick={() =>
        toastApi.add({
          title: 'Sticky toast',
          description: 'Stays for 10 seconds.',
          timeout: 10000
        })
      }
    >
      Show sticky toast
    </Button>
  )
}

export default meta

export const Playground: Story = {
  render: () => (
    <ToastProvider>
      <Button
        variant='outline'
        onClick={() =>
          toast('Scheduled: Catch up', {
            description: 'Friday, February 10 at 5:57 PM'
          })
        }
      >
        Show toast
      </Button>
      <Toaster />
    </ToastProvider>
  )
}

export const ToastPromise: Story = {
  name: 'Promise',
  render: () => (
    <ToastProvider>
      <Button
        variant='outline'
        onClick={() =>
          toast.promise(save(), {
            loading: 'Saving…',
            success: 'Changes saved',
            error: 'Could not save'
          })
        }
      >
        Save with toast.promise
      </Button>
      <Toaster />
    </ToastProvider>
  )
}

export const Duration: Story = {
  render: () => (
    <ToastProvider>
      <DurationButton />
      <Toaster />
    </ToastProvider>
  )
}

export const Types: Story = {
  render: () => (
    <ToastProvider>
      <div {...stylex.props(styles.row)}>
        <Button
          variant='outline'
          onClick={() => toast('Event created', { description: 'Team sync at 3 PM.' })}
        >
          Default
        </Button>
        <Button variant='outline' onClick={() => toast.success('Changes saved')}>
          Success
        </Button>
        <Button
          variant='outline'
          onClick={() => toast.error('Could not save', { description: 'Try again.' })}
        >
          Error
        </Button>
      </div>
      <Toaster />
    </ToastProvider>
  )
}

export const Action: Story = {
  render: () => (
    <ToastProvider>
      <Button
        variant='outline'
        onClick={() =>
          toast('Message archived', {
            actionProps: {
              children: 'Undo',
              onClick: () => toast('Message restored')
            }
          })
        }
      >
        Archive message
      </Button>
      <Toaster />
    </ToastProvider>
  )
}

export const Position: Story = {
  render: () => (
    <ToastProvider>
      <Button variant='outline' onClick={() => toast('Synced to top left')}>
        Show toast
      </Button>
      <Toaster style={styles.topLeft} />
    </ToastProvider>
  )
}
