import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Progress, ProgressIndicator, ProgressLabel } from '#/components/base/progress'
import { ProgressTrack, ProgressValue } from '#/components/base/progress'

const meta = {
  title: 'Base Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'positive', 'warning', 'critical']
    },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } }
  },
  args: { value: 65, min: 0, max: 100 },
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const colors = ['primary', 'neutral', 'positive', 'warning', 'critical'] as const

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div className='flex items-center gap-4'>
    <span className='text-foreground-neutral-faded w-16 text-xs font-semibold capitalize'>
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div className='flex flex-col gap-6'>{children}</div>
)

export const Playground: Story = {
  render: ({ value, size, color }) => (
    <div className='w-72'>
      <Progress value={value} size={size} color={color}>
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
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
          <div className='w-72'>
            <Progress value={65} size={s}>
              <ProgressLabel>Export data</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </Row>
      ))}
    </Grid>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {colors.map((v) => (
        <Row key={v} label={v}>
          <div className='w-72'>
            <Progress value={65} color={v}>
              <ProgressLabel>Export data</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </Row>
      ))}
    </Grid>
  )
}

export const Indeterminate: Story = {
  name: 'Indeterminate',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className='w-72'>
      <Progress value={null}>
        <ProgressLabel>Loading...</ProgressLabel>
        <ProgressTrack>
          <ProgressIndicator className='animate-pulse' />
        </ProgressTrack>
      </Progress>
    </div>
  )
}

export const Animated: Story = {
  name: 'Animated',
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = React.useState(20)

    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((current) => {
          if (current >= 100) {
            return 0
          }
          return Math.min(100, Math.round(current + Math.random() * 25))
        })
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className='w-72'>
        <Progress value={value}>
          <ProgressLabel>Export data</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    )
  }
}
