import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '../button'
import { StackedToastProvider, anchoredToast, stackedToast } from './toast.component'

const meta = {
  title: 'Base Components/Toast',
  component: StackedToastProvider,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <StackedToastProvider position='bottom-right'>
        <div
          {...stylex.props(
            x.display.flex,
            x.flexDirection.column,
            x.alignItems.center,
            x.gap['0.75rem']
          )}
        >
          <Story />
        </div>
      </StackedToastProvider>
    )
  ]
} satisfies Meta<typeof StackedToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <>
      <Button onClick={() => stackedToast.default('This is a default toast notification')}>
        Show Default
      </Button>
      <Button
        color='positive'
        onClick={() => stackedToast.success('Operation completed successfully!')}
      >
        Show Success
      </Button>
      <Button
        color='critical'
        onClick={() => stackedToast.error('Something went wrong. Please try again.')}
      >
        Show Error
      </Button>
    </>
  )
}

export const AllTypes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <Button color='neutral' onClick={() => stackedToast.default('Default notification')}>
        Default
      </Button>
      <Button color='primary' onClick={() => stackedToast.info('New information available')}>
        Info
      </Button>
      <Button color='positive' onClick={() => stackedToast.success('Success!')}>
        Success
      </Button>
      <Button color='warning' onClick={() => stackedToast.warning('Warning: check your input')}>
        Warning
      </Button>
      <Button color='critical' onClick={() => stackedToast.error('Error occurred')}>
        Error
      </Button>
      <Button onClick={() => stackedToast.loading('Loading...')}>Loading</Button>
    </>
  )
}

export const Anchored: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Button
      color='primary'
      onClick={(e) =>
        anchoredToast.default('This toast is anchored to the button', {
          positionerProps: { anchor: e.currentTarget, sideOffset: 8 }
        })
      }
    >
      Show Anchored Toast
    </Button>
  )
}
