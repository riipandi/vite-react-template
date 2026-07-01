import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, LinkIcon } from './link.component'

const meta = {
  title: 'Extra Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    underline: { control: 'select', options: ['none', 'hover', 'always'] }
  },
  tags: [],
  args: { href: '#' },
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
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Link {...args}>Click me</Link>
}

export const WithIcon: Story = {
  render: (args) => (
    <Link {...args}>
      Visit Hogwarts
      <LinkIcon />
    </Link>
  )
}

export const VariantPrimary: Story = {
  args: { variant: 'primary' },
  render: (args) => <Link {...args}>Primary Link</Link>
}

export const SizeSmall: Story = {
  args: { size: 'sm' },
  render: (args) => <Link {...args}>Small Link</Link>
}
