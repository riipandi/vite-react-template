import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Progress, ProgressLabel, ProgressValue } from './progress.component'

const meta = {
  title: 'Base Components/Progress',
  component: Progress,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Progress>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { value: 60 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Uploading…</ProgressLabel>
      <ProgressValue>{(formattedValue) => <span>{formattedValue ?? '0%'}</span>}</ProgressValue>
    </Progress>
  )
}
