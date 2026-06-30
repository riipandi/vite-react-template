import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Separator } from '#/components/base/separator'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Separator',
  component: Separator,
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
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.width['100%'])}>
      <span>Chapter 1 begins here.</span>
      <Separator
        orientation='horizontal'
        {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}
      />
      <span>Chapter 2 continues here.</span>
    </div>
  )
}

export const Vertical: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(x.maxWidth['384px'])}
      {...stylex.props(x.marginLeft.auto, x.marginRight.auto)}
      {...stylex.props(
        x.display.flex,
        x.width['100%'],
        x.alignItems.center,
        x.justifyContent.center,
        x.gap['0.75rem']
      )}
    >
      <Text>Gryffindor</Text>
      <Text>Slytherin</Text>
      <Text>Ravenclaw</Text>
      <Separator orientation='vertical' />
      <Text>Hufflepuff</Text>
    </div>
  )
}

export const Divider: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.width['100%'], x.flexDirection.column)}>
      <Separator
        {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}
        contentSide='left'
      >
        Chapter 1
      </Separator>
      <Separator
        {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}
        contentSide='center'
      >
        The Da Vinci Code
      </Separator>
      <Separator
        {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}
        contentSide='right'
      >
        Harry Potter Series
      </Separator>
    </div>
  )
}
