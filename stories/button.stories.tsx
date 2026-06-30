import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { fn } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Separator } from '#/components/base/separator'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'error', 'link']
    },
    mode: {
      control: 'select',
      options: ['filled', 'lighter', 'ghost', 'stroke']
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm']
    },
    asIcon: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  tags: [],
  args: { onClick: fn() },
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['primary', 'neutral', 'error', 'link'] as const
const modes = ['filled', 'lighter', 'ghost', 'stroke'] as const
const sizes = ['lg', 'md', 'sm'] as const

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
  },
  separatorInline: {
    marginLeft: space[2],
    marginRight: space[2]
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
  args: { variant: 'primary', mode: 'filled', children: 'Button' },
  render: (args) => <Button {...args}>{args.children}</Button>
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {modes.map((m) => (
        <Row key={m} label={m}>
          {variants.map((v) => (
            <Button key={v} variant={v} mode={m}>
              {v}
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const ModeShowcase: Story = {
  name: 'Modes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {modes.map((m) => (
            <Button key={m} variant={v} mode={m}>
              {m}
            </Button>
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
            <Button key={s} variant={v} size={s}>
              {s}
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const IconShowcase: Story = {
  name: 'Icon Mode',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={`filled-${s}`} label={`Filled / Lighter ${s}`}>
          {variants.map((v) => (
            <Button key={v} variant={v} size={s} asIcon>
              <Lucide.Play size={16} strokeWidth={2} />
            </Button>
          ))}
          <Separator orientation='vertical' {...stylex.props(layoutStyles.separatorInline)} />
          {variants.map((v) => (
            <Button key={v} variant={v} size={s} mode='lighter' asIcon>
              <Lucide.Play size={16} strokeWidth={2} />
            </Button>
          ))}
        </Row>
      ))}
      {sizes.map((s) => (
        <Row key={`stroke-${s}`} label={`Stroke / Ghost ${s}`}>
          {variants.map((v) => (
            <Button key={v} variant={v} size={s} mode='stroke' asIcon>
              <Lucide.Play size={16} strokeWidth={2} />
            </Button>
          ))}
          <Separator orientation='vertical' {...stylex.props(layoutStyles.separatorInline)} />
          {variants.map((v) => (
            <Button key={v} variant={v} size={s} mode='ghost' asIcon>
              <Lucide.Play size={16} strokeWidth={2} />
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const LinkShowcase: Story = {
  name: 'Link Variant',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Button
            variant='link'
            size={s}
            render={
              <a
                href='https://base-ui.com/react/overview/quick-start'
                rel='noopener noreferrer'
                target='_blank'
              >
                Base UI docs
              </a>
            }
          >
            <Lucide.ArrowUpRight size={14} strokeWidth={2} />
          </Button>
        </Row>
      ))}
    </Grid>
  )
}

export const DisabledShowcase: Story = {
  name: 'Disabled',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {modes.map((m) => (
        <Row key={m} label={m}>
          {variants.map((v) => (
            <Button key={v} variant={v} mode={m} disabled>
              {v}
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
