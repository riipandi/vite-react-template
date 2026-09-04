import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Drawer, type DrawerSwipeDirection } from './drawer.component'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './drawer.component'

const meta = {
  title: 'Base Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showSwipeHandle: { control: 'boolean' },
    swipeDirection: { control: 'radio', options: ['up', 'right', 'down', 'left'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Drawer>

type Story = StoryObj<typeof meta>

const directions: DrawerSwipeDirection[] = ['up', 'right', 'down', 'left']

const styles = stylex.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  args: { showSwipeHandle: true },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant='outline' />}>Open the vault</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Brew Polyjuice</DrawerTitle>
          <DrawerDescription>Set your daily dosage for the potion.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Begin brewing</DrawerClose>
          <DrawerClose render={<Button variant='outline' />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const Directions: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      {directions.map((direction) => (
        <Drawer key={direction} swipeDirection={direction}>
          <DrawerTrigger render={<Button variant='outline' />}>{direction}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Owl from the {direction}</DrawerTitle>
              <DrawerDescription>
                Swoops in and swipes back toward the {direction} edge.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
