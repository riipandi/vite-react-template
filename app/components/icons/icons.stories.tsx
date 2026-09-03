import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { CircleMinusIcon, CirclePlusIcon } from 'lucide-react'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { FacebookIcon, GitHubIcon, GoogleIcon, InstagramIcon } from './index'
import { LinkedInIcon, TelegramIcon, WhatsAppIcon, XIcon } from './index'

const icons = [
  { name: 'GitHub', component: GitHubIcon },
  { name: 'Google', component: GoogleIcon },
  { name: 'Facebook', component: FacebookIcon },
  { name: 'X (Twitter)', component: XIcon },
  { name: 'Instagram', component: InstagramIcon },
  { name: 'LinkedIn', component: LinkedInIcon },
  { name: 'Telegram', component: TelegramIcon },
  { name: 'WhatsApp', component: WhatsAppIcon }
] as const

const meta = {
  title: 'Extra Components/Icons',
  parameters: { layout: 'centered' },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.alignItems.center,
          atoms.justifyContent.center,
          atoms.minWidth['448px']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta

export default meta
type Story = StoryObj<PlaygroundArgs>

interface PlaygroundArgs {
  size?: number
  color?: string
}

function PlaygroundComponent({ size = 24, color }: PlaygroundArgs) {
  return (
    <div {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['1rem'])}>
      <GitHubIcon size={size} color={color} />
      <XIcon size={size} color={color} />
      <GoogleIcon size={size} />
      <WhatsAppIcon size={size} />
    </div>
  )
}

export const Playground: Story = {
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 64, step: 4 } },
    color: { control: 'color' }
  },
  args: { size: 24, color: undefined },
  render: (args) => <PlaygroundComponent {...args} />
}

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        atoms.display.flex,
        atoms.flexWrap.wrap,
        atoms.justifyContent.center,
        atoms.alignItems.center,
        atoms.gap['1.5rem']
      )}
    >
      {icons.map(({ name, component: Icon }) => (
        <div
          key={name}
          {...stylex.props(
            atoms.display.flex,
            atoms.flexDirection.column,
            atoms.alignItems.center,
            atoms.gap['0.5rem']
          )}
        >
          <Icon size={20} />
          <span
            {...stylex.props(
              atoms.fontSize[fontSize.caption1],
              atoms.color[colors.foregroundNeutralFaded]
            )}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}

const sizeSteps = [16, 20, 24, 32, 48] as const

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        atoms.display.flex,
        atoms.flexDirection.column,
        atoms.gap['1.5rem'],
        atoms.minWidth['320px']
      )}
    >
      {icons.slice(0, 4).map(({ name, component: Icon }) => (
        <div
          key={name}
          {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['0.75rem'])}
        >
          <span
            {...stylex.props(
              atoms.minWidth['4rem'],
              atoms.fontSize[fontSize.caption1],
              atoms.fontWeight[fontWeight.semibold],
              atoms.color[colors.foregroundNeutralFaded]
            )}
          >
            {name}
          </span>
          <CircleMinusIcon {...stylex.props(atoms.margin['0 1rem'])} />
          {sizeSteps.map((s) => (
            <Icon key={s} size={s} />
          ))}
          <CirclePlusIcon {...stylex.props(atoms.margin['0 1rem'])} />
        </div>
      ))}
    </div>
  )
}

export const Raw: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      {...stylex.props(
        atoms.display.flex,
        atoms.flexWrap.wrap,
        atoms.alignItems.center,
        atoms.justifyContent.center,
        atoms.gap['1rem']
      )}
    >
      {icons.map(({ name, component: Icon }) => (
        <Icon key={name} size={32} />
      ))}
    </div>
  )
}

export const InContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['0.75rem'])}>
      <GitHubIcon size={16} color={colors.foregroundNeutralFaded} />
      <GoogleIcon size={16} color={colors.foregroundNeutralFaded} />
      <FacebookIcon size={16} color={colors.foregroundNeutralFaded} />
      <XIcon size={16} color={colors.foregroundNeutralFaded} />
      <InstagramIcon size={16} color={colors.foregroundNeutralFaded} />
      <LinkedInIcon size={16} color={colors.foregroundNeutralFaded} />
      <TelegramIcon size={16} color={colors.foregroundNeutralFaded} />
      <WhatsAppIcon size={16} color={colors.foregroundNeutralFaded} />
    </div>
  )
}
