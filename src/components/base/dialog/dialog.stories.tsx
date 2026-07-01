import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '.'
import { IconBox } from '../../extra/icon-box'
import { Textarea } from '../../extra/textarea'
import { Button } from '../button'

const meta = {
  title: 'Base Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Send Owl</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>Send your message via owl post to Hogwarts.</DialogDescription>
          <Textarea placeholder='Enter your message' {...stylex.props(x.height['28rem'])} />
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <DialogClose render={<Button size='sm' />}>Send Owl</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

export const WithIconHeader: Story = {
  args: {},
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPopup>
        <DialogHeader>
          <IconBox size='sm'>
            <Lucide.MessageSquare />
          </IconBox>
          <DialogTitle>Decode the Message</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>Help Professor Langdon decode this ancient symbol.</DialogDescription>
          <Textarea placeholder='Enter your translation' />
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <DialogClose render={<Button size='sm' />}>Submit Solution</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
