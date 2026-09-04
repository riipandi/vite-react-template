import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
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
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  )
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => (
    <Alert {...args} style={styles.alert}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Log in again.</AlertDescription>
    </Alert>
  )
}

export const Action: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <Alert {...args} style={styles.alert}>
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      <AlertAction>
        <Button size='sm' variant='outline'>
          Undo
        </Button>
      </AlertAction>
    </Alert>
  )
}
