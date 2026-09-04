import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container, radius } from '#/styles/core/tokens.stylex'
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
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AspectRatio>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  frame: {
    width: container.lg
  },
  smallFrame: {
    width: container.xs
  },
  image: {
    borderRadius: radius.large,
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  placeholder: {
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.large,
    height: '100%',
    width: '100%'
  }
})

export default meta

export const Playground: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <AspectRatio {...args}>
        <img
          src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
          alt='Landscape by Drew Beamer'
          {...stylex.props(styles.image)}
        />
      </AspectRatio>
    </div>
  )
}

export const Square: Story = {
  args: { ratio: 1 / 1 },
  render: (args) => (
    <div {...stylex.props(styles.smallFrame)}>
      <AspectRatio {...args}>
        <div {...stylex.props(styles.placeholder)} />
      </AspectRatio>
    </div>
  )
}

export const Portrait: Story = {
  args: { ratio: 9 / 16 },
  render: (args) => (
    <div {...stylex.props(styles.smallFrame)}>
      <AspectRatio {...args}>
        <div {...stylex.props(styles.placeholder)} />
      </AspectRatio>
    </div>
  )
}
