import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Card } from '#/components/base/card'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    fluid: { control: 'boolean' }
  },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2]
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: 600
  },
  description: {
    fontSize: '0.875rem',
    opacity: 0.75
  }
})

export const Playground: Story = {
  args: { fluid: false, children: 'Card content' },
  render: (args) => (
    <Card id='card-playground' fluid={args.fluid}>
      {args.children}
    </Card>
  )
}

export const Default: Story = {
  name: 'Default',
  args: { fluid: false },
  parameters: { controls: { disable: true } },
  render: () => (
    <Card id='card-default'>
      <div {...stylex.props(layoutStyles.cardContent)}>
        <div {...stylex.props(layoutStyles.title)}>Card Title</div>
        <div {...stylex.props(layoutStyles.description)}>
          This is a default card component with a title and description. Cards are used to group
          related content in a contained surface.
        </div>
      </div>
    </Card>
  )
}
