import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider, SliderThumb, SliderTrack } from '#/components/base/slider'
import { SliderControl, SliderIndicator } from '#/components/base/slider'

const meta = {
  title: 'Base Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  argTypes: {
    defaultValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    disabled: { control: 'boolean' }
  },
  args: { defaultValue: 50 },
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div className='flex items-center gap-4'>
    <span className='text-foreground-neutral-faded w-12 text-xs font-semibold uppercase'>
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div className='flex flex-col gap-8'>{children}</div>
)

export const Playground: Story = {
  render: ({ defaultValue, disabled }) => (
    <div className='w-64'>
      <Slider defaultValue={defaultValue} disabled={disabled}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb aria-label='Value' />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <div className='w-64'>
            <Slider defaultValue={60}>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb aria-label='Value' />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        </Row>
      ))}
    </Grid>
  )
}

export const RangeSlider: Story = {
  name: 'Range Slider',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className='w-64'>
      <Slider defaultValue={[25, 75]}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb index={0} aria-label='Minimum' />
            <SliderThumb index={1} aria-label='Maximum' />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  )
}

export const StatesShowcase: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Default'>
        <div className='w-64'>
          <Slider defaultValue={50}>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </Row>
      <Row label='Disabled'>
        <div className='w-64'>
          <Slider defaultValue={50} disabled>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label='Value' />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </Row>
    </Grid>
  )
}
