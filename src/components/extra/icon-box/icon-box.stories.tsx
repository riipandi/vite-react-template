import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { IconBox } from './icon-box.component'

const meta = {
  title: 'Extra Components/IconBox',
  component: IconBox,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['448px'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof IconBox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <IconBox>
        <Lucide.Settings />
      </IconBox>
      <IconBox variant='info'>
        <Lucide.Info />
      </IconBox>
      <IconBox variant='danger'>
        <Lucide.Trash />
      </IconBox>
    </div>
  )
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <IconBox>
        <Lucide.Play />
      </IconBox>
      <IconBox variant='primary'>
        <Lucide.Settings />
      </IconBox>
      <IconBox variant='secondary'>
        <Lucide.Settings />
      </IconBox>
      <IconBox variant='info'>
        <Lucide.Info />
      </IconBox>
      <IconBox variant='success'>
        <Lucide.CheckCircle />
      </IconBox>
      <IconBox variant='warning'>
        <Lucide.TriangleAlert />
      </IconBox>
      <IconBox variant='danger'>
        <Lucide.Trash />
      </IconBox>
    </div>
  )
}

export const CircleVariants: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <IconBox circle>
        <Lucide.Play />
      </IconBox>
      <IconBox variant='primary' circle>
        <Lucide.Settings />
      </IconBox>
      <IconBox variant='secondary' circle>
        <Lucide.Settings />
      </IconBox>
      <IconBox variant='info' circle>
        <Lucide.Info />
      </IconBox>
      <IconBox variant='success' circle>
        <Lucide.CheckCircle />
      </IconBox>
      <IconBox variant='warning' circle>
        <Lucide.TriangleAlert />
      </IconBox>
      <IconBox variant='danger' circle>
        <Lucide.Trash />
      </IconBox>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <IconBox size='sm'>
        <Lucide.Play />
      </IconBox>
      <IconBox size='md'>
        <Lucide.Play />
      </IconBox>
      <IconBox size='lg'>
        <Lucide.Play />
      </IconBox>
    </div>
  )
}
