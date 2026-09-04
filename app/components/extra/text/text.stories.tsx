import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { Text } from './text.component'

const meta = {
  title: 'Extra Components/Text',
  component: Text,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'headline-1',
        'headline-2',
        'headline-3',
        'featured-1',
        'featured-2',
        'featured-3',
        'featured-4',
        'featured-5',
        'featured-6',
        'body-1',
        'body-2',
        'caption-1',
        'caption-2'
      ]
    },
    color: {
      control: 'select',
      options: [
        'neutral',
        'neutral-faded',
        'positive',
        'warning',
        'critical',
        'primary',
        'disabled'
      ]
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black']
    },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    decoration: { control: 'select', options: ['underline', 'line-through'] },
    wrap: { control: 'select', options: ['balance', 'nowrap'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding('16px'), atoms.width('100%'))}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Text>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  clamp: {
    width: 240
  }
})

export default meta

export const Playground: Story = {
  args: { variant: 'body-1', children: 'The quick brown fox jumps over the lazy dog' },
  render: (args) => <Text {...args} />
}

export const Variants: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text variant='headline-1'>Headline 1</Text>
      <Text variant='headline-2'>Headline 2</Text>
      <Text variant='headline-3'>Headline 3</Text>
      <Text variant='featured-1'>Title 1</Text>
      <Text variant='featured-2'>Title 2</Text>
      <Text variant='featured-3'>Title 3</Text>
      <Text variant='featured-4'>Title 4</Text>
      <Text variant='featured-5'>Title 5</Text>
      <Text variant='featured-6'>Title 6</Text>
      <Text variant='body-1'>Body 1</Text>
      <Text variant='body-2'>Body 2</Text>
      <Text variant='caption-1'>Caption 1</Text>
      <Text variant='caption-2'>Caption 2</Text>
      <Text variant={{ s: 'body-2', m: 'featured-4' }}>Responsive variant</Text>
    </div>
  )
}

export const Weight: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text weight='regular'>Regular</Text>
      <Text weight='medium'>Medium</Text>
      <Text weight='semibold'>Semibold</Text>
      <Text weight='bold'>Bold</Text>
      <Text weight='extrabold'>Extrabold</Text>
      <Text weight={{ s: 'regular', m: 'bold' }}>Responsive weight</Text>
    </div>
  )
}

export const Color: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text>Neutral</Text>
      <Text color='neutral-faded'>Faded</Text>
      <Text color='positive'>Positive</Text>
      <Text color='warning'>Warning</Text>
      <Text color='critical'>Critical</Text>
      <Text color='primary'>Primary</Text>
      <Text color='disabled' aria-disabled>
        Disabled
      </Text>
    </div>
  )
}

export const Decoration: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text decoration='underline'>Underline</Text>
      <Text decoration='line-through'>Line through</Text>
    </div>
  )
}

export const Wrap: Story = {
  render: () => (
    <Text wrap='balance' variant='featured-3'>
      The design system you want to build
    </Text>
  )
}

export const Monospace: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text monospace>Content</Text>
      <Text monospace variant='featured-1' weight='regular'>
        Content
      </Text>
    </div>
  )
}

export const MaxLines: Story = {
  render: () => (
    <div {...stylex.props(styles.clamp)}>
      <Text maxLines={2}>
        There are many variations of passages of Lorem Ipsum available, but the majority have
        suffered alteration in some form, by injected humour, or randomised words which don't look
        even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
        sure there isn't anything embarrassing hidden in the middle of text.
      </Text>
    </div>
  )
}

export const Numeric: Story = {
  render: () => <Text numeric>1234567890</Text>
}

export const Align: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text align='start'>Text content</Text>
      <Text align='center'>Text content</Text>
      <Text align='end'>Text content</Text>
      <Text align={{ s: 'center', m: 'start' }}>Responsive alignment</Text>
    </div>
  )
}

export const Render: Story = {
  name: 'as',
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text render={<h1 />}>Content</Text>
      <Text variant='featured-3'>Content</Text>
      <Text variant={{ s: 'featured-3', m: 'featured-4' }}>Content</Text>
    </div>
  ),
  play: async ({ canvas }) => {
    const els = canvas.getAllByRole('heading')

    expect(els[0]?.tagName).toEqual('H1')
    expect(els[1]?.tagName).toBe('H3')
    expect(els[2]?.tagName).toBe('H4')
  }
}
