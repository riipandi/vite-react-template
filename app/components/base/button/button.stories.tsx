import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { PlusIcon } from 'lucide-react'
import { expect, fn, userEvent } from 'storybook/test'
import { Spinner } from '#/components/extra/spinner'
import { radius } from '#/styles/core/tokens.stylex'
import { Button } from './button.component'

const meta = {
  title: 'Base Components/Button',
  component: Button,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'icon', 'iconXs', 'iconSm', 'iconLg']
    },
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  rounded: { borderRadius: radius.circular },
  pill: { borderRadius: radius.circular },
  wide: { paddingInline: 48 }
})

export default meta

export const Playground: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Button {...args}>
      <PlusIcon {...stylex.props(styles.icon)} />
      New project
    </Button>
  )
}

export const Default: Story = {
  args: { variant: 'primary' },
  render: (args) => <Button {...args}>Button</Button>
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => <Button {...args}>Secondary</Button>
}

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => <Button {...args}>Outline</Button>
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => <Button {...args}>Ghost</Button>
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => <Button {...args}>Destructive</Button>
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button size='xs' variant='outline'>
        Extra small
      </Button>
      <Button size='sm' variant='outline'>
        Small
      </Button>
      <Button size='md' variant='outline'>
        Medium
      </Button>
      <Button size='lg' variant='outline'>
        Large
      </Button>
    </div>
  )
}

export const Icon: Story = {
  render: () => (
    <Button size='icon' variant='outline' aria-label='Add'>
      <PlusIcon {...stylex.props(styles.icon)} />
    </Button>
  )
}

export const IconSizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button size='iconXs' variant='outline' aria-label='Add'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='iconSm' variant='outline' aria-label='Add'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='icon' variant='outline' aria-label='Add'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='iconLg' variant='outline' aria-label='Add'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
    </div>
  )
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Spinner />
      Please wait
    </Button>
  )
}

export const Disabled: Story = {
  name: 'disabled',
  render: () => (
    <Button disabled variant='primary'>
      Disabled
    </Button>
  ),
  play: ({ canvas }) => {
    const el = canvas.getAllByRole('button')[0]
    expect(el).toBeDisabled()
  }
}

export const Rounded: Story = {
  render: () => <Button style={styles.rounded}>Rounded</Button>
}

export const AsLink: Story = {
  name: 'as link',
  render: () => (
    <Button variant='outline' render={<a href='#docs' />} nativeButton={false}>
      Read the docs
    </Button>
  )
}

export const StyleOverride: Story = {
  name: 'style override',
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button style={styles.pill}>Pill</Button>
      <Button variant='outline' style={[styles.pill, styles.wide]}>
        Pill + wide
      </Button>
    </div>
  )
}

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => <Button onClick={args.handleClick}>Click me</Button>,
  play: async ({ canvas, args }) => {
    const { handleClick } = args
    const buttons = canvas.getAllByRole('button')
    const el = buttons[0]
    if (el) {
      await userEvent.click(el)
      expect(el).toHaveAttribute('type', 'button')
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  }
}
