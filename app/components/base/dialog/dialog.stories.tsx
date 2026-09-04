import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { container } from '#/styles/core/tokens.stylex'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog.component'

const meta = {
  title: 'Base Components/Dialog',
  component: Dialog,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    open: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Dialog>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  narrow: {
    width: container.md
  },
  content: {
    maxHeight: 'calc(100dvh - 64px)'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 12,
    minHeight: 0,
    overflowY: 'auto'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant='outline' />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The project and all of its data will be permanently
            removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Cancel</DialogClose>
          <DialogClose render={<Button variant='destructive' />}>Delete</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Custom: Story = {
  name: 'Custom width',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Rename</DialogTrigger>
      <DialogContent style={styles.narrow}>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>Give your project a new name.</DialogDescription>
        </DialogHeader>
        <Input defaultValue='madeui' />
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Scrollable: Story = {
  name: 'Scrollable content',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant='outline' />}>View terms</DialogTrigger>
      <DialogContent style={styles.content}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Last updated February 2026. Please read before continuing.
          </DialogDescription>
        </DialogHeader>
        <div {...stylex.props(styles.body)}>
          <p>
            1. Acceptance of terms. By accessing or using this service, you agree to be bound by
            these terms and all applicable laws and regulations.
          </p>
          <p>
            2. Use license. Permission is granted to temporarily use this service for personal,
            non-commercial purposes only. This is the grant of a license, not a transfer of title.
          </p>
          <p>
            3. Account responsibilities. You are responsible for maintaining the confidentiality of
            your account credentials and for all activity that occurs under your account.
          </p>
          <p>
            4. Service availability. We do not guarantee that the service will be uninterrupted,
            timely, secure, or error-free, and we reserve the right to modify or discontinue it at
            any time.
          </p>
          <p>
            5. Limitation of liability. In no event shall we be liable for any indirect, incidental,
            special, or consequential damages arising out of your use of the service.
          </p>
          <p>
            6. Changes to terms. We may revise these terms at any time. By continuing to use the
            service after changes take effect, you agree to the revised terms.
          </p>
          <p>
            7. Termination. We may suspend or terminate your access at any time, without notice, for
            conduct that violates these terms.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Decline</DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const NoCloseButton: Story = {
  name: 'No close button',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant='outline' />}>Open dialog</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm your email</DialogTitle>
          <DialogDescription>
            We sent a confirmation link to your inbox. This dialog only closes through the buttons
            below.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Resend later</DialogClose>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
