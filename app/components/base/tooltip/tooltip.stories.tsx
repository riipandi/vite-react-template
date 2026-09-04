import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip.component'

const meta = {
  title: 'Base Components/Tooltip',
  component: TooltipProvider,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    delay: { control: 'number' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TooltipProvider>

type Story = StoryObj<typeof meta>

const sides = ['top', 'right', 'bottom', 'left'] as const

const styles = stylex.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  // Disabled native buttons don't fire pointer events, so the tooltip
  // trigger has to be the wrapping span instead of the button itself.
  trigger: {
    display: 'inline-block'
  }
})

export default meta

export const Playground: Story = {
  args: { delay: 0 },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline' />}>Hover me</TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Sides: Story = {
  args: { delay: 0 },
  render: () => (
    <TooltipProvider>
      <div {...stylex.props(styles.row)}>
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant='outline' />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const DisabledButton: Story = {
  name: 'Disabled button',
  args: { delay: 0 },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span {...stylex.props(styles.trigger)} />}>
          <Button variant='outline' disabled>
            Submit
          </Button>
        </TooltipTrigger>
        <TooltipContent>Complete the form to submit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
