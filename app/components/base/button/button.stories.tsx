import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from './button.component'

const meta = {
  title: 'Base Components/Button',
  component: Button,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { variant: 'primary', onClick: fn() },
  render: (args) => <Button {...args}>Button</Button>
}

export const Disabled: Story = {
  name: 'disabled',
  render: () => (
    <Button disabled variant='primary'>
      Disabled
    </Button>
  ),
  play: ({ canvas }) => {
    const el = canvas.getAllByRole('button')[0]
    expect(el).toBeDisabled()
  }
}

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => <Button onClick={args.handleClick}>Click me</Button>,
  play: async ({ canvas, args }) => {
    const { handleClick } = args
    const buttons = canvas.getAllByRole('button')
    const el = buttons[0]
    if (el) {
      await userEvent.click(el)
      expect(el).toHaveAttribute('type', 'button')
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  }
}
