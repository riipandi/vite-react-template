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
        <AccordionTrigger>Is the vault accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows the Gringotts access pattern and unlocks with a spoken Alohomora.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it enchanted?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default charms that match the other artefacts in the collection.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It animates open with the panel height, as if lifted by Wingardium Leviosa.
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
        <AccordionTrigger>Can I unlock more than one chamber?</AccordionTrigger>
        <AccordionContent>
          Yes. Pass `multiple` to keep several chambers open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is each horcrux tracked separately?</AccordionTrigger>
        <AccordionContent>
          Yes. Each fragment keeps its own state, hidden like Tom Riddle&apos;s diary.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Can I set an initial selection?</AccordionTrigger>
        <AccordionContent>
          Yes, via `defaultValue` — the values that start open, like the dials of a cryptex.
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
        <AccordionTrigger>Available vault</AccordionTrigger>
        <AccordionContent>This vault can be selected and configured.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2' disabled>
        <AccordionTrigger>Ministry vault (restricted)</AccordionTrigger>
        <AccordionContent>
          Contact the Department of Mysteries to unlock this vault.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
