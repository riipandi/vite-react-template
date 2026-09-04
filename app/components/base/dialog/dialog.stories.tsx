import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { container, fontSize, unit } from '#/styles/core/tokens.stylex'
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
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
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
    fontSize: fontSize.body2,
    paddingRight: unit.x4,
    overflowY: 'auto'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant='outline' />}>Open the cryptex</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Erase the map?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The Marauder&apos;s Map and all of its secret passages
            will be permanently wiped.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Cancel</DialogClose>
          <DialogClose render={<Button variant='destructive' />}>Erase</DialogClose>
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
          <DialogTitle>Rename the owl</DialogTitle>
          <DialogDescription>Give your owl a new name.</DialogDescription>
        </DialogHeader>
        <Input defaultValue='Hedwig' />
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
      <DialogTrigger render={<Button variant='outline' />}>View the decrees</DialogTrigger>
      <DialogContent style={styles.content}>
        <DialogHeader>
          <DialogTitle>Ministry of Magic Decrees</DialogTitle>
          <DialogDescription>
            Last updated February 2026. Please read before your first visit to Hogsmeade.
          </DialogDescription>
        </DialogHeader>
        <div {...stylex.props(styles.body)}>
          <p>
            1. Acceptance of decrees. By setting foot within the castle or its grounds, you agree to
            be bound by these decrees and the decisions of the Headmaster.
          </p>
          <p>
            2. Wand license. Permission is granted to use your wand for study purposes only. This is
            a license granted by the Ministry, not a transfer of magical title.
          </p>
          <p>
            3. Dormitory responsibilities. You are responsible for the confidentiality of your
            common room password and for all magic performed under your house banner.
          </p>
          <p>
            4. Owl delivery. We do not guarantee that owls will be uninterrupted, timely, or dry,
            and the Owlery reserves the right to suspend deliveries in stormy weather.
          </p>
          <p>
            5. Limitation of liability. In no event shall the Ministry be liable for any hexed,
            jinxed, or cursed damages arising from moving staircases or misfired charms.
          </p>
          <p>
            6. Changes to decrees. The Ministry may revise these decrees at any time. By remaining
            at Hogwarts after changes take effect, you agree to the revised decrees.
          </p>
          <p>
            7. Expulsion. We may suspend or expel your attendance at any time, without notice, for
            conduct that violates these decrees.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Decline</DialogClose>
          <DialogClose render={<Button />}>I solemnly swear</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const NoCloseButton: Story = {
  name: 'No close button',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant='outline' />}>Open the sealed letter</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm your owl address</DialogTitle>
          <DialogDescription>
            We sent an owl to langdon@harvard.edu. This letter only closes through the buttons
            below.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant='ghost' />}>Send an owl later</DialogClose>
          <DialogClose render={<Button />}>Noted</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
