import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Input } from '#/components/base/input'
import { Label } from '#/components/extra/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetSide
} from './sheet.component'

const meta = {
  title: 'Extra Components/Sheet',
  component: Sheet,
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
} satisfies Meta<typeof Sheet>

type Story = StoryObj<typeof meta>

const sides: SheetSide[] = ['top', 'right', 'bottom', 'left']

const styles = stylex.create({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingInline: 16
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant='outline' />}>Alohomora</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit vault record</SheetTitle>
          <SheetDescription>
            Make changes to the vault holder here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div {...stylex.props(styles.fields)}>
          <Label>
            Account holder <Input defaultValue='Luna Lovegood' />
          </Label>
          <Label>
            Vault key <Input defaultValue='@quibbler' />
          </Label>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save vault record</SheetClose>
          <SheetClose render={<Button variant='outline' />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Alohomora' }))
    const sheet = await body.findByRole('dialog')
    expect(body.getByRole('heading', { name: 'Edit vault record' })).toBeInTheDocument()
    expect(within(sheet).getByDisplayValue('Luna Lovegood')).toBeInTheDocument()

    // Footer close action dismisses the sheet.
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save vault record' }))
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull())
  }
}

export const Sides: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant='outline' />}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Entrance on the {side}</SheetTitle>
              <SheetDescription>
                A hidden passage opens on the {side} side of the castle.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

export const NoCloseButton: Story = {
  name: 'No close button',
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant='outline' />}>Alohomora</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Publish in the Daily Prophet</SheetTitle>
          <SheetDescription>Review the article, then publish or discard it below.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button />}>Print edition</SheetClose>
          <SheetClose render={<Button variant='outline' />}>Discard draft</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
