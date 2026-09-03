import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { AspectRatio } from './aspect-ratio.component'

const meta = {
  title: 'Extra Components/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    ratio: { control: { type: 'number', min: 0.5, step: 0.1 } }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AspectRatio>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src='https://images.unsplash.com/photo-1498050108023-c5249f4df085'
        alt='Laptop with code on screen'
        style={{ height: '100%', objectFit: 'cover', width: '100%' }}
      />
    </AspectRatio>
  )
}
