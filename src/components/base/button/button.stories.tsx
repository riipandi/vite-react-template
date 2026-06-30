import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { fn } from 'storybook/test'
import { color, fontSize, fontWeight } from '#/styles/tokens.stylex'
import { Separator } from '../separator'
import { Button } from './button.component'

const colors = ['primary', 'neutral', 'positive', 'warning', 'critical'] as const
const variants = ['solid', 'faded', 'outline', 'ghost'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const meta = {
  title: 'Base Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: colors },
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
    pill: { control: 'boolean' },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.center,
          x.minWidth['448px'],
          x.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
    <span
      {...stylex.props(
        x.color[color.fgNeutralFaded],
        x.fontSize[fontSize.sm],
        x.fontWeight[fontWeight.semibold],
        x.minWidth['5rem'],
        x.textTransform.uppercase
      )}
    >
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['1rem'])}>{children}</div>
)

export const Playground: Story = {
  args: { color: 'primary', variant: 'solid' },
  render: (args) => <Button {...args}>Button</Button>
}

export const ColorShowcase: Story = {
  name: 'Colors',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {colors.map((c) => (
            <Button key={c} color={c} variant={v}>
              {c}
            </Button>
          ))}
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
      {colors.map((c) => (
        <Row key={c} label={c}>
          {variants.map((v) => (
            <Button key={v} color={c} variant={v}>
              {v}
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
      {colors.map((c) => (
        <Row key={c} label={c}>
          {sizes.map((s) => (
            <Button key={s} color={c} size={s}>
              {s}
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const FullWidth: Story = {
  args: {},
  render: (args) => (
    <div {...stylex.props(x.marginLeft.auto, x.marginRight.auto, x.width['66.666667%'])}>
      <Button color='primary' block {...args}>
        Get Started
      </Button>
    </div>
  )
}

export const PillShowcase: Story = {
  name: 'Pill',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {colors.map((c) => (
            <Button key={c} color={c} variant={v} pill>
              {c}
            </Button>
          ))}
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
      {variants.map((v) => (
        <Row key={v} label={v}>
          {colors.map((c) => (
            <Button key={c} color={c} variant={v} disabled>
              {c}
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
        <Row key={`solid-${s}`} className='min-w-40' label={`Solid / Faded ${s}`}>
          <>
            {colors.map((c) => (
              <Button key={c} color={c} size={s} asIcon variant='solid'>
                <Lucide.Play size={16} strokeWidth={2} />
              </Button>
            ))}
            <Separator orientation='vertical' className='mx-2' />
            {colors.map((c) => (
              <Button key={c} color={c} size={s} asIcon variant='faded'>
                <Lucide.Play size={16} strokeWidth={2} />
              </Button>
            ))}
          </>
        </Row>
      ))}
      {sizes.map((s) => (
        <Row key={`faded-${s}`} className='min-w-40' label={`Outline / Ghost ${s}`}>
          <>
            {colors.map((c) => (
              <Button key={c} color={c} size={s} asIcon variant='faded'>
                <Lucide.Play size={16} strokeWidth={2} />
              </Button>
            ))}
            <Separator orientation='vertical' className='mx-2' />
            {colors.map((c) => (
              <Button key={c} color={c} size={s} asIcon variant='ghost'>
                <Lucide.Play size={16} strokeWidth={2} />
              </Button>
            ))}
          </>
        </Row>
      ))}
    </Grid>
  )
}

export const LinkShowcase: Story = {
  name: 'Link Mode',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          {colors.map((c) => (
            <Button
              key={c}
              variant='ghost'
              nativeButton={false}
              className='min-w-24 justify-start'
              color={c}
              size={s}
              render={
                // oxlint-disable-next-line jsx-a11y/anchor-has-content jsx-a11y/control-has-associated-label
                <a
                  href='https://base-ui.com/react/overview/quick-start'
                  rel='noopener noreferrer'
                  target='_blank'
                />
              }
            >
              {c}
              <Lucide.ArrowUpRight size={14} strokeWidth={2} />
            </Button>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
