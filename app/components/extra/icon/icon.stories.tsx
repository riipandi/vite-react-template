import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ActivityIcon, ZapIcon } from 'lucide-react'
import { expect } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { Icon } from './icon.component'

const meta = {
  title: 'Extra Components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.flexDirection.column,
          atoms.gap['24px'],
          atoms.padding['20px'],
          atoms.fontSize['16px']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Icon>

type Story = StoryObj<typeof meta>

// Feather-style raw svg (from the Reshaped docs) — fill/stroke via currentColor.
function MicSvg() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
    >
      <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z' fill='currentColor' />
      <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
      <line x1='12' x2='12' y1='19' y2='22' />
    </svg>
  )
}

const styles = stylex.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  // Visualize the square bounding box vs the svg asset width.
  boxed: {
    backgroundColor: colors.backgroundNeutralFaded,
    color: colors.foregroundCritical,
    display: 'flex',
    gap: 8
  },
  inherit: {
    color: colors.foregroundPositive
  },
  sized: {
    height: 48,
    width: 48
  }
})

export default meta

export const Playground: Story = {
  args: { svg: ActivityIcon, size: 20 },
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Icon svg={ActivityIcon} size={20} />
      <Icon svg={ZapIcon} size={20} />
      <Icon svg={MicSvg} size={20} />
      <Icon svg={ActivityIcon} color='primary' size={20} />
      <Icon svg={ZapIcon} color='critical' size={20} />
    </div>
  )
}

export const Size: Story = {
  name: 'size',
  args: { svg: ActivityIcon },
  render: () => (
    <div {...stylex.props(styles.column)}>
      <div {...stylex.props(styles.row)}>
        <Icon svg={ActivityIcon} size={12} />
        <Icon svg={ActivityIcon} size={16} />
        <Icon svg={ActivityIcon} size={20} />
        <Icon svg={ActivityIcon} size={24} />
        <Icon svg={ActivityIcon} size={32} />
      </div>
      {/* Default: scales with the parent font size */}
      <div {...stylex.props(styles.row)}>
        <span {...stylex.props(atoms.fontSize['12px'])}>
          <Icon svg={ActivityIcon} />
        </span>
        <span {...stylex.props(atoms.fontSize['24px'])}>
          <Icon svg={ActivityIcon} />
        </span>
      </div>
      {/* Literal values: fill the parent box */}
      <div {...stylex.props(atoms.display.flex, atoms.gap['8px'])}>
        <div {...stylex.props(styles.sized)}>
          <Icon svg={ActivityIcon} size='100%' />
        </div>
        <div {...stylex.props(styles.sized)}>
          <Icon svg={MicSvg} size='100%' />
        </div>
      </div>
    </div>
  )
}

export const Color: Story = {
  name: 'color',
  args: { svg: ZapIcon },
  render: () => (
    <div {...stylex.props(styles.column)}>
      <div {...stylex.props(styles.row)}>
        <Icon svg={ZapIcon} size={20} />
        <Icon svg={ZapIcon} color='neutral' size={20} />
        <Icon svg={ZapIcon} color='neutralFaded' size={20} />
        <Icon svg={ZapIcon} color='primary' size={20} />
        <Icon svg={ZapIcon} color='positive' size={20} />
        <Icon svg={ZapIcon} color='warning' size={20} />
        <Icon svg={ZapIcon} color='critical' size={20} />
        <Icon svg={ZapIcon} color='disabled' size={20} />
      </div>
      {/* Inherits the parent text color when no color is set */}
      <div {...stylex.props(styles.inherit)}>
        <Icon svg={ZapIcon} size={20} />
      </div>
    </div>
  )
}

export const AutoWidth: Story = {
  name: 'autoWidth',
  args: { svg: MicSvg },
  render: () => (
    <div {...stylex.props(styles.column)}>
      {/* Square bounding box keeps wide and narrow icons visually aligned */}
      <div {...stylex.props(styles.boxed)}>
        <Icon svg={MicSvg} size={24} />
        <Icon svg={ZapIcon} size={24} />
        <Icon svg={MicSvg} size={24} />
      </div>
      <div {...stylex.props(styles.boxed)}>
        <Icon svg={MicSvg} autoWidth size={24} />
        <Icon svg={ZapIcon} autoWidth size={24} />
        <Icon svg={MicSvg} autoWidth size={24} />
      </div>
    </div>
  )
}

export const Attributes: Story = {
  name: 'attributes, test: forwarded props',
  args: { svg: ZapIcon },
  render: () => (
    <div data-testid='root'>
      <Icon svg={ZapIcon} size={20} id='test-id' data-testid='icon' />
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('icon')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}

export const Render: Story = {
  name: 'render',
  args: { svg: ZapIcon },
  render: () => (
    <Icon
      render={
        <a href='https://reshaped.so' target='_blank' rel='noreferrer' aria-label='Reshaped' />
      }
      svg={ZapIcon}
      size={20}
    />
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Reshaped' })
    expect(link.querySelector('svg')).toBeInTheDocument()
  }
}

export const ScreenReader: Story = {
  name: 'test: hidden from screen readers',
  args: { svg: ZapIcon },
  render: () => (
    <div data-testid='root'>
      <Icon svg={ZapIcon} size={20} data-testid='icon' />
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('icon')
    expect(root).toBeInTheDocument()
    expect(root).toHaveAttribute('aria-hidden', 'true')
  }
}
