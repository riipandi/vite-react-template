import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { CheckIcon } from 'lucide-react'
import { Spinner } from '#/components/extra/spinner'
import { Badge } from './badge.component'

const meta = {
  title: 'Extra Components/Badge',
  component: Badge,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
    }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { height: 14, width: 14 },
  spinner: { height: 12, width: 12 },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  args: { variant: 'primary' },
  render: (args) => <Badge {...args}>Gryffindor</Badge>
}

export const Variants: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Badge variant='secondary'>Hufflepuff</Badge>
      <Badge variant='outline'>Ravenclaw</Badge>
      <Badge variant='destructive'>Azkaban</Badge>
    </div>
  )
}

export const Icon: Story = {
  name: 'With icon',
  render: () => (
    <Badge variant='secondary'>
      <CheckIcon {...stylex.props(styles.icon)} />
      Ministry approved
    </Badge>
  )
}

export const WithSpinner: Story = {
  name: 'With spinner',
  render: () => (
    <Badge variant='secondary'>
      <Spinner {...stylex.props(styles.spinner)} />
      Apparating
    </Badge>
  )
}

export const Link: Story = {
  render: () => (
    <Badge variant='secondary' render={<a href='#new-release' />}>
      New at Weasleys'
    </Badge>
  )
}
