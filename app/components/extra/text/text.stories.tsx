import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
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

export default meta

export const Playground: Story = {
  args: { variant: 'body-1', children: 'The quick brown fox jumps over the lazy dog' },
  render: (args) => <Text {...args} />
}

export const Variants: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
      <Text variant='headline-1'>Headline 1</Text>
      <Text variant='headline-2'>Headline 2</Text>
      <Text variant='headline-3'>Headline 3</Text>
      <Text variant='featured-1'>Featured 1</Text>
      <Text variant='featured-2'>Featured 2</Text>
      <Text variant='featured-3'>Featured 3</Text>
      <Text variant='featured-4'>Featured 4</Text>
      <Text variant='featured-5'>Featured 5</Text>
      <Text variant='featured-6'>Featured 6</Text>
      <Text variant='body-1'>Body 1</Text>
      <Text variant='body-2'>Body 2</Text>
      <Text variant='caption-1'>Caption 1</Text>
      <Text variant='caption-2'>Caption 2</Text>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
      <Text>Neutral</Text>
      <Text color='neutral-faded'>Neutral faded</Text>
      <Text color='positive'>Positive</Text>
      <Text color='warning'>Warning</Text>
      <Text color='critical'>Critical</Text>
      <Text color='primary'>Primary</Text>
      <Text color='disabled'>Disabled</Text>
    </div>
  )
}

export const Weights: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
      <Text weight='light'>Light</Text>
      <Text weight='regular'>Regular</Text>
      <Text weight='medium'>Medium</Text>
      <Text weight='semibold'>Semibold</Text>
      <Text weight='bold'>Bold</Text>
      <Text weight='extrabold'>Extrabold</Text>
      <Text weight='black'>Black</Text>
    </div>
  )
}

export const Responsive: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
      <Text variant={{ s: 'body-2', l: 'body-1' }}>Responsive variant</Text>
      <Text weight={{ s: 'regular', l: 'bold' }}>Responsive weight</Text>
      <Text align={{ s: 'start', l: 'end' }}>Responsive align</Text>
    </div>
  )
}

export const Truncation: Story = {
  render: () => (
    <div {...stylex.props(atoms.width('240px'))}>
      <Text variant='body-2' maxLines={2}>
        Reshaped is a professionally crafted design system for product design and development teams
        and individuals. We provide with core components you would need in every project.
      </Text>
    </div>
  )
}

export const Formatting: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
      <Text wrap='balance'>
        Text balance wrap keeps line lengths even when the text splits into multiple lines.
      </Text>
      <Text decoration='line-through'>$150</Text>
      <Text monospace>Code snippet</Text>
      <Text numeric>12345</Text>
      <Text render={<a href='#docs' />}>Rendered as a link</Text>
    </div>
  )
}
