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
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: ['item-1'] },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>How do I customize it?</AccordionTrigger>
        <AccordionContent>Use the StyleX tokens and `style` prop on each part.</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>What about motion?</AccordionTrigger>
        <AccordionContent>
          Open and close animations respect the `prefers-reduced-motion` media query.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
