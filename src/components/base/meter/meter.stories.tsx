import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from '.'
import { fontSize, color } from '../../../styles/tokens.stylex'

const meta = {
  title: 'Base Components/Meter',
  component: Meter,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const colors = ['primary', 'neutral', 'positive', 'warning', 'critical'] as const

export const Playground: Story = {
  args: {
    value: 65,
    min: 0,
    max: 100,
    className: 'w-80'
  },
  render: (args) => (
    <Meter {...args}>
      <div
        {...stylex.props(x.gridColumn['1 / -1'])}
        {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
      >
        <MeterLabel>Storage Used</MeterLabel>
        <MeterValue />
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  args: {
    value: 65,
    min: 0,
    max: 100
  },
  render: () => (
    <div
      {...stylex.props(x.display.flex, x.width['20rem'], x.flexDirection.column, x.gap['1.5rem'])}
    >
      {sizes.map((s) => (
        <Meter key={s} value={65} min={0} max={100} size={s}>
          <div
            {...stylex.props(x.gridColumn['1 / -1'])}
            {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
          >
            <MeterLabel
              size={s}
              {...stylex.props(x.display.inlineFlex)}
              {...stylex.props(x.gap['0.25rem'])}
            >
              <span>Size</span>
              <span {...stylex.props(x.textTransform.uppercase)}>{s}</span>
            </MeterLabel>
            <MeterValue size={s} />
          </div>
          <MeterTrack size={s}>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  args: {
    value: 65,
    min: 0,
    max: 100
  },
  render: () => (
    <div
      {...stylex.props(x.display.flex, x.width['20rem'], x.flexDirection.column, x.gap['1.5rem'])}
    >
      {colors.map((v) => (
        <Meter key={v} value={v === 'critical' ? 90 : 65} min={0} max={100} color={v}>
          <div
            {...stylex.props(x.gridColumn['1 / -1'])}
            {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
          >
            <MeterLabel>{v.charAt(0).toUpperCase() + v.slice(1)}</MeterLabel>
            <MeterValue />
          </div>
          <MeterTrack>
            <MeterIndicator color={v} />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  )
}

export const StorageExample: Story = {
  name: 'Storage Usage',
  parameters: { controls: { disable: true } },
  args: {
    value: 75,
    min: 0,
    max: 100,
    color: 'primary'
  },
  render: (args) => (
    <div {...stylex.props(x.gap['0.5rem'])} {...stylex.props(x.width['20rem'])}>
      <Meter {...args}>
        <div
          {...stylex.props(x.gridColumn['1 / -1'])}
          {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
        >
          <MeterLabel>Storage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator color='primary' />
        </MeterTrack>
      </Meter>
      <p
        {...stylex.props(x.color[color.fgNeutralFaded])}
        {...stylex.props(x.fontSize[fontSize.xs])}
      >
        75 GB of 100 GB used
      </p>
    </div>
  )
}

export const BatteryExample: Story = {
  name: 'Battery Level',
  parameters: { controls: { disable: true } },
  args: {
    value: 23,
    min: 0,
    max: 100,
    color: 'warning'
  },
  render: (args) => (
    <div {...stylex.props(x.gap['0.5rem'])} {...stylex.props(x.width['20rem'])}>
      <Meter {...args}>
        <div
          {...stylex.props(x.gridColumn['1 / -1'])}
          {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
        >
          <MeterLabel>Battery</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator color='warning' />
        </MeterTrack>
      </Meter>
      <p {...stylex.props(x.color[color.fgCritical])} {...stylex.props(x.fontSize[fontSize.xs])}>
        Low battery warning
      </p>
    </div>
  )
}

export const WithCustomValue: Story = {
  name: 'Custom Value Format',
  parameters: { controls: { disable: true } },
  args: {
    value: 1450,
    min: 0,
    max: 2000,
    className: 'w-80'
  },
  render: (args) => (
    <Meter {...args}>
      <div
        {...stylex.props(x.gridColumn['1 / -1'])}
        {...stylex.props(x.display.flex, x.justifyContent.spaceBetween)}
      >
        <MeterLabel>API Requests</MeterLabel>
        <span
          {...stylex.props(x.color[color.fgNeutralFaded])}
          {...stylex.props(x.fontSize[fontSize.sm])}
        >
          1,450 / 2,000
        </span>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
