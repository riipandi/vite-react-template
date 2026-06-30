import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from '#/components/base/avatar'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: { type: 'number', min: 20, max: 120, step: 8 }
    },
    shape: {
      control: 'select',
      options: ['circle', 'square']
    }
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
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const sizes = [32, 40, 56, 72] as const
const statuses = ['online', 'offline', 'busy', 'away'] as const

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[6]
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[4]
  },
  rowLabel: {
    minWidth: '5rem'
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)}>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { size: 40, shape: 'circle' },
  render: (args) => (
    <Avatar id='avatar-playground' size={args.size} shape={args.shape}>
      <AvatarImage
        id='avatar-playground-image'
        alt='User avatar'
        src='https://i.pravatar.cc/120?img=11'
      />
      <AvatarFallback id='avatar-playground-fallback'>AR</AvatarFallback>
    </Avatar>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  args: { size: 40, shape: 'circle' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={`${s}px`}>
          <Avatar id={`avatar-size-circle-${s}`} size={s} shape='circle'>
            <AvatarImage
              id={`avatar-size-circle-img-${s}`}
              alt='User'
              src={`https://i.pravatar.cc/120?img=11`}
            />
            <AvatarFallback id={`avatar-size-circle-fb-${s}`}>AR</AvatarFallback>
          </Avatar>
          <Avatar id={`avatar-size-square-${s}`} size={s} shape='square'>
            <AvatarImage
              id={`avatar-size-square-img-${s}`}
              alt='User'
              src={`https://i.pravatar.cc/120?img=11`}
            />
            <AvatarFallback id={`avatar-size-square-fb-${s}`}>AR</AvatarFallback>
          </Avatar>
        </Row>
      ))}
    </Grid>
  )
}

export const BadgeShowcase: Story = {
  name: 'Badges',
  args: { size: 48, shape: 'circle' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Row key={s} label={s}>
          <Avatar id={`avatar-badge-${s}`} size={48}>
            <AvatarImage
              id={`avatar-badge-img-${s}`}
              alt='User'
              src='https://i.pravatar.cc/120?img=11'
            />
            <AvatarFallback id={`avatar-badge-fb-${s}`}>AR</AvatarFallback>
            <AvatarBadge id={`avatar-badge-status-${s}`} status={s} />
          </Avatar>
        </Row>
      ))}
    </Grid>
  )
}
