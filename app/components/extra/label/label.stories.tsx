import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Checkbox } from '#/components/base/checkbox'
import { Label } from './label.component'

const meta = {
  title: 'Extra Components/Label',
  component: Label,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
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
  )
}
