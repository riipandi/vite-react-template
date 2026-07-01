import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Blockquote, BlockquoteAuthor } from './blockquote.component'

const meta = {
  title: 'Extra Components/Blockquote',
  component: Blockquote,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'danger', 'success', 'warning']
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  tags: [],
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
} satisfies Meta<typeof Blockquote>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <Blockquote>
      The only way to do great work is to love what you do.
      <BlockquoteAuthor>Steve Jobs</BlockquoteAuthor>
    </Blockquote>
  )
}

export const VariantPrimary: Story = {
  args: { variant: 'primary' },
  render: (args) => (
    <Blockquote {...args}>
      Innovation distinguishes between a leader and a follower.
      <BlockquoteAuthor>Steve Jobs</BlockquoteAuthor>
    </Blockquote>
  )
}

export const VariantDanger: Story = {
  args: { variant: 'danger' },
  render: (args) => (
    <Blockquote {...args}>
      Failure is simply the opportunity to begin again.
      <BlockquoteAuthor>Henry Ford</BlockquoteAuthor>
    </Blockquote>
  )
}

export const SizeSmall: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Blockquote {...args}>
      Small blockquote example.
      <BlockquoteAuthor>Author Name</BlockquoteAuthor>
    </Blockquote>
  )
}
