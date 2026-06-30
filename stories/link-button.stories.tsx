import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fn } from 'storybook/test'
import { LinkButton } from '#/components/extra/link-button'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/LinkButton',
  component: LinkButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['gray', 'black', 'primary', 'error']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    },
    underline: { control: 'boolean' },
    href: { control: 'text' }
  },
  tags: [],
  args: { onClick: fn() }
} satisfies Meta<typeof LinkButton>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['gray', 'black', 'primary', 'error'] as const
const sizes = ['sm', 'md'] as const

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
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3]
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='link-button-row'>
    <span {...stylex.props(layoutStyles.rowLabel)} id='link-button-row-label'>
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='link-button-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'black', children: 'Link Button', href: '#' },
  render: (args) => (
    <LinkButton id='link-button-playground' {...args}>
      {args.children}
    </LinkButton>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          {variants.map((v) => (
            <LinkButton id={`link-button-variant-${v}-${s}`} key={v} variant={v} size={s} href='#'>
              {v}
            </LinkButton>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {sizes.map((s) => (
            <LinkButton id={`link-button-size-${v}-${s}`} key={s} variant={v} size={s} href='#'>
              {s}
            </LinkButton>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const UnderlineShowcase: Story = {
  name: 'Underline Toggle',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          <LinkButton
            id={`link-button-underline-true-${v}`}
            key={`${v}-true`}
            variant={v}
            underline
            href='#'
          >
            underline
          </LinkButton>
          <LinkButton
            id={`link-button-underline-false-${v}`}
            key={`${v}-false`}
            variant={v}
            underline={false}
            href='#'
          >
            no underline
          </LinkButton>
        </Row>
      ))}
    </Grid>
  )
}
