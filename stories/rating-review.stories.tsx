import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { RatingReview } from '#/components/base/rating-review'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/RatingReview',
  component: RatingReview,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['star', 'heart']
    },
    value: {
      control: { type: 'number', min: 0, max: 10, step: 1 }
    },
    max: {
      control: { type: 'number', min: 1, max: 10, step: 1 }
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
} satisfies Meta<typeof RatingReview>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='rating-review-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='rating-review-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'star', value: 3, max: 5 },
  render: (args) => <RatingReview id='rating-review-playground' {...args} />
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Star'>
        <RatingReview id='rating-review-v-star' variant='star' value={4} max={5} />
      </Row>
      <Row label='Heart'>
        <RatingReview id='rating-review-v-heart' variant='heart' value={4} max={5} />
      </Row>
    </Grid>
  )
}

export const ValueShowcase: Story = {
  name: 'Values',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='0/5'>
        <RatingReview id='rating-review-val-0' variant='star' value={0} max={5} />
      </Row>
      <Row label='2/5'>
        <RatingReview id='rating-review-val-2' variant='star' value={2} max={5} />
      </Row>
      <Row label='4/5'>
        <RatingReview id='rating-review-val-4' variant='star' value={4} max={5} />
      </Row>
      <Row label='5/5'>
        <RatingReview id='rating-review-val-5' variant='star' value={5} max={5} />
      </Row>
      <Row label='7/10'>
        <RatingReview id='rating-review-val-7' variant='heart' value={7} max={10} />
      </Row>
    </Grid>
  )
}
