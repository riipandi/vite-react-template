import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '#/components/base/dialog'
import { Input } from '#/components/base/input'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[1.5]
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[1],
    marginBottom: space[3]
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: space[2]
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>
              This is a simple dialog with a title, description, and close button. You can put any
              content inside the dialog body.
            </DialogDescription>
          </DialogHeader>
          <div>
            <p>Dialog body content goes here.</p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant='neutral' mode='stroke'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const WithForm: Story = {
  name: 'With form',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Dialog>
        <DialogTrigger>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div {...stylex.props(layoutStyles.formRow)}>
              <label {...stylex.props(layoutStyles.formField)} htmlFor='dialog-form-name'>
                Name
                <Input id='dialog-form-name' placeholder='Enter your name' />
              </label>
            </div>
            <div {...stylex.props(layoutStyles.formRow)}>
              <label {...stylex.props(layoutStyles.formField)} htmlFor='dialog-form-email'>
                Email
                <Input id='dialog-form-email' type='email' placeholder='Enter your email' />
              </label>
            </div>
          </div>
          <DialogFooter showCloseButton={false}>
            <div {...stylex.props(layoutStyles.actions)}>
              <DialogClose>
                <Button variant='neutral' mode='stroke'>
                  Cancel
                </Button>
              </DialogClose>
              <Button>Save changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
