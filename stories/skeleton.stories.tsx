import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Skeleton } from '#/components/extra/skeleton'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  argTypes: {
    rounded: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
    padding: space[6],
    width: '20rem',
    border: '1px solid oklch(0 0 0 / 0.08)',
    borderRadius: '0.55rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: space[3]
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '100%',
    flexShrink: 0
  },
  lines: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2],
    flex: 1
  },
  line: {
    height: '0.75rem',
    borderRadius: '0.25rem'
  },
  short: { width: '60%' },
  full: { width: '100%' },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2],
    marginTop: space[2]
  }
})

export const Playground: Story = {
  args: { rounded: false },
  render: (args) => <Skeleton id='skeleton-playground' {...args} />
}

export const Default: Story = {
  name: 'Loading Card',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.card)} id='skeleton-card'>
      <div {...stylex.props(layoutStyles.header)}>
        <Skeleton id='skeleton-avatar' rounded />
        <div {...stylex.props(layoutStyles.lines)}>
          <Skeleton id='skeleton-name' {...stylex.props(layoutStyles.line, layoutStyles.short)} />
          <Skeleton id='skeleton-email' {...stylex.props(layoutStyles.line, layoutStyles.full)} />
        </div>
      </div>
      <div {...stylex.props(layoutStyles.body)}>
        <Skeleton id='skeleton-l1' {...stylex.props(layoutStyles.line, layoutStyles.full)} />
        <Skeleton id='skeleton-l2' {...stylex.props(layoutStyles.line, layoutStyles.full)} />
        <Skeleton id='skeleton-l3' {...stylex.props(layoutStyles.line, layoutStyles.short)} />
      </div>
    </div>
  )
}
