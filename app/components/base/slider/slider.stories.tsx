import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontFamily, fontSize } from '#/styles/core/tokens.stylex'
import { Slider } from './slider.component'

const meta = {
  title: 'Base Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
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
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    maxWidth: container.small
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 16,
    width: container.medium
  },
  slider: {
    flex: 1
  },
  value: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontVariantNumeric: 'tabular-nums',
    width: 32
  },
  verticalRow: {
    height: 160,
    display: 'flex',
    alignItems: 'center'
  }
})

export default meta

export const Playground: Story = {
  args: { defaultValue: 50 },
  render: (args) => <Slider {...args} style={styles.root} />,
  play: async ({ canvas }) => {
    // Base UI exposes more than one slider element; pick the value thumb.
    const thumbs = canvas.getAllByRole('slider')
    const thumb = thumbs.find((el) => el.getAttribute('aria-valuenow') === '50') ?? thumbs[0]
    if (!thumb) throw new Error('Slider thumb not found')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')

    // Arrow keys step the value.
    thumb.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowLeft}')
    expect(thumb).toHaveAttribute('aria-valuenow', '51')

    // Home/End jump to the extremes.
    await userEvent.keyboard('{Home}')
    expect(thumb).toHaveAttribute('aria-valuenow', '0')
  }
}

export const Range: Story = {
  args: { defaultValue: [25, 75] },
  render: (args) => <Slider {...args} style={styles.root} />,
  play: ({ canvas }) => {
    const [min, max] = canvas.getAllByRole('slider')
    expect(min).toHaveAttribute('aria-valuenow', '25')
    expect(max).toHaveAttribute('aria-valuenow', '75')
  }
}

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultValue: [40] },
  render: (args) => (
    <div {...stylex.props(styles.verticalRow)}>
      <Slider {...args} />
    </div>
  )
}

export const Controlled: Story = {
  args: { value: [40] },
  render: () => {
    const [value, setValue] = React.useState([40])

    return (
      <div {...stylex.props(styles.row)}>
        <Slider
          value={value}
          onValueChange={(next) => setValue(typeof next === 'number' ? [next] : [...next])}
          style={styles.slider}
        />
        <span {...stylex.props(styles.value)}>{value[0]}</span>
      </div>
    )
  }
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: [40] },
  render: (args) => <Slider {...args} style={styles.root} />
}
