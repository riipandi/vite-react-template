import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Progress, ProgressLabel } from '#/components/base/progress'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    min: { control: 'number' },
    max: { control: 'number' }
  },
  tags: [],
  args: {}
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    minWidth: '20rem'
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space[3]
  }
})

export const Playground: Story = {
  args: { value: 60, min: 0, max: 100 },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='progress-playground-wrapper'>
      <Progress id='progress-playground' {...args} />
    </div>
  )
}

export const ValueShowcase: Story = {
  name: 'Value Showcase',
  args: { value: 50 } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='progress-value-wrapper'>
      <div {...stylex.props(layoutStyles.progressRow)} id='progress-value-0'>
        <ProgressLabel id='progress-label-0'>0%</ProgressLabel>
        <Progress id='progress-0' value={0} />
      </div>
      <div {...stylex.props(layoutStyles.progressRow)} id='progress-value-25'>
        <ProgressLabel id='progress-label-25'>25%</ProgressLabel>
        <Progress id='progress-25' value={25} />
      </div>
      <div {...stylex.props(layoutStyles.progressRow)} id='progress-value-50'>
        <ProgressLabel id='progress-label-50'>50%</ProgressLabel>
        <Progress id='progress-50' value={50} />
      </div>
      <div {...stylex.props(layoutStyles.progressRow)} id='progress-value-75'>
        <ProgressLabel id='progress-label-75'>75%</ProgressLabel>
        <Progress id='progress-75' value={75} />
      </div>
      <div {...stylex.props(layoutStyles.progressRow)} id='progress-value-100'>
        <ProgressLabel id='progress-label-100'>100%</ProgressLabel>
        <Progress id='progress-100' value={100} />
      </div>
    </div>
  )
}
