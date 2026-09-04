import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { BoldIcon, ItalicIcon } from 'lucide-react'
import { Toggle } from './toggle.component'

const meta = {
  title: 'Base Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
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
} satisfies Meta<typeof Toggle>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Toggle aria-label='Toggle charm'>
      <BoldIcon {...stylex.props(styles.icon)} />
    </Toggle>
  )
}

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Toggle {...args} aria-label='Toggle hex'>
      Hex
    </Toggle>
  )
}

export const WithText: Story = {
  name: 'With text',
  render: () => (
    <Toggle aria-label='Toggle hex'>
      <ItalicIcon {...stylex.props(styles.icon)} />
      Hex
    </Toggle>
  )
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Toggle size='sm' aria-label='Toggle imp'>
        Imp
      </Toggle>
      <Toggle size='md' aria-label='Toggle wizard'>
        Wizard
      </Toggle>
      <Toggle size='lg' aria-label='Toggle giant'>
        Giant
      </Toggle>
    </div>
  )
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Toggle {...args} aria-label='Toggle charm'>
      Charm
    </Toggle>
  )
}
