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
  parameters: { layout: 'centered' },
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
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
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
  rounded: { borderRadius: radius.full },
  pill: { borderRadius: radius.full },
  wide: { paddingInline: 48 }
})

export default meta

export const Playground: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Button {...args}>
      <PlusIcon {...stylex.props(styles.icon)} />
      New lecture
    </Button>
  )
}

export const Default: Story = {
  args: { variant: 'primary' },
  render: (args) => <Button {...args}>Expelliarmus</Button>
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => <Button {...args}>Protego</Button>
}

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => <Button {...args}>Petrificus Totalus</Button>
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => <Button {...args}>Moaning Myrtle</Button>
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => <Button {...args}>Avada Kedavra</Button>
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button size='xs' variant='outline'>
        Fairy
      </Button>
      <Button size='sm' variant='outline'>
        House-elf
      </Button>
      <Button size='md' variant='outline'>
        Wizard
      </Button>
      <Button size='lg' variant='outline'>
        Giant
      </Button>
    </div>
  )
}

export const Icon: Story = {
  render: () => (
    <Button size='icon' variant='outline' aria-label='Accio'>
      <PlusIcon {...stylex.props(styles.icon)} />
    </Button>
  )
}

export const IconSizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button size='iconXs' variant='outline' aria-label='Accio'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='iconSm' variant='outline' aria-label='Accio'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='icon' variant='outline' aria-label='Accio'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
      <Button size='iconLg' variant='outline' aria-label='Accio'>
        <PlusIcon {...stylex.props(styles.icon)} />
      </Button>
    </div>
  )
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Spinner />
      Apparating…
    </Button>
  )
}

export const Disabled: Story = {
  name: 'disabled',
  render: () => (
    <Button disabled variant='primary'>
      Petrified
    </Button>
  ),
  play: ({ canvas }) => {
    const el = canvas.getAllByRole('button')[0]
    expect(el).toBeDisabled()
  }
}

export const Rounded: Story = {
  render: () => <Button style={styles.rounded}>Golden Snitch</Button>
}

export const AsLink: Story = {
  name: 'as link',
  render: () => (
    <Button variant='outline' render={<a href='#docs' />} nativeButton={false}>
      Read the Daily Prophet
    </Button>
  )
}

export const StyleOverride: Story = {
  name: 'style override',
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Button style={styles.pill}>Time-Turner</Button>
      <Button variant='outline' style={[styles.pill, styles.wide]}>
        Time-Turner, extra wide
      </Button>
    </div>
  )
}

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => <Button onClick={args.handleClick}>Open the cryptex</Button>,
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
