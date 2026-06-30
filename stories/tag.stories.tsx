import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fn } from 'storybook/test'
import { Tag, TagDismiss } from '#/components/base/tag'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['lighter', 'stroke']
    },
    disabled: { control: 'boolean' }
  },
  tags: [],
  args: { onClick: fn() }
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['lighter', 'stroke'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' },
  dot: { marginRight: space[1] }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='tag-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='tag-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'lighter', children: 'Tag' },
  render: (args) => (
    <div id='tag-playground-wrapper'>
      <Tag id='tag-playground' {...args}>
        {args.children}
      </Tag>
    </div>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          <Tag variant={v} id={`tag-variant-${v}`}>
            Default
          </Tag>
          <Tag variant={v} id={`tag-variant-${v}-long`}>
            Long Label
          </Tag>
          <Tag variant={v} id={`tag-variant-${v}-custom`}>
            <span {...stylex.props(layoutStyles.dot)} id={`tag-variant-${v}-dot`}>
              *
            </span>
          </Tag>
        </Row>
      ))}
    </Grid>
  )
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          <Tag variant={v} id={`tag-state-${v}-normal`}>
            Normal
          </Tag>
          <Tag variant={v} disabled id={`tag-state-${v}-disabled`}>
            Disabled
          </Tag>
        </Row>
      ))}
      <Row label='with dismiss'>
        {variants.map((v) => (
          <Tag key={v} variant={v} id={`tag-state-${v}-dismiss`}>
            Dismiss
            <TagDismiss id={`tag-state-${v}-dismiss-btn`} />
          </Tag>
        ))}
      </Row>
      <Row label='disabled dismiss'>
        {variants.map((v) => (
          <Tag key={v} variant={v} disabled id={`tag-state-${v}-disabled-dismiss`}>
            Disabled
            <TagDismiss id={`tag-state-${v}-disabled-dismiss-btn`} />
          </Tag>
        ))}
      </Row>
    </Grid>
  )
}
