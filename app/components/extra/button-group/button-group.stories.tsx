import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { ButtonGroup } from './button-group.component'
import { ButtonGroupSeparator, ButtonGroupText } from './button-group.component'

const meta = {
  title: 'Extra Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ButtonGroup>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <ButtonGroupSeparator />
      <Button>Three</Button>
      <ButtonGroupText>of three</ButtonGroupText>
    </ButtonGroup>
  )
}
