import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { Button } from '#/components/base/button'
import { container } from '#/styles/core/tokens.stylex'
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert.component'

const meta = {
  title: 'Extra Components/Alert',
  component: Alert,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Alert>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  alert: {
    width: container.xl
  }
})

export default meta

export const Playground: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <Alert {...args} style={styles.alert}>
      <AlertTitle>Lumos!</AlertTitle>
      <AlertDescription>
        Point your wand and speak the incantation to light the darkest corridor.
      </AlertDescription>
    </Alert>
  )
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => (
    <Alert {...args} style={styles.alert}>
      <AlertTitle>Illuminati threat detected</AlertTitle>
      <AlertDescription>
        An antimatter canister is armed inside Vatican City. Alert the Swiss Guard.
      </AlertDescription>
    </Alert>
  )
}

export const Action: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <Alert {...args} style={styles.alert}>
      <AlertTitle>Spell recorded</AlertTitle>
      <AlertDescription>
        Expecto Patronum cast successfully. Your patronus is on file with the Ministry.
      </AlertDescription>
      <AlertAction>
        <Button size='xs' variant='outline'>
          Reversal
        </Button>
      </AlertAction>
    </Alert>
  ),
  play: ({ canvas }) => {
    // Title, description, and action all render inside the alert.
    expect(canvas.getByRole('heading', { name: 'Spell recorded' })).toBeInTheDocument()
    expect(canvas.getByText(/patronus is on file/i)).toBeInTheDocument()
    expect(canvas.getByRole('button', { name: 'Reversal' })).toBeEnabled()
  }
}
