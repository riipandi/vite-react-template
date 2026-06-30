import type { Meta, StoryObj } from '@storybook/react-vite'
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from '#/components/base/meter'

const meta = {
  title: 'Base Components/Meter',
  component: Meter,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
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
      <div className='col-span-full flex justify-between'>
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
    <div className='flex w-80 flex-col gap-6'>
      {sizes.map((s) => (
        <Meter key={s} value={65} min={0} max={100} size={s}>
          <div className='col-span-full flex justify-between'>
            <MeterLabel size={s} className='inline-flex gap-1'>
              <span>Size</span>
              <span className='uppercase'>{s}</span>
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
    <div className='flex w-80 flex-col gap-6'>
      {colors.map((v) => (
        <Meter key={v} value={v === 'critical' ? 90 : 65} min={0} max={100} color={v}>
          <div className='col-span-full flex justify-between'>
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
    <div className='w-80 space-y-2'>
      <Meter {...args}>
        <div className='col-span-full flex justify-between'>
          <MeterLabel>Storage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator color='primary' />
        </MeterTrack>
      </Meter>
      <p className='text-foreground-neutral-faded text-xs'>75 GB of 100 GB used</p>
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
    <div className='w-80 space-y-2'>
      <Meter {...args}>
        <div className='col-span-full flex justify-between'>
          <MeterLabel>Battery</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator color='warning' />
        </MeterTrack>
      </Meter>
      <p className='text-foreground-critical text-xs'>Low battery warning</p>
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
      <div className='col-span-full flex justify-between'>
        <MeterLabel>API Requests</MeterLabel>
        <span className='text-foreground-neutral-faded text-sm'>1,450 / 2,000</span>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
