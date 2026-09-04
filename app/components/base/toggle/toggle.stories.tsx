import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { BoldIcon, ItalicIcon } from 'lucide-react'
import { Toggle } from './toggle.component'

const meta = {
  title: 'Base Components/Toggle',
  component: Toggle,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
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
    <Toggle aria-label='Toggle bold'>
      <BoldIcon {...stylex.props(styles.icon)} />
    </Toggle>
  )
}

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Toggle {...args} aria-label='Toggle italic'>
      Italic
    </Toggle>
  )
}

export const WithText: Story = {
  name: 'With text',
  render: () => (
    <Toggle aria-label='Toggle italic'>
      <ItalicIcon {...stylex.props(styles.icon)} />
      Italic
    </Toggle>
  )
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Toggle size='sm' aria-label='Toggle small'>
        Small
      </Toggle>
      <Toggle size='md' aria-label='Toggle medium'>
        Medium
      </Toggle>
      <Toggle size='lg' aria-label='Toggle large'>
        Large
      </Toggle>
    </div>
  )
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Toggle {...args} aria-label='Toggle bold'>
      Bold
    </Toggle>
  )
}
