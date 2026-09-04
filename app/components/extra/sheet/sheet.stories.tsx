import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
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
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
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
      <SheetTrigger render={<Button variant='outline' />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div {...stylex.props(styles.fields)}>
          <Label>
            Name <Input defaultValue='Pedro Duarte' />
          </Label>
          <Label>
            Username <Input defaultValue='@peduarte' />
          </Label>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save changes</SheetClose>
          <SheetClose render={<Button variant='outline' />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const Sides: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant='outline' />}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
              <SheetDescription>Slides in from the {side} edge of the screen.</SheetDescription>
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
      <SheetTrigger render={<Button variant='outline' />}>Open</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Publish changes</SheetTitle>
          <SheetDescription>
            Review your changes, then publish or discard them below.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button />}>Publish</SheetClose>
          <SheetClose render={<Button variant='outline' />}>Discard</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
