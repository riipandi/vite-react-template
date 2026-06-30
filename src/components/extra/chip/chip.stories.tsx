import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Chip, ChipButton } from '#/components/extra/chip'

const meta = {
  title: 'Extra Components/Chip',
  component: Chip,
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
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Chip>
        Gryffindor
        <ChipButton>
          <Lucide.X />
        </ChipButton>
      </Chip>
      <Chip>
        Expelliarmus
        <ChipButton>
          <Lucide.X />
        </ChipButton>
      </Chip>
    </div>
  )
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Chip>Default</Chip>
      <Chip variant='primary'>Primary</Chip>
      <Chip variant='outline'>Outline</Chip>
      <Chip variant='ghost'>Ghost</Chip>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Chip size='sm'>Small</Chip>
      <Chip size='md'>Medium</Chip>
      <Chip size='lg'>Large</Chip>
    </div>
  )
}

export const WithIcon: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Chip>
        <Lucide.Book />
        The Da Vinci Code
      </Chip>
      <Chip>
        <Lucide.Wand />
        Hogwarts
      </Chip>
    </div>
  )
}
