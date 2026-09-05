import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
import { Checkbox } from '#/components/base/checkbox'
import { Label } from './label.component'

const meta = {
  title: 'Extra Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Label>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Label>
      <Checkbox aria-label='Accept the Hogwarts letter' /> Accept the Hogwarts letter and its terms
    </Label>
  ),
  // Clicking the label toggles the associated control.
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: /Accept the Hogwarts letter/ })
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(canvas.getByText(/hogwarts letter and its terms/i))
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  }
}
