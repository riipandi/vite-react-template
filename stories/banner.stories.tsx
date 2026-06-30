import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Banner, BannerContent, BannerIcon, BannerClose } from '#/components/extra/banner'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/Banner',
  component: Banner,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke']
    },
    status: {
      control: 'select',
      options: ['error', 'warning', 'success', 'info', 'feature']
    }
  },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['36rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['filled', 'light', 'lighter', 'stroke'] as const
const statuses = ['error', 'warning', 'success', 'info', 'feature'] as const

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
  }
})

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { variant: 'filled', status: 'info' },
  render: (args) => (
    <Banner id='banner-playground' variant={args.variant} status={args.status}>
      <BannerIcon id='banner-playground-icon' />
      <BannerContent id='banner-playground-content'>
        This is a banner with {args.variant} variant and {args.status} status.
      </BannerContent>
      <BannerClose id='banner-playground-close' />
    </Banner>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  args: { variant: 'filled', status: 'info' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Banner key={s} id={`banner-${s}`} variant='filled' status={s}>
          <BannerIcon id={`banner-icon-${s}`} />
          <BannerContent id={`banner-content-${s}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)} banner message goes here.
          </BannerContent>
          <BannerClose id={`banner-close-${s}`} />
        </Banner>
      ))}
      {variants.map((v) => (
        <Banner key={v} id={`banner-mode-${v}`} variant={v} status='info'>
          <BannerIcon id={`banner-mode-icon-${v}`} />
          <BannerContent id={`banner-mode-content-${v}`}>{v} variant banner.</BannerContent>
          <BannerClose id={`banner-mode-close-${v}`} />
        </Banner>
      ))}
    </Grid>
  )
}
