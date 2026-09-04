import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion.component'

const meta = {
  title: 'Base Components/Accordion',
  component: Accordion,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    multiple: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { multiple: false, defaultValue: ['item-1'] },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It animates open with the panel height from Base UI.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['item-1', 'item-2'] },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Can I open more than one?</AccordionTrigger>
        <AccordionContent>
          Yes. Pass `multiple` to keep several items expanded at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is state still per-item?</AccordionTrigger>
        <AccordionContent>Yes. Each item tracks its own open state independently.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Can I set an initial selection?</AccordionTrigger>
        <AccordionContent>
          Yes, via `defaultValue` — an array of the values that start open.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Disabled: Story = {
  args: { multiple: false },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Available plan</AccordionTrigger>
        <AccordionContent>This plan can be selected and configured.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2' disabled>
        <AccordionTrigger>Enterprise plan (disabled)</AccordionTrigger>
        <AccordionContent>Contact sales to unlock this plan.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
