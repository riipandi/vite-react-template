import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '#/components/base/collapsible'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Collapsible',
  component: Collapsible,
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
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='flex h-40 w-full items-center justify-center'>
      <Collapsible className='w-full max-w-sm'>
        <CollapsibleTrigger>What is the Illuminati?</CollapsibleTrigger>
        <CollapsiblePanel>
          <Text className='text-foreground-neutral-faded'>
            The Illuminati was a secret society formed in Bavaria in 1776, allegedly seeking to
            oppose religious influence and abuses of state power.
          </Text>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const Indicator: Story = {
  args: {},
  render: () => (
    <div className='flex h-40 w-full items-center justify-center'>
      <Collapsible className='w-full max-w-sm'>
        <CollapsibleTrigger expandableIndicator>What is the Illuminati?</CollapsibleTrigger>
        <CollapsiblePanel>
          <Text className='text-foreground-neutral-faded'>
            The Illuminati was a secret society formed in Bavaria in 1776, allegedly seeking to
            oppose religious influence and abuses of state power.
          </Text>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const InfoCard: Story = {
  args: {},
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <div className='border-border-neutral w-[500px] rounded-lg border p-4'>
        <Text className='text-sm'>
          ReUI is a open-source collection of UI components and animated effects built with React,
          Typescript, Tailwind CSS, and Motion.
        </Text>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsiblePanel className='text-sm'>
            Pairs beautifully with shadcn/ui. Save time and build your next project faster.
          </CollapsiblePanel>
          <CollapsibleTrigger
            className='mt-3 w-fit justify-end py-0 text-end text-xs'
            render={<Button size='xs' color='neutral' variant='outline' />}
          >
            {isOpen ? 'Show less' : 'Show more'}
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    )
  }
}
