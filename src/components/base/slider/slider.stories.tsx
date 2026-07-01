import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { fontSizeVar, fontWeightVar, colorVar } from '#/styles/tokens.stylex'
import { Slider, SliderThumb, SliderTrack } from '.'
import { SliderControl, SliderIndicator } from '.'

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
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['1rem'])}>
    <span
      {...stylex.props(x.color[colorVar.fgNeutralFaded])}
      {...stylex.props(
        x.width['3rem'],
        x.fontSize[fontSizeVar.xs],
        x.fontWeight[fontWeightVar.semibold],
        x.textTransform.uppercase
      )}
    >
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['2rem'])}>{children}</div>
)

export const Playground: Story = {
  render: ({ defaultValue, disabled }) => (
    <div {...stylex.props(x.width['16rem'])}>
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
          <div {...stylex.props(x.width['16rem'])}>
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
    <div {...stylex.props(x.width['16rem'])}>
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
        <div {...stylex.props(x.width['16rem'])}>
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
        <div {...stylex.props(x.width['16rem'])}>
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
