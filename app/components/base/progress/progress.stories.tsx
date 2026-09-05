import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { Button } from '#/components/base/button'
import { container } from '#/styles/core/tokens.stylex'
import { Progress, ProgressLabel, ProgressValue } from './progress.component'
const meta = {
  title: 'Base Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'number' }
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
} satisfies Meta<typeof Progress>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    maxWidth: container.sm
  },
  wrap: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: container.sm
  },
  button: {
    alignSelf: 'flex-start'
  }
})

export default meta

export const Playground: Story = {
  args: { value: 13 },
  render: () => {
    const [value, setValue] = React.useState(13)

    React.useEffect(() => {
      const timer = setTimeout(() => setValue(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <Progress value={value} locale='en-US' style={styles.root}>
        <ProgressLabel>Brewing Polyjuice Potion…</ProgressLabel>
        <ProgressValue />
      </Progress>
    )
  }
}

export const Label: Story = {
  args: { value: 72, locale: 'en-US' },
  render: (args) => (
    <Progress {...args} style={styles.root}>
      <ProgressLabel>Gringotts vault capacity used</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
  play: ({ canvas }) => {
    const el = canvas.getByRole('progressbar', { name: 'Gringotts vault capacity used' })
    expect(el).toHaveAttribute('aria-valuenow', '72')
    expect(el).toHaveAttribute('aria-valuemax', '100')
  }
}

export const Controlled: Story = {
  args: { value: 20 },
  render: () => {
    const [value, setValue] = React.useState(20)

    return (
      <div {...stylex.props(styles.wrap)}>
        <Progress value={value} locale='en-US'>
          <ProgressValue />
        </Progress>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setValue((current) => Math.min(current + 20, 100))}
          style={styles.button}
        >
          Decrypt next ring
        </Button>
      </div>
    )
  },
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '20')

    // Each click advances the controlled value by 20, clamped at 100.
    await userEvent.click(canvas.getByRole('button', { name: 'Decrypt next ring' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Decrypt next ring' }))
    expect(bar).toHaveAttribute('aria-valuenow', '60')
  }
}
