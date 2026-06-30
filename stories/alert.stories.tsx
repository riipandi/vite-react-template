import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Alert,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertClose
} from '#/components/base/alert'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke']
    },
    status: {
      control: 'select',
      options: ['error', 'warning', 'success', 'information', 'feature']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['filled', 'light', 'lighter', 'stroke'] as const
const statuses = ['error', 'warning', 'success', 'information', 'feature'] as const
const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
  },
  rowLabel: {
    minWidth: '5rem'
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)}>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { variant: 'filled', status: 'information' },
  render: (args) => (
    <Alert id='alert-playground' variant={args.variant} status={args.status} size={args.size}>
      <AlertIcon id='alert-playground-icon' />
      <AlertContent id='alert-playground-content'>
        <AlertTitle id='alert-playground-title'>Alert title</AlertTitle>
        <AlertDescription id='alert-playground-desc'>
          This is an alert message with {args.variant} variant and {args.status} status.
        </AlertDescription>
      </AlertContent>
      <AlertClose id='alert-playground-close' />
    </Alert>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  args: { variant: 'filled', status: 'information' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Row key={s} label={s}>
          {variants.map((v) => (
            <Alert key={v} id={`alert-${v}-${s}`} variant={v} status={s}>
              <AlertIcon id={`alert-icon-${v}-${s}`} />
              <AlertContent id={`alert-content-${v}-${s}`}>
                <AlertTitle id={`alert-title-${v}-${s}`}>{s}</AlertTitle>
                <AlertDescription id={`alert-desc-${v}-${s}`}>{v} variant</AlertDescription>
              </AlertContent>
            </Alert>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  args: { variant: 'filled', status: 'information' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Row key={s} label={s}>
          {sizes.map((sz) => (
            <Alert key={sz} id={`alert-size-${s}-${sz}`} variant='filled' status={s} size={sz}>
              <AlertIcon id={`alert-size-icon-${s}-${sz}`} />
              <AlertContent id={`alert-size-content-${s}-${sz}`}>
                <AlertTitle id={`alert-size-title-${s}-${sz}`}>{s}</AlertTitle>
                <AlertDescription id={`alert-size-desc-${s}-${sz}`}>{sz} size</AlertDescription>
              </AlertContent>
            </Alert>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
