import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '#/components/base/accordion'

const meta = {
  title: 'Component/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion id='accordion-playground'>
      <AccordionItem id='accordion-item-1' value='item-1'>
        <AccordionTrigger id='accordion-trigger-1'>What is this template?</AccordionTrigger>
        <AccordionContent id='accordion-content-1'>
          A modern React 19 + Vite 8 + TypeScript 6 SPA template with StyleX styling, TanStack
          Router/Form/Query, and Base UI primitives.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id='accordion-item-2' value='item-2'>
        <AccordionTrigger id='accordion-trigger-2'>How do I get started?</AccordionTrigger>
        <AccordionContent id='accordion-content-2'>
          Clone the repository, run pnpm install, then pnpm dev to start the development server.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id='accordion-item-3' value='item-3'>
        <AccordionTrigger id='accordion-trigger-3'>What is StyleX?</AccordionTrigger>
        <AccordionContent id='accordion-content-3'>
          StyleX is a CSS-in-JS library from Meta that compiles to atomic CSS at build time,
          offering type-safe styling with excellent runtime performance.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion id='accordion-default'>
      <AccordionItem id='accordion-default-item-1' value='item-1'>
        <AccordionTrigger id='accordion-default-trigger-1'>Section 1</AccordionTrigger>
        <AccordionContent id='accordion-default-content-1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id='accordion-default-item-2' value='item-2'>
        <AccordionTrigger id='accordion-default-trigger-2'>Section 2</AccordionTrigger>
        <AccordionContent id='accordion-default-content-2'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
