import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './toggle-group.component'

const meta = {
  title: 'Base Components/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    spacing: { control: 'radio', options: ['gap', 'joined'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
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
} satisfies Meta<typeof ToggleGroup>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 },
  col: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
})

export default meta

export const Playground: Story = {
  args: { defaultValue: ['bold'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='bold' aria-label='Toggle charm'>
        Charm
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle hex'>
        Hex
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Toggle jinx'>
        Jinx
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Joined: Story = {
  args: { variant: 'outline', spacing: 'joined', defaultValue: ['center'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='left' aria-label='Align left'>
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value='center' aria-label='Align center'>
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value='right' aria-label='Align right'>
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Outline: Story = {
  args: { variant: 'outline', defaultValue: ['left'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='left' aria-label='Align left'>
        <AlignLeftIcon {...stylex.props(styles.icon)} />
      </ToggleGroupItem>
      <ToggleGroupItem value='center' aria-label='Align center'>
        <AlignCenterIcon {...stylex.props(styles.icon)} />
      </ToggleGroupItem>
      <ToggleGroupItem value='right' aria-label='Align right'>
        <AlignRightIcon {...stylex.props(styles.icon)} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.col)}>
      <ToggleGroup size='sm' variant='outline' defaultValue={['bold']}>
        <ToggleGroupItem value='bold' aria-label='Toggle charm'>
          Charm
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle hex'>
          Hex
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size='md' variant='outline' defaultValue={['bold']}>
        <ToggleGroupItem value='bold' aria-label='Toggle charm'>
          Charm
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle hex'>
          Hex
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size='lg' variant='outline' defaultValue={['bold']}>
        <ToggleGroupItem value='bold' aria-label='Toggle charm'>
          Charm
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle hex'>
          Hex
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'outline',
    spacing: 'joined',
    defaultValue: ['center']
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='top' aria-label='Align top'>
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value='center' aria-label='Align center'>
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value='bottom' aria-label='Align bottom'>
        Bottom
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Disabled: Story = {
  args: { disabled: true, variant: 'outline', defaultValue: ['bold'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='bold' aria-label='Toggle charm'>
        Charm
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle hex'>
        Hex
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Toggle jinx'>
        Jinx
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
