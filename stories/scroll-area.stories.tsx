import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { ScrollArea } from '#/components/base/scroll-area'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  argTypes: {
    scrollFade: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.
  Pellentesque a diam sit amet mi ullamcorper vehicula. Integer adipiscing risus a sem.
  Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan quis, faucibus non, congue vel, arcu.
  Morbi ac felis. Nunc tincidunt ante vitae massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
`.repeat(5)

const containerStyles = stylex.create({
  wrapper: {
    width: '20rem',
    height: '16rem',
    border: '1px solid oklch(0 0 0 / 0.12)',
    borderRadius: '0.55rem'
  },
  content: {
    padding: space[4],
    lineHeight: '1.6'
  }
})

export const Playground: Story = {
  args: { scrollFade: false },
  render: (args) => (
    <div {...stylex.props(containerStyles.wrapper)} id='scroll-area-playground'>
      <ScrollArea id='scroll-area' {...args}>
        <div {...stylex.props(containerStyles.content)} id='scroll-area-content'>
          {loremIpsum}
        </div>
      </ScrollArea>
    </div>
  )
}

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(containerStyles.wrapper)} id='scroll-area-default'>
      <ScrollArea id='scroll-area-default-inner'>
        <div {...stylex.props(containerStyles.content)} id='scroll-area-default-content'>
          {loremIpsum}
        </div>
      </ScrollArea>
    </div>
  )
}
