import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Field, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { fontSize, fontWeight, unit } from '#/styles/core/tokens.stylex'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from './popover.component'

const meta = {
  title: 'Base Components/Popover',
  component: Popover,
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
} satisfies Meta<typeof Popover>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2
  },
  heading: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3,
    marginTop: unit.x4
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <div {...stylex.props(styles.form)}>
          <strong {...stylex.props(styles.heading)}>Dimensions</strong>
          <Input placeholder='Width' defaultValue='100%' />
          <Input placeholder='Height' defaultValue='25px' />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const Placement: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' />}>Open above</PopoverTrigger>
      <PopoverContent side='top' align='start'>
        Anchored to the top-start of the trigger.
      </PopoverContent>
    </Popover>
  )
}

export const Parts: Story = {
  name: 'Header, title, description',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export const Form: Story = {
  name: 'With form',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' />}>Edit profile</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Edit profile</PopoverTitle>
          <PopoverDescription>Update your display name and handle.</PopoverDescription>
        </PopoverHeader>
        <form {...stylex.props(styles.formCol)}>
          <Field>
            <FieldLabel htmlFor='popover-form-name'>Name</FieldLabel>
            <Input id='popover-form-name' defaultValue='Evil Rabbit' />
          </Field>
          <Field>
            <FieldLabel htmlFor='popover-form-handle'>Handle</FieldLabel>
            <Input id='popover-form-handle' defaultValue='@evilrabbit' />
          </Field>
          <Button type='submit' size='sm'>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
