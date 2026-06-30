import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Slider, SliderValue } from '#/components/base/slider'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 }
    },
    min: {
      control: { type: 'number', min: 0, max: 100 }
    },
    max: {
      control: { type: 'number', min: 1, max: 200 }
    }
  },
  tags: []
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[6], width: '24rem' },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' },
  sliderBox: { width: '16rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='slider-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='slider-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { value: 50, min: 0, max: 100 },
  render: (args) => (
    <div {...stylex.props(layoutStyles.sliderBox)} id='slider-playground'>
      <Slider id='slider-playground-el' {...(args as React.ComponentProps<typeof Slider>)}>
        <SliderValue id='slider-playground-value' />
      </Slider>
    </div>
  )
}

export const RangeShowcase: Story = {
  name: 'Range',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Single'>
        <div {...stylex.props(layoutStyles.sliderBox)} id='slider-range-single-box'>
          <Slider id='slider-range-single' defaultValue={50} min={0} max={100}>
            <SliderValue id='slider-range-single-value' />
          </Slider>
        </div>
      </Row>
      <Row label='Range'>
        <div {...stylex.props(layoutStyles.sliderBox)} id='slider-range-dual-box'>
          <Slider id='slider-range-dual' defaultValue={[25, 75]} min={0} max={100}>
            <SliderValue id='slider-range-dual-value' />
          </Slider>
        </div>
      </Row>
      <Row label='Steps 10'>
        <div {...stylex.props(layoutStyles.sliderBox)} id='slider-range-step-box'>
          <Slider id='slider-range-step' defaultValue={50} min={0} max={100} step={10}>
            <SliderValue id='slider-range-step-value' />
          </Slider>
        </div>
      </Row>
    </Grid>
  )
}

export const WithValue: Story = {
  name: 'With Value',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.sliderBox)} id='slider-with-value'>
      <Slider id='slider-with-value-el' defaultValue={60} min={0} max={100}>
        <SliderValue id='slider-with-value-display' />
      </Slider>
    </div>
  )
}
