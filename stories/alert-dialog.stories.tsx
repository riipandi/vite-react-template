import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogClose
} from '#/components/base/alert-dialog'
import { Button } from '#/components/base/button'

const meta = {
  title: 'Component/AlertDialog',
  component: AlertDialog,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
      <AlertDialogContent showCloseButton>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed with this action? This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div data-ui='dialog-footer'>
          <div>
            <AlertDialogClose render={<Button variant='primary'>Confirm</Button>} />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
