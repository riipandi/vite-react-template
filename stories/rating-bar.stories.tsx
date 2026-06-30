import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fn } from 'storybook/test'
import { RatingBar, RatingBarItem } from '#/components/base/rating-bar'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/RatingBar',
  component: RatingBar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    styling: {
      control: 'select',
      options: ['star', 'heart', undefined]
    }
  },
  tags: [],
  args: { onClick: fn() },
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
} satisfies Meta<typeof RatingBar>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='rating-bar-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='rating-bar-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { size: 'md', styling: undefined },
  render: (args) => (
    <RatingBar id='rating-bar-playground' {...args}>
      <RatingBarItem value='1' />
      <RatingBarItem value='2' />
      <RatingBarItem value='3' />
      <RatingBarItem value='4' />
      <RatingBarItem value='5' />
    </RatingBar>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <RatingBar id={`rating-bar-size-${s}`} size={s} defaultValue='3'>
            <RatingBarItem value='1' />
            <RatingBarItem value='2' />
            <RatingBarItem value='3' />
            <RatingBarItem value='4' />
            <RatingBarItem value='5' />
          </RatingBar>
        </Row>
      ))}
    </Grid>
  )
}

export const StylingShowcase: Story = {
  name: 'Stylings',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Star'>
        <RatingBar id='rating-bar-star' styling='star' defaultValue='3'>
          <RatingBarItem value='1' />
          <RatingBarItem value='2' />
          <RatingBarItem value='3' />
          <RatingBarItem value='4' />
          <RatingBarItem value='5' />
        </RatingBar>
      </Row>
      <Row label='Heart'>
        <RatingBar id='rating-bar-heart' styling='heart' defaultValue='4'>
          <RatingBarItem value='1' />
          <RatingBarItem value='2' />
          <RatingBarItem value='3' />
          <RatingBarItem value='4' />
          <RatingBarItem value='5' />
        </RatingBar>
      </Row>
      <Row label='None'>
        <RatingBar id='rating-bar-none' defaultValue='4'>
          <RatingBarItem value='1' />
          <RatingBarItem value='2' />
          <RatingBarItem value='3' />
          <RatingBarItem value='4' />
          <RatingBarItem value='5' />
        </RatingBar>
      </Row>
    </Grid>
  )
}
