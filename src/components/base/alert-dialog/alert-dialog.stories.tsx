import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconBox } from '../../extra/icon-box'
import { Button } from '../button'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog.component'

const meta = {
  title: 'Base Components/AlertDialog',
  component: AlertDialog,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button color='critical'>Destroy Horcrux</Button>} />
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Destroy Horcrux</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Are you sure you want to destroy this Horcrux? <br className='hidden md:block' />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button color='critical' size='sm' />}>
            Destroy
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}

export const WithIconHeader: Story = {
  args: {},
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button color='critical'>Cast Curse</Button>} />
      <AlertDialogPopup>
        <AlertDialogHeader>
          <IconBox variant='danger' size='sm'>
            <Icon.SkullIcon weight='bold' />
          </IconBox>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <AlertDialogDescription>
            Casting Unforgivable Curses is forbidden by magical law.
          </AlertDialogDescription>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogClose className='min-w-16'>Cancel</AlertDialogClose>
          <AlertDialogClose className='min-w-16' render={<Button color='critical' size='sm' />}>
            Cast
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
