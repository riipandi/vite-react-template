import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { StackedToastProvider, stackedToast, type ToastPosition } from '#/components/base/toast'
import { space } from '#/styles/tokens.stylex'

const trigger = (type: 'default' | 'success' | 'error' | 'info' | 'warning' | 'loading') => {
  const messages: Record<string, string> = {
    default: 'This is a default toast message',
    success: 'Operation completed successfully',
    error: 'Something went wrong! Please try again.',
    info: 'Here is some useful information',
    warning: 'Warning: check your inputs before proceeding',
    loading: 'Processing your request...'
  }
  stackedToast[type](messages[type]!)
}

function Demo({ position: pos }: { position?: ToastPosition }) {
  const position = pos ?? 'bottom-right'

  return (
    <StackedToastProvider position={position}>
      <span {...stylex.props(x.display.flex, x.gap[space[2]])} id='toast-demo-buttons'>
        {(['default', 'success', 'error', 'info', 'warning', 'loading'] as const).map((t) => (
          <Button
            key={t}
            variant='neutral'
            mode='filled'
            size='md'
            onClick={() => trigger(t)}
            id={`toast-btn-${t}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </span>
    </StackedToastProvider>
  )
}

const meta = {
  title: 'Component/Toast',
  component: Demo,
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]
    }
  },
  tags: []
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='toast-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='toast-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { position: 'bottom-right' },
  render: (args) => <Demo position={args.position} />
}

export const Positions: Story = {
  name: 'Positions',
  parameters: { controls: { disable: true } },
  render: () => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ] as const

    return (
      <Grid>
        {positions.map((pos) => (
          <Row key={pos} label={pos}>
            <Demo position={pos} />
          </Row>
        ))}
      </Grid>
    )
  }
}
