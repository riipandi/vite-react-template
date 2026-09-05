import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Trash2Icon } from 'lucide-react'
import * as React from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Icon } from '#/components/extra/icon'
import { Spinner } from '#/components/extra/spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog.component'

const meta = {
  title: 'Base Components/AlertDialog',
  component: AlertDialog,
  parameters: { layout: 'centered' },
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
} satisfies Meta<typeof AlertDialog>

type Story = StoryObj<typeof meta>

function deleteAccount() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500))
}

export default meta

export const Playground: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant='outline' />}>
        Seal the cryptex
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure, Professor?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The cryptex will seal itself forever and the Priory&apos;s
            secret will be lost to the Illuminati.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogCancel variant='destructive'>Seal</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Seal the cryptex' }))

    const dialog = within(document.body).getByRole('alertdialog')
    expect(
      within(document.body).getByRole('heading', { name: /absolutely sure/i })
    ).toBeInTheDocument()

    // Cancel dismisses the dialog.
    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(within(document.body).queryByRole('alertdialog')).toBeNull())

    // Destructive confirm also dismisses.
    await userEvent.click(canvas.getByRole('button', { name: 'Seal the cryptex' }))
    const reopened = within(document.body).getByRole('alertdialog')
    await userEvent.click(within(reopened).getByRole('button', { name: 'Seal' }))
    await waitFor(() => expect(within(document.body).queryByRole('alertdialog')).toBeNull())
  }
}

export const Media: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant='outline' />}>
        Empty the Room of Requirement
      </AlertDialogTrigger>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia color='critical'>
            <Icon svg={Trash2Icon} size={24} color='critical' />
          </AlertDialogMedia>
          <AlertDialogTitle>Empty the room?</AlertDialogTitle>
          <AlertDialogDescription>
            Everything hidden inside will be permanently vanished from the castle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogCancel variant='destructive'>Vanish</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Small: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant='outline' />}>
        Leave the archive
      </AlertDialogTrigger>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave without casting Lumos?</AlertDialogTitle>
          <AlertDialogDescription>
            Your unfinished incantations will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogCancel variant='destructive'>Disapparate</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [deleting, setDeleting] = React.useState(false)

    async function handleDelete() {
      setDeleting(true)
      await deleteAccount()
      setDeleting(false)
      setOpen(false)
    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant='destructive' />}>
          Close the Gringotts vault
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close your vault?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The goblins will permanently close the vault and melt
              down every remaining Galleon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant='destructive' disabled={deleting} onClick={handleDelete}>
              {deleting && <Spinner />}
              {deleting ? 'Closing…' : 'Close the vault'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Close the Gringotts vault' }))

    const dialog = within(document.body).getByRole('alertdialog')
    const action = within(dialog).getByRole('button', { name: 'Close the vault' })

    await userEvent.click(action)

    // Pending state disables both actions while the promise runs.
    expect(within(document.body).getByRole('button', { name: /closing/i })).toBeDisabled()
    expect(within(document.body).getByRole('button', { name: 'Cancel' })).toBeDisabled()

    // Resolving the action closes the dialog.
    await waitFor(() => expect(within(document.body).queryByRole('alertdialog')).toBeNull(), {
      timeout: 4000
    })
  }
}
