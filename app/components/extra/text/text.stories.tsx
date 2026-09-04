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
  args: {
    variant: 'body-1',
    children: 'Professor Langdon deciphered the cryptex beneath the Louvre'
  },
  render: (args) => <Text {...args} />
}

export const Variants: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text variant='headline-1'>The Boy Who Lived</Text>
      <Text variant='headline-2'>The Lost Symbol</Text>
      <Text variant='headline-3'>Hogwarts: A History</Text>
      <Text variant='featured-1'>The Louvre by Night</Text>
      <Text variant='featured-2'>Gringotts Under Lockdown</Text>
      <Text variant='featured-3'>Decoding the Cryptex</Text>
      <Text variant='featured-4'>Secrets of the Priory</Text>
      <Text variant='featured-5'>The Last Supper Cipher</Text>
      <Text variant='featured-6'>Shadows of the Vatican</Text>
      <Text variant='body-1'>Langdon studied the symbols in silence.</Text>
      <Text variant='body-2'>Hermione cast the charm perfectly.</Text>
      <Text variant='caption-1'>From the Daily Prophet archives</Text>
      <Text variant='caption-2'>Grand Gallery, the Louvre</Text>
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
      The manuscript every symbologist wants to decipher
    </Text>
  )
}

export const Monospace: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text monospace>Fib: 1 1 2 3 5 8</Text>
      <Text monospace variant='featured-1' weight='regular'>
        CERN 1998
      </Text>
    </div>
  )
}

export const MaxLines: Story = {
  render: () => (
    <div {...stylex.props(styles.clamp)}>
      <Text maxLines={2}>
        The Marauder's Map revealed many variations of hidden passages, but the majority have
        suffered alteration in some form, by mischievous enchantments, or randomised footprints
        which don't look even slightly believable. If you are going to trace a passage of the Map,
        you need to be sure there isn't anything embarrassing hidden in the middle of the parchment.
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
      <Text align='start'>Expelliarmus</Text>
      <Text align='center'>Expelliarmus</Text>
      <Text align='end'>Expelliarmus</Text>
      <Text align={{ s: 'center', m: 'start' }}>Responsive alignment</Text>
    </div>
  )
}

export const Render: Story = {
  name: 'as',
  render: () => (
    <div {...stylex.props(styles.col)}>
      <Text render={<h1 />}>The Da Vinci Code</Text>
      <Text variant='featured-3'>Chapter 1: The Louvre</Text>
      <Text variant={{ s: 'featured-3', m: 'featured-4' }}>Chapter 2: The Vatican</Text>
    </div>
  ),
  play: async ({ canvas }) => {
    const els = canvas.getAllByRole('heading')

    expect(els[0]?.tagName).toEqual('H1')
    expect(els[1]?.tagName).toBe('H3')
    expect(els[2]?.tagName).toBe('H4')
  }
}
